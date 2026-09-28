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

describe('list_ags_beers_quality_of_evidence ', function () {
    var environment_1 = 'cert_containerized';
    var environment_2 = 'consolidate';
    const runMode = (process.env.LIST_AGS_BEERS_QUALITY_OF_EVIDENCE_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';

    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_AGS_BEERS_QUALITY_OF_EVIDENCE_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
        }
        access_token.cert_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);
        if (!access_token.cert_containerized_token) {
            throw new Error(`No access token returned for ${environment_1}`);
        }
        if (isPostPostMode) {
            access_token.consolidate_token = await testdataGlobal.Access_Token_Generator(environment_2);
            if (!access_token.consolidate_token) {
                throw new Error(`No access token returned for ${environment_2}`);
            }
        }
    });

    // Test Scenarios
    describe('list_ags_beers_quality_of_evidence - Returns a list of AGS Beers criteria quality-of-evidence statements and their identifiers', function () {

        Object.entries(list.ListAGSBeersQualityOfEvidence_dataObjects).forEach(([datasetName, dataset]) => {

            it(`${datasetName} - Generate all list in ListAGSBeersQualityOfEvidence`, function (done) {

                // Use the environment-specific token for each POST body.
                const mappedData_Post = testdataGlobal.Mapping_Json44({ [datasetName]: dataset }, access_token.cert_containerized_token);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json44({ [datasetName]: dataset }, access_token.consolidate_token)
                    : null;
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve each endpoint independently and keep the GET path static.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);

                const getPath = get_query.ListAGSBeersQualityOfEvidence_GetPath();

                // Build only the selected comparison request.
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/ListAGSBeersQualityOfEvidence')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);
                const getRequest = isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : null;
                const consolidatePostRequest = isPostPostMode
                    ? chai.request(consolidatePostBaseUrl)
                        .post('/api/ListAGSBeersQualityOfEvidence')
                        .set('Content-Type', 'application/json')
                        .send(mappedData_Post_Consolidate)
                    : null;

                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: {
                        URL: postBaseUrl + '/api/ListAGSBeersQualityOfEvidence',
                        Method: 'POST',
                        Headers: { 'Content-Type': 'application/json' },
                        Body: mappedData_Post
                    }
                });
                if (isPostGetMode) {
                    addContext(this, {
                        title: 'Request URL for Secondary Call',
                        value: {
                            URL: getBaseUrl + getPath,
                            Method: 'GET',
                            Headers: { 'Content-Type': 'application/json' }
                        }
                    });
                } else {
                    addContext(this, {
                        title: 'Request Body for Secondary Call',
                        value: {
                            URL: consolidatePostBaseUrl + '/api/ListAGSBeersQualityOfEvidence',
                            Method: 'POST',
                            Headers: { 'Content-Type': 'application/json' },
                            Body: mappedData_Post_Consolidate
                        }
                    });
                }

                Promise.allSettled([postRequest])
                    .then(async ([postResult]) => [postResult, (await Promise.allSettled([
                        isPostGetMode ? getRequest : consolidatePostRequest
                    ]))[0]])
                    .then(results => {
                        // Parse JSON responses and preserve non-JSON error payloads.
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

                        // Preserve each call's status and payload even when its promise rejects.
                        const normalizeResult = (result) => {
                            const response = result.status === 'fulfilled' ? result.value : result.reason?.response;
                            return {
                                statusCode: response?.status ?? null,
                                body: response ? parseResponseData(response) : { message: result.reason?.message || 'Request failed' }
                            };
                        };
                        const postInfo = normalizeResult(results[0]);
                        const secondaryInfo = normalizeResult(results[1]);

                        const redactToken = (value) => {
                            if (Array.isArray(value)) return value.map(redactToken);
                            if (value && typeof value === 'object') {
                                return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
                                    key, /access.?token/i.test(key) ? '[REDACTED]' : redactToken(entry)
                                ]));
                            }
                            if (typeof value === 'string') {
                                return [access_token.cert_containerized_token, access_token.consolidate_token]
                                    .filter(Boolean)
                                    .reduce((text, token) => text.replaceAll(token, '[REDACTED]'), value);
                            }
                            return value;
                        };

                        addContext(this, {
                            title: 'Primary Response Details',
                            value: {
                                URL: postBaseUrl + '/api/ListAGSBeersQualityOfEvidence',
                                Method: 'POST',
                                Status: postInfo.statusCode,
                                Body: redactToken(postInfo.body)
                            }
                        });
                        addContext(this, {
                            title: 'Secondary Response Details',
                            value: {
                                URL: isPostGetMode
                                    ? getBaseUrl + getPath
                                    : consolidatePostBaseUrl + '/api/ListAGSBeersQualityOfEvidence',
                                Method: isPostGetMode ? 'GET' : 'POST',
                                Status: secondaryInfo.statusCode,
                                Body: redactToken(secondaryInfo.body)
                            }
                        });

                        try {
                            // Sort both payloads and report only their field differences.
                            const postSorted = testdataGlobal.Sorting_Objects(postInfo.body);
                            const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body);
                            const differencesObject = testdataGlobal.JSON_Differences(postSorted, secondarySorted);
                            addContext(this, {
                                title: 'Comparison Difference',
                                value: testdataGlobal.Differences_Table(redactToken(differencesObject))
                            });

                            expect(postInfo.statusCode, `POST ${postBaseUrl}/api/ListAGSBeersQualityOfEvidence`).to.equal(200);
                            const secondaryUrl = isPostGetMode
                                ? `GET ${getBaseUrl}${getPath}`
                                : `POST ${consolidatePostBaseUrl}/api/ListAGSBeersQualityOfEvidence`;
                            expect(secondaryInfo.statusCode, secondaryUrl).to.equal(200);
                            expect(differencesObject).to.be.null;
                            done();
                        } catch (err) {
                            done(new Error(`Failed to compare the responses - ${err}`));
                        }
                    });
            }).timeout(120000);
        });

    });

});

