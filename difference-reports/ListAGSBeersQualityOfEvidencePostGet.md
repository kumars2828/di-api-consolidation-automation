# ListAGSBeersQualityOfEvidencePostGet — Differences Report

Generated: 2026-09-29T10:50:02.178Z

Total tests: 5 | Passed: 0 | Failed: 5

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Data differences |
|---|---|---|---|---|---|---|
| ListAGSBeersQualityOfEvidence | dataset_1 | POST vs GET | FAILED | 200 | 200 | 0 |
| ListAGSBeersQualityOfEvidence | dataset_2 | POST vs GET | FAILED | 200 | 200 | 0 |
| ListAGSBeersQualityOfEvidence | dataset_3 | POST vs GET | FAILED | 200 | 200 | 0 |
| ListAGSBeersQualityOfEvidence | dataset_4 | POST vs GET | FAILED | 200 | 200 | 0 |
| ListAGSBeersQualityOfEvidence | dataset_5 | POST vs GET | FAILED | 200 | 200 | 3 |

## ListAGSBeersQualityOfEvidence

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/quality-of-evidence | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersQualityOfEvidence` to camelCase `agsBeersQualityOfEvidence`.
- Inside every object in `AGSBeersQualityOfEvidence`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 5 objects in `AGSBeersQualityOfEvidence` and their actual values (8/Moderate, 15/Low, 19/Moderate, 25/Moderate, 26/High) are identical between old and new — same order, same count, same content.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/quality-of-evidence | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersQualityOfEvidence` to camelCase `agsBeersQualityOfEvidence`.
- Inside every object in `AGSBeersQualityOfEvidence`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 5 objects in `AGSBeersQualityOfEvidence` and their actual values (8/Moderate, 15/Low, 19/Moderate, 25/Moderate, 26/High) are identical between old and new — same order, same count, same content.

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/quality-of-evidence | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersQualityOfEvidence` to camelCase `agsBeersQualityOfEvidence`.
- Inside every object in `AGSBeersQualityOfEvidence`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 5 objects in `AGSBeersQualityOfEvidence` and their actual values (8/Moderate, 15/Low, 19/Moderate, 25/Moderate, 26/High) are identical between old and new — same order, same count, same content.

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/quality-of-evidence | 200 |

**What the difference is:**

This is a **field-name casing change only** — no data values changed.

- The top-level field was renamed from PascalCase `AGSBeersQualityOfEvidence` to camelCase `agsBeersQualityOfEvidence`.
- Inside every object in `AGSBeersQualityOfEvidence`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- All 5 objects in `AGSBeersQualityOfEvidence` and their actual values (8/Moderate, 15/Low, 19/Moderate, 25/Moderate, 26/High) are identical between old and new — same order, same count, same content.

### dataset_5 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/beers/quality-of-evidence | 200 |

**What the difference is:**

There are **real data differences**: 1 array size change(s), 2 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `AGSBeersQualityOfEvidence` to camelCase `agsBeersQualityOfEvidence`.
- Inside every object in `AGSBeersQualityOfEvidence`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Array size changes:**

- `AGSBeersQualityOfEvidence`: Old (POST) has 3 item(s), New (GET) has 5 item(s).

**Only in New (GET):**

- `AGSBeersQualityOfEvidence[3]` = `{"id":25,"name":"Moderate"}`
- `AGSBeersQualityOfEvidence[4]` = `{"id":26,"name":"High"}`
