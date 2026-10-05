import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import addContext from 'mochawesome/addContext.js';
import testdataGlobal from '../../testdata/testdata-global.js';
import config from '../../utilities/config.js';
import list from '../../testdata/testdata-common/list.js';
import access_token from '../../testdata/access_token.js';
import get_query from '../../utilities/query-builders/get_query.js';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

describe('list_federal ', function () {

    const environment_1 = 'cert_containerized';
    const environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_FEDERAL_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';
    let secondaryToken;

    // Fetch the cert token always and the consolidate token only in POST_POST mode.
    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_FEDERAL_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
        }
        access_token.cert_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);
        if (!access_token.cert_containerized_token) {
            throw new Error(`No access token returned for ${environment_1}`);
        }
        if (isPostPostMode) {
            secondaryToken = await testdataGlobal.Access_Token_Generator(environment_2);
            if (!secondaryToken) {
                throw new Error(`No access token returned for ${environment_2}`);
            }
        }
        console.log(`Access token(s) generated for ${runMode} mode.`);
    });

    // Test Scenarios
    describe('list_federal - Allows the user to submit either a product identifier or a package identifier and returns all available Federal flag information in GSDD', function () {

        // Loop through all ListFederal_dataObjects
        [...Object.entries(list.ListFederal_dataObjects)].forEach(([datasetName, dataset]) => {

            it(`${datasetName} - Generate all list in ListFederal`, function (done) {

                // Map each POST payload with its own environment's token.
                const mappedData_Post = testdataGlobal.Mapping_Json55({ [datasetName]: dataset }, access_token.cert_containerized_token);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json55({ [datasetName]: dataset }, secondaryToken)
                    : null;
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve cert POST, staging GET and consolidate POST hosts independently.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);

                const getPath = get_query.ListFederal_GetPath(dataset);

                // Create only the requests needed by the selected comparison mode.
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/ListFederal')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);
                const secondaryRequest = isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : chai.request(consolidatePostBaseUrl)
                        .post('/api/ListFederal')
                        .set('Content-Type', 'application/json')
                        .send(mappedData_Post_Consolidate);

                // Strip tokens from response/difference report content.
                const redactToken = (value) => {
                    if (Array.isArray(value)) return value.map(redactToken);
                    if (value && typeof value === 'object') {
                        return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
                            key, /access.?token/i.test(key) ? '[REDACTED]' : redactToken(entry)
                        ]));
                    }
                    if (typeof value === 'string') {
                        return [access_token.cert_containerized_token, secondaryToken]
                            .filter(Boolean)
                            .reduce((text, token) => text.replaceAll(token, '[REDACTED]'), value);
                    }
                    return value;
                };

                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: {
                        URL: postBaseUrl + '/api/ListFederal',
                        Method: 'POST',
                        Headers: { 'Content-Type': 'application/json' },
                        Body: mappedData_Post
                    }
                });
                addContext(this, isPostGetMode ? {
                    title: 'Request URL for Secondary Call',
                    value: {
                        URL: getBaseUrl + getPath,
                        Method: 'GET',
                        Headers: { 'Content-Type': 'application/json' }
                    }
                } : {
                    title: 'Request Body for Secondary Call',
                    value: {
                        URL: consolidatePostBaseUrl + '/api/ListFederal',
                        Method: 'POST',
                        Headers: { 'Content-Type': 'application/json' },
                        Body: mappedData_Post_Consolidate
                    }
                });

                // Parse JSON responses while retaining non-JSON error payloads.
                const parseResponseData = (response) => {
                    if (response.body && typeof response.body === 'object' && Object.keys(response.body).length > 0) {
                        return response.body;
                    }
                    if (response.text && response.text.trim().length > 0) {
                        try {
                            return JSON.parse(response.text);
                        } catch {
                            return response.text;
                        }
                    }
                    return response.body ?? response.text ?? {};
                };

                // Preserve status and body from both fulfilled and rejected calls.
                const normalizeResult = (result) => {
                    const response = result.status === 'fulfilled' ? result.value : result.reason?.response;
                    return {
                        response,
                        statusCode: response?.status ?? null,
                        body: response ? parseResponseData(response) : { message: result.reason?.message || 'Request failed' }
                    };
                };

                Promise.allSettled([postRequest, secondaryRequest])
                    .then(([postResult, secondaryResult]) => {
                        const postInfo = normalizeResult(postResult);
                        const secondaryInfo = normalizeResult(secondaryResult);

                        addContext(this, {
                            title: 'Primary Response Details',
                            value: {
                                URL: postBaseUrl + '/api/ListFederal',
                                Method: 'POST',
                                Status: postInfo.statusCode,
                                Body: redactToken(postInfo.body)
                            }
                        });
                        addContext(this, {
                            title: 'Secondary Response Details',
                            value: {
                                URL: isPostGetMode ? getBaseUrl + getPath : consolidatePostBaseUrl + '/api/ListFederal',
                                Method: isPostGetMode ? 'GET' : 'POST',
                                Status: secondaryInfo.statusCode,
                                Body: redactToken(secondaryInfo.body)
                            }
                        });

                        try {
                            if (!postInfo.response || !secondaryInfo.response) {
                                throw new Error('One of the responses is undefined');
                            }

                            // Sort both bodies and diff them before asserting so the difference always renders.
                            const postSorted = testdataGlobal.Sorting_Objects(postInfo.body);
                            const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body);
                            const differencesObject = testdataGlobal.JSON_Differences(postSorted, secondarySorted);
                            addContext(this, {
                                title: 'Comparison Difference',
                                value: testdataGlobal.Differences_Table(redactToken(differencesObject))
                            });

                            expect(postInfo.statusCode, `POST ${postBaseUrl}/api/ListFederal`).to.equal(dataset.expectedStatus);
                            expect(secondaryInfo.statusCode, isPostGetMode
                                ? `GET ${getBaseUrl}${getPath}`
                                : `POST ${consolidatePostBaseUrl}/api/ListFederal`).to.equal(dataset.expectedStatus);

                            if (dataset.expectedError) {
                                expect(postInfo.body).to.deep.include(dataset.expectedError);
                                expect(secondaryInfo.body).to.deep.include(dataset.expectedError);
                            }

                            if (dataset.expectedStatus === 200) {
                                expect(differencesObject).to.be.null;
                            }

                            done();
                        } catch (err) {
                            done(new Error(`Failed to compare the responses - ${err}`));
                        }
                    })
                    .catch(err => {
                        done(err);
                    });

            }).timeout(120000);
        });

    });

});


