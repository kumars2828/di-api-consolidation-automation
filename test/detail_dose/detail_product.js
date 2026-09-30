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

                // Map the dataset into the POST payload for cert (and consolidate, if POST_POST mode)
                const certToken = dataset.tokenType === 'invalid'
                    ? 'ten'
                    : access_token.staging_containerized_token;
                const consolidateToken = dataset.tokenType === 'invalid'
                    ? 'ten'
                    : access_token.consolidate_token;
                const mappedData_Post = testdataGlobal.Mapping_Json17({ [datasetName]: dataset }, certToken);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json17({ [datasetName]: dataset }, consolidateToken)
                    : null;

                // If the mapping failed, terminate the test
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Build the base URLs and GET path for the selected run mode
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate();

                const getPath = get_query.DetailProduct_GetPath(mappedData_Post);

                // Create request objects for POST and GET calls on the same environment
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/DetailProduct')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);

                const getRequest = isPostGetMode && !dataset.postOnly
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

                if (isPostGetMode && !dataset.postOnly) {
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
                    ? (dataset.postOnly ? [postRequest] : [postRequest, getRequest])
                    : [postRequest, consolidatePostRequest];

                Promise.allSettled(activeRequests)
                    .then(results => {
                        const [postResult, secondaryResult] = results;

                        // Convert a raw HTTP response into a plain JSON object
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

                        // Normalize a settled/rejected promise result into { response, statusCode, body, error }
                        const normalizeResult = (result) => {
                            if (!result) {
                                return {
                                    response: null,
                                    statusCode: null,
                                    body: {},
                                    error: null
                                };
                            }

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
                                Body: postInfo.body
                            }
                        });

                        if (isPostGetMode && !dataset.postOnly) {
                            addContext(this, {
                                title: 'GET Response Details',
                                value: {
                                    URL: getBaseUrl + getPath,
                                    Method: 'GET',
                                    Status: secondaryInfo.statusCode,
                                    Body: secondaryInfo.body
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
                                    Body: secondaryInfo.body
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
                                // Sort both bodies and diff them field by field
                                const primarySorted = testdataGlobal.Sorting_Objects(postInfo.body || {});
                                const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body || {});
                                const differencesObject = testdataGlobal.JSON_Differences(primarySorted, secondarySorted);

                                addContext(this, {
                                    title: 'Comparison Difference',
                                    value: testdataGlobal.Differences_Table(differencesObject)
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
