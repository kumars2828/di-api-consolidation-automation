# DI API Consolidation Automation

This framework is a centralized API test automation layer built to standardize DI API payload creation and validation.

## What it does
- Defines environment URLs
- Generates access tokens
- Maps raw test data to API request formats
- Supports both POST-to-POST and POST-to-GET patterns
- Validates output using JSON sorting and difference checks
- Reuses the same payload conversion pattern across many APIs

## Why we changed the old framework
Previously, the automation was mostly built around direct POST payloads. That worked only when the consuming API accepted a JSON body in the same pattern as the request.

We changed this by creating a reusable mapping layer:
- raw dataset -> normalized request object
- request object -> API payload
- token injected centrally
- request mode decided dynamically

This allowed the same framework to work for:
- POST vs POST
- POST vs GET

### POST vs POST
The payload is sent in the request body and the API returns JSON in response body.

### POST vs GET
For GET-based APIs, we converted the POST payload into the required query string or route parameters before sending. The framework still keeps the same input model and then maps the response back to a common JSON structure.

So the core idea is:
- same test data
- different request transport
- same validation logic

## How the framework is structured
The main file is:
- `testdata/testdata-global.js`

It contains:
- environment config
- token generator
- date validation
- JSON sorting
- diff comparison
- `Mapping_JsonX` functions for each API method

Each mapping function converts raw test data into the exact JSON contract expected by the API.

Example:
- `DrugIdentifiers` object is converted into:
  `[{ IdType: "NDC", Id: "12345" }]`

## Custom agent design
The custom agent is not a general AI agent in the full ML sense. It is a logic-driven automation agent built around the project’s patterns.

It does:
1. Reads the raw dataset
2. Chooses the right mapping function
3. Adds environment and token details
4. Decides request mode:
   - POST body
   - GET query string
5. Sends the request
6. Sorts and compares JSON
7. Returns the difference if mismatch occurs

This gives us a reusable automation layer instead of writing custom logic for each API call every time.

## Custom AI Agent

The custom AI agent in this project is a lightweight automation layer designed to interpret test data, select the correct API mapping, and execute the request in the correct format without hardcoding custom logic in every test.

It works as a reusable decision engine for API automation. Instead of manually creating payloads for each endpoint, the agent follows a standard workflow:

1. Reads the input dataset
2. Identifies the target API contract
3. Selects the correct `Mapping_JsonX` function
4. Normalizes identifiers, filters, and patient/physician data
5. Adds environment and access token details
6. Chooses the transport pattern:
   - POST with JSON body
   - GET with query string or route parameters
7. Sends the request to the correct environment
8. Validates the response by sorting JSON and comparing differences
9. Highlights mismatches clearly for debugging

This is not a general-purpose AI model doing free-form reasoning. It is a custom logic-based agent built around the patterns of this project. Its purpose is to reduce manual work, keep data transformation consistent, and make the automation reusable across multiple DI APIs.

The agent is valuable because the project contains many similar APIs with slightly different payload structures. Instead of writing a new custom flow for each endpoint, the agent reuses the same workflow and only changes the mapping logic for that API. This gives us:
- consistent payload creation
- faster onboarding for new APIs
- centralized token and environment handling
- reduced duplication
- easier troubleshooting and validation

In short, the custom AI agent acts as a reusable request builder and validator for the API consolidation layer.

## Summary
The biggest change was converting a static POST-only flow into a flexible request framework that supports:
- POST vs POST
- POST vs GET

and wrapping it with a custom mapper/dispatcher agent that handles payload generation, token injection, and validation consistently across all APIs.

### Purpose of the spec
This spec tells the custom agent:

- which method to compare
- which test file to update
- which mapping function to build the payload from
- which mode to run:
  - POST_GET
  - POST_POST
  - BOTH
- which environment to use for primary and secondary calls
- whether the URL path is fixed or generated dynamically
- whether to compare only differences
- whether execution should be serial

### Example: POST_GET
```json
{
  "scope": "SINGLE",
  "method": "ListCoatings",
  "test": "test/list/list_coatings.js",
  "mapping": "Mapping_Json49",
  "runMode": "POST_GET",
  "primary": {
    "baseMode": "helper",
    "baseEnv": "config.cert_env",
    "baseHelper": "testdataGlobal.Endpoint_Url_cert",
    "path": "/api//ListCoatings"
  },
  "secondary": {
    "method": "GET",
    "baseMode": "helper",
    "baseEnv": "config.cert_new_env",
    "baseHelper": "testdataGlobal.Endpoint_Url_staging",
    "pathMode": "static",
    "path": "/api/list/coating"
  },
  "resilientLogging": true,
  "compareDifferencesOnly": true,
  "serialExecution": true
}
```

This means:
- primary call: POST to cert environment
- secondary call: GET to staging environment
- compare both responses after sorting
- only show differences in logs

### Example: POST_POST
```json
{
  "scope": "SINGLE",
  "method": "ListCoatings",
  "test": "test/list/list_coatings.js",
  "mapping": "Mapping_Json49",
  "runMode": "POST_POST",
  "primary": {
    "baseMode": "helper",
    "baseEnv": "config.cert_env",
    "baseHelper": "testdataGlobal.Endpoint_Url_cert",
    "path": "/api//ListCoatings"
  },
  "secondary": {
    "method": "POST",
    "baseMode": "helper",
    "baseEnv": "consolidate",
    "baseHelper": "testdataGlobal.Endpoint_Url_consolidate",
    "pathMode": "static",
    "path": "/api/ListCoatings"
  },
  "resilientLogging": true,
  "compareDifferencesOnly": true,
  "serialExecution": true
}
```

This means:
- primary and secondary both use POST
- each endpoint may still have a different base URL or path
- the agent compares the two responses after normalization

### How the custom agent uses this spec
The custom agent reads the `spec` and then:

1. validates required keys
2. loads the mapping function
3. builds the primary request payload
4. builds the secondary request payload or query
5. resolves base URLs using helper methods or fixed values
6. calls either POST or GET depending on `runMode`
7. captures response details
8. sorts JSON objects and compares differences
9. logs only the meaningful differences when `compareDifferencesOnly=true`

This makes the agent reusable across many DI APIs without manually rewriting per-method logic.
