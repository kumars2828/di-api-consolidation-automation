# RunAllPostGetParallel-ListWarningLabelsPostGet — Differences Report

Generated: 2026-09-29T13:00:14.314Z

Total tests: 8 | Passed: 0 | Failed: 8

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| ListWarningLabels | dataset_1 | POST vs GET | FAILED | 200 | 204 (No Content) | Status mismatch |
| ListWarningLabels | dataset_2 | POST vs GET | FAILED | 200 | 200 | Data differences (8) + casing |
| ListWarningLabels | dataset_3 | POST vs GET | FAILED | 200 | 200 | Data differences (7) + casing |
| ListWarningLabels | dataset_4 | POST vs GET | FAILED | 200 | 200 | Data differences (9) + casing |
| ListWarningLabels | dataset_5 | POST vs GET | FAILED | 200 | 204 (No Content) | Status mismatch |
| ListWarningLabels | dataset_6 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| ListWarningLabels | dataset_7 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| ListWarningLabels | dataset_8 | POST vs GET | FAILED | 200 | 200 | Data differences (4) + casing |

## ListWarningLabels

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelId&q=1369&languageCode=es&vendorId=1&returnShortText=true&size=15 | 204 (No Content) |

**What the difference is:**

Comparison not possible — New (GET) returned 204 (No Content), so there is no body to compare.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelText&q=%25para%25&languageCode=fr&returnShortText=true&size=20 | 200 |

**What the difference is:**

There are **real data differences**: 4 value change(s), 4 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `WarningLabels` to camelCase `warningLabels`.
- Inside every object in `WarningLabels`, the keys `WarningLabelId`, `WarningLabelText`, `WarningLabelTextShort`, `VendorCode` were also renamed to `warningLabelId`, `warningLabelText`, `warningLabelTextShort`, `vendorCode`.

**Only in New (GET):**

- `count` = `4`
- `totalItems` = `4`
- `page` = `1`
- `pageSize` = `20`

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |
| `WarningLabels[1].VendorCode` | null | [] |
| `WarningLabels[2].VendorCode` | null | [] |
| `WarningLabels[3].VendorCode` | null | [] |

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelText&q=%25Limite%25&languageCode=es&returnShortText=true&size=20 | 200 |

**What the difference is:**

There are **real data differences**: 3 value change(s), 4 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `WarningLabels` to camelCase `warningLabels`.
- Inside every object in `WarningLabels`, the keys `WarningLabelId`, `WarningLabelText`, `WarningLabelTextShort`, `VendorCode` were also renamed to `warningLabelId`, `warningLabelText`, `warningLabelTextShort`, `vendorCode`.

**Only in New (GET):**

- `count` = `3`
- `totalItems` = `3`
- `page` = `1`
- `pageSize` = `20`

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |
| `WarningLabels[1].VendorCode` | null | [] |
| `WarningLabels[2].VendorCode` | null | [] |

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelText&q=%25tomar%25&languageCode=es&vendorId=1&returnShortText=true&size=30 | 200 |

**What the difference is:**

There are **real data differences**: 5 value change(s), 4 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `WarningLabels` to camelCase `warningLabels`.
- Inside every object in `WarningLabels`, the keys `WarningLabelId`, `WarningLabelText`, `WarningLabelTextShort`, `VendorCode` were also renamed to `warningLabelId`, `warningLabelText`, `warningLabelTextShort`, `vendorCode`.

**Only in New (GET):**

- `count` = `30`
- `totalItems` = `64`
- `page` = `1`
- `pageSize` = `30`

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `WarningLabels[2].WarningLabelText` | "TOMAR CON ALIMENTOS\r\n" | "TOMAR CON ALIMENTOS" |
| `WarningLabels[5].WarningLabelText` | "TOMAR CON ALIMENTOS O LECHE\r\n" | "TOMAR CON ALIMENTOS O LECHE" |
| `WarningLabels[10].WarningLabelText` | "Para controlar su presión sanguínea tomar regularmente. NO suspenda el uso excepto si así lo indica su médico\r\n" | "Para controlar su presión sanguínea tomar regularmente. NO suspenda el uso excepto si así lo indica su médico" |
| `WarningLabels[29].WarningLabelText` | "Tomar con el desayuno o con la primera comida del día.\r\n" | "Tomar con el desayuno o con la primera comida del día." |
| `WarningLabels[29].WarningLabelTextShort` | "Tomar con el desayuno o con la primera comida del día.\r\n" | "Tomar con el desayuno o con la primera comida del día." |

### dataset_5 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelText&q=%25prendre%25&languageCode=es&vendorId=1&returnShortText=true&size=20 | 204 (No Content) |

**What the difference is:**

Comparison not possible — New (GET) returned 204 (No Content), so there is no body to compare.

### dataset_6 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelId&q=10&languageCode=es&returnShortText=true&size=20 | 200 |

**What the difference is:**

There are **real data differences**: 1 value change(s), 4 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `WarningLabels` to camelCase `warningLabels`.
- Inside every object in `WarningLabels`, the keys `WarningLabelId`, `WarningLabelText`, `WarningLabelTextShort`, `VendorCode` were also renamed to `warningLabelId`, `warningLabelText`, `warningLabelTextShort`, `vendorCode`.

**Only in New (GET):**

- `count` = `1`
- `totalItems` = `1`
- `page` = `1`
- `pageSize` = `20`

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |

### dataset_7 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelId&q=12&languageCode=fr&returnShortText=true&size=20 | 200 |

**What the difference is:**

There are **real data differences**: 1 value change(s), 4 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `WarningLabels` to camelCase `warningLabels`.
- Inside every object in `WarningLabels`, the keys `WarningLabelId`, `WarningLabelText`, `WarningLabelTextShort`, `VendorCode` were also renamed to `warningLabelId`, `warningLabelText`, `warningLabelTextShort`, `vendorCode`.

**Only in New (GET):**

- `count` = `1`
- `totalItems` = `1`
- `page` = `1`
- `pageSize` = `20`

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |

### dataset_8 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/warning-label/label?type=WarningLabelId&q=13&languageCode=fr&vendorId=1&returnShortText=true&size=100 | 200 |

**What the difference is:**

There are **real data differences**: 4 field(s)/item(s) only in New (GET). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level field was renamed from PascalCase `WarningLabels` to camelCase `warningLabels`.
- Inside every object in `WarningLabels`, the keys `WarningLabelId`, `WarningLabelText`, `WarningLabelTextShort`, `VendorCode` were also renamed to `warningLabelId`, `warningLabelText`, `warningLabelTextShort`, `vendorCode`.

**Only in New (GET):**

- `count` = `1`
- `totalItems` = `1`
- `page` = `1`
- `pageSize` = `100`
