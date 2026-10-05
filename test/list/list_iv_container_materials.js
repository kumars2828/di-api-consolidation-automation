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

describe('list_iv_container_materials ', function () {
    const environment_1 = 'cert_containerized';
    const environment_2 = 'consolidate_cert';
    const runMode = (process.env.LIST_IV_CONTAINER_MATERIALS_RUN_MODE || 'POST_GET').toUpperCase();
    const isPostGetMode = runMode === 'POST_GET';
    const isPostPostMode = runMode === 'POST_POST';
    let primaryToken;
    let secondaryToken;

    before(async function () {
        this.timeout(40000);
        if (!isPostGetMode && !isPostPostMode) {
            throw new Error(`Invalid LIST_IV_CONTAINER_MATERIALS_RUN_MODE: ${runMode}. Use POST_GET or POST_POST.`);
        }
        primaryToken = await testdataGlobal.Access_Token_Generator(environment_1);
        if (!primaryToken) throw new Error('Cert access token is empty');
        if (isPostPostMode) {
            secondaryToken = await testdataGlobal.Access_Token_Generator(environment_2);
            if (!secondaryToken) throw new Error('Consolidate access token is empty');
        }
    });

    // Test Scenarios
    describe('list_iv_container_materials - Returns a list of all IV containers used in GSDD, along with their internal identifiers.', function () {

        // Loop through all ListIVContainerMaterials_dataObjects
        [...Object.entries(list.ListIVContainerMaterials_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListIVContainerMaterials`, function (done) {

                // Map POST bodies using each host's token.
                const primaryBody = testdataGlobal.Mapping_Json57({ [datasetName]: dataset }, primaryToken);
                const secondaryBody = isPostPostMode ? testdataGlobal.Mapping_Json57({ [datasetName]: dataset }, secondaryToken) : null;

                // If the mapping failed, terminate the test
                if (!primaryBody || (isPostPostMode && !secondaryBody)) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Resolve the three hosts and static GET path independently.
                const postEnv = config.cert_env;
                const getEnv = config.cert_staging_env;
                const postBaseUrl = testdataGlobal.Endpoint_Url_cert(postEnv);
                const getBaseUrl = testdataGlobal.Endpoint_Url_staging_knowledge(getEnv);
                const consolidatePostBaseUrl = testdataGlobal.Endpoint_Url_consolidate(environment_2);
                const getPath = get_query.ListIVContainerMaterials_GetPath();

                // Create primary POST and only the selected secondary call.
                const primaryRequest = chai.request(postBaseUrl)
                    .post('/api/ListIVContainerMaterials')
                    .set('Content-Type', 'application/json')
                    .send(primaryBody);
                const secondaryRequest = isPostGetMode
                    ? chai.request(getBaseUrl).get(getPath).set('Content-Type', 'application/json')
                    : chai.request(consolidatePostBaseUrl)
                        .post('/api/ListIVContainerMaterials')
                        .set('Content-Type', 'application/json')
                        .send(secondaryBody);

                addContext(this, {
                    title: 'Request Body for POST Call',
                    value: { URL: postBaseUrl + '/api/ListIVContainerMaterials', Method: 'POST', Headers: { 'Content-Type': 'application/json' }, Body: primaryBody }
                });

                addContext(this, isPostGetMode ? {
                    title: 'Request URL for Secondary Call',
                    value: { URL: getBaseUrl + getPath, Method: 'GET', Headers: { 'Content-Type': 'application/json' } }
                } : {
                    title: 'Request Body for Secondary Call',
                    value: { URL: consolidatePostBaseUrl + '/api/ListIVContainerMaterials', Method: 'POST', Headers: { 'Content-Type': 'application/json' }, Body: secondaryBody }
                });

                // Parse JSON when available and preserve other response payloads.
                const parseResponse = (response) => {
                    if (response.body && typeof response.body === 'object' && Object.keys(response.body).length) return response.body;
                    if (response.text) {
                        try { return JSON.parse(response.text); } catch { return response.text; }
                    }
                    return response.body ?? {};
                };

                // Normalize failed calls and redact tokens outside request contexts.
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
                        value: { URL: postBaseUrl + '/api/ListIVContainerMaterials', Method: 'POST', Status: primary.status, Body: redactToken(primary.body) }
                    });
                    addContext(this, {
                        title: 'Secondary Response Details',
                        value: {
                            URL: isPostGetMode ? getBaseUrl + getPath : consolidatePostBaseUrl + '/api/ListIVContainerMaterials',
                            Method: isPostGetMode ? 'GET' : 'POST', Status: secondary.status, Body: redactToken(secondary.body)
                        }
                    });

                    // Sort both responses and report differences before asserting.
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
                        done(new Error(`Failed to compare ListIVContainerMaterials responses: ${error.message}`));
                    }
                }).catch(error => done(new Error(`Failed to process ListIVContainerMaterials responses: ${error.message}`)));

            }).timeout(120000);
        });

    });

});

