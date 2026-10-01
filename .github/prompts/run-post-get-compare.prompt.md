---
name: "Run Post Compare"
description: "Convert an existing API test to both POST-vs-GET and POST-vs-POST from its cert, consolidate and GET URLs; discover the mapper and dataset in the file. Also supports structured specs and batch runs."
agent: "Post Compare Agent"
model: "GPT-5 (copilot)"
argument-hint: 'test=test/path/file.js cert=https://.../api/MethodName consolidate=https://.../api/MethodName get=https://.../knowledge/... (optional: spec={...} or scope=ALL_METHODS runMode=POST_GET|POST_POST|BOTH)'
---
Apply the post comparison workflow for the input below.

User input:
{{input}}

Requirements:
- If `scope=ALL_METHODS`, run the batch command(s) for runMode:
	- `POST_GET` -> `npm run RunAllPostGet`
	- `POST_POST` -> `npm run RunAllPostPost`
	- `BOTH` -> run `npm run RunAllPostGet` and then `npm run RunAllPostPost`.
- If `scope=ALL_METHODS`, do not edit test files; return run summary and failed scripts.
- For a new API with three supplied URLs, use the active test file or `test=...`; read its dataset reference and mapper and derive the method from that file. Do not require the user to restate the mapper or a full JSON spec. Parse each URL into its own host and path; ask only for missing or ambiguous details.
- For a new `scope=SINGLE` method, default to implementing both `POST_GET` and `POST_POST`. The three provided URLs supply primary, secondary GET and secondary POST endpoints; each run still selects only one mode.
- Three supplied `cert`, `consolidate`, and `get` URLs always mean `runMode=BOTH` unless the user explicitly requests only one mode. Do not infer POST_GET-only behavior from this prompt's legacy filename or invocation wording.
- Define `environment_1`, `environment_2`, `runMode`, `isPostGetMode`, and `isPostPostMode`; fetch a separate secondary token only in `POST_POST`, and use it for the secondary POST payload.
- Check each required token is non-empty in `before`; never print a token to the console. Show the real mapped AccessToken in both POST request contexts; redact it from response and difference contexts. Warn that local HTML/JSON reports will contain secrets.
- Reuse existing mapping function from the target test.
- Allow primary and secondary URLs to be fully different (base and path both independent).
- Prefer helper-based base URL generation using config + testdataGlobal (detail_product style) for both calls.
- Use fixed absolute base URLs only when the input explicitly asks for fixed URLs.
- For the GET mode, put GET path construction in utilities/query-builders/get_query.js using a method-specific function (including static paths).
- If the method's GET query is based on the dataObjects loop, pass the raw dataset object into the builder.
- If the method's GET query is based on the POST payload, pass the mapped POST body into the builder.
- Keep POST paths explicit and route the GET path through the shared get_query helper.
- Add Mochawesome request and response contexts for both calls.
- Ensure both calls' status code plus response payload are logged even if one call fails.
- Prefer resilient dual-call handling (for example, allSettled) so one failed request does not hide the other response details.
- Execute only the selected runMode path; do not run both modes together.
- In comparison context, log only differences when compareDifferencesOnly=true.
- Keep changes minimal and avoid unrelated refactors.
- Validate the separate PostGet and PostPost scripts for methods supporting both modes, and report their results separately.
- Report modified files and test result.
