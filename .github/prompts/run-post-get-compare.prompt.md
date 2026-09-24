---
name: "Run Post Compare"
description: "Run agentic workflow to convert any API test to POST-vs-GET or POST-vs-POST comparison with shared query builder and Mochawesome response logging."
agent: "Post Compare Agent"
model: "GPT-5 (copilot)"
argument-hint: "spec={\"scope\":\"SINGLE|ALL_METHODS\",\"method\":\"MethodName\",\"test\":\"test/path/file.js\",\"mapping\":\"Mapping_JsonXX\",\"runMode\":\"POST_GET|POST_POST|BOTH\",\"primary\":{\"baseMode\":\"helper|fixed\",\"baseEnv\":\"config.xxx\",\"baseHelper\":\"testdataGlobal.Endpoint_Url_cert|testdataGlobal.Endpoint_Url_staging\",\"baseUrl\":\"https://...\",\"path\":\"/api/...\"},\"secondary\":{\"method\":\"GET|POST\",\"baseMode\":\"helper|fixed\",\"baseEnv\":\"config.xxx\",\"baseHelper\":\"testdataGlobal.Endpoint_Url_staging|testdataGlobal.Endpoint_Url_cert|testdataGlobal.Endpoint_Url_consolidate\",\"baseUrl\":\"https://...\",\"pathMode\":\"static|builder\",\"path\":\"/api/...|/knowledge/...\",\"builder\":\"Method_GetPath\",\"builderSource\":\"dataset|mappedPost\"},\"resilientLogging\":true,\"compareDifferencesOnly\":true,\"serialExecution\":true} | Example POST_GET: spec={\"scope\":\"SINGLE\",\"method\":\"ListCoatings\",\"test\":\"test/list/list_coatings.js\",\"mapping\":\"Mapping_Json49\",\"runMode\":\"POST_GET\",\"primary\":{\"baseMode\":\"helper\",\"baseEnv\":\"config.cert_env\",\"baseHelper\":\"testdataGlobal.Endpoint_Url_cert\",\"path\":\"/api//ListCoatings\"},\"secondary\":{\"method\":\"GET\",\"baseMode\":\"helper\",\"baseEnv\":\"config.cert_new_env\",\"baseHelper\":\"testdataGlobal.Endpoint_Url_staging\",\"pathMode\":\"static\",\"path\":\"/api/list/coating\"},\"resilientLogging\":true,\"compareDifferencesOnly\":true,\"serialExecution\":true} | Example POST_POST: spec={\"scope\":\"SINGLE\",\"method\":\"ListCoatings\",\"test\":\"test/list/list_coatings.js\",\"mapping\":\"Mapping_Json49\",\"runMode\":\"POST_POST\",\"primary\":{\"baseMode\":\"helper\",\"baseEnv\":\"config.cert_env\",\"baseHelper\":\"testdataGlobal.Endpoint_Url_cert\",\"path\":\"/api//ListCoatings\"},\"secondary\":{\"method\":\"POST\",\"baseMode\":\"helper\",\"baseEnv\":\"consolidate\",\"baseHelper\":\"testdataGlobal.Endpoint_Url_consolidate\",\"pathMode\":\"static\",\"path\":\"/api/ListCoatings\"},\"resilientLogging\":true,\"compareDifferencesOnly\":true,\"serialExecution\":true} | Example ALL_METHODS BOTH: spec={\"scope\":\"ALL_METHODS\",\"runMode\":\"BOTH\"}"
---
Apply the post comparison workflow for the input below.

User input:
{{input}}

Requirements:
- If `scope=ALL_METHODS`, run only one batch command based on runMode:
	- `POST_GET` -> `npm run RunAllPostGet`
	- `POST_POST` -> `npm run RunAllPostPost`
	- `BOTH` -> `npm run RunAllPostCompare`
- If `scope=ALL_METHODS`, do not edit test files; return run summary and failed scripts.
- Reuse existing mapping function from the target test.
- Allow primary and secondary URLs to be fully different (base and path both independent).
- Prefer helper-based base URL generation using config + testdataGlobal (detail_product style) for both calls.
- Use fixed absolute base URLs only when the input explicitly asks for fixed URLs.
- If secondary.method=GET and getPathMode=builder, put GET query construction in utilities/query-builders/get_query.js using a method-specific function.
- If the method's GET query is based on the dataObjects loop, pass the raw dataset object into the builder.
- If the method's GET query is based on the POST payload, pass the mapped POST body into the builder.
- If pathMode=static, use provided path directly.
- Update test to call shared get_query helper only when builder mode is used.
- Add Mochawesome request and response contexts for both calls.
- Ensure both calls' status code plus response payload are logged even if one call fails.
- Prefer resilient dual-call handling (for example, allSettled) so one failed request does not hide the other response details.
- Execute only the selected runMode path; do not run both modes together.
- In comparison context, log only differences when compareDifferencesOnly=true.
- Keep changes minimal and avoid unrelated refactors.
- Run the most targeted mocha command possible for the edited test.
- Report modified files and test result.
