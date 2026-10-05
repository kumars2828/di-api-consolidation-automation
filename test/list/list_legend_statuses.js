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

describe('list_legend_statuses ', function () {
    const environment_1 = 'cert_containerized';
    const environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_LEGEND_STATUSES_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';
    let primaryToken;
    let secondaryToken;

    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_LEGEND_STATUSES_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
        }
        primaryToken = await testdataGlobal.Access_Token_Generator(environment_1);
        if (!primaryToken) throw new Error('Cert access token is empty');
        if (isPostPostMode) {
            secondaryToken = await testdataGlobal.Access_Token_Generator(environment_2);
            if (!secondaryToken) throw new Error('Consolidate access token is empty');
        }
    });

    // Test Scenarios
    describe('list_legend_statuses - Returns all of Gold Standard Rx and OTC statuses, along with their internal identifiers.', function () {

        // Loop through all ListLegendStatuses_dataObjects
        [...Object.entries(list.ListLegendStatuses_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListLegendStatuses`, function (done) {
                // Map each POST payload with the token for its own host.
                const primaryBody = testdataGlobal.Mapping_Json67({ [datasetName]: dataset }, primaryToken);
                const secondaryBody = isPostPostMode
                    ? testdataGlobal.Mapping_Json67({ [datasetName]: dataset }, secondaryToken)
                    : null;
                if (!primaryBody || (isPostPostMode && !secondaryBody)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve independent hosts and the fixed Knowledge route.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);
                const getPath = get_query.ListLegendStatuses_GetPath();

                // Build only the requests for the selected comparison mode.
                const primaryRequest = chai.request(postBaseUrl)
                    .post('/api/ListLegendStatuses')
                    .set('Content-Type', 'application/json')
                    .send(primaryBody);
                const secondaryRequest = isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : chai.request(consolidatePostBaseUrl)
                        .post('/api/ListLegendStatuses')
                        .set('Content-Type', 'application/json')
                        .send(secondaryBody);

                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: { URL: postBaseUrl + '/api/ListLegendStatuses', Method: 'POST', Headers: { 'Content-Type': 'application/json' }, Body: primaryBody }
                });
                addContext(this, isPostGetMode ? {
                    title: 'Request URL for Secondary Call',
                    value: { URL: getBaseUrl + getPath, Method: 'GET', Headers: { 'Content-Type': 'application/json' } }
                } : {
                    title: 'Request Body for Secondary Call',
                    value: { URL: consolidatePostBaseUrl + '/api/ListLegendStatuses', Method: 'POST', Headers: { 'Content-Type': 'application/json' }, Body: secondaryBody }
                });

                // Parse JSON responses while retaining non-JSON response text.
                const parseResponse = (response) => {
                    if (response.body && typeof response.body === 'object' && Object.keys(response.body).length) return response.body;
                    if (response.text) {
                        try { return JSON.parse(response.text); } catch { return response.text; }
                    }
                    return {};
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
                        value: { URL: postBaseUrl + '/api/ListLegendStatuses', Method: 'POST', Status: primary.status, Body: redactToken(primary.body) }
                    });
                    addContext(this, {
                        title: 'Secondary Response Details',
                        value: {
                            URL: isPostGetMode ? getBaseUrl + getPath : consolidatePostBaseUrl + '/api/ListLegendStatuses',
                            Method: isPostGetMode ? 'GET' : 'POST', Status: secondary.status, Body: redactToken(secondary.body)
                        }
                    });

                    // Sort both responses and report their differences before asserting.
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
                        done(new Error(`Failed to compare ListLegendStatuses responses: ${error.message}`));
                    }
                }).catch(error => done(new Error(`Failed to process ListLegendStatuses responses: ${error.message}`)));

            }).timeout(120000);
        });

    });

});

