import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import addContext from 'mochawesome/addContext.js';
import access_token from '../../testdata/access_token.js';
import list from '../../testdata/testdata-common/list.js';
import testdataGlobal from '../../testdata/testdata-global.js';
import config from '../../utilities/config.js';
import get_query from '../../utilities/query-builders/get_query.js';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

describe('list_warning_labels ', function () {

    // Generate Access Tokens - Based on the Environment during Runtime

    var environment_1 = 'cert_containerized';
    var environment_2 = 'consolidate';
    const runMode = (process.env.LIST_WARNING_LABELS_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';

    // This is the setup hook.
    // It generates access tokens before any test runs.
    // For POST_GET mode, only the cert token is needed.
    // For POST_POST mode, both cert and consolidate tokens are fetched.
    before(async function () {
        this.timeout(40000);
        try {
            if (!isPostGetMode && !isPostPostMode) {
                throw new Error(`Invalid LIST_WARNING_LABELS_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
            }

            access_token.staging_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);

            if (isPostPostMode) {
                access_token.consolidate_token = await testdataGlobal.Access_Token_Generator(environment_2);
            }

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });

    // This is the actual test scenario.
    // It loops through all dataset objects for ListWarningLabels and validates that
    // the POST response from cert matches the secondary response from either:
    // - GET response in staging
    // - or POST response in consolidate
    Object.entries(list.ListWarningLabels_dataObjects).forEach(([datasetName, dataset]) => {

        it(`${datasetName} - Generate all list in ListWarningLabels `, function (done) {

            // This maps the dataset into the exact request JSON expected by the API.
            // mappedData_Post = cert POST payload
            // mappedData_Post_Consolidate = consolidate POST payload
            const mappedData_Post = testdataGlobal.Mapping_Json118({ [datasetName]: dataset }, access_token.staging_containerized_token);
            const mappedData_Post_Consolidate = isPostPostMode
                ? testdataGlobal.Mapping_Json118({ [datasetName]: dataset }, access_token.consolidate_token)
                : null;

            // If mapping fails, stop the test immediately.
            if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                return;
            }

            // Build all endpoint URLs for the run mode.
            const postEnv = config.cert_env;
            const getEnv = config.cert_staging_env;
            const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
            const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
            const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate();

            const getPath = get_query.ListWarningLabels_GetPath(dataset);

            // This creates the actual HTTP request objects.
            // POST request to cert environment
            const postRequest = chai.request(postBaseUrl)
                .post('/api/ListWarningLabels')
                .set('Content-Type', 'application/json')
                .send(mappedData_Post);

            // GET request to staging environment
            const getRequest = isPostGetMode
                ? chai.request(getBaseUrl)
                    .get(getPath)
                    .set('Content-Type', 'application/json')
                : null;

            // POST request to consolidate environment
            const consolidatePostRequest = isPostPostMode
                ? chai.request(consolidatePostBaseUrl)
                    .post('/api/ListWarningLabels')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post_Consolidate)
                : null;

            // This adds details to Mochawesome reports, so logs show the exact request body and URL
            addContext(this, {
                title: 'Request Body for POST Call',
                value: {
                    URL: postBaseUrl + '/api/ListWarningLabels',
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

            // This executes both requests in parallel.
            // We wait for both responses before comparing them.
            const activeRequests = isPostGetMode
                ? [postRequest, getRequest]
                : [postRequest, consolidatePostRequest];

            Promise.allSettled(activeRequests)
                .then(results => {
                    const [postResult, secondaryResult] = results;

                    // This helper converts the HTTP response into a clean JSON object.
                    // If the server returns plain text, it tries to parse it as JSON.
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

                    // This normalizes the Promise result to a common object structure:
                    // response, statusCode, body, error
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

                    // Extract normalized post and secondary response data
                    const postInfo = normalizeResult(postResult);
                    const secondaryInfo = normalizeResult(secondaryResult);

                    // Log response details for reporting
                    addContext(this, {
                        title: 'POST Response Details',
                        value: {
                            URL: postBaseUrl + '/api/ListWarningLabels',
                            Method: 'POST',
                            Status: postInfo.statusCode,
                            Body: postInfo.body
                        }
                    });

                    if (isPostGetMode) {
                        addContext(this, {
                            title: 'Secondary Response Details',
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
                            title: 'Secondary Response Details',
                            value: {
                                URL: consolidatePostBaseUrl + '/api/ListWarningLabels',
                                Method: 'POST',
                                Status: secondaryInfo.statusCode,
                                Body: secondaryInfo.body
                            }
                        });
                    }

                    try {
                        // Validate the HTTP status before comparison
                        if (!postInfo.response || !secondaryInfo.response) {
                            throw new Error('One of the responses is undefined');
                        }

                        if (isPostGetMode) {
                            if (postInfo.statusCode !== 200 || secondaryInfo.statusCode !== 200) {
                                throw new Error(
                                    `Unexpected status code(s). POST(${postBaseUrl}/api/ListWarningLabels): ${postInfo.statusCode}, GET(${getBaseUrl}${getPath}): ${secondaryInfo.statusCode}`
                                );
                            }
                        }

                        if (isPostPostMode) {
                            if (postInfo.statusCode !== 200 || secondaryInfo.statusCode !== 200) {
                                throw new Error(
                                    `Unexpected status code(s). POST(${postBaseUrl}/api/ListWarningLabels): ${postInfo.statusCode}, POST(${consolidatePostBaseUrl}/api/ListWarningLabels): ${secondaryInfo.statusCode}`
                                );
                            }
                        }

                        // This normalizes both responses before comparing them.
                        // Sorting removes object-order issues and prevents false mismatches.
                        const primarySorted = testdataGlobal.Sorting_Objects(postInfo.body || {});
                        const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body || {});

                        // This finds field-level JSON differences.
                        // If both responses are identical, JSON_Differences returns null.
                        const differencesObject = testdataGlobal.JSON_Differences(primarySorted, secondarySorted);

                        addContext(this, {
                            title: 'Comparison Difference',
                            value: testdataGlobal.Differences_Table(differencesObject)
                        });

                        expect(JSON.stringify(differencesObject)).to.be.equal('null');

                        done();
                    } catch (err) {
                        done(new Error(`Failed to compare the responses - ${err}`));
                    }
                })
                .catch(err => {
                    done(err);
                });

            }).timeout(900000);
        });

    });


