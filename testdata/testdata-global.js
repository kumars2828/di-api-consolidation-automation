import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chai from 'chai';
import commondata from './access_token.js';
const { expect, should } = chai;
should();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    baseUrl_cert: ".gsdd.net", //Prod endpoint
    baseUrl_staging: ".druginfo.elsevier.systems/api", //Staging endpoint
    baseUrl_staging_knowledge: ".druginfo.elsevier.systems", //Staging knowledge-route endpoint (no /api segment)
    request_header: "https://",

    // Declare Global Test Data Attributes
    certData: '',
    prodData: '',
    certDataSorted: '',
    prodDataSorted: '',

    // Base URL - Generator old
    Endpoint_Url_cert: function (Env) {
        return this.request_header + Env + this.baseUrl_cert;
    },

     // Base URL - Generator
    Endpoint_Url_staging: function (Env) {
        return this.request_header + Env + this.baseUrl_staging;
    },

    // Base URL - Generator for knowledge routes (e.g. /knowledge/product/detail)
    Endpoint_Url_staging_knowledge: function (Env) {
        return this.request_header + Env + this.baseUrl_staging_knowledge;
    },

    // Base URL - Consolidate environment
    Endpoint_Url_consolidate: function (env = 'consolidate') {
        const envConfig = this.environments[env];
        if (!envConfig) {
            throw new Error(`Invalid consolidate environment specified: ${env}`);
        }
        return envConfig.baseUrl;
    },

    // Environment configuration
    environments: {

        cert_containerized: {
            baseUrl: "https://cert-api.gsdd.net", // Cert Containerized endpoint
            access_token_url: "/auth/api/AccessToken",
            access_token_credentails: {
                Username: "NPotlapalli",
                Password: "dGVtcHBhc3M0MTI="
            }
        },

        prod_cert: {
            baseUrl: "https://prodcert-api.gsdd.net", // Cert prod  endpoint
            access_token_url: "/auth/api/AccessToken",
            access_token_credentails: {
                Username: "NPotlapalli",
                Password: "dGVtcHBhc3M0MTI="
            }
        },

        consolidate: {
            baseUrl: "https://api-consolidation.dev.gsdd.net",
            access_token_url: "/auth/api/AccessToken",
            access_token_credentails: {
                Username: "NPotlapalli",
                Password: "dGVtcHBhc3M0MTI="
            }
        },
    },

    // Access Token Generator
    Access_Token_Generator: function getAccessToken(env) {
        return new Promise((resolve, reject) => {
            // Select the environment configuration
            const envConfig = this.environments[env];
            if (!envConfig) {
                reject(new Error('Invalid environment specified'));
                return;
            }

            chai.request(envConfig.baseUrl)
                .post(envConfig.access_token_url)
                .set('Content-Type', 'application/json')
                .send(env === 'consolidate_cert'
                    ? this.environments.cert_containerized.access_token_credentails
                    : envConfig.access_token_credentails)
                .end((error, response) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                        return;
                    }
                    if (response) {
                        //   expect(response).to.have.status(200);
                        //   expect(response.statusCode).to.equal(200);
                        const accessToken = response.body.AccessToken;
                        resolve(accessToken);
                    } else {
                        console.error('Response is undefined');
                        reject(new Error('Response is undefined'));
                    }
                });
        });
    },

    // Date Validation
    Date_Validation: function (value) {
        const timestamp = Date.parse(value);
        return !isNaN(timestamp);
    },

    // Sorting Objects - Alphabetically
    Sorting_Objects: function sortObject(obj) {
        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(sortObject);
        }
        // Handle objects
        else if (obj !== null && typeof obj === 'object') {
            // Get all keys except '_links' and sort them
            const sortedKeys = Object.keys(obj)
                .filter(key => key !== '_links')
                .sort();

            // Create new object with sorted keys
            return sortedKeys.reduce((result, key) => {
                result[key] = sortObject(obj[key]);
                return result;
            }, {});
        }
        // Return primitive values as is
        return obj;
    },

    // Function for Identifying Difference Values
    JSON_Differences: function findJsonDifferences(obj1, obj2, path = '') {
        // If both objects are identical, return null
        if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
            return null;
        }

        let differences = {};

        // If one object is null/undefined and other isn't
        if (!obj1 || !obj2) {
            return {
                [path || 'root']: {
                    oldValue: obj1,
                    newValue: obj2
                }
            };
        }

        // Handle different types
        if (typeof obj1 !== typeof obj2) {
            return {
                [path || 'root']: {
                    oldValue: obj1,
                    newValue: obj2
                }
            };
        }

        // Handle arrays
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) {
                differences[path || 'root'] = {
                    oldValue: obj1,
                    newValue: obj2
                };
            } else {
                for (let i = 0; i < obj1.length; i++) {
                    const nestedDiff = findJsonDifferences(
                        obj1[i],
                        obj2[i],
                        path ? `${path}[${i}]` : `[${i}]`
                    );
                    if (nestedDiff) {
                        differences = { ...differences, ...nestedDiff };
                    }
                }
            }
            return Object.keys(differences).length > 0 ? differences : null;
        }

        // Handle objects
        if (typeof obj1 === 'object' && typeof obj2 === 'object') {
            const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

            for (const key of allKeys) {
                const currentPath = path ? `${path}.${key}` : key;

                if (!(key in obj1)) {
                    differences[currentPath] = {
                        oldValue: undefined,
                        newValue: obj2[key]
                    };
                } else if (!(key in obj2)) {
                    differences[currentPath] = {
                        oldValue: obj1[key],
                        newValue: undefined
                    };
                } else {
                    const nestedDiff = findJsonDifferences(obj1[key], obj2[key], currentPath);
                    if (nestedDiff) {
                        differences = { ...differences, ...nestedDiff };
                    }
                }
            }
            return Object.keys(differences).length > 0 ? differences : null;
        }

        // Handle primitive values
        if (obj1 !== obj2) {
            differences[path || 'root'] = {
                oldValue: obj1,
                newValue: obj2
            };
        }

        return Object.keys(differences).length > 0 ? differences : null;
    },

    // Renders a JSON_Differences() result as a readable "Field | Old Value | New Value" table
    Differences_Table: function formatDifferencesTable(diffObject) {
        if (!diffObject || Object.keys(diffObject).length === 0) {
            return 'No differences found';
        }

        const formatValue = (value) => {
            if (value === undefined) return '(missing)';
            if (value === null) return 'null';
            if (value === '') return '"" (empty string)';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value);
        };

        const rows = Object.entries(diffObject).map(([field, { oldValue, newValue }]) => {
            return `| ${field} | ${formatValue(oldValue)} | ${formatValue(newValue)} |`;
        });

        return [
            '| Field | Old Value | New Value |',
            '|---|---|---|',
            ...rows
        ].join('\n');
    },

    // Generating Mapped Json - Adverse Reaction Report_ByDrug (For API_Method:- ADRAdverseReactionsByDrug)
    Mapping_Json: function mapDatasets_ADRAdverseReactionsByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugIdentifiers: drugIdentifiers,
                MaxResults: dataset.MaxResults,
                SeverityFilter: dataset.SeverityFilter,
                IncidenceFilter: dataset.IncidenceFilter,
                OnsetFilter: dataset.OnsetFilter,
                SortBy: dataset.SortBy,
                Gender: dataset.Gender,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Adverse Reaction Report_ByDrugClassification (For API_Method:- ADRAdverseReactionsByDrugClassification)
    Mapping_Json2: function mapDatasets_ADRAdverseReactionsByDrugClassification(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const adverseReactionCodes = [];
            for (const [idType, ids] of Object.entries(dataset.AdverseReactionCodes)) {
                ids.forEach((id) => {
                    adverseReactionCodes.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                TherapeuticConceptTreeId: dataset.TherapeuticConceptTreeId,
                AdverseReactionCodes: adverseReactionCodes,
                SeverityFilter: dataset.SeverityFilter,
                IncidenceFilter: dataset.IncidenceFilter,
                OnsetFilter: dataset.OnsetFilter,
                Gender: dataset.Gender,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Adverse Reaction Report_ByAdverseReaction (For API_Method:- ADRDrugsByAdverseReaction)
    Mapping_Json3: function mapDatasets_ADRDrugsByAdverseReaction(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const adverseReactionCodes = [];
            for (const [idType, ids] of Object.entries(dataset.AdverseReactionCodes)) {
                ids.forEach((id) => {
                    adverseReactionCodes.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                AdverseReactionCodes: adverseReactionCodes,
                SeverityFilter: dataset.SeverityFilter,
                IncidenceFilter: dataset.IncidenceFilter,
                OnsetFilter: dataset.OnsetFilter,
                SortBy: dataset.SortBy,
                Gender: dataset.Gender,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Adverse Reaction Report_DrugsByDiagnosis (For API_Method:- ADRDrugsByDiagnosis)
    Mapping_Json4: function mapDatasets_ADRDrugsByDiagnosis(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const adverseReactionCodes = [];
            for (const [idType, ids] of Object.entries(dataset.AdverseReactionCodes)) {
                ids.forEach((id) => {
                    adverseReactionCodes.push({ IdType: idType, Id: id });
                });
            }

            const indicationCodes = [];
            for (const [idType, ids] of Object.entries(dataset.IndicationCodes)) {
                ids.forEach((id) => {
                    indicationCodes.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IndicationCodes: indicationCodes,
                AdverseReactionCodes: adverseReactionCodes,
                LabelStatus: dataset.LabelStatus,
                SeverityFilter: dataset.SeverityFilter,
                IncidenceFilter: dataset.IncidenceFilter,
                OnsetFilter: dataset.OnsetFilter,
                SortBy: dataset.SortBy,
                Gender: dataset.Gender,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - Adverse Reaction Report_ADRMatchDrugsToAdverseReactions(For API_Method:- ADRMatchDrugsToAdverseReactions)
    Mapping_Json5: function mapDatasets_ADRMatchDrugsToAdverseReactions(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const adverseReactionCodes = [];
            for (const [idType, ids] of Object.entries(dataset.AdverseReactionCodes)) {
                ids.forEach((id) => {
                    adverseReactionCodes.push({ IdType: idType, Id: id });
                });
            }

            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                AdverseReactionCodes: adverseReactionCodes,
                DrugIdentifiers: drugIdentifiers,
                Gender: dataset.Gender,
                AccessToken: Token, // Placeholder 
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Adverse Reaction Report_ContentMonographDocument (For API_Method:- ContentMonographDocument)
    Mapping_Json6: function mapDatasets_ContentMonographDocument(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers - Assuming you want just the first entry
            const drugIdentifier = {};
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifier)) {
                if (ids.length > 0) {
                    drugIdentifier.IdType = idType;
                    drugIdentifier.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugIdentifier: drugIdentifier, // Single object, not an array
                PediatricFilter: dataset.pediatricFilter === 'true', // Convert to boolean
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Adverse Reaction Report_ContentMonographSection (For API_Method:- ContentMonographSection)
    Mapping_Json7: function mapDatasets_ContentMonographSection(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MonographSectionId: dataset.monographSectionId,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - Adverse Reaction Report_ContentPatientEducation (For API_Method:- ContentPatientEducation)
    Mapping_Json8: function mapDatasets_ContentPatientEducation(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers - Assuming you want just the first entry
            const drugIdentifier = {};
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifier)) {
                if (ids.length > 0) {
                    drugIdentifier.IdType = idType;
                    drugIdentifier.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugIdentifier: drugIdentifier, // Single object, not an array
                LanguageCode: dataset.languageCode,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - Adverse Reaction Report_ContentPatientEducationStatements (API_Method:- ContentPatientEducationStatements)
    Mapping_Json9: function mapDatasets_ContentPatientEducationStatements(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers - Assuming you want just the first entry
            const drugIdentifier = {};
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifier)) {
                if (ids.length > 0) {
                    drugIdentifier.IdType = idType;
                    drugIdentifier.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugIdentifier: drugIdentifier, // Single object, not an array
                LanguageCode: dataset.languageCode,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DetailPackage Report (API_Method:- DetailPackage)
    Mapping_Json10: function mapDatasets_DetailPackage(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Map PackageId - Assuming you want just the first entry
            const packageId = {};
            for (const [idType, ids] of Object.entries(dataset.PackageId)) {
                if (ids.length > 0) {
                    packageId.IdType = idType;
                    packageId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageId: packageId, // Single object, not an array
                ReturnBeersInfo: dataset.returnBeersInfo,
                ReturnPackageDeliveryInfo: dataset.returnPackageDeliveryInfo,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugToDrug_ Report (API_Method:- DrugToDrug)
    Mapping_Json11: function mapDatasets_DrugToDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IncludeProfessionalNotes: dataset.includeProfessionalNotes,
                IncludeConsumerNotes: dataset.includeConsumerNotes,
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                IgnorePrescribed: dataset.ignorePrescribed,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugToDrug Report (API_Method:- DrugToDrug)
    Mapping_Json11Neg: function mapDatasets_DrugToDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // IncludeProfessionalNotes
            if (dataset.includeProfessionalNotes !== undefined) {
                jsonOutput.IncludeProfessionalNotes = dataset.includeProfessionalNotes;
            }

            // IncludeConsumerNotes
            if (dataset.includeConsumerNotes !== undefined) {
                jsonOutput.IncludeConsumerNotes = dataset.includeConsumerNotes;
            }

            // PrescribingDrugs
            if (dataset.PrescribingDrugs) {
                const prescribingDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                    ids.forEach((id) => {
                        prescribingDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribingDrugs.length > 0) {
                    jsonOutput.PrescribingDrugs = prescribingDrugs;
                }
            }

            // PrescribedDrugs
            if (dataset.PrescribedDrugs) {
                const prescribedDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                    ids.forEach((id) => {
                        prescribedDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribedDrugs.length > 0) {
                    jsonOutput.PrescribedDrugs = prescribedDrugs;
                }
            }

            // IgnorePrescribed
            if (dataset.ignorePrescribed !== undefined) {
                jsonOutput.IgnorePrescribed = dataset.ignorePrescribed;
            }

            // FilterPreferences (only if patient exists)
            const filterPreferences = {};
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }
            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DuplicateTherapy Report (API_Method:- DuplicateTherapy)
    Mapping_Json12: function mapDatasets_DuplicateTherapy(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ControlledSubstanceMaxOccurrences: dataset.controlledSubstanceMaxOccurrences,
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                IgnorePrescribed: dataset.ignorePrescribed,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DuplicateTherapy Report (API_Method:- DuplicateTherapy)
    Mapping_Json12Neg: function mapDatasets_DuplicateTherapy(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // ControlledSubstanceMaxOccurrences
            if (dataset.controlledSubstanceMaxOccurrences !== undefined) {
                jsonOutput.ControlledSubstanceMaxOccurrences = dataset.controlledSubstanceMaxOccurrences;
            }

            // PrescribingDrugs
            if (dataset.PrescribingDrugs) {
                const prescribingDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                    ids.forEach((id) => {
                        prescribingDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribingDrugs.length > 0) {
                    jsonOutput.PrescribingDrugs = prescribingDrugs;
                }
            }

            // PrescribedDrugs
            if (dataset.PrescribedDrugs) {
                const prescribedDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                    ids.forEach((id) => {
                        prescribedDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribedDrugs.length > 0) {
                    jsonOutput.PrescribedDrugs = prescribedDrugs;
                }
            }

            // IgnorePrescribed
            if (dataset.ignorePrescribed !== undefined) {
                jsonOutput.IgnorePrescribed = dataset.ignorePrescribed;
            }

            // FilterPreferences (only if patient exists)
            const filterPreferences = {};
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }
            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugDiseaseContraindicationsBydrug Report (API_Method:- DrugDiseaseContraindicationsBydrug)
    Mapping_Json13: function mapDatasets_DrugDiseaseContraindicationsBydrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ReturnPrecautions: dataset.returnPrecautions,
                ReturnBoxWarning: dataset.returnBoxWarning,
                ReturnExclusions: dataset.returnExclusions,
                OutputDiagnosisCodeType: dataset.outputDiagnosisCodeType,
                DrugIdentifiers: drugIdentifiers,
                FilterPreferences: {},
                Gender: dataset.Gender,
                DateOfBirth: dataset.DateOfBirth,
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugDiseaseContraindicationsBydrug Report (API_Method:- DrugDiseaseContraindicationsBydrug)
    Mapping_Json13Neg: function mapDatasets_DrugDiseaseContraindicationsBydrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // ReturnPrecautions
            if (dataset.returnPrecautions !== undefined) {
                jsonOutput.ReturnPrecautions = dataset.returnPrecautions;
            }

            // ReturnBoxWarning
            if (dataset.returnBoxWarning !== undefined) {
                jsonOutput.ReturnBoxWarning = dataset.returnBoxWarning;
            }

            // ReturnExclusions
            if (dataset.returnExclusions !== undefined) {
                jsonOutput.ReturnExclusions = dataset.returnExclusions;
            }

            // OutputDiagnosisCodeType
            if (dataset.outputDiagnosisCodeType !== undefined) {
                jsonOutput.OutputDiagnosisCodeType = dataset.outputDiagnosisCodeType;
            }

            // DrugIdentifiers
            if (dataset.DrugIdentifiers) {
                const drugIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                    ids.forEach((id) => {
                        drugIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (drugIdentifiers.length > 0) {
                    jsonOutput.DrugIdentifiers = drugIdentifiers;
                }
            }

            // Gender
            if (dataset.Gender !== undefined) {
                jsonOutput.Gender = dataset.Gender;
            }

            // DateOfBirth
            if (dataset.DateOfBirth !== undefined) {
                jsonOutput.DateOfBirth = dataset.DateOfBirth;
            }

            // FilterPreferences (optional)
            const filterPreferences = {};
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }
            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },



    // Generating Mapped Json - DrugDiseaseDrugsByContraindication Report (API_Method:- DrugDiseaseDrugsByContraindication)
    Mapping_Json14: function mapDatasets_DrugDiseaseDrugsByContraindication(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map contraindicationCodes
            const contraindicationCodes = [];
            for (const [idType, ids] of Object.entries(dataset.ContraindicationCodes)) {
                ids.forEach((id) => {
                    contraindicationCodes.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ContraindicationCodes: contraindicationCodes,
                Gender: dataset.Gender,
                DateOfBirth: dataset.DateOfBirth,
                ReturnExclusions: dataset.returnExclusions,
                ReturnBoxWarning: dataset.returnBoxWarning,
                UseCategorizedTerms: dataset.UseCategorizedTerms,
                ReturnPrecautions: dataset.ReturnPrecautions,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugDiseaseDrugsByContraindication Report (API_Method:- DrugDiseaseDrugsByContraindication)
    Mapping_Json14Neg: function mapDatasets_DrugDiseaseDrugsByContraindication(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // ContraindicationCodes
            if (dataset.ContraindicationCodes) {
                const contraindicationCodes = [];
                for (const [idType, ids] of Object.entries(dataset.ContraindicationCodes)) {
                    ids.forEach((id) => {
                        contraindicationCodes.push({ IdType: idType, Id: id });
                    });
                }
                if (contraindicationCodes.length > 0) {
                    jsonOutput.ContraindicationCodes = contraindicationCodes;
                }
            }

            // Gender
            if (dataset.Gender !== undefined) {
                jsonOutput.Gender = dataset.Gender;
            }

            // DateOfBirth
            if (dataset.DateOfBirth !== undefined) {
                jsonOutput.DateOfBirth = dataset.DateOfBirth;
            }

            // ReturnExclusions
            if (dataset.returnExclusions !== undefined) {
                jsonOutput.ReturnExclusions = dataset.returnExclusions;
            }

            // ReturnBoxWarning
            if (dataset.returnBoxWarning !== undefined) {
                jsonOutput.ReturnBoxWarning = dataset.returnBoxWarning;
            }

            // FilterPreferences (only if present)
            const filterPreferences = {};

            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }

            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }

            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - Drug_Disease Report_DrugDiseaseDrugsByIndication (API_Method:- DrugDiseaseDrugsByIndication)
    Mapping_Json15: function mapDatasets_DrugDiseaseDrugsByIndication(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map IndicationCodes - Handle mixed arrays and strings
            const indicationCodes = [];
            for (const [idType, ids] of Object.entries(dataset.IndicationCodes)) {
                if (Array.isArray(ids)) { // If ids is an array
                    ids.forEach((id) => {
                        indicationCodes.push({ IdType: idType, Id: id });
                    });
                } else if (typeof ids === "string") { // If ids is a string
                    indicationCodes.push({ IdType: idType, Id: ids });
                } else {
                    console.warn(`Unexpected type for IndicationCodes[${idType}]: ${typeof ids}`);
                }
            }

            // Map Allergies - Handle as an object (single key-value pair)
            const allergies = [];
            if (dataset.Allergies) {
                for (const [idType, id] of Object.entries(dataset.Allergies)) {
                    allergies.push({ IdType: idType, Id: id });
                }
            }

            // Map Patient data - Handle as an object (key-value pairs)
            const patientIdentifiers = [];
            if (dataset.patient) {
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    if (Array.isArray(ids)) { // If ids is an array
                        ids.forEach((id) => {
                            patientIdentifiers.push({ IdType: idType, Id: id });
                        });
                    } else if (typeof ids === "string") { // If ids is a string
                        patientIdentifiers.push({ IdType: idType, Id: ids });
                    } else {
                        console.warn(`Unexpected type for Patient[${idType}]: ${typeof ids}`);
                    }
                }
            }

            // Map Physician data - Handle as an object (key-value pairs)
            const physicianIdentifiers = [];
            if (dataset.physician) {
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    if (Array.isArray(ids)) { // If ids is an array
                        ids.forEach((id) => {
                            physicianIdentifiers.push({ IdType: idType, Id: id });
                        });
                    } else if (typeof ids === "string") { // If ids is a string
                        physicianIdentifiers.push({ IdType: idType, Id: ids });
                    } else {
                        console.warn(`Unexpected type for Physician[${idType}]: ${typeof ids}`);
                    }
                }
            }

            // Base JSON structure
            const jsonOutput = {
                IndicationCodes: indicationCodes,
                Allergies: allergies,
                Gender: dataset.Gender,
                DateOfBirth: dataset.DateOfBirth,
                LabelStatus: dataset.LabelStatus,
                BillableFilter: dataset.BillableFilter,
                UseCategorizedTerms: dataset.UseCategorizedTerms,
                ReturnGenericProductClinical: dataset.ReturnGenericProductClinical,
                ReturnExclusions: dataset.ReturnExclusions,
                FilterPreferences: {
                    Patient: patientIdentifiers,
                    Physician: physicianIdentifiers
                },
                AccessToken: Token,
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Drug_Disease Report_DrugDiseaseDrugsByIndication (API_Method:- DrugDiseaseDrugsByIndication)
    Mapping_Json15Neg: function mapDatasets_DrugDiseaseDrugsByIndication(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // IndicationCodes - support array or string
            if (dataset.IndicationCodes) {
                const indicationCodes = [];
                for (const [idType, ids] of Object.entries(dataset.IndicationCodes)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => indicationCodes.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        indicationCodes.push({ IdType: idType, Id: ids });
                    }
                }
                if (indicationCodes.length > 0) {
                    jsonOutput.IndicationCodes = indicationCodes;
                }
            }

            // Allergies - support key-value object
            if (dataset.Allergies) {
                const allergies = [];
                for (const [idType, id] of Object.entries(dataset.Allergies)) {
                    allergies.push({ IdType: idType, Id: id });
                }
                if (allergies.length > 0) {
                    jsonOutput.Allergies = allergies;
                }
            }

            // Gender
            if (dataset.Gender !== undefined) {
                jsonOutput.Gender = dataset.Gender;
            }

            // DateOfBirth
            if (dataset.DateOfBirth !== undefined) {
                jsonOutput.DateOfBirth = dataset.DateOfBirth;
            }

            // LabelStatus
            if (dataset.LabelStatus !== undefined) {
                jsonOutput.LabelStatus = dataset.LabelStatus;
            }

            // ReturnGenericProductClinical
            if (dataset.ReturnGenericProductClinical !== undefined) {
                jsonOutput.ReturnGenericProductClinical = dataset.ReturnGenericProductClinical;
            }

            // ReturnExclusions
            if (dataset.ReturnExclusions !== undefined) {
                jsonOutput.ReturnExclusions = dataset.ReturnExclusions;
            }

            // FilterPreferences - only if patient/physician exist
            const filterPreferences = {};

            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => patientIdentifiers.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        patientIdentifiers.push({ IdType: idType, Id: ids });
                    }
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }

            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => physicianIdentifiers.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        physicianIdentifiers.push({ IdType: idType, Id: ids });
                    }
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }

            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always included last)
            jsonOutput.AccessToken = Token;

            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - Drug_Disease Report:- DrugDiseaseIndicationsByDrug)
    Mapping_Json16: function mapDatasets_DrugDiseaseIndicationsByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                LabelStatus: dataset.LabelStatus,
                DrugIdentifiers: drugIdentifiers,
                OutputDiagnosisCodeType: dataset.OutputDiagnosisCodeType,
                ReturnExclusions: dataset.ReturnExclusions,
                UseCategorizedTerms: dataset.UseCategorizedTerms,
                BillableFilter: dataset.BillableFilter,
                Gender: dataset.Gender,
                DateOfBirth: dataset.DateOfBirth,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - Drug_Disease Report:- DrugDiseaseIndicationsByDrug (Neg)
    Mapping_Json16Neg: function mapDatasets_DrugDiseaseIndicationsByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // LabelStatus
            if (dataset.LabelStatus !== undefined) {
                jsonOutput.LabelStatus = dataset.LabelStatus;
            }

            // DrugIdentifiers
            if (dataset.DrugIdentifiers) {
                const drugIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => drugIdentifiers.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        drugIdentifiers.push({ IdType: idType, Id: ids });
                    }
                }
                if (drugIdentifiers.length > 0) {
                    jsonOutput.DrugIdentifiers = drugIdentifiers;
                }
            }

            // OutputDiagnosisCodeType
            if (dataset.OutputDiagnosisCodeType !== undefined) {
                jsonOutput.OutputDiagnosisCodeType = dataset.OutputDiagnosisCodeType;
            }

            // ReturnExclusions
            if (dataset.ReturnExclusions !== undefined) {
                jsonOutput.ReturnExclusions = dataset.ReturnExclusions;
            }

            // Gender
            if (dataset.Gender !== undefined) {
                jsonOutput.Gender = dataset.Gender;
            }

            // DateOfBirth
            if (dataset.DateOfBirth !== undefined) {
                jsonOutput.DateOfBirth = dataset.DateOfBirth;
            }

            // FilterPreferences - only if Patient/Physician exist
            const filterPreferences = {};

            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => patientIdentifiers.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        patientIdentifiers.push({ IdType: idType, Id: ids });
                    }
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }

            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => physicianIdentifiers.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        physicianIdentifiers.push({ IdType: idType, Id: ids });
                    }
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }

            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always included last)
            jsonOutput.AccessToken = Token;

            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DetailProduct Report (API_Method:- DetailProduct)
    Mapping_Json17: function mapDatasets_DetailProduct(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Map ProductId - Assuming you want just the first entry
            const productId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    productId.IdType = idType;
                    productId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: productId, // Single object, not an array
                ReturnBeersInfo: dataset.returnBeersInfo,
                ReturnIngredientStrengthRouteForm: dataset.returnIngredientStrengthRouteForm,
                ReturnRxNormSynonyms: dataset.returnRxNormSynonyms,
                ReturnProductModifier: dataset.returnProductModifier,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DoseCheckByIngredient Report (API_Method:- DoseCheckByIngredient)
    Mapping_Json18: function mapDatasets_DoseCheckByIngredient(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }

        const mappedResults = {};

        // Iterate over each dataset in dataObjects
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Validate if drugId is present and of expected type (object)
            if (!dataset.drugId || typeof dataset.drugId !== 'object') {
                throw new Error(`drugId is missing or invalid in dataset: ${datasetName}`);
            }

            // Map the DrugId (handling multiple possible ID types)
            const drugId = {};
            for (const [idType, ids] of Object.entries(dataset.drugId)) {
                if (Array.isArray(ids) && ids.length > 0) {
                    drugId.IdType = idType;
                    drugId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Map Dosing Information - Fields are expected to be arrays, take the first element
            const dosing = {
                Strength: dataset.dosing.Strength ? dataset.dosing.Strength[0] : undefined,
                UnitCode: dataset.dosing.UnitCode ? dataset.dosing.UnitCode[0] : undefined,
                Frequency: dataset.dosing.Frequency ? dataset.dosing.Frequency[0] : undefined,
                Interval: dataset.dosing.Interval ? dataset.dosing.Interval[0] : undefined,
                Weight: dataset.dosing.Weight ? dataset.dosing.Weight[0] : undefined,
                WeightUnit: dataset.dosing.WeightUnit ? dataset.dosing.WeightUnit[0] : undefined,
                BodySurfaceArea: dataset.dosing.BodySurfaceArea ? dataset.dosing.BodySurfaceArea[0] : undefined,
                PatientExperience: dataset.dosing.PatientExperience,  // Assuming this is a string, not an array
                GestationalAge: dataset.dosing.GestationalAge ? dataset.dosing.GestationalAge[0] : undefined
            };

            // Map DateOfBirth and InformationOnly - Both are arrays, so take the first value
            const jsonOutput = {
                DrugId: drugId,
                Dosing: dosing,
                DateOfBirth: dataset.DateOfBirth ? dataset.DateOfBirth[0] : undefined,
                InformationOnly: dataset.InformationOnly ? dataset.InformationOnly[0] : undefined,
                AccessToken: Token, // Placeholder for token
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
            //    console.log(jsonOutput);  // Log each dataset's mapped result for debugging
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DoseCheckBySpecificProduct Report (API_Method:- DoseCheckBySpecificProduct)
    Mapping_Json19: function mapDatasets_DoseCheckBySpecificProduct(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }

        const mappedResults = {};

        // Iterate over each dataset in dataObjects
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Validate if drugId is present and of expected type (object)
            if (!dataset.drugId || typeof dataset.drugId !== 'object') {
                throw new Error(`drugId is missing or invalid in dataset: ${datasetName}`);
            }

            // Map the DrugId (handling multiple possible ID types)
            const drugId = {};
            for (const [idType, ids] of Object.entries(dataset.drugId)) {
                if (Array.isArray(ids) && ids.length > 0) {
                    drugId.IdType = idType;
                    drugId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Map Dosing Information - Fields are expected to be arrays, take the first element
            const dosing = {
                Quantity: dataset.dosing.Quantity ? dataset.dosing.Quantity[0] : undefined,
                UnitCode: dataset.dosing.UnitCode ? dataset.dosing.UnitCode[0] : undefined,
                Frequency: dataset.dosing.Frequency ? dataset.dosing.Frequency[0] : undefined,
                Interval: dataset.dosing.Interval ? dataset.dosing.Interval[0] : undefined,
                Weight: dataset.dosing.Weight ? dataset.dosing.Weight[0] : undefined,
                WeightUnit: dataset.dosing.WeightUnit ? dataset.dosing.WeightUnit[0] : undefined,
                BodySurfaceArea: dataset.dosing.BodySurfaceArea ? dataset.dosing.BodySurfaceArea[0] : undefined,
                PatientExperience: dataset.dosing.PatientExperience,  // Assuming this is a string, not an array
                GestationalAge: dataset.dosing.GestationalAge ? dataset.dosing.GestationalAge[0] : undefined
            };

            // Map DateOfBirth and InformationOnly - Both are arrays, so take the first value
            const jsonOutput = {
                DrugId: drugId,
                Dosing: dosing,
                DateOfBirth: dataset.DateOfBirth ? dataset.DateOfBirth[0] : undefined,
                InformationOnly: dataset.InformationOnly ? dataset.InformationOnly[0] : undefined,
                AccessToken: Token, // Placeholder for token
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
            //    console.log(jsonOutput);  // Log each dataset's mapped result for debugging
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - ListColors Report (API_Method:- ListColors)
    Mapping_Json20: function mapDatasets_ListColors(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - ListProductsByRxNorm Report (API_Method:- ListProductsByRxNorm)
    Mapping_Json21: function mapDatasets_ListProductsByRxNorm(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                RxNormId: dataset.RxNormId,
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - ListTherapeuticConceptByProdct Report (API_Method:- ListTherapeuticConceptByProdct)
    Mapping_Json22: function mapDatasets_ListTherapeuticConceptByProdct(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Map PackageOrProductFilter - Assuming you want just the first entry
            const packageOrProductFilter = {};
            for (const [idType, ids] of Object.entries(dataset.PackageOrProductFilter)) {
                if (ids.length > 0) {
                    packageOrProductFilter.IdType = idType;
                    packageOrProductFilter.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageOrProductFilter: packageOrProductFilter, // Single object, not an array
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductImages Report (API_Method:- ListProductImages)
    Mapping_Json23: function mapDatasets_ListProductImages(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Map productId - Assuming you want just the first entry
            const productId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    productId.IdType = idType;
                    productId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: productId, // Single object, not an array
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPackagePricesCurrent Report (API_Method:- ListPackagePricesCurrent)
    Mapping_Json24: function mapDatasets_ListPackagePricesCurrent(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Map packageId - Assuming you want just the first entry
            const packageId = {};
            for (const [idType, ids] of Object.entries(dataset.PackageId)) {
                if (ids.length > 0) {
                    packageId.IdType = idType;
                    packageId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageId: packageId, // Single object, not an array
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugToDrug_CDS Report (API_Method:- DrugToDrug)
    Mapping_Json25: function mapDatasets_DrugToDrugCDS(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IncludeProfessionalNotes: dataset.includeProfessionalNotes,
                IncludeConsumerNotes: dataset.includeConsumerNotes,
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                IgnorePrescribed: dataset.ignorePrescribed,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },



    // Generating Mapped Json - DuplicateTherapy CDS Report (API_Method:- DuplicateTherapy)
    Mapping_Json26: function mapDatasets_DuplicateTherapy(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ControlledSubstanceMaxOccurrences: dataset.controlledSubstanceMaxOccurrences,
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                IgnorePrescribed: dataset.ignorePrescribed,
                IncludePrecautions: dataset.IncludePrecautions,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPharmEquivalentProducts Report (API_Method:- ListPharmEquivalentProducts)
    Mapping_Json27: function mapDatasets_ListPharmEquivalentProducts(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map ProductId
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                ReturnProductModifier: dataset.ReturnProductModifier,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - ListProductStorage Report (API_Method:- ListProductStorage)
    Mapping_Json28: function mapDatasets_ListProductStorage(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PackageOrProductId
            const PackageOrProductId = {};
            for (const [idType, ids] of Object.entries(dataset.PackageOrProductId)) {
                if (ids.length > 0) {
                    PackageOrProductId.IdType = idType;
                    PackageOrProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageOrProductId: PackageOrProductId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListTherapeuticConceptByProduct Report (API_Method:- ListTherapeuticConceptByProduct)
    Mapping_Json29: function mapDatasets_ListTherapeuticConceptByProduct(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PackageOrProductFilter
            const PackageOrProductFilter = {};
            for (const [idType, ids] of Object.entries(dataset.PackageOrProductFilter)) {
                if (ids.length > 0) {
                    PackageOrProductFilter.IdType = idType;
                    PackageOrProductFilter.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageOrProductFilter: PackageOrProductFilter,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DoseCheckInfo Report (API_Method:- DoseCheckInfo)
    Mapping_Json30: function mapDatasets_DoseCheckInfo(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }

        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            if (!dataset.drugId || typeof dataset.drugId !== 'object') {
                throw new Error(`drugId is missing or invalid in dataset: ${datasetName}`);
            }

            // Map DrugId (e.g., NDC10: ["value"])
            const drugId = {};
            for (const [idType, ids] of Object.entries(dataset.drugId)) {
                if (Array.isArray(ids) && ids.length > 0) {
                    drugId.IdType = idType;
                    drugId.Id = ids[0];
                    break;
                }
            }

            // DoseInfo mapping
            const doseInfo = {
                DoseCategory: dataset.dosing?.DoseCategory ? dataset.dosing.DoseCategory[0] : null,
                ContinuousInfusion: dataset.dosing?.ContinuousInfusion ?? null  // boolean or null
            };

            // PatientInfo mapping (from dataset.patientInfo!)
            const patientInfo = {
                DateOfBirth: dataset.patientInfo?.DateOfBirth ? dataset.patientInfo.DateOfBirth[0] : undefined,
                GestationalAge: dataset.patientInfo?.GestationalAge ? dataset.patientInfo.GestationalAge[0] : undefined,
                PatientExperience: dataset.patientInfo?.PatientExperience ? dataset.patientInfo.PatientExperience[0] : undefined,
                Weight: dataset.patientInfo?.Weight ? dataset.patientInfo.Weight[0] : undefined,
                BodySurfaceArea: dataset.patientInfo?.BodySurfaceArea ? dataset.patientInfo.BodySurfaceArea[0] : undefined,
                CrCl: dataset.patientInfo?.CrCl ? dataset.patientInfo.CrCl[0] : undefined,
                CrClRate: dataset.patientInfo?.CrClRate ? dataset.patientInfo.CrClRate[0] : undefined,
                ChildPughScore: dataset.patientInfo?.ChildPughScore ? dataset.patientInfo.ChildPughScore[0] : undefined
            };

            // Final output JSON
            const jsonOutput = {
                DrugId: drugId,
                ProductModifierId: Array.isArray(dataset.ProductModifierId) ? dataset.ProductModifierId[0] : undefined,
                DoseInfo: doseInfo,
                PatientInfo: patientInfo,
                AccessToken: Token
            };

            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];  // Return first mapped object
    },

    // Generating Mapped Json - DoseCheckScreening Report (API_Method:- DoseCheckScreening)
    Mapping_Json31: function mapDatasets_DoseCheckScreening(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }

        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            if (!dataset.drugId || typeof dataset.drugId !== 'object') {
                throw new Error(`drugId is missing or invalid in dataset: ${datasetName}`);
            }

            // DrugId mapping - direct value assumed
            const drugId = {};
            for (const [idType, idValue] of Object.entries(dataset.drugId)) {
                drugId.IdType = idType;
                drugId.Id = idValue;
                break;
            }

            // Dose mapping - extract first element from arrays or null
            const dose = {
                Quantity: dataset.dosing?.Quantity ? dataset.dosing.Quantity[0] : undefined,
                UnitCode: dataset.dosing?.UnitCode ? dataset.dosing.UnitCode[0] : undefined,
                Frequency: dataset.dosing?.Frequency ? dataset.dosing.Frequency[0] : undefined,
                Interval: dataset.dosing?.Interval ? dataset.dosing.Interval[0] : undefined,
                DosingCategory: dataset.dosing?.DosingCategory ? dataset.dosing.DosingCategory[0] : undefined,
                ContinuousInfusion: dataset.dosing?.ContinuousInfusion ? dataset.dosing.ContinuousInfusion[0] : undefined,  // Assuming boolean or primitive, not array
                ContinuousInfusionTimeUnit: dataset.dosing?.ContinuousInfusionTimeUnit ? dataset.dosing.ContinuousInfusionTimeUnit[0] : undefined
            };

            // PatientInfo mapping - extract first element from arrays or null
            const patientInfo = {
                DateOfBirth: dataset.patientInfo?.DateOfBirth ? dataset.patientInfo.DateOfBirth[0] : undefined,
                GestationalAge: dataset.patientInfo?.GestationalAge ? dataset.patientInfo.GestationalAge[0] : undefined,
                PatientExperience: dataset.patientInfo?.PatientExperience ? dataset.patientInfo.PatientExperience[0] : undefined,
                Weight: dataset.patientInfo?.Weight ? dataset.patientInfo.Weight[0] : undefined,
                BodySurfaceArea: dataset.patientInfo?.BodySurfaceArea ? dataset.patientInfo.BodySurfaceArea[0] : undefined,
                CrCl: dataset.patientInfo?.CrCl ? dataset.patientInfo.CrCl[0] : undefined,
                CrClRate: dataset.patientInfo?.CrClRate ? dataset.patientInfo.CrClRate[0] : undefined,
                ChildPughScore: dataset.patientInfo?.ChildPughScore ? dataset.patientInfo.ChildPughScore[0] : undefined
            };

            // Final JSON output
            const jsonOutput = {
                DrugId: drugId,
                ProductModifierId: dataset.ProductModifierId,
                Dose: dose,
                PatientInfo: patientInfo,
                AccessToken: Token, // Placeholder
            };

            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugLabInterferenceByDrug Report (API_Method:- DrugLabInterferenceByDrug)
    Mapping_Json32: function mapDatasets_DrugLabInterferenceByDrug(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }

        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            if (!dataset.drugId || typeof dataset.drugId !== 'object') {
                throw new Error(`drugId is missing or invalid in dataset: ${datasetName}`);
            }

            // Map Drug object - direct value expected (string or number)
            const drug = {};
            for (const [idType, idValue] of Object.entries(dataset.drugId)) {
                drug.IdType = idType;
                drug.Id = idValue;
                break;
            }

            // Map MaxResults - take directly from dataset if exists, else null
            const maxResults = dataset.MaxResults ?? null;

            const jsonOutput = {
                Drug: drug,
                MaxResults: maxResults,
                AccessToken: Token
            };

            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped dataset
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugDiseaseScreening Report (API_Method:- DrugDiseaseScreening)
    Mapping_Json33: function mapDatasets_DrugDiseaseScreening(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            for (const [datasetName, dataset] of Object.entries(dataObjects)) {
                // Map DiagnosingCodes
                const diagnosingCodes = [];
                for (const [idType, ids] of Object.entries(dataset.DiagnosingCodes)) {
                    ids.forEach((id) => {
                        diagnosingCodes.push({ IdType: idType, Id: id });
                    });
                }
                const diagnosedCodes = [];
                for (const [idType, ids] of Object.entries(dataset.DiagnosedCodes)) {
                    ids.forEach((id) => {
                        diagnosedCodes.push({ IdType: idType, Id: id });
                    });
                }

                // Base JSON structure - Includes Drug Identifier
                const jsonOutput = {
                    PrescribingDrugs: prescribingDrugs,
                    PrescribedDrugs: prescribedDrugs,
                    DiagnosingCodes: diagnosingCodes,
                    DiagnosedCodes: diagnosedCodes,
                    IgnoreDiagnosed: dataset.IgnoreDiagnosed,
                    IgnorePrescribed: dataset.IgnorePrescribed,
                    IncludePrecautions: dataset.IncludePrecautions,
                    UseCategorizedTerms: dataset.UseCategorizedTerms,
                    Gender: dataset.Gender,
                    DateOfBirth: dataset.DateOfBirth,
                    FilterPreferences: {},
                    AccessToken: Token, // Placeholder
                };

                // Map patient data if present else blank
                if (dataset.patient) {
                    const patientIdentifiers = [];
                    for (const [idType, ids] of Object.entries(dataset.patient)) {
                        ids.forEach((id) => {
                            patientIdentifiers.push({ IdType: idType, Id: id });
                        });
                    }
                    jsonOutput.FilterPreferences.Patient = patientIdentifiers;
                }

                // Map physician data if present else blank
                if (dataset.physician) {
                    const physicianIdentifiers = [];
                    for (const [idType, ids] of Object.entries(dataset.physician)) {
                        ids.forEach((id) => {
                            physicianIdentifiers.push({ IdType: idType, Id: id });
                        });
                    }
                    jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
                }

                // Store the mapped JSON under the dataset name
                mappedResults[datasetName] = jsonOutput;
            }

            return Object.values(mappedResults)[0];
        }

    },


    // Generating Mapped Json - DrugDiseaseMatchDrugToDiagnosis Report (API_Method:- DrugDiseaseMatchDrugToDiagnosis)
    Mapping_Json34: function mapDatasets_DrugDiseaseMatchDrugToDiagnosis(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            for (const [datasetName, dataset] of Object.entries(dataObjects)) {
                // Map DiagnosingCodes
                const diagnosingCodes = [];
                for (const [idType, ids] of Object.entries(dataset.DiagnosingCodes)) {
                    ids.forEach((id) => {
                        diagnosingCodes.push({ IdType: idType, Id: id });
                    });
                }
                const diagnosedCodes = [];
                for (const [idType, ids] of Object.entries(dataset.DiagnosedCodes)) {
                    ids.forEach((id) => {
                        diagnosedCodes.push({ IdType: idType, Id: id });
                    });
                }

                // Base JSON structure - Includes Drug Identifier
                const jsonOutput = {
                    PrescribingDrugs: prescribingDrugs,
                    PrescribedDrugs: prescribedDrugs,
                    DiagnosingCodes: diagnosingCodes,
                    DiagnosedCodes: diagnosedCodes,
                    IgnoreDiagnosed: dataset.IgnoreDiagnosed,
                    IgnorePrescribed: dataset.IgnorePrescribed,
                    UseCategorizedTerms: dataset.UseCategorizedTerms,
                    Gender: dataset.Gender,
                    DateOfBirth: dataset.DateOfBirth,
                    LabelStatus: dataset.LabelStatus,
                    AccessToken: Token, // Placeholder
                };

                // Store the mapped JSON under the dataset name
                mappedResults[datasetName] = jsonOutput;
            }

            return Object.values(mappedResults)[0];
        }

    },

    Mapping_Json34Neg: function mapDatasets_DrugDiseaseMatchDrugToDiagnosisNeg(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // PrescribingDrugs - only if present
            if (dataset.PrescribingDrugs) {
                const prescribingDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => prescribingDrugs.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        prescribingDrugs.push({ IdType: idType, Id: ids });
                    }
                }
                if (prescribingDrugs.length > 0) {
                    jsonOutput.PrescribingDrugs = prescribingDrugs;
                }
            }

            // PrescribedDrugs - only if present
            if (dataset.PrescribedDrugs) {
                const prescribedDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => prescribedDrugs.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        prescribedDrugs.push({ IdType: idType, Id: ids });
                    }
                }
                if (prescribedDrugs.length > 0) {
                    jsonOutput.PrescribedDrugs = prescribedDrugs;
                }
            }

            // DiagnosingCodes - only if present
            if (dataset.DiagnosingCodes) {
                const diagnosingCodes = [];
                for (const [idType, ids] of Object.entries(dataset.DiagnosingCodes)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => diagnosingCodes.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        diagnosingCodes.push({ IdType: idType, Id: ids });
                    }
                }
                if (diagnosingCodes.length > 0) {
                    jsonOutput.DiagnosingCodes = diagnosingCodes;
                }
            }

            // DiagnosedCodes - only if present
            if (dataset.DiagnosedCodes) {
                const diagnosedCodes = [];
                for (const [idType, ids] of Object.entries(dataset.DiagnosedCodes)) {
                    if (Array.isArray(ids)) {
                        ids.forEach((id) => diagnosedCodes.push({ IdType: idType, Id: id }));
                    } else if (typeof ids === "string") {
                        diagnosedCodes.push({ IdType: idType, Id: ids });
                    }
                }
                if (diagnosedCodes.length > 0) {
                    jsonOutput.DiagnosedCodes = diagnosedCodes;
                }
            }

            // Other optional properties - only if defined
            if (dataset.IgnoreDiagnosed !== undefined) {
                jsonOutput.IgnoreDiagnosed = dataset.IgnoreDiagnosed;
            }
            if (dataset.IgnorePrescribed !== undefined) {
                jsonOutput.IgnorePrescribed = dataset.IgnorePrescribed;
            }
            if (dataset.Gender !== undefined) {
                jsonOutput.Gender = dataset.Gender;
            }
            if (dataset.DateOfBirth !== undefined) {
                jsonOutput.DateOfBirth = dataset.DateOfBirth;
            }
            if (dataset.LabelStatus !== undefined) {
                jsonOutput.LabelStatus = dataset.LabelStatus;
            }

            // AccessToken always included
            jsonOutput.AccessToken = Token;

            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },



    // Generating Mapped Json - DrugLabInterferenceByLab Report (API_Method:- DrugLabInterferenceByLab)
    Mapping_Json35: function mapDatasets_DrugLabInterferenceByLab(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }

        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            const jsonOutput = {
                LoincCode: dataset.LoincCode,
                MaxResults: dataset.MaxResults,
                AccessToken: Token
            };

            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped dataset
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugLabParametersToMonitor Report (API_Method:- DrugLabParametersToMonitor)
    Mapping_Json36: function mapDatasets_DrugLabParametersToMonitor(dataObjects, Token) {
        if (!dataObjects || typeof dataObjects !== 'object') {
            throw new Error('dataObjects is undefined, null, or not an object');
        }
        const mappedResults = {};

        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            if (!dataset.drugId || typeof dataset.drugId !== 'object') {
                throw new Error(`drugId is missing or invalid in dataset: ${datasetName}`);
            }

            // Map Drug object - direct value expected (string or number)
            const drug = {};
            for (const [idType, idValue] of Object.entries(dataset.drugId)) {
                drug.IdType = idType;
                drug.Id = idValue;
                break;
            }

            // Map MaxResults - take directly from dataset if exists, else null
            const maxResults = dataset.MaxResults ?? null;

            const jsonOutput = {
                Drug: drug,
                AccessToken: Token
            };

            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped dataset
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugToAllergy Report (API_Method:- DrugToAllergy)
    Mapping_Json37: function mapDatasets_DrugToAllergy(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            const AllergyIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.AllergyIdentifiers)) {
                ids.forEach((id) => {
                    AllergyIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                AllergyIdentifiers: AllergyIdentifiers,
                IgnorePrescribed: dataset.IgnorePrescribed,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugToAllergy Report (API_Method:- DrugToAllergy)
    Mapping_Json37Neg: function mapDatasets_DrugToAllergy(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // PrescribingDrugs
            if (dataset.PrescribingDrugs) {
                const prescribingDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                    ids.forEach((id) => {
                        prescribingDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribingDrugs.length > 0) {
                    jsonOutput.PrescribingDrugs = prescribingDrugs;
                }
            }

            // PrescribedDrugs
            if (dataset.PrescribedDrugs) {
                const prescribedDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                    ids.forEach((id) => {
                        prescribedDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribedDrugs.length > 0) {
                    jsonOutput.PrescribedDrugs = prescribedDrugs;
                }
            }

            // AllergyIdentifiers
            if (dataset.AllergyIdentifiers) {
                const allergyIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.AllergyIdentifiers)) {
                    ids.forEach((id) => {
                        allergyIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (allergyIdentifiers.length > 0) {
                    jsonOutput.AllergyIdentifiers = allergyIdentifiers;
                }
            }

            // IgnorePrescribed
            if (dataset.IgnorePrescribed !== undefined) {
                jsonOutput.IgnorePrescribed = dataset.IgnorePrescribed;
            }

            // FilterPreferences (optional)
            const filterPreferences = {};
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }
            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },



    // Generating Mapped Json - DrugToLifestyle Report (API_Method:- DrugToDrug)
    Mapping_Json38: function mapDatasets_DrugToLifestyle(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IncludeProfessionalNotes: dataset.includeProfessionalNotes,
                IncludeConsumerNotes: dataset.includeConsumerNotes,
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                IgnorePrescribed: dataset.ignorePrescribed,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }
            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - DrugToLifestyle Report (API_Method:- DrugToDrug)
    Mapping_Json38Neg: function mapDatasets_DrugToLifestyle(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // IncludeProfessionalNotes
            if (dataset.includeProfessionalNotes !== undefined) {
                jsonOutput.IncludeProfessionalNotes = dataset.includeProfessionalNotes;
            }

            // IncludeConsumerNotes
            if (dataset.includeConsumerNotes !== undefined) {
                jsonOutput.IncludeConsumerNotes = dataset.includeConsumerNotes;
            }

            // PrescribingDrugs
            if (dataset.PrescribingDrugs) {
                const prescribingDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                    ids.forEach((id) => {
                        prescribingDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribingDrugs.length > 0) {
                    jsonOutput.PrescribingDrugs = prescribingDrugs;
                }
            }

            // PrescribedDrugs
            if (dataset.PrescribedDrugs) {
                const prescribedDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                    ids.forEach((id) => {
                        prescribedDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribedDrugs.length > 0) {
                    jsonOutput.PrescribedDrugs = prescribedDrugs;
                }
            }

            // IgnorePrescribed
            if (dataset.ignorePrescribed !== undefined) {
                jsonOutput.IgnorePrescribed = dataset.ignorePrescribed;
            }

            // FilterPreferences (optional)
            const filterPreferences = {};
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }
            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugToWarningLabel Report (API_Method:- DrugToWarningLabel)
    Mapping_Json39: function mapDatasets_DrugToWarningLabel(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                LanguageCode: dataset.LanguageCode,
                MaxLines: dataset.MaxLines,
                CharsPerLine: dataset.CharsPerLine,
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                IgnorePrescribed: dataset.ignorePrescribed,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }
            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - DrugToWarningLabel Report (API_Method:- DrugToWarningLabel)
    Mapping_Json39Neg: function mapDatasets_DrugToWarningLabel(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {};

            // LanguageCode
            if (dataset.LanguageCode !== undefined) {
                jsonOutput.LanguageCode = dataset.LanguageCode;
            }

            // MaxLines
            if (dataset.MaxLines !== undefined) {
                jsonOutput.MaxLines = dataset.MaxLines;
            }

            // CharsPerLine
            if (dataset.CharsPerLine !== undefined) {
                jsonOutput.CharsPerLine = dataset.CharsPerLine;
            }

            // PrescribingDrugs
            if (dataset.PrescribingDrugs) {
                const prescribingDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                    ids.forEach((id) => {
                        prescribingDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribingDrugs.length > 0) {
                    jsonOutput.PrescribingDrugs = prescribingDrugs;
                }
            }

            // PrescribedDrugs
            if (dataset.PrescribedDrugs) {
                const prescribedDrugs = [];
                for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                    ids.forEach((id) => {
                        prescribedDrugs.push({ IdType: idType, Id: id });
                    });
                }
                if (prescribedDrugs.length > 0) {
                    jsonOutput.PrescribedDrugs = prescribedDrugs;
                }
            }

            // IgnorePrescribed
            if (dataset.ignorePrescribed !== undefined) {
                jsonOutput.IgnorePrescribed = dataset.ignorePrescribed;
            }

            // FilterPreferences
            const filterPreferences = {};
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (patientIdentifiers.length > 0) {
                    filterPreferences.Patient = patientIdentifiers;
                }
            }
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                if (physicianIdentifiers.length > 0) {
                    filterPreferences.Physician = physicianIdentifiers;
                }
            }
            if (Object.keys(filterPreferences).length > 0) {
                jsonOutput.FilterPreferences = filterPreferences;
            }

            // AccessToken (always last like original)
            jsonOutput.AccessToken = Token;

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - IVCompatibilityByDrug Report (API_Method:- IVCompatibilityByDrug)
    Mapping_Json40: function mapDatasets_IVCompatibilityByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                CompatibilityFilter2: dataset.CompatibilityFilter2,
                AdministrationFilter: dataset.AdministrationFilter,
                DrugIdentifiers: drugIdentifiers,
                IncludeAdditionalInfo: dataset.IncludeAdditionalInfo,
                CompatibilityFilter: dataset.CompatibilityFilter,
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }
            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - IVCompatibilityParenteralNutritionByDrug Report (API_Method:- IVCompatibilityParenteralNutritionByDrug)
    Mapping_Json41: function mapDatasets_IVCompatibilityParenteralNutritionByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                AdministrationFilter: dataset.AdministrationFilter,
                DrugIdentifiers: drugIdentifiers,
                IncludeAdditionalInfo: dataset.IncludeAdditionalInfo,
                CompatibilityFilter: dataset.CompatibilityFilter,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - IVCompatibilitySolutionsByDrug Report (API_Method:- IVCompatibilitySolutionsByDrug)
    Mapping_Json42: function mapDatasets_IVCompatibilitySolutionsByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const drugIdentifiers = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIdentifiers)) {
                ids.forEach((id) => {
                    drugIdentifiers.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IncludeStability: dataset.IncludeStability,
                IncludeStabilityMax: dataset.IncludeStabilityMax,
                DrugIdentifiers: drugIdentifiers,
                IncludeAdditionalInfo: dataset.IncludeAdditionalInfo,
                CompatibilityFilter: dataset.CompatibilityFilter,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - LactationAlternateDrugs Report (API_Method:- LactationAlternateDrugs)
    Mapping_Json43: function mapDatasets_LactationAlternateDrugs(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const drugIds = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIds)) {
                ids.forEach((id) => {
                    drugIds.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugIds: drugIds,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListAGSBeersQualityOfEvidence Report (API_Method:- ListAGSBeersQualityOfEvidence)
    Mapping_Json44: function mapDatasets_ListAGSBeersQualityOfEvidence(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListAGSBeersStrengthOfRecommendation Report (API_Method:- ListAGSBeersStrengthOfRecommendation)
    Mapping_Json45: function mapDatasets_ListAGSBeersStrengthOfRecommendation(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListAllergySubstanceClasses Report (API_Method:- ListAllergySubstanceClasses)
    Mapping_Json46: function mapDatasets_ListAllergySubstanceClasses(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListASPByPackage Report (API_Method:- ListASPByPackage)
    Mapping_Json47: function mapDatasets_ListASPByPackage(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const drugId = {};
            for (const [idType, ids] of Object.entries(dataset.DrugId)) {
                if (ids.length > 0) {
                    drugId.IdType = idType;
                    drugId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugId: drugId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListBrandGenericStatuses Report (API_Method:- ListBrandGenericStatuses)
    Mapping_Json48: function mapDatasets_ListBrandGenericStatuses(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListCoatings Report (API_Method:- ListCoatings)
    Mapping_Json49: function mapDatasets_ListCoatings(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListCompanies Report (API_Method:- ListCompanies)
    Mapping_Json50: function mapDatasets_ListCompanies(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListDESIStatuses Report (API_Method:- ListDESIStatuses)
    Mapping_Json51: function mapDatasets_ListDESIStatuses(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListDocumentationTypes Report (API_Method:- ListDocumentationTypes)
    Mapping_Json52: function mapDatasets_ListDocumentationTypes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListDoseForms Report (API_Method:- ListDoseForms)
    Mapping_Json53: function mapDatasets_ListDoseForms(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListDrugInteractionReferences Report (API_Method:- ListDrugInteractionReferences)
    Mapping_Json54: function mapDatasets_ListDrugInteractionReferences(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugInteractionId: dataset.DrugInteractionId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListFederal Report (API_Method:- ListFederal)
    Mapping_Json55: function mapDatasets_ListFederal(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const PackageOrProductFilter = {};
            for (const [idType, ids] of Object.entries(dataset.PackageOrProductFilter)) {
                if (ids.length > 0) {
                    PackageOrProductFilter.IdType = idType;
                    PackageOrProductFilter.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageOrProductFilter: PackageOrProductFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListFederalDEAClassifications Report (API_Method:- ListFederalDEAClassifications)
    Mapping_Json56: function mapDatasets_ListFederalDEAClassifications(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListFlavors Report (API_Method:- ListFlavors)
    Mapping_Json57: function mapDatasets_ListFlavors(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListGenericProductClinicals Report (API_Method:- ListGenericProductClinicals)
    Mapping_Json58: function mapDatasets_ListGenericProductClinicals(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListGSTerms Report (API_Method:- ListGSTerms)
    Mapping_Json59: function mapDatasets_ListGSTerms(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListGSTermsByCategory Report (API_Method:- ListGSTermsByCategory)
    Mapping_Json60: function mapDatasets_ListGSTermsByCategory(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListHCPCSByPackage Report (API_Method:- ListHCPCSByPackage)
    Mapping_Json61: function mapDatasets_ListHCPCSByPackage(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const drugId = {};
            for (const [idType, ids] of Object.entries(dataset.DrugId)) {
                if (ids.length > 0) {
                    drugId.IdType = idType;
                    drugId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugId: drugId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListImprintText Report (API_Method:- ListImprintText)
    Mapping_Json62: function mapDatasets_ListImprintText(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListIngredientNameSources Report (API_Method:- ListIngredientNameSources)
    Mapping_Json63: function mapDatasets_ListIngredientNameSources(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListIngredients Report (API_Method:- ListIngredients)
    Mapping_Json64: function mapDatasets_ListIngredients(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListIVContainerMaterials Report (API_Method:- ListIVContainerMaterials)
    Mapping_Json65: function mapDatasets_ListIVContainerMaterials(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListLanguages Report (API_Method:- ListLanguages)
    Mapping_Json66: function mapDatasets_ListLanguages(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListLegendStatuses Report (API_Method:- ListLegendStatuses)
    Mapping_Json67: function mapDatasets_ListLegendStatuses(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListLicenses Report (API_Method:- ListLicenses)
    Mapping_Json68: function mapDatasets_ListLicenses(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListLifestyleInteractionReferen Report (API_Method:- ListLifestyleInteractionReferen)
    Mapping_Json69: function mapDatasets_ListLifestyleInteractionReferen(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugInteractionId: dataset.DrugInteractionId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListLimitedDistribution Report (API_Method:- ListLimitedDistribution)
    Mapping_Json70: function mapDatasets_ListLimitedDistribution(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListMarketedProducts Report (API_Method:- ListMarketedProducts)
    Mapping_Json71: function mapDatasets_ListMarketedProducts(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IncludeOffMarket: dataset.IncludeOffMarket,
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListMedGuides Report (API_Method:- ListMedGuides)
    Mapping_Json72: function mapDatasets_ListLimitedDistribution(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListMonographNames Report (API_Method:- ListMonographNames)
    Mapping_Json73: function mapDatasets_ListMonographNames(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListMorphineEquivalentDosing Report (API_Method:- ListMorphineEquivalentDosing)
    Mapping_Json74: function mapDatasets_ListMorphineEquivalentDosing(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListNCPDPBillingUnits Report (API_Method:- ListMedGuides)
    Mapping_Json75: function mapDatasets_ListNCPDPBillingUnits(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListOrderableNames Report (API_Method:- ListOrderableNames)
    Mapping_Json76: function mapDatasets_ListOrderableNames(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                SearchString: dataset.SearchString,
                BrandOrGeneric: dataset.BrandOrGeneric,
                BaseIngredientsOnly: dataset.BaseIngredientsOnly,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPackagePrices Report (API_Method:- ListPackagePricesCurrent)
    Mapping_Json77: function mapDatasets_ListPackagePrices(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Map packageId - Assuming you want just the first entry
            const packageId = {};
            for (const [idType, ids] of Object.entries(dataset.PackageId)) {
                if (ids.length > 0) {
                    packageId.IdType = idType;
                    packageId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageId: packageId, // Single object, not an array
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first mapped result (as per original code)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPackages Report (API_Method:- ListPackages)
    Mapping_Json78: function mapDatasets_ListPackages(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPackagesByCompany Report (API_Method:- ListPackages)
    Mapping_Json79: function mapDatasets_ListPackagesByCompany(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                CompanyId: dataset.CompanyId,
                CompanyIdType: dataset.CompanyIdType,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPatientPackageInserts Report (API_Method:- ListPatientPackageInserts)
    Mapping_Json80: function mapDatasets_ListPatientPackageInserts(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPregnancyRatings Report (API_Method:- ListPregnancyRatings)
    Mapping_Json81: function mapDatasets_ListPregnancyRatings(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPriceChangeReasons Report (API_Method:- ListPriceChangeReasons)
    Mapping_Json82: function mapDatasets_ListPriceChangeReasons(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListPriceTypes Report (API_Method:- ListPriceTypes)
    Mapping_Json83: function mapDatasets_ListPriceTypes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductActiveIngredients Report (API_Method:- ListProductActiveIngredients)
    Mapping_Json84: function mapDatasets_ListProductActiveIngredients(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map ProductId
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductAttributes Report (API_Method:- ListProductAttributes)
    Mapping_Json85: function mapDatasets_ListProductAttributes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductInactiveIngredients Report (API_Method:- ListProductInactiveIngredients)
    Mapping_Json86: function mapDatasets_ListProductInactiveIngredients(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map ProductId
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductModifiers Report (API_Method:- ListProductModifiers)
    Mapping_Json87: function mapDatasets_ListProductModifiers(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductModifierTypes Report (API_Method:- ListProductModifierTypes)
    Mapping_Json88: function mapDatasets_ListProductModifierTypes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductNames Report (API_Method:- ListProductNames)
    Mapping_Json89: function mapDatasets_ListProductNames(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductNameTypes Report (API_Method:- ListProductNameTypes)
    Mapping_Json90: function mapDatasets_ListProductNameTypes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json -  ListProducts Report (API_Method:- ListProducts )
    Mapping_Json91: function mapDatasets_ListProducts(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each dataset entry
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            const jsonOutput = {
                FilterType: dataset.FilterType || null,
                Filter: dataset.Filter || null,
                BeersFilter: {
                    AGSBeersStrengthOfRecommendation: dataset.BeersFilter?.AGSBeersStrengthOfRecommendation || null,
                    AGSBeersQualityOfEvidence: dataset.BeersFilter?.AGSBeersQualityOfEvidence || null
                },
                ReturnIngredientStrengthRouteForm: dataset.ReturnIngredientStrengthRouteForm ?? null,
                LimitedDistributionId: dataset.LimitedDistributionId ?? null,
                ReturnLimitedDistribution: dataset.ReturnLimitedDistribution ?? null,
                MaxResults: dataset.MaxResults ?? null,
                AccessToken: Token
            };

            mappedResults[datasetName] = jsonOutput;
        }

        // Return the first dataset's mapped output (similar to your earlier pattern)
        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductsByCompany Report (API_Method:- ListProductsByCompany)
    Mapping_Json92: function mapDatasets_ListProductsByCompany(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                Id: dataset.Id,
                IdType: dataset.IdType,
                ReturnIngredientStrengthRouteForm: dataset.ReturnIngredientStrengthRouteForm,
                LimitedDistributionId: dataset.LimitedDistributionId,
                ReturnLimitedDistribution: dataset.ReturnLimitedDistribution,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json (For API_Method:- ListProductsByTherapeuticConceptTree)
    Mapping_Json93: function mapDatasets_ListProductsByTherapeuticConceptTree(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                TherapeuticConceptTreeTreeId: dataset.TherapeuticConceptTreeTreeId,
                ReturnIngredientStrengthRouteForm: dataset.ReturnIngredientStrengthRouteForm,
                LimitedDistributionId: dataset.LimitedDistributionId,
                ReturnLimitedDistribution: dataset.ReturnLimitedDistribution,
                MaxResults: dataset.MaxResults,
                FilterPreferences: {},
                AccessToken: Token, // Placeholder
            };

            // Map patient data if present else blank
            if (dataset.patient) {
                const patientIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.patient)) {
                    ids.forEach((id) => {
                        patientIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Patient = patientIdentifiers;
            }

            // Map physician data if present else blank
            if (dataset.physician) {
                const physicianIdentifiers = [];
                for (const [idType, ids] of Object.entries(dataset.physician)) {
                    ids.forEach((id) => {
                        physicianIdentifiers.push({ IdType: idType, Id: id });
                    });
                }
                jsonOutput.FilterPreferences.Physician = physicianIdentifiers;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListProductStorageConceptLocation Report (API_Method:- ListProductStorageConceptLocation)
    Mapping_Json94: function mapDatasets_ListProductStorageConceptLocation(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const PackageOrProductId = {};
            for (const [idType, ids] of Object.entries(dataset.PackageOrProductId)) {
                if (ids.length > 0) {
                    PackageOrProductId.IdType = idType;
                    PackageOrProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PackageOrProductId: PackageOrProductId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListREMS Report (API_Method:- ListREMS)
    Mapping_Json95: function mapDatasets_ListREMS(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListRoutesOfAdministration Report (API_Method:- ListRoutesOfAdministration)
    Mapping_Json96: function mapDatasets_ListRoutesOfAdministration(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListRxNormByProduct Report (API_Method:- ListRxNormByProduct)
    Mapping_Json97: function mapDatasets_ListRxNormByProduct(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                ReturnRxNormSynonyms: dataset.ReturnRxNormSynonyms,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListScriptForms Report (API_Method:- ListScriptForms)
    Mapping_Json98: function mapDatasets_ListREMS(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSeverityTypes Report (API_Method:- ListSeverityTypes)
    Mapping_Json99: function mapDatasets_ListSeverityTypes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListShapes Report (API_Method:- ListShapes)
    Mapping_Json100: function mapDatasets_ListShapes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSigAdditionalInstructions Report (API_Method:- ListSigAdditionalInstructions)
    Mapping_Json101: function mapDatasets_ListSigAdditionalInstructions(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSigAdminMethods Report (API_Method:- ListSigAdminMethods)
    Mapping_Json102: function mapDatasets_ListSigAdminMethods(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSigFrequencies Report (API_Method:- ListSigFrequencies)
    Mapping_Json103: function mapDatasets_ListSigFrequencies(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },



    // Generating Mapped Json - ListSigPrescribingReasons Report (API_Method:- ListSigPrescribingReasons)
    Mapping_Json104: function mapDatasets_ListSigPrescribingReasons(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSigRouteCategories Report (API_Method:- ListSigRouteCategories)
    Mapping_Json105: function mapDatasets_ListSigRouteCategories(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSigRoutesOfAdministration Report (API_Method:- ListSigRoutesOfAdministration)
    Mapping_Json106: function mapDatasets_ListSigRoutesOfAdministration(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSigUnits Report (API_Method:- ListSigUnits)
    Mapping_Json107: function mapDatasets_ListSigUnits(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSpecificProducts Report (API_Method:- ListSpecificProducts)
    Mapping_Json108: function mapDatasets_ListSpecificProducts(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            let PackageOrProductFilter;

            // Only construct PackageOrProductFilter if it exists in dataset
            if (dataset.PackageOrProductFilter) {
                const tempFilter = {};
                for (const [idType, ids] of Object.entries(dataset.PackageOrProductFilter)) {
                    if (Array.isArray(ids) && ids.length > 0) {
                        tempFilter.IdType = idType;
                        tempFilter.Id = ids[0]; // Only taking the first ID for now
                        break; // Stop after first non-empty ID array
                    }
                }
                // Only assign if we found a valid ID
                if (tempFilter.Id) {
                    PackageOrProductFilter = tempFilter;
                }
            }

            // Base JSON structure - Includes Drug Identifier conditionally
            const jsonOutput = {
                NameFilter: dataset.NameFilter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token,
            };

            // Only include PackageOrProductFilter if it was created
            if (PackageOrProductFilter) {
                jsonOutput.PackageOrProductFilter = PackageOrProductFilter;
            }

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListStateDEAClassification Report (API_Method:- ListStateDEAClassification)
    Mapping_Json109: function mapDatasets_ListStateDEAClassification(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                StateId: dataset.StateId,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListStateLegendStatus Report (API_Method:- ListStateLegendStatus)
    Mapping_Json110: function mapDatasets_ListStateLegendStatus(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                StateId: dataset.StateId,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListStates Report (API_Method:- ListStates)
    Mapping_Json111: function mapDatasets_ListStates(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListStorage Report (API_Method:- ListStates)
    Mapping_Json112: function mapDatasets_ListStorage(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListSubCandidateProducts Report (API_Method:- ListSubCandidateProducts)
    Mapping_Json113: function mapDatasets_ListSubCandidateProducts(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const ProductId = {};
            for (const [idType, ids] of Object.entries(dataset.ProductId)) {
                if (ids.length > 0) {
                    ProductId.IdType = idType;
                    ProductId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ProductId: ProductId,
                ReturnProductModifier: dataset.ReturnProductModifier,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListTherapeuticConceptTree Report (API_Method:- ListTherapeuticConceptTree)
    Mapping_Json114: function mapDatasets_ListTherapeuticConceptTree(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListTherapeuticEquivalenceCodes Report (API_Method:- ListTherapeuticEquivalenceCodes)
    Mapping_Json115: function mapDatasets_ListTherapeuticEquivalenceCodes(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListUnitDoseIndicators Report (API_Method:- ListUnitDoseIndicators)
    Mapping_Json116: function mapDatasets_ListUnitDoseIndicators(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListUnits Report (API_Method:- ListUnits)
    Mapping_Json117: function mapDatasets_ListUnits(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListWarningLabels Report (API_Method:- ListWarningLabels)
    Mapping_Json118: function mapDatasets_ListWarningLabels(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                FilterType: dataset.FilterType,
                Filter: dataset.Filter,
                LanguageCode: dataset.LanguageCode,
                VendorId: dataset.VendorId,
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - ListWarningLabelVendors Report (API_Method:- ListWarningLabelVendors)
    Mapping_Json119: function mapDatasets_ListWarningLabelVendors(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                MaxResults: dataset.MaxResults,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - (For API_Method:- PregnancyAndLactationByDrug)
    Mapping_Json120: function mapDatasets_PregnancyAndLactationByDrug(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const drugIds = [];
            for (const [idType, ids] of Object.entries(dataset.DrugIds)) {
                ids.forEach((id) => {
                    drugIds.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugIds: drugIds,
                ShowLactationAlternative: dataset.ShowLactationAlternative,
                DateOfBirth: dataset.DateOfBirth,
                FilterBy: dataset.FilterBy,
                Trimester: dataset.Trimester,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json -  (API_Method:- PregnancyAndLactationByDrugClassification)
    Mapping_Json121: function mapDatasets_PregnancyAndLactationByDrugClassification(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                TherapeuticConceptTreeId: dataset.TherapeuticConceptTreeId,
                FilterBy: dataset.FilterBy,
                Trimester: dataset.Trimester,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - (For API_Method:- PregnancyAndLactationInfoByDiagnosis)
    Mapping_Json122: function mapDatasets_PregnancyAndLactationInfoByDiagnosis(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIdentifiers
            const indicationCodes = [];
            for (const [idType, ids] of Object.entries(dataset.IndicationCodes)) {
                ids.forEach((id) => {
                    indicationCodes.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                IndicationCodes: indicationCodes,
                LabelStatus: dataset.LabelStatus,
                DateOfBirth: dataset.DateOfBirth,
                FilterBy: dataset.FilterBy,
                Trimester: dataset.Trimester,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - (API_Method:- PregnancyAndLactationScreeningAlert)
    Mapping_Json123: function mapDatasets_PregnancyAndLactationScreeningAlert(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map PrescribingDrugs
            const prescribingDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribingDrugs)) {
                ids.forEach((id) => {
                    prescribingDrugs.push({ IdType: idType, Id: id });
                });
            }
            const prescribedDrugs = [];
            for (const [idType, ids] of Object.entries(dataset.PrescribedDrugs)) {
                ids.forEach((id) => {
                    prescribedDrugs.push({ IdType: idType, Id: id });
                });
            }

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                PrescribingDrugs: prescribingDrugs,
                PrescribedDrugs: prescribedDrugs,
                DateOfBirth: dataset.ignorePrescribed,
                FilterBy: dataset.FilterBy,
                Trimester: dataset.Trimester,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


    // Generating Mapped Json - PrescriptionOrder Report (API_Method:- PrescriptionOrder)
    Mapping_Json124: function mapDatasets_PrescriptionOrder(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }

        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            const baseJson = {
                OrderableName: dataset.OrderableName,
                Strength: dataset.Strength,
                Unit: dataset.Unit,
                FDAFormId: dataset.FDAFormId,
                RouteId: dataset.RouteId,
                BrandGenericStatus: dataset.BrandGenericStatus,
                ProductNameType: dataset.ProductNameType,
                ReturnRxNormSynonyms: dataset.ReturnRxNormSynonyms,
                MaxResults: dataset.MaxResults,
                AccessToken: Token,
            };

            // Remove keys with missing values
            const jsonOutput = Object.fromEntries(
                Object.entries(baseJson).filter(([key, value]) => value !== undefined && value !== null && value !== "")
            );

            mappedResults[datasetName] = jsonOutput;
        }

        // Return first dataset result
        return Object.values(mappedResults)[0];
    },



    // Generating Mapped Json - ProductIdentifier Report (API_Method:- PrescriptionOrder)
    Mapping_Json125: function mapDatasets_ProductIdentifier(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {

            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                ImprintSide1: dataset.ImprintSide1,
                Scoring: dataset.Scoring,
                DoseFormId: dataset.DoseFormId,
                ColorIds: dataset.ColorIds,
                ShapeId: dataset.ShapeId,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },

    // Generating Mapped Json - list_MFPByPackage Report (API_Method:- ListMFPByPackage)
    Mapping_Json126: function mapDatasets_ListMFPByPackage(dataObjects, Token) {
        if (!dataObjects) {
            throw new Error('dataObjects is undefined or null');
        }
        const mappedResults = {};

        // Iterate over each option in the input parameter
        for (const [datasetName, dataset] of Object.entries(dataObjects)) {
            // Map DrugIds
            const drugId = {};
            for (const [idType, ids] of Object.entries(dataset.DrugId)) {
                if (ids.length > 0) {
                    drugId.IdType = idType;
                    drugId.Id = ids[0];  // Only taking the first ID for now
                }
            }
            // Base JSON structure - Includes Drug Identifier
            const jsonOutput = {
                DrugId: drugId,
                AccessToken: Token, // Placeholder
            };

            // Store the mapped JSON under the dataset name
            mappedResults[datasetName] = jsonOutput;
        }

        return Object.values(mappedResults)[0];
    },


}


