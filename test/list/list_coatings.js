import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import addContext from 'mochawesome/addContext.js';
import access_token from '../../testdata/access_token.js';
import list from '../../testdata/testdata-common/list.js';
import testdataGlobal from '../../testdata/testdata-global.js';
import config from '../../utilities/config.js';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

describe('list_coatings ', function () {

    // Generate Access Tokens - Based on the Environment during Runtime

    var environment_1 = 'cert_containerized';
    var environment_2 = 'consolidate';
    const runMode = (process.env.LIST_COATINGS_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';

    before(async function () {
        this.timeout(40000);
        try {
            if (!isPostGetMode && !isPostPostMode) {
                throw new Error(`Invalid LIST_COATINGS_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
            }

            //Assiging the Tokens generated for the environments to a global variables
            access_token.cert_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);
            if (isPostPostMode) {
                access_token.consolidate_token = await testdataGlobal.Access_Token_Generator(environment_2);
            }

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });

    // Test Scenarios
    describe('list_coatings - Returns a list of all oral solid dosage form coatings used in the Gold Standard Drug Database, along with their internal identifiers', function () {

        // Loop through all ListCoatings_dataObjects
        [...Object.entries(list.ListCoatings_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListCoatings`, function (done) {

                // Runtime usage
                const mappedData_Post = testdataGlobal.Mapping_Json49({ [datasetName]: dataset }, access_token.cert_containerized_token);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json49({ [datasetName]: dataset }, access_token.consolidate_token)
                    : null;

                // If the mapping failed, terminate the test
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                const postEnv = config.cert_env;
                const getEnv = config.cert_new_env;
                const postPath = '/api//ListCoatings';
                const getPath = '/api/list/coating';
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate();
                const consolidatePostPath = '/api/ListCoatings';

                // Create request objects for both calls
                const postRequest = chai.request(postBaseUrl)
                    .post(postPath)
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);

                const getRequest = isPostGetMode
                    ? chai.request(getBaseUrl)
                        .get(getPath)
                        .set('Content-Type', 'application/json')
                    : null;

                const consolidatePostRequest = isPostPostMode
                    ? chai.request(consolidatePostBaseUrl)
                        .post(consolidatePostPath)
                        .set('Content-Type', 'application/json')
                        .send(mappedData_Post_Consolidate)
                    : null;

                // Add request details to Mochawesome report in JSON format
                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: {
                        URL: postBaseUrl + postPath,
                        Method: 'POST',
                        Headers: {
                            'Content-Type': 'application/json'
                        },
                        Body: mappedData_Post
                    }
                });

                if (isPostGetMode) {
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
                }

                if (isPostPostMode) {
                    addContext(this, {
                        title: 'Request Body for Secondary Call',
                        value: {
                            URL: consolidatePostBaseUrl + consolidatePostPath,
                            Method: 'POST',
                            Headers: {
                                'Content-Type': 'application/json'
                            },
                            Body: mappedData_Post_Consolidate
                        }
                    });
                }

                const activeRequests = isPostGetMode
                    ? [postRequest, getRequest]
                    : [postRequest, consolidatePostRequest];

                Promise.allSettled(activeRequests)
                    .then(results => {
                        const [postResult, secondaryResult] = results;

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

                        const normalizeResult = (result) => {
                            if (result.status === 'fulfilled') {
                                return {
                                    response: result.value,
                                    statusCode: result.value.status,
                                    body: parseResponseData(result.value),
                                    error: null
                                };
                            }

                            const errorResponse = result.reason?.response;
                            const errorBody = errorResponse ? parseResponseData(errorResponse) : { error: result.reason?.message || 'Request failed' };

                            return {
                                response: errorResponse || null,
                                statusCode: errorResponse?.status || null,
                                body: errorBody,
                                error: result.reason || null
                            };
                        };

                        const postInfo = normalizeResult(postResult);
                        const secondaryInfo = normalizeResult(secondaryResult);

                        addContext(this, {
                            title: 'Primary Response Details',
                            value: {
                                URL: postBaseUrl + postPath,
                                Method: 'POST',
                                Status: postInfo.statusCode,
                                Body: postInfo.body,
                                Error: postInfo.error ? String(postInfo.error.message || postInfo.error) : null
                            }
                        });

                        if (isPostGetMode) {
                            addContext(this, {
                                title: 'Secondary Response Details',
                                value: {
                                    URL: getBaseUrl + getPath,
                                    Method: 'GET',
                                    Status: secondaryInfo.statusCode,
                                    Body: secondaryInfo.body,
                                    Error: secondaryInfo.error ? String(secondaryInfo.error.message || secondaryInfo.error) : null
                                }
                            });
                        }

                        if (isPostPostMode) {
                            addContext(this, {
                                title: 'Secondary Response Details',
                                value: {
                                    URL: consolidatePostBaseUrl + consolidatePostPath,
                                    Method: 'POST',
                                    Status: secondaryInfo.statusCode,
                                    Body: secondaryInfo.body,
                                    Error: secondaryInfo.error ? String(secondaryInfo.error.message || secondaryInfo.error) : null
                                }
                            });
                        }

                        try {
                            // Check if responses are valid
                            if (!postInfo.response || !secondaryInfo.response) {
                                throw new Error('One of the responses is undefined');
                            }

                            if (isPostGetMode && (postInfo.statusCode !== 200 || secondaryInfo.statusCode !== 200)) {
                                throw new Error(
                                    `Unexpected status code(s). POST(${postBaseUrl}${postPath}): ${postInfo.statusCode}, GET(${getBaseUrl}${getPath}): ${secondaryInfo.statusCode}`
                                );
                            }

                            if (isPostPostMode && (postInfo.statusCode !== 200 || secondaryInfo.statusCode !== 200)) {
                                throw new Error(
                                    `Unexpected status code(s). POST(${postBaseUrl}${postPath}): ${postInfo.statusCode}, POST(${consolidatePostBaseUrl}${consolidatePostPath}): ${secondaryInfo.statusCode}`
                                );
                            }

                            const primarySorted = testdataGlobal.Sorting_Objects(postInfo.body || {});
                            const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body || {});
                            const comparisonDiff = JSON.stringify(testdataGlobal.JSON_Differences(primarySorted, secondarySorted), null, 2);
                            expect(comparisonDiff).to.be.equal('null');

                            if (isPostGetMode) {
                                addContext(this, {
                                    title: 'Comparison Result for - ListCoatings (POST vs GET)',
                                    value: {
                                        'POST Endpoint': postBaseUrl + postPath,
                                        'GET Endpoint': getBaseUrl + getPath,
                                        'Comparison Difference': comparisonDiff
                                    }
                                });
                            }

                            if (isPostPostMode) {
                                addContext(this, {
                                    title: 'Comparison Result for - ListCoatings (POST Cert vs POST Consolidate)',
                                    value: {
                                        'CERT POST Endpoint': postBaseUrl + postPath,
                                        'Consolidate POST Endpoint': consolidatePostBaseUrl + consolidatePostPath,
                                        'Comparison Difference': comparisonDiff
                                    }
                                });
                            }

                            done();
                        } catch (err) {
                            // Report Generated if the responses are not identical
                            const errorContext = {
                                Mode: runMode,
                                'POST Endpoint': postBaseUrl + postPath,
                                'POST Status': postInfo.statusCode,
                                'POST Error': postInfo.error ? String(postInfo.error.message || postInfo.error) : null
                            };

                            if (isPostGetMode) {
                                errorContext['GET Endpoint'] = getBaseUrl + getPath;
                                errorContext['GET Status'] = secondaryInfo.statusCode;
                                errorContext['GET Error'] = secondaryInfo.error ? String(secondaryInfo.error.message || secondaryInfo.error) : null;
                                errorContext['POST vs GET Comparison Difference'] = JSON.stringify(
                                    testdataGlobal.JSON_Differences(
                                        testdataGlobal.Sorting_Objects(postInfo.body || {}),
                                        testdataGlobal.Sorting_Objects(secondaryInfo.body || {})
                                    ),
                                    null,
                                    2
                                );
                            }

                            if (isPostPostMode) {
                                errorContext['Consolidate POST Endpoint'] = consolidatePostBaseUrl + consolidatePostPath;
                                errorContext['Consolidate POST Status'] = secondaryInfo.statusCode;
                                errorContext['Consolidate POST Error'] = secondaryInfo.error ? String(secondaryInfo.error.message || secondaryInfo.error) : null;
                                errorContext['POST vs POST Comparison Difference'] = JSON.stringify(
                                    testdataGlobal.JSON_Differences(
                                        testdataGlobal.Sorting_Objects(postInfo.body || {}),
                                        testdataGlobal.Sorting_Objects(secondaryInfo.body || {})
                                    ),
                                    null,
                                    2
                                );
                            }

                            addContext(this, {
                                title: 'Error',
                                value: errorContext
                            });
                            done(new Error(`Failed to compare the responses - ${err}`));
                        }
                    })
                    .catch(err => {
                        done(err);
                    });

            }).timeout(900000);
        });

    });

});

