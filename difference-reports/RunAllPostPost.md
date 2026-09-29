# RunAllPostPost — Differences Report

Generated: 2026-09-29T10:52:09.650Z

Total tests: 36 | Passed: 23 | Failed: 13

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| DetailProduct | dataset_1 | POST vs POST | FAILED | 200 | 500 | Status mismatch |
| DetailProduct | dataset_2 | POST vs POST | FAILED | 200 | 500 | Status mismatch |
| DetailProduct | dataset_3 | POST vs POST | FAILED | 200 | 500 | Status mismatch |
| DetailProduct | dataset_4 | POST vs POST | FAILED | 200 | 200 | Data differences (5) |
| DetailProduct | dataset_5 | POST vs POST | FAILED | 200 | 200 | Data differences (2) |
| DetailProduct | dataset_6 | POST vs POST | FAILED | 200 | 200 | Data differences (8) |
| DetailProduct | dataset_7 | POST vs POST | FAILED | 200 | 200 | Data differences (7) |
| DetailProduct | dataset_8 | POST vs POST | FAILED | 200 | 200 | Data differences (5) |
| ListAGSBeersQualityOfEvidence | dataset_1 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersQualityOfEvidence | dataset_2 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersQualityOfEvidence | dataset_3 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersQualityOfEvidence | dataset_4 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersQualityOfEvidence | dataset_5 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersStrengthOfRecommendation | dataset_1 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersStrengthOfRecommendation | dataset_2 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersStrengthOfRecommendation | dataset_3 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersStrengthOfRecommendation | dataset_4 | POST vs POST | PASSED | 200 | 200 | None |
| ListAGSBeersStrengthOfRecommendation | dataset_5 | POST vs POST | PASSED | 200 | 200 | None |
| ListCoatings | dataset_1 | POST vs POST | PASSED | 200 | 200 | None |
| ListCoatings | dataset_2 | POST vs POST | PASSED | 200 | 200 | None |
| ListCoatings | dataset_3 | POST vs POST | PASSED | 200 | 200 | None |
| ListCoatings | dataset_4 | POST vs POST | PASSED | 200 | 200 | None |
| ListCoatings | dataset_5 | POST vs POST | PASSED | 200 | 200 | None |
| ListDocumentationTypes | dataset_1 | POST vs POST | PASSED | 200 | 200 | None |
| ListDocumentationTypes | dataset_2 | POST vs POST | PASSED | 200 | 200 | None |
| ListDocumentationTypes | dataset_3 | POST vs POST | PASSED | 200 | 200 | None |
| ListDocumentationTypes | dataset_4 | POST vs POST | PASSED | 200 | 200 | None |
| ListDocumentationTypes | dataset_5 | POST vs POST | PASSED | 200 | 200 | None |
| ListWarningLabels | dataset_1 | POST vs POST | PASSED | 200 | 200 | None |
| ListWarningLabels | dataset_2 | POST vs POST | FAILED | 200 | 200 | Data differences (4) |
| ListWarningLabels | dataset_3 | POST vs POST | FAILED | 200 | 200 | Data differences (3) |
| ListWarningLabels | dataset_4 | POST vs POST | FAILED | 200 | 200 | Data differences (5) |
| ListWarningLabels | dataset_5 | POST vs POST | PASSED | 200 | 200 | None |
| ListWarningLabels | dataset_6 | POST vs POST | FAILED | 200 | 200 | Data differences (1) |
| ListWarningLabels | dataset_7 | POST vs POST | FAILED | 200 | 200 | Data differences (1) |
| ListWarningLabels | dataset_8 | POST vs POST | PASSED | 200 | 200 | None |

## DetailProduct

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 500 |

**What the difference is:**

Comparison not possible — New (Consolidate POST) returned 500, so there is no body to compare.

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 500 |

**What the difference is:**

Comparison not possible — New (Consolidate POST) returned 500, so there is no body to compare.

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 500 |

**What the difference is:**

Comparison not possible — New (Consolidate POST) returned 500, so there is no body to compare.

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 200 |

**What the difference is:**

