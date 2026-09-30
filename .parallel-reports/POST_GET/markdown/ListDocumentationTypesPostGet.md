# RunAllPostGetParallel-ListDocumentationTypesPostGet — Differences Report

Generated: 2026-09-29T13:00:11.284Z

Total tests: 5 | Passed: 0 | Failed: 5

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| ListDocumentationTypes | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_5 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |

## ListDocumentationTypes

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/documentation-type | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `DocumentationTypes` to camelCase `documentationTypes`.
- Inside every object in `DocumentationTypes`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 3 objects in `DocumentationTypes` and their actual values (1/Established, 2/Likely Established, 3/Not Established) are identical between old and new — same order, same count, same content.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/documentation-type | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `DocumentationTypes` to camelCase `documentationTypes`.
- Inside every object in `DocumentationTypes`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 3 objects in `DocumentationTypes` and their actual values (1/Established, 2/Likely Established, 3/Not Established) are identical between old and new — same order, same count, same content.

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/documentation-type | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `DocumentationTypes` to camelCase `documentationTypes`.
- Inside every object in `DocumentationTypes`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 3 objects in `DocumentationTypes` and their actual values (1/Established, 2/Likely Established, 3/Not Established) are identical between old and new — same order, same count, same content.

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/documentation-type | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `DocumentationTypes` to camelCase `documentationTypes`.
- Inside every object in `DocumentationTypes`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 3 objects in `DocumentationTypes` and their actual values (1/Established, 2/Likely Established, 3/Not Established) are identical between old and new — same order, same count, same content.

### dataset_5 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/documentation-type | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `DocumentationTypes` to camelCase `documentationTypes`.
- Inside every object in `DocumentationTypes`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 3 objects in `DocumentationTypes` and their actual values (1/Established, 2/Likely Established, 3/Not Established) are identical between old and new — same order, same count, same content.
