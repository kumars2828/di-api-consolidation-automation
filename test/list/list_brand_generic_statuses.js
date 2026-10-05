import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import addContext from 'mochawesome/addContext.js';
import testdataGlobal from '../../testdata/testdata-global.js';
import config from '../../utilities/config.js';
import get_query from '../../utilities/query-builders/get_query.js';
import list from '../../testdata/testdata-common/list.js';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

describe('list_brand_generic_statuses ', function () {
    const environment_1 = 'cert_containerized';
    const environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_BRAND_GENERIC_STATUSES_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';
    let primaryToken;
    let secondaryToken;

    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_BRAND_GENERIC_STATUSES_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
        }
        primaryToken = await testdataGlobal.Access_Token_Generator(environment_1);
        if (!primaryToken) throw new Error('Cert access token is empty');
        if (isPostPostMode) {
            secondaryToken = await testdataGlobal.Access_Token_Generator(environment_2);
            if (!secondaryToken) throw new Error('Consolidate access token is empty');
        }
    });

    // Test Scenarios
    describe('list_brand_generic_statuses - Returns a list of all brand and generic statuses in the Gold Standard Drug Database, along with their internal identifiers', function () {

        // Loop through all ListBrandGenericStatuses_dataObjects
        [...Object.entries(list.ListBrandGenericStatuses_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListBrandGenericStatuses`, function (done) {
                // Map each POST body with the token for its own host.
                const primaryBody = testdataGlobal.Mapping_Json48({ [datasetName]: dataset }, primaryToken);
                const secondaryBody = isPostPostMode
                    ? testdataGlobal.Mapping_Json48({ [datasetName]: dataset }, secondaryToken)
                    : null;
                if (!primaryBody || (isPostPostMode && !secondaryBody)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve the supplied hosts and static Knowledge path independently.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);
                const getPath = get_query.ListBrandGenericStatuses_GetPath();

                // Issue the primary POST and only the selected secondary request.
                const primaryRequest = chai.request(postBaseUrl)
                    .post('/api/ListBrandGenericStatuses')
                    .set('Content-Type', 'application/json')
                    .send(primaryBody);
                const secondaryRequest = isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : chai.request(consolidatePostBaseUrl)
                        .post('/api/ListBrandGenericStatuses')
                        .set('Content-Type', 'application/json')
                        .send(secondaryBody);

                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: { URL: postBaseUrl + '/api/ListBrandGenericStatuses', Method: 'POST', Headers: { 'Content-Type': 'application/json' }, Body: primaryBody }
                });
                addContext(this, isPostGetMode ? {
                    title: 'Request URL for Secondary Call',
                    value: { URL: getBaseUrl + getPath, Method: 'GET', Headers: { 'Content-Type': 'application/json' } }
                } : {
                    title: 'Request Body for Secondary Call',
                    value: { URL: consolidatePostBaseUrl + '/api/ListBrandGenericStatuses', Method: 'POST', Headers: { 'Content-Type': 'application/json' }, Body: secondaryBody }
                });

                // Parse JSON when available and preserve other response payloads.
                const parseResponse = (response) => {
                    if (response.body && typeof response.body === 'object' && Object.keys(response.body).length) return response.body;
                    if (response.text) {
                        try { return JSON.parse(response.text); } catch { return response.text; }
                    }
                    return response.body ?? {};
                };

                // Normalize fulfilled and rejected calls for consistent reporting.
                const normalize = (result) => {
                    const response = result.status === 'fulfilled' ? result.value : result.reason?.response;
                    return { response, status: response?.status ?? null, body: response ? parseResponse(response) : {} };
                };
                const redactToken = (value) => {
                    if (Array.isArray(value)) return value.map(redactToken);
                    if (value && typeof value === 'object') {
                        return Object.fromEntries(Object.entries(value).map(([key, entry]) =>
                            [key, /^(AccessToken|Authorization)$/i.test(key) ? '[REDACTED]' : redactToken(entry)]));
                    }
                    if (typeof value === 'string') {
                        return [primaryToken, secondaryToken].filter(Boolean).reduce((text, token) => text.replaceAll(token, '[REDACTED]'), value);
                    }
                    return value;
                };

                Promise.allSettled([primaryRequest, secondaryRequest]).then(results => {
                    const primary = normalize(results[0]);
                    const secondary = normalize(results[1]);
                    addContext(this, {
                        title: 'Primary Response Details',
                        value: { URL: postBaseUrl + '/api/ListBrandGenericStatuses', Method: 'POST', Status: primary.status, Body: redactToken(primary.body) }
                    });
                    addContext(this, {
                        title: 'Secondary Response Details',
                        value: {
                            URL: isPostGetMode ? getBaseUrl + getPath : consolidatePostBaseUrl + '/api/ListBrandGenericStatuses',
                            Method: isPostGetMode ? 'GET' : 'POST', Status: secondary.status, Body: redactToken(secondary.body)
                        }
                    });

                    // Sort both responses and record differences before asserting.
                    const differencesObject = testdataGlobal.JSON_Differences(
                        testdataGlobal.Sorting_Objects(primary.body), testdataGlobal.Sorting_Objects(secondary.body)
                    );
                    addContext(this, {
                        title: 'Comparison Difference',
                        value: testdataGlobal.Differences_Table(redactToken(differencesObject))
                    });

                    try {
                        expect(primary.response, 'Cert POST response').to.exist;
                        expect(secondary.response, 'Secondary response').to.exist;
                        expect(primary.status, 'Cert POST status').to.equal(200);
                        expect(secondary.status, 'Secondary status').to.equal(200);
                        expect(differencesObject === null, 'Response bodies match').to.equal(true);
                        done();
                    } catch (error) {
                        done(new Error(`Failed to compare ListBrandGenericStatuses responses: ${error.message}`));
                    }
                }).catch(error => done(new Error(`Failed to process ListBrandGenericStatuses responses: ${error.message}`)));

            }).timeout(120000);
        });

    });

});