There are **real data differences**: 5 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `ePrescribingName` | "Lithium Carbonate 150mg Capsule" | "Lithium Carbonate 150mg Cap" |
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "4" | "D " |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "4" | "D " |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "4" | "D " |
| `Attributes` | null | [] |

### dataset_5 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 200 |

**What the difference is:**

There are **real data differences**: 2 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `ePrescribingName` | "Rose Bengal 1.3mg Ophthalmic Insert" | "Rose Bengal 1.3mg Ophth Insert" |
| `Attributes` | null | [] |

### dataset_6 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 200 |

**What the difference is:**

There are **real data differences**: 8 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "1" | "B " |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "1" | "B " |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "5" | "B " |
| `Attributes` | null | [] |
| `RxNormList[0].TMSY[0]` | "silver sulfADIAZINE 1 % Topical Cream" | "silver sulfADIAZINE 10 MG/ML Topical Cream" |
| `RxNormList[0].TMSY[1]` | "silver sulfADIAZINE 10 MG/ML Topical Cream" | "silver sulfADIAZINE 1 % Topical Cream" |
| `RxNormList[1].SY[0]` | "Silvadene 1 % Topical Cream" | "Silvadene 10 MG/ML Topical Cream" |
| `RxNormList[1].SY[1]` | "Silvadene 10 MG/ML Topical Cream" | "Silvadene 1 % Topical Cream" |

### dataset_7 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 200 |

**What the difference is:**

There are **real data differences**: 3 value change(s), 1 array size change(s), 3 field(s)/item(s) only in Old (POST).

**Array size changes:**

- `PregnancyTrimesters`: Old (POST) has 3 item(s), New (Consolidate POST) has 0 item(s).

**Only in Old (POST):**

- `PregnancyTrimesters[0]` = `{"Number":"First","PregnancyRatings":[{"RatingCode":"2","Factors":[]}]}`
- `PregnancyTrimesters[1]` = `{"Number":"Second","PregnancyRatings":[{"RatingCode":"2","Factors":[]}]}`
- `PregnancyTrimesters[2]` = `{"Number":"Third","PregnancyRatings":[{"RatingCode":"2","Factors":[]}]}`

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `ePrescribingName` | "Sulfamethoxazole/Trimethoprim 800mg-160mg Tablet" | "SMX/TMP 800mg-160mg Tablet" |
| `Attributes` | null | [] |
| `AGSBeersCriteriaItems[0].ProfessionalNotes` | null | "" |

### dataset_8 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/DetailProduct | 200 |

**What the difference is:**

There are **real data differences**: 5 value change(s).

**Value changes:**

| Field path | Old (POST) value | New (Consolidate POST) value |
|---|---|---|
| `ePrescribingName` | "Sulfacetamide Sodium 10% Ophthalmic Solution" | "Sulfacetamide 10% Ophth Solution" |
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "1" | "C " |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "1" | "C " |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "1" | "C " |
| `Attributes` | null | [] |

## ListAGSBeersQualityOfEvidence

### dataset_1 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_2 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_3 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_4 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_5 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListAGSBeersQualityOfEvidence | 200 |

**What the difference is:**

No differences — both responses are identical.

## ListAGSBeersStrengthOfRecommendation

### dataset_1 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_2 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_3 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_4 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_5 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListAGSBeersStrengthOfRecommendation | 200 |

**What the difference is:**

No differences — both responses are identical.

## ListCoatings

### dataset_1 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListCoatings | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_2 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListCoatings | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_3 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListCoatings | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_4 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListCoatings | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_5 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListCoatings | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.dev.gsdd.net/api/ListCoatings | 200 |

**What the difference is:**

No differences — both responses are identical.

## ListDocumentationTypes

### dataset_1 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListDocumentationTypes | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_2 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListDocumentationTypes | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_3 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListDocumentationTypes | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_4 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListDocumentationTypes | 200 |

**What the difference is:**

No differences — both responses are identical.

### dataset_5 — PASSED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/ListDocumentationTypes | 200 |
| New (Consolidate POST) | POST | https://api-consolidation.cert.gsdd.net/api/ListDocumentationTypes | 200 |

**What the difference is:**

No differences — both responses are identical.

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
