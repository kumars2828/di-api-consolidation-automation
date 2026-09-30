# RunAllPostPostParallel-ListWarningLabelsPostPost — Differences Report

Generated: 2026-09-29T13:04:25.919Z

Total tests: 8 | Passed: 3 | Failed: 5

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| ListWarningLabels | dataset_1 | POST vs POST | PASSED | 200 | 200 | None |
| ListWarningLabels | dataset_2 | POST vs POST | FAILED | 200 | 200 | Data differences (4) |
| ListWarningLabels | dataset_3 | POST vs POST | FAILED | 200 | 200 | Data differences (3) |
| ListWarningLabels | dataset_4 | POST vs POST | FAILED | 200 | 200 | Data differences (5) |
| ListWarningLabels | dataset_5 | POST vs POST | PASSED | 200 | 200 | None |
| ListWarningLabels | dataset_6 | POST vs POST | FAILED | 200 | 200 | Data differences (1) |
| ListWarningLabels | dataset_7 | POST vs POST | FAILED | 200 | 200 | Data differences (1) |
| ListWarningLabels | dataset_8 | POST vs POST | PASSED | 200 | 200 | None |

## ListWarningLabels

### dataset_1 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

There are **real data differences**: 4 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |
| `WarningLabels[1].VendorCode` | null | [] |
| `WarningLabels[2].VendorCode` | null | [] |
| `WarningLabels[3].VendorCode` | null | [] |

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

There are **real data differences**: 3 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |
| `WarningLabels[1].VendorCode` | null | [] |
| `WarningLabels[2].VendorCode` | null | [] |

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

There are **real data differences**: 5 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `WarningLabels[2].WarningLabelText` | "TOMAR CON ALIMENTOS\r\n" | "TOMAR CON ALIMENTOS" |
| `WarningLabels[5].WarningLabelText` | "TOMAR CON ALIMENTOS O LECHE\r\n" | "TOMAR CON ALIMENTOS O LECHE" |
| `WarningLabels[10].WarningLabelText` | "Para controlar su presión sanguínea tomar regularmente. NO suspenda el uso excepto si así lo indica su médico\r\n" | "Para controlar su presión sanguínea tomar regularmente. NO suspenda el uso excepto si así lo indica su médico" |
| `WarningLabels[29].WarningLabelText` | "Tomar con el desayuno o con la primera comida del día.\r\n" | "Tomar con el desayuno o con la primera comida del día." |
| `WarningLabels[29].WarningLabelTextShort` | "Tomar con el desayuno o con la primera comida del día.\r\n" | "Tomar con el desayuno o con la primera comida del día." |

### dataset_5 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_6 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

There are **real data differences**: 1 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |

### dataset_7 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

There are **real data differences**: 1 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `WarningLabels[0].VendorCode` | null | [] |

### dataset_8 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListWarningLabels | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListWarningLabels | 200 |

**What the difference is:**

No differences — both responses are identical.
