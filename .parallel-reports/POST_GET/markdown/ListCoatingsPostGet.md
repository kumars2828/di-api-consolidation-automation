# RunAllPostGetParallel-ListCoatingsPostGet — Differences Report

Generated: 2026-09-29T13:00:09.292Z

Total tests: 5 | Passed: 0 | Failed: 5

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| ListCoatings | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_5 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |

## ListCoatings

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/coating | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `Coatings` to lowercase `coatings`.
- Inside every object in `Coatings`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 7 objects in `Coatings` and their actual values (1/enteric-coated, 2/film-coated, 6/gelatin-coated, 5/gloss-coated, 4/none, 7/not applicable, 3/sugar-coated) are identical between old and new — same order, same count, same content.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/coating | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `Coatings` to lowercase `coatings`.
- Inside every object in `Coatings`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 7 objects in `Coatings` and their actual values (1/enteric-coated, 2/film-coated, 6/gelatin-coated, 5/gloss-coated, 4/none, 7/not applicable, 3/sugar-coated) are identical between old and new — same order, same count, same content.

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/coating | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `Coatings` to lowercase `coatings`.
- Inside every object in `Coatings`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 7 objects in `Coatings` and their actual values (1/enteric-coated, 2/film-coated, 6/gelatin-coated, 5/gloss-coated, 4/none, 7/not applicable, 3/sugar-coated) are identical between old and new — same order, same count, same content.

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/coating | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `Coatings` to lowercase `coatings`.
- Inside every object in `Coatings`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 7 objects in `Coatings` and their actual values (1/enteric-coated, 2/film-coated, 6/gelatin-coated, 5/gloss-coated, 4/none, 7/not applicable, 3/sugar-coated) are identical between old and new — same order, same count, same content.

### dataset_5 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/list/coating | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `Coatings` to lowercase `coatings`.
- Inside every object in `Coatings`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 7 objects in `Coatings` and their actual values (1/enteric-coated, 2/film-coated, 6/gelatin-coated, 5/gloss-coated, 4/none, 7/not applicable, 3/sugar-coated) are identical between old and new — same order, same count, same content.
