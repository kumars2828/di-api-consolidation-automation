import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import addContext from 'mochawesome/addContext.js';
import access_token from '../../testdata/access_token.js';
import detail_dose from '../../testdata/testdata-common/detail_dose.js';
import testdataGlobal from '../../testdata/testdata-global.js';
import config from '../../utilities/config.js';
import get_query from '../../utilities/query-builders/get_query.js';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

describe('detail_product ', function () {

    // Generate Access Tokens - Based on the Environment during Runtime

    var environment_1 = 'cert_containerized';
    var environment_2 = 'consolidate';
    const runMode = (process.env.DETAIL_PRODUCT_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';

    before(async function () {
        this.timeout(40000);
        try {
            if (!isPostGetMode && !isPostPostMode) {
                throw new Error(`Invalid DETAIL_PRODUCT_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
            }

            //Assiging the Tokens generated for the environments to a global variables
            access_token.staging_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);
            if (isPostPostMode) {
                access_token.consolidate_token = await testdataGlobal.Access_Token_Generator(environment_2);
            }

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });

    // Test Scenarios
    describe('detail_product - This method returns all detailed product information for a supplied product identifier, including route of administration and dose form', function () {

        // Loop through all DetailProduct_dataObjects
         [...Object.entries(detail_dose.DetailProduct_dataObjects)].forEach(([datasetName, dataset]) => {
            
            it(`${datasetName} - Generate all Details in DetailProduct [critical] `, function (done) {

                // Runtime usage
                const mappedData_Post = testdataGlobal.Mapping_Json17({ [datasetName]: dataset }, access_token.staging_containerized_token);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json17({ [datasetName]: dataset }, access_token.consolidate_token)
                    : null;

                // If the mapping failed, terminate the test
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                const postEnv = config.cert_env;
                const getEnv = config.cert_new_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate();

                const getPath = get_query.DetailProduct_GetPath(mappedData_Post);

                // Create request objects for POST and GET calls on the same environment
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/DetailProduct')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);

                const getRequest = isPostGetMode
                    ? chai.request(getBaseUrl)
                        .get(getPath)
                        .set('Content-Type', 'application/json')
                    : null;

                const consolidatePostRequest = isPostPostMode
                    ? chai.request(consolidatePostBaseUrl)
                        .post('/api/DetailProduct')
                        .set('Content-Type', 'application/json')
                        .send(mappedData_Post_Consolidate)
                    : null;

                // Add request details to Mochawesome report in JSON format
                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: {
                        URL: postBaseUrl + '/api/DetailProduct',
                        Method: 'POST',
                        Headers: {
                            'Content-Type': 'application/json'
                        },
                        Body: mappedData_Post
                    }
                });

                if (isPostGetMode) {
                    addContext(this, {
                        title: 'Request URL for GET Call',
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
                        title: 'Request Body for Consolidate POST Call',
                        value: {
                            URL: consolidatePostBaseUrl + '/api/DetailProduct',
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
                            title: 'POST Response Details',
                            value: {
                                URL: postBaseUrl + '/api/DetailProduct',
                                Method: 'POST',
                                Status: postInfo.statusCode,
                                Body: postInfo.body,
                                Error: postInfo.error ? String(postInfo.error.message || postInfo.error) : null
                            }
                        });

                        if (isPostGetMode) {
                            addContext(this, {
                                title: 'GET Response Details',
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
                                title: 'Consolidate POST Response Details',
                                value: {
                                    URL: consolidatePostBaseUrl + '/api/DetailProduct',
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

                            if (isPostGetMode) {
                                if (postInfo.statusCode !== 200 || secondaryInfo.statusCode !== 200) {
                                    throw new Error(
                                        `Unexpected status code(s). POST(${postBaseUrl}/api/DetailProduct): ${postInfo.statusCode}, GET(${getBaseUrl}${getPath}): ${secondaryInfo.statusCode}`
                                    );
                                }
                            }

                            if (isPostPostMode) {
                                if (postInfo.statusCode !== 200 || secondaryInfo.statusCode !== 200) {
                                    throw new Error(
                                        `Unexpected status code(s). POST(${postBaseUrl}/api/DetailProduct): ${postInfo.statusCode}, POST(${consolidatePostBaseUrl}/api/DetailProduct): ${secondaryInfo.statusCode}`
                                    );
                                }
                            }

                            const primarySorted = testdataGlobal.Sorting_Objects(postInfo.body || {});
                            const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body || {});
                            const comparisonDiff = JSON.stringify(testdataGlobal.JSON_Differences(primarySorted, secondarySorted), null, 2);
                            expect(comparisonDiff).to.be.equal('null');

                            if (isPostGetMode) {
                                addContext(this, {
                                    title: 'Comparison Result for - DetailProduct (POST vs GET)',
                                    value: {
                                        'POST Endpoint': postBaseUrl + '/api/DetailProduct',
                                        'GET Endpoint': getBaseUrl + getPath,
                                        'Comparison Difference': comparisonDiff
                                    }
                                });
                            }

                            if (isPostPostMode) {
                                addContext(this, {
                                    title: 'Comparison Result for - DetailProduct (POST Cert vs POST Consolidate)',
                                    value: {
                                        'CERT POST Endpoint': postBaseUrl + '/api/DetailProduct',
                                        'Consolidate POST Endpoint': consolidatePostBaseUrl + '/api/DetailProduct',
                                        'Comparison Difference': comparisonDiff
                                    }
                                });
                            }

                            done();
                        } catch (err) {
                            // Report Generated if the responses are not identical
                            const errorContext = {
                                'Mode': runMode,
                                'POST Endpoint': postBaseUrl + '/api/DetailProduct',
                                'POST Response': postInfo.body,
                                'POST Status': postInfo.statusCode,
                                'POST Error': postInfo.error ? String(postInfo.error.message || postInfo.error) : null
                            };

                            if (isPostGetMode) {
                                errorContext['GET Endpoint'] = getBaseUrl + getPath;
                                errorContext['GET Response'] = secondaryInfo.body;
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
                                errorContext['Consolidate POST Endpoint'] = consolidatePostBaseUrl + '/api/DetailProduct';
                                errorContext['Consolidate POST Response'] = secondaryInfo.body;
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

            }).timeout(120000);
        });

    });

});
