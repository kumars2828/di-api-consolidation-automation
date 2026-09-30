# RunAllPostGetParallel-ListAGSBeersStrengthOfRecommendationPostGet — Differences Report

Generated: 2026-09-29T13:00:09.430Z

Total tests: 5 | Passed: 0 | Failed: 5

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| ListAGSBeersStrengthOfRecommendation | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_5 | POST vs GET | FAILED | 200 | 200 | Data differences (3) + casing |

## ListAGSBeersStrengthOfRecommendation

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/strength-of-recommendation | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersStrengthOfRecommendation` to camelCase `agsBeersStrengthOfRecommendation`.
- Inside every object in `AGSBeersStrengthOfRecommendation`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 4 objects in `AGSBeersStrengthOfRecommendation` and their actual values (1/Strong, 6/Weak, 13/Strong, 14/Strong) are identical between old and new — same order, same count, same content.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/strength-of-recommendation | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersStrengthOfRecommendation` to camelCase `agsBeersStrengthOfRecommendation`.
- Inside every object in `AGSBeersStrengthOfRecommendation`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 4 objects in `AGSBeersStrengthOfRecommendation` and their actual values (1/Strong, 6/Weak, 13/Strong, 14/Strong) are identical between old and new — same order, same count, same content.

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/strength-of-recommendation | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersStrengthOfRecommendation` to camelCase `agsBeersStrengthOfRecommendation`.
- Inside every object in `AGSBeersStrengthOfRecommendation`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 4 objects in `AGSBeersStrengthOfRecommendation` and their actual values (1/Strong, 6/Weak, 13/Strong, 14/Strong) are identical between old and new — same order, same count, same content.

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/strength-of-recommendation | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersStrengthOfRecommendation` to camelCase `agsBeersStrengthOfRecommendation`.
- Inside every object in `AGSBeersStrengthOfRecommendation`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 4 objects in `AGSBeersStrengthOfRecommendation` and their actual values (1/Strong, 6/Weak, 13/Strong, 14/Strong) are identical between old and new — same order, same count, same content.

### dataset_5 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/strength-of-recommendation | 200 |

**What the difference is:**

There are **real data differences**: 1 array size change(s), 2 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `AGSBeersStrengthOfRecommendation` to camelCase `agsBeersStrengthOfRecommendation`.
- Inside every object in `AGSBeersStrengthOfRecommendation`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Array size changes:**

- `AGSBeersStrengthOfRecommendation`: Old (POST) has 2 item(s), New (GET) has 4 item(s).

**Only in New (GET):**

- `AGSBeersStrengthOfRecommendation[2]` = `{"id":13,"name":"Strong"}`
- `AGSBeersStrengthOfRecommendation[3]` = `{"id":14,"name":"Strong"}`
