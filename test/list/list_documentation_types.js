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

describe('list_documentation_types ', function () {

    const environment_1 = 'cert_containerized';
    const environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_DOCUMENTATION_TYPES_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';
    let secondaryToken;

    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_DOCUMENTATION_TYPES_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
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
    });

    // Test Scenarios
    describe('list_documentation_types - Returns the DrugToDrug and DrugToLifestyle interaction documentation values, along with their internal identifiers.', function () {

        // Loop through all ListDocumentationTypes_dataObjects
        [...Object.entries(list.ListDocumentationTypes_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListDocumentationTypes`, function (done) {

                // Map each POST payload with its own environment's token.
                const mappedData_Post = testdataGlobal.Mapping_Json52({ [datasetName]: dataset }, access_token.cert_containerized_token);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json52({ [datasetName]: dataset }, secondaryToken)
                    : null;
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve the three supplied hosts and the GET route independently.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);
                const getPath = get_query.ListDocumentationTypes_GetPath();

                // Create only the requests needed by the selected comparison mode.
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/ListDocumentationTypes')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);
                const secondaryRequest = isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : chai.request(consolidatePostBaseUrl)
                        .post('/api/ListDocumentationTypes')
                        .set('Content-Type', 'application/json')
                        .send(mappedData_Post_Consolidate);
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
                        URL: postBaseUrl + '/api/ListDocumentationTypes',
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
                        URL: consolidatePostBaseUrl + '/api/ListDocumentationTypes',
                        Method: 'POST',
                        Headers: { 'Content-Type': 'application/json' },
                        Body: mappedData_Post_Consolidate
                    }
                });

                (async () => {
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
                            statusCode: response?.status ?? response?.statusCode ?? null,
                            body: response ? parseResponseData(response) : { message: result.reason?.message || 'Request failed' }
                        };
                    };
                    const [postResult, secondaryResult] = await Promise.allSettled([postRequest, secondaryRequest]);
                    const postInfo = normalizeResult(postResult);
                    const secondaryInfo = normalizeResult(secondaryResult);

                    addContext(this, {
                        title: 'Primary Response Details',
                        value: {
                            URL: postBaseUrl + '/api/ListDocumentationTypes',
                            Method: 'POST',
                            Status: postInfo.statusCode,
                            Body: redactToken(postInfo.body)
                        }
                    });
                    addContext(this, {
                        title: 'Secondary Response Details',
                        value: {
                            URL: isPostGetMode ? getBaseUrl + getPath : consolidatePostBaseUrl + '/api/ListDocumentationTypes',
                            Method: isPostGetMode ? 'GET' : 'POST',
                            Status: secondaryInfo.statusCode,
                            Body: redactToken(secondaryInfo.body)
                        }
                    });

                    // Sort and compare both payloads before asserting either status or equality.
                    const postSorted = testdataGlobal.Sorting_Objects(postInfo.body);
                    const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body);
                    const differencesObject = testdataGlobal.JSON_Differences(postSorted, secondarySorted);
                    addContext(this, {
                        title: 'Comparison Difference',
                        value: testdataGlobal.Differences_Table(redactToken(differencesObject))
                    });

                    expect(postInfo.statusCode, `POST ${postBaseUrl}/api/ListDocumentationTypes`).to.equal(200);
                    expect(secondaryInfo.statusCode, isPostGetMode
                        ? `GET ${getBaseUrl}${getPath}`
                        : `POST ${consolidatePostBaseUrl}/api/ListDocumentationTypes`).to.equal(200);
                    expect(differencesObject).to.be.null;
                })().then(() => done(), (error) => done(new Error(`Failed to compare the responses - ${error}`)));
            }).timeout(120000);
        });

    });

});

