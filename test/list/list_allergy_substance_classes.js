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

describe('list_allergy_substance_classes ', function () {

    // Generate Access Tokens - Based on the Environment during Runtime

    var environment_1 = 'cert_containerized';
    var environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_ALLERGY_SUBSTANCE_CLASSES_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';

    before(async function () {
        this.timeout(40000);
        try {
            if (!isPostGetMode && !isPostPostMode) {
                throw new Error(`Invalid LIST_ALLERGY_SUBSTANCE_CLASSES_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
            }

            // Generate the tokens required by the selected comparison mode
            access_token.cert_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);
            if (!access_token.cert_containerized_token) {
                throw new Error(`Access token generation failed for ${environment_1}`);
            }
            if (isPostPostMode) {
                access_token.consolidate_token = await testdataGlobal.Access_Token_Generator(environment_2);
                if (!access_token.consolidate_token) {
                    throw new Error(`Access token generation failed for ${environment_2}`);
                }
            }

            console.log('Required access tokens generated successfully.');

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });

    // Test Scenarios
    describe('list_allergy_substance_classes - Returns a list of all allergy substance classes used in the Gold Standard Drug Database, along with their internal identifiers.', function () {

        // Loop through all ListAllergySubstanceClasses_dataObjects
        [...Object.entries(list.ListAllergySubstanceClasses_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListAllergySubstanceClasses`, function (done) {

                // Map the dataset into independent cert and consolidate POST payloads
                const certToken = dataset.tokenType === 'invalid'
                    ? 'ten'
                    : access_token.cert_containerized_token;
                const consolidateToken = dataset.tokenType === 'invalid'
                    ? 'ten'
                    : access_token.consolidate_token;
                const mappedData_Post = testdataGlobal.Mapping_Json46({ [datasetName]: dataset }, certToken);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json46({ [datasetName]: dataset }, consolidateToken)
                    : null;

                // If the mapping failed, terminate the test
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Build the cert POST, staging GET, and consolidate POST URLs from repository helpers
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);
                const getPath = get_query.ListAllergySubstanceClasses_GetPath(dataset);

                // Build only the request objects needed by the selected comparison mode
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/ListAllergySubstanceClasses')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);

                const getRequest = isPostGetMode && !dataset.postOnly
                    ? chai.request(getBaseUrl)
                        .get(getPath)
                        .set('Content-Type', 'application/json')
                    : null;

                const consolidatePostRequest = isPostPostMode
                    ? chai.request(consolidatePostBaseUrl)
                        .post('/api/ListAllergySubstanceClasses')
                        .set('Content-Type', 'application/json')
                        .send(mappedData_Post_Consolidate)
                    : null;

                const redactToken = (value) => {
                    if (Array.isArray(value)) {
                        return value.map(redactToken);
                    }
                    if (value && typeof value === 'object') {
                        return Object.fromEntries(Object.entries(value).map(([key, child]) => [
                            key,
                            /access.?token/i.test(key) ? '[REDACTED]' : redactToken(child)
                        ]));
                    }
                    if (typeof value === 'string') {
                        return [access_token.cert_containerized_token, access_token.consolidate_token]
                            .filter(Boolean)
                            .reduce((text, token) => text.replaceAll(token, '[REDACTED]'), value);
                    }
                    return value;
                };

                // Add both request details to the Mochawesome report
                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: {
                        URL: postBaseUrl + '/api/ListAllergySubstanceClasses',
                        Method: 'POST',
                        Headers: {
                            'Content-Type': 'application/json'
                        },
                        Body: mappedData_Post
                    }
                });

                if (isPostGetMode && !dataset.postOnly) {
                    addContext(this, {
                        title: 'Request URL for Secondary Call',
                        value: {
                            URL: getBaseUrl + getPath,
                            Method: 'GET',
                            Headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    });
                } else if (isPostPostMode) {
                    addContext(this, {
                        title: 'Request Body for Secondary Call',
                        value: {
                            URL: consolidatePostBaseUrl + '/api/ListAllergySubstanceClasses',
                            Method: 'POST',
                            Headers: {
                                'Content-Type': 'application/json'
                            },
                            Body: mappedData_Post_Consolidate
                        }
                    });
                }

                const activeRequests = isPostGetMode
                    ? (dataset.postOnly ? [postRequest] : [postRequest, getRequest])
                    : [postRequest, consolidatePostRequest];

                Promise.allSettled(activeRequests)
                    .then(results => {
                        const [postResult, secondaryResult] = results;

                        // Parse JSON responses while preserving raw text fallback
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

                            return {};
                        };

                        // Normalize fulfilled and rejected requests into one response shape
                        const normalizeResult = (result) => {
                            if (!result) {
                                return {
                                    response: null,
                                    statusCode: null,
                                    body: {}
                                };
                            }

                            if (result.status === 'fulfilled') {
                                return {
                                    response: result.value,
                                    statusCode: result.value.status,
                                    body: parseResponseData(result.value)
                                };
                            }

                            const errorResponse = result.reason?.response;
                            return {
                                response: errorResponse || null,
                                statusCode: errorResponse?.status || null,
                                body: errorResponse ? parseResponseData(errorResponse) : { message: result.reason?.message || 'Request failed' }
                            };
                        };

                        const postInfo = normalizeResult(postResult);
                        const secondaryInfo = normalizeResult(secondaryResult);

                        addContext(this, {
                            title: 'Primary Response Details',
                            value: {
                                URL: postBaseUrl + '/api/ListAllergySubstanceClasses',
                                Method: 'POST',
                                Status: postInfo.statusCode,
                                Body: redactToken(postInfo.body)
                            }
                        });

                        if (!dataset.postOnly || isPostPostMode) {
                            addContext(this, {
                                title: 'Secondary Response Details',
                                value: {
                                    URL: isPostGetMode
                                        ? getBaseUrl + getPath
                                        : consolidatePostBaseUrl + '/api/ListAllergySubstanceClasses',
                                    Method: isPostGetMode ? 'GET' : 'POST',
                                    Status: secondaryInfo.statusCode,
                                    Body: redactToken(secondaryInfo.body)
                                }
                            });
                        }

                        try {
                            if (!postInfo.response) {
                                throw new Error('The cert POST response is undefined');
                            }

                            expect(postInfo.statusCode, 'Cert POST status').to.equal(dataset.expectedStatus);

                            if (!dataset.postOnly && !secondaryInfo.response) {
                                throw new Error('The secondary response is undefined');
                            }

                            if (isPostGetMode && !dataset.postOnly) {
                                expect(secondaryInfo.statusCode, 'GET status').to.equal(dataset.expectedStatus);
                            }

                            if (isPostPostMode) {
                                expect(secondaryInfo.statusCode, 'Consolidate POST status').to.equal(dataset.expectedStatus);
                            }

                            if (dataset.expectedError) {
                                expect(postInfo.body, 'Cert POST error body').to.deep.include(dataset.expectedError);
                                if (isPostPostMode) {
                                    expect(secondaryInfo.body, 'Consolidate POST error body').to.deep.include(dataset.expectedError);
                                }
                            }

                            if (dataset.expectedStatus === 200) {
                                // Sort both response objects and calculate field-level differences
                                const primarySorted = testdataGlobal.Sorting_Objects(postInfo.body || {});
                                const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body || {});
                                const differencesObject = testdataGlobal.JSON_Differences(primarySorted, secondarySorted);

                                addContext(this, {
                                    title: 'Comparison Difference',
                                    value: testdataGlobal.Differences_Table(redactToken(differencesObject))
                                });

                                expect(JSON.stringify(differencesObject)).to.be.equal('null');
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

