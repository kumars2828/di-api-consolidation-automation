import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import addContext from 'mochawesome/addContext.js';
import testdataGlobal from '../../testdata/testdata-global.js';
import config from '../../utilities/config.js';
import list from '../../testdata/testdata-common/list.js';
import access_token from '../../testdata/access_token.js';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

describe('list_ags_beers_strength_of_recommend ', function () {

    // Generate Access Tokens - Based on the Environment during Runtime

    var environment_1 =  process.env.SELCTED_ENV1 == 'PROD' ? 'prod_containerized' : 'prod_staging';
    var environment_2 =  process.env.SELCTED_ENV2 == 'STAGING' ? 'prod_staging' : 'cert_containerized';

    before(async function () {
        this.timeout(40000);
        try {

            //Assiging the Tokens generated for the environments to a global variables
            access_token.staging_containerized_token = await testdataGlobal.Access_Token_Generator(environment_1);
            access_token.prod_containerized_token = await testdataGlobal.Access_Token_Generator(environment_2);

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });

    // Test Scenarios
    describe('list_ags_beers_strength_of_recommend - Returns a list of AGS BEERs strength of recommendation statements for Potentially Inappropriate Medications (PIMs), along with their internal identifiers.', function () {

        // Loop through all ListAGSBeersStrengthOfRecommendation_dataObjects
        [...Object.entries(list.ListAGSBeersStrengthOfRecommendation_dataObjects)].forEach(([datasetName, dataset]) => { 

            it(`${datasetName} - Generate all list in ListAGSBeersStrengthOfRecommendation`, function (done) {

                // Runtime usage
                const mappedData_Prod = JSON.stringify(testdataGlobal.Mapping_Json45({ [datasetName]: dataset }, access_token.prod_containerized_token), null, 2);
                const mappedData_nonProd = JSON.stringify(testdataGlobal.Mapping_Json45({ [datasetName]: dataset }, access_token.staging_containerized_token), null, 2);

                // If the mapping failed, terminate the test
                if (!mappedData_Prod || !mappedData_nonProd) {
                    done(new Error(`Mapping for dataset ${datasetName} failed: dataset is null or undefined`));
                    return;
                }

                // Applicable Environments Selection - cert/stage/prod in config file
                const OldprodEnv = config.prod_staging_env;
                const NewprodEnv = config.prod_old_env;

                // Create request objects for both environments
                const certRequest = chai.request(testdataGlobal.Endpoint_Url(OldprodEnv))
                    .post('/v1/api/ListAGSBeersStrengthOfRecommendation')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_nonProd);

                const prodRequest = chai.request(testdataGlobal.Endpoint_Url(NewprodEnv))
                    .post('/api/ListAGSBeersStrengthOfRecommendation')
                    .set('Content-Type', 'application/json')
                    .send(mappedData_Prod);

                // Add request details to Mochawesome report in JSON format
                addContext(this, {
                    title: 'Request Body for Staging Environment',
                    value: {
                        URL: testdataGlobal.Endpoint_Url(OldprodEnv) + '/v1/api/ListAGSBeersStrengthOfRecommendation',
                        Method: 'POST',
                        Headers: {
                            'Content-Type': 'application/json'
                        },
                        Body: JSON.parse(mappedData_nonProd) // Parse and pretty-print the request body as JSON
                    }
                });

                addContext(this, {
                    title: 'Request Body for Production Environment',
                    value: {
                        URL: testdataGlobal.Endpoint_Url(NewprodEnv) + '/api/ListAGSBeersStrengthOfRecommendation',
                        Method: 'POST',
                        Headers: {
                            'Content-Type': 'application/json'
                        },
                        Body: JSON.parse(mappedData_Prod) // Parse and pretty-print the request body as JSON
                    }
                });

                // Handle both requests
                Promise.all([certRequest, prodRequest])
                    .then(responses => {
                        const [certResponse, prodResponse] = responses;

                        try {
                            // Check if responses are valid
                            if (!certResponse || !prodResponse) {
                                throw new Error('One of the responses is undefined');
                            }

                            // Ensure response bodies are valid JSON
                            testdataGlobal.certData = JSON.parse(certResponse.text);
                            testdataGlobal.prodData = JSON.parse(prodResponse.text);

                            // Common Assertions 
                            expect(certResponse).to.have.status(200);
                            expect(prodResponse).to.have.status(200);
                            expect(testdataGlobal.certData).to.be.an('object');
                            expect(testdataGlobal.prodData).to.be.an('object');

                            // Sort the responses - Alphabetically
                            testdataGlobal.certDataSorted = testdataGlobal.Sorting_Objects(testdataGlobal.certData);
                            testdataGlobal.prodDataSorted = testdataGlobal.Sorting_Objects(testdataGlobal.prodData);

                            // Comparison - CERT vs PROD Response
                            const differences = JSON.stringify(testdataGlobal.JSON_Differences(testdataGlobal.certDataSorted, testdataGlobal.prodDataSorted), null, 2);
                            expect(differences).to.be.equal('null');
                            
                            
                            // Report Generated if the responses are identical
                            addContext(this, {
                                title: 'Comparison Result for - ListAGSBeersStrengthOfRecommendation',
                                value: {
                                    'CERT Endpoint': testdataGlobal.Endpoint_Url(OldprodEnv) + '/v1/api/ListAGSBeersStrengthOfRecommendation',
                                    'CERT Response': testdataGlobal.certData,
                                    'PROD Endpoint': testdataGlobal.Endpoint_Url(NewprodEnv) + '/api/ListAGSBeersStrengthOfRecommendation',
                                    'PROD Response': testdataGlobal.prodData,
                                    'Comparison Difference': differences
                                }
                            });

                            done();
                        } catch (err) {
                            done(new Error(`Failed to compare the responses - ${err}`));
                            // Report Generated if the responses are not identical
                            addContext(this, {
                                title: 'Error',
                                value: {
                                    'CERT Endpoint': testdataGlobal.Endpoint_Url(OldprodEnv) + '/v1/api/ListAGSBeersStrengthOfRecommendation',
                                    'CERT Response': testdataGlobal.certData,
                                    'PROD Endpoint': testdataGlobal.Endpoint_Url(NewprodEnv) + '/api/ListAGSBeersStrengthOfRecommendation',
                                    'PROD Response': testdataGlobal.prodData,
                                    'Comparison Difference': JSON.stringify(testdataGlobal.JSON_Differences(testdataGlobal.certDataSorted, testdataGlobal.prodDataSorted), null, 2)
                                }
                            });
                            addContext(this, JSON.stringify(testdataGlobal.JSON_Differences(testdataGlobal.certDataSorted, testdataGlobal.prodDataSorted), null, 2));
                        }
                    })
                    .catch(err => {
                        done(err);
                    });

            }).timeout(120000);
        });

    });

});

