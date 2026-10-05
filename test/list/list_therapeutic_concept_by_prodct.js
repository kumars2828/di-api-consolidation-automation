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

describe('list_therapeutic_concept_by_prodct ', function () {

    const environment_1 = 'cert_containerized';
    const environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_THERAPEUTIC_CONCEPT_BY_PRODUCT_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';
    let secondaryToken;

    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_THERAPEUTIC_CONCEPT_BY_PRODUCT_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
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
    describe('list_therapeutic_concept_by_prodct- Returns all therapeutic concept tree locations in which this product is classified', function () {

        // Loop through all ListTherapeuticConceptByProduct_dataObjects
        [...Object.entries(list.ListTherapeuticConceptByProdct_dataObjects)].forEach(([datasetName, dataset]) => {

            it(`${datasetName} - Generate all list in ListTherapeuticConceptByProduct [critical]`, function (done) {

                // Map each POST payload with its own environment's token.
                const token = dataset.tokenType === 'invalid' ? 'ten' : access_token.cert_containerized_token;
                const consolidateToken = dataset.tokenType === 'invalid' ? 'ten' : secondaryToken;
                const mappedData_Post = testdataGlobal.Mapping_Json22({ [datasetName]: dataset }, token);
                const mappedData_Post_Consolidate = isPostPostMode
                    ? testdataGlobal.Mapping_Json22({ [datasetName]: dataset }, consolidateToken)
                    : null;
                if (!mappedData_Post || (isPostPostMode && !mappedData_Post_Consolidate)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve the three supplied hosts and the static GET route independently.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);
                const runSecondary = isPostPostMode || !dataset.postOnly;
                const getPath = isPostGetMode && runSecondary
                    ? get_query.ListTherapeuticConceptByProduct_GetPath(dataset)
                    : null;

                // Create only the requests needed by the selected comparison mode.
                const postRequest = chai.request(postBaseUrl)
                    .post('/api/ListTherapeuticConceptByProduct')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Post);
                const secondaryRequest = !runSecondary ? null : isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : chai.request(consolidatePostBaseUrl)
                        .post('/api/ListTherapeuticConceptByProduct')
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
                        URL: postBaseUrl + '/api/ListTherapeuticConceptByProduct',
                        Method: 'POST',
                        Headers: { 'Content-Type': 'application/json' },
                        Body: mappedData_Post
                    }
                });
                if (runSecondary) addContext(this, isPostGetMode ? {
                    title: 'Request URL for Secondary Call',
                    value: {
                        URL: getBaseUrl + getPath,
                        Method: 'GET',
                        Headers: { 'Content-Type': 'application/json' }
                    }
                } : {
                    title: 'Request Body for Secondary Call',
                    value: {
                        URL: consolidatePostBaseUrl + '/api/ListTherapeuticConceptByProduct',
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
                    const [postResult, secondaryResult] = await Promise.allSettled(
                        secondaryRequest ? [postRequest, secondaryRequest] : [postRequest]
                    );
                    const postInfo = normalizeResult(postResult);
                    const secondaryInfo = secondaryResult ? normalizeResult(secondaryResult) : null;

                    if (secondaryInfo) addContext(this, {
                        title: 'Primary Response Details',
                        value: {
                            URL: postBaseUrl + '/api/ListTherapeuticConceptByProduct',
                            Method: 'POST',
                            Status: postInfo.statusCode,
                            Body: redactToken(postInfo.body)
                        }
                    });
                    addContext(this, {
                        title: 'Secondary Response Details',
                        value: {
                            URL: isPostGetMode ? getBaseUrl + getPath : consolidatePostBaseUrl + '/api/ListTherapeuticConceptByProduct',
                            Method: isPostGetMode ? 'GET' : 'POST',
                            Status: secondaryInfo.statusCode,
                            Body: redactToken(secondaryInfo.body)
                        }
                    });

                    const expectedPostStatus = dataset.expectedPostStatus ?? dataset.expectedStatus;
                    const expectedSecondaryStatus = isPostGetMode
                        ? dataset.expectedGetStatus ?? dataset.expectedStatus
                        : dataset.expectedConsolidateStatus ?? dataset.expectedStatus;
                    const failures = [];
                    const check = (assertion) => {
                        try { assertion(); } catch (error) { failures.push(error.message); }
                    };
                    check(() => expect(postInfo.statusCode, `POST ${postBaseUrl}/api/ListTherapeuticConceptByProduct`).to.equal(expectedPostStatus));
                    if (secondaryInfo) check(() => expect(secondaryInfo.statusCode, isPostGetMode
                        ? `GET ${getBaseUrl}${getPath}`
                        : `POST ${consolidatePostBaseUrl}/api/ListTherapeuticConceptByProduct`).to.equal(expectedSecondaryStatus));
                    if (dataset.expectedError) {
                        check(() => expect(postInfo.body).to.deep.include(dataset.expectedError));
                        if (secondaryInfo) check(() => expect(secondaryInfo.body).to.deep.include(dataset.expectedError));
                    }

                    if (secondaryInfo && expectedPostStatus === 200 && expectedSecondaryStatus === 200
                        && postInfo.statusCode === 200 && secondaryInfo.statusCode === 200) {
                        const postSorted = testdataGlobal.Sorting_Objects(postInfo.body);
                        const secondarySorted = testdataGlobal.Sorting_Objects(secondaryInfo.body);
                        const differencesObject = testdataGlobal.JSON_Differences(postSorted, secondarySorted);
                        addContext(this, {
                            title: 'Comparison Difference',
                            value: testdataGlobal.Differences_Table(redactToken(differencesObject))
                        });
                        check(() => expect(differencesObject).to.be.null);
                    }
                    if (failures.length) throw new Error(failures.join('; '));
                })().then(() => done(), (error) => done(new Error(`Failed to compare the responses - ${error}`)));
            }).timeout(120000);
        });

    });

});

