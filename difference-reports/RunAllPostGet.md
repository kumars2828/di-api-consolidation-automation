# RunAllPostGet — Differences Report

Generated: 2026-09-29T10:51:17.997Z

Total tests: 36 | Passed: 0 | Failed: 36

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| DetailProduct | dataset_1 | POST vs GET | FAILED | 200 | 200 | Data differences (13) + casing |
| DetailProduct | dataset_2 | POST vs GET | FAILED | 200 | 200 | Data differences (13) + casing |
| DetailProduct | dataset_3 | POST vs GET | FAILED | 200 | 200 | Data differences (13) + casing |
| DetailProduct | dataset_4 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| DetailProduct | dataset_5 | POST vs GET | FAILED | 200 | 200 | Data differences (2) + casing |
| DetailProduct | dataset_6 | POST vs GET | FAILED | 200 | 200 | Data differences (8) + casing |
| DetailProduct | dataset_7 | POST vs GET | FAILED | 200 | 200 | Data differences (7) + casing |
| DetailProduct | dataset_8 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| ListAGSBeersQualityOfEvidence | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersQualityOfEvidence | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersQualityOfEvidence | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersQualityOfEvidence | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersQualityOfEvidence | dataset_5 | POST vs GET | FAILED | 200 | 200 | Data differences (3) + casing |
| ListAGSBeersStrengthOfRecommendation | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListAGSBeersStrengthOfRecommendation | dataset_5 | POST vs GET | FAILED | 200 | 200 | Data differences (3) + casing |
| ListCoatings | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListCoatings | dataset_5 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_1 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_2 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_3 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_4 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListDocumentationTypes | dataset_5 | POST vs GET | FAILED | 200 | 200 | Field-name casing only |
| ListWarningLabels | dataset_1 | POST vs GET | FAILED | 200 | 204 (No Content) | Status mismatch |
| ListWarningLabels | dataset_2 | POST vs GET | FAILED | 200 | 200 | Data differences (8) + casing |
| ListWarningLabels | dataset_3 | POST vs GET | FAILED | 200 | 200 | Data differences (7) + casing |
| ListWarningLabels | dataset_4 | POST vs GET | FAILED | 200 | 200 | Data differences (9) + casing |
| ListWarningLabels | dataset_5 | POST vs GET | FAILED | 200 | 204 (No Content) | Status mismatch |
| ListWarningLabels | dataset_6 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| ListWarningLabels | dataset_7 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| ListWarningLabels | dataset_8 | POST vs GET | FAILED | 200 | 200 | Data differences (4) + casing |

## DetailProduct

### dataset_1 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=6750&type=ProductId | 200 |

**What the difference is:**

There are **real data differences**: 13 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside every object in `PregnancyTrimesters`, the keys `Number`, `PregnancyRatings` were also renamed to `number`, `pregnancyRatings`.
- Inside every object in `PregnancyTrimesters[*].PregnancyRatings`, the keys `RatingCode`, `Factors` were also renamed to `ratingCode`, `factors`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `AGSBeersCriteriaItems`, the keys `RationalId`, `RationalText`, `QualityOfEvidenceId`, `QualityOfEvidenceText`, `StrengthOfRecommendationId`, `StrengthOfRecommendationText`, `TherapeuticCategoryOrganSystemId`, `TherapeuticCategoryOrganSystemText`, `DiseaseSyndromeStatementId`, `DiseaseSyndromeStatementText`, `DiseaseSyndromeCategoryId`, `DiseaseSyndromeCategoryText`, `ModifierAId`, `ModifierAText`, `ModifierBId`, `ModifierBText`, `AvoidCautionId`, `AvoidCautionText`, `TableName`, `TableDescription`, `ProfessionalNotes` were also renamed to `rationalId`, `rationalText`, `qualityOfEvidenceId`, `qualityOfEvidenceText`, `strengthOfRecommendationId`, `strengthOfRecommendationText`, `therapeuticCategoryOrganSystemId`, `therapeuticCategoryOrganSystemText`, `diseaseSyndromeStatementId`, `diseaseSyndromeStatementText`, `diseaseSyndromeCategoryId`, `diseaseSyndromeCategoryText`, `modifierAId`, `modifierAText`, `modifierBId`, `modifierBText`, `avoidCautionId`, `avoidCautionText`, `tableName`, `tableDescription`, `professionalNotes`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "3" | "NA" |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "3" | "NA" |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "4" | "NA" |
| `Attributes` | null | [] |
| `AGSBeersCriteriaItems[0].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[1].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[2].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[3].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[4].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[5].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[6].TherapeuticCategoryOrganSystemId` | 0 | null |
| `AGSBeersCriteriaItems[6].TherapeuticCategoryOrganSystemText` | "" | null |
| `AGSBeersCriteriaItems[6].ProfessionalNotes` | null | "" |

### dataset_2 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=6751&type=ProductId | 200 |

**What the difference is:**

There are **real data differences**: 13 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside every object in `PregnancyTrimesters`, the keys `Number`, `PregnancyRatings` were also renamed to `number`, `pregnancyRatings`.
- Inside every object in `PregnancyTrimesters[*].PregnancyRatings`, the keys `RatingCode`, `Factors` were also renamed to `ratingCode`, `factors`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `AGSBeersCriteriaItems`, the keys `RationalId`, `RationalText`, `QualityOfEvidenceId`, `QualityOfEvidenceText`, `StrengthOfRecommendationId`, `StrengthOfRecommendationText`, `TherapeuticCategoryOrganSystemId`, `TherapeuticCategoryOrganSystemText`, `DiseaseSyndromeStatementId`, `DiseaseSyndromeStatementText`, `DiseaseSyndromeCategoryId`, `DiseaseSyndromeCategoryText`, `ModifierAId`, `ModifierAText`, `ModifierBId`, `ModifierBText`, `AvoidCautionId`, `AvoidCautionText`, `TableName`, `TableDescription`, `ProfessionalNotes` were also renamed to `rationalId`, `rationalText`, `qualityOfEvidenceId`, `qualityOfEvidenceText`, `strengthOfRecommendationId`, `strengthOfRecommendationText`, `therapeuticCategoryOrganSystemId`, `therapeuticCategoryOrganSystemText`, `diseaseSyndromeStatementId`, `diseaseSyndromeStatementText`, `diseaseSyndromeCategoryId`, `diseaseSyndromeCategoryText`, `modifierAId`, `modifierAText`, `modifierBId`, `modifierBText`, `avoidCautionId`, `avoidCautionText`, `tableName`, `tableDescription`, `professionalNotes`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "3" | "NA" |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "3" | "NA" |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "4" | "NA" |
| `Attributes` | null | [] |
| `AGSBeersCriteriaItems[0].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[1].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[2].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[3].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[4].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[5].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[6].TherapeuticCategoryOrganSystemId` | 0 | null |
| `AGSBeersCriteriaItems[6].TherapeuticCategoryOrganSystemText` | "" | null |
| `AGSBeersCriteriaItems[6].ProfessionalNotes` | null | "" |

### dataset_3 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=6752&type=ProductId | 200 |

**What the difference is:**

There are **real data differences**: 13 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside every object in `PregnancyTrimesters`, the keys `Number`, `PregnancyRatings` were also renamed to `number`, `pregnancyRatings`.
- Inside every object in `PregnancyTrimesters[*].PregnancyRatings`, the keys `RatingCode`, `Factors` were also renamed to `ratingCode`, `factors`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `AGSBeersCriteriaItems`, the keys `RationalId`, `RationalText`, `QualityOfEvidenceId`, `QualityOfEvidenceText`, `StrengthOfRecommendationId`, `StrengthOfRecommendationText`, `TherapeuticCategoryOrganSystemId`, `TherapeuticCategoryOrganSystemText`, `DiseaseSyndromeStatementId`, `DiseaseSyndromeStatementText`, `DiseaseSyndromeCategoryId`, `DiseaseSyndromeCategoryText`, `ModifierAId`, `ModifierAText`, `ModifierBId`, `ModifierBText`, `AvoidCautionId`, `AvoidCautionText`, `TableName`, `TableDescription`, `ProfessionalNotes` were also renamed to `rationalId`, `rationalText`, `qualityOfEvidenceId`, `qualityOfEvidenceText`, `strengthOfRecommendationId`, `strengthOfRecommendationText`, `therapeuticCategoryOrganSystemId`, `therapeuticCategoryOrganSystemText`, `diseaseSyndromeStatementId`, `diseaseSyndromeStatementText`, `diseaseSyndromeCategoryId`, `diseaseSyndromeCategoryText`, `modifierAId`, `modifierAText`, `modifierBId`, `modifierBText`, `avoidCautionId`, `avoidCautionText`, `tableName`, `tableDescription`, `professionalNotes`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "3" | "NA" |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "3" | "NA" |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "4" | "NA" |
| `Attributes` | null | [] |
| `AGSBeersCriteriaItems[0].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[1].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[2].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[3].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[4].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[5].ProfessionalNotes` | null | "" |
| `AGSBeersCriteriaItems[6].TherapeuticCategoryOrganSystemId` | 0 | null |
| `AGSBeersCriteriaItems[6].TherapeuticCategoryOrganSystemText` | "" | null |
| `AGSBeersCriteriaItems[6].ProfessionalNotes` | null | "" |

### dataset_4 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=6754&type=ProductId | 200 |

**What the difference is:**

There are **real data differences**: 5 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside every object in `PregnancyTrimesters`, the keys `Number`, `PregnancyRatings` were also renamed to `number`, `pregnancyRatings`.
- Inside every object in `PregnancyTrimesters[*].PregnancyRatings`, the keys `RatingCode`, `Factors` were also renamed to `ratingCode`, `factors`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
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
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=17478-0402&type=NDC9 | 200 |

**What the difference is:**

There are **real data differences**: 2 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `ePrescribingName` | "Rose Bengal 1.3mg Ophthalmic Insert" | "Rose Bengal 1.3mg Ophth Insert" |
| `Attributes` | null | [] |

### dataset_6 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=66267-0945&type=NDC9 | 200 |

**What the difference is:**

There are **real data differences**: 8 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside every object in `PregnancyTrimesters`, the keys `Number`, `PregnancyRatings` were also renamed to `number`, `pregnancyRatings`.
- Inside every object in `PregnancyTrimesters[*].PregnancyRatings`, the keys `RatingCode`, `Factors` were also renamed to `ratingCode`, `factors`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
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
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=66267-0196&type=NDC9 | 200 |

**What the difference is:**

There are **real data differences**: 3 value change(s), 1 array size change(s), 3 field(s)/item(s) only in Old (POST). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `AGSBeersCriteriaItems`, the keys `RationalId`, `RationalText`, `QualityOfEvidenceId`, `QualityOfEvidenceText`, `StrengthOfRecommendationId`, `StrengthOfRecommendationText`, `TherapeuticCategoryOrganSystemId`, `TherapeuticCategoryOrganSystemText`, `DiseaseSyndromeStatementId`, `DiseaseSyndromeStatementText`, `DiseaseSyndromeCategoryId`, `DiseaseSyndromeCategoryText`, `ModifierAId`, `ModifierAText`, `ModifierBId`, `ModifierBText`, `AvoidCautionId`, `AvoidCautionText`, `TableName`, `TableDescription`, `ProfessionalNotes` were also renamed to `rationalId`, `rationalText`, `qualityOfEvidenceId`, `qualityOfEvidenceText`, `strengthOfRecommendationId`, `strengthOfRecommendationText`, `therapeuticCategoryOrganSystemId`, `therapeuticCategoryOrganSystemText`, `diseaseSyndromeStatementId`, `diseaseSyndromeStatementText`, `diseaseSyndromeCategoryId`, `diseaseSyndromeCategoryText`, `modifierAId`, `modifierAText`, `modifierBId`, `modifierBText`, `avoidCautionId`, `avoidCautionText`, `tableName`, `tableDescription`, `professionalNotes`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Array size changes:**

- `PregnancyTrimesters`: Old (POST) has 3 item(s), New (GET) has 0 item(s).

**Only in Old (POST):**

- `PregnancyTrimesters[0]` = `{"Number":"First","PregnancyRatings":[{"RatingCode":"2","Factors":[]}]}`
- `PregnancyTrimesters[1]` = `{"Number":"Second","PregnancyRatings":[{"RatingCode":"2","Factors":[]}]}`
- `PregnancyTrimesters[2]` = `{"Number":"Third","PregnancyRatings":[{"RatingCode":"2","Factors":[]}]}`

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `ePrescribingName` | "Sulfamethoxazole/Trimethoprim 800mg-160mg Tablet" | "SMX/TMP 800mg-160mg Tablet" |
| `Attributes` | null | [] |
| `AGSBeersCriteriaItems[0].ProfessionalNotes` | null | "" |

### dataset_8 — FAILED

| | Method | URL | Response Status |
|---|---|---|---|
| Old (POST) | POST | https://cert-api.gsdd.net/api/DetailProduct | 200 |
| New (GET) | GET | https://cert-staging-api.druginfo.elsevier.systems/knowledge/product/detail?returnBeersInfo=true&returnIngredientStrengthRouteForm=true&returnProductModifier=true&returnRxNormSynonyms=true&id=66267-0941&type=NDC9 | 200 |

**What the difference is:**

There are **real data differences**: 5 value change(s). Field-name casing also changed (listed below).

**Field-name casing changes:**

- The top-level fields were renamed: `ProductIds` → `productIds`, `TherapeuticEquivalenceCodes` → `therapeuticEquivalenceCodes`, `OnMarketDate` → `onMarketDate`, `OffMarketDate` → `offMarketDate`, `Innovator` → `innovator`, `PregnancyTrimesters` → `pregnancyTrimesters`, `Attributes` → `attributes`, `Items` → `items`, `PackageIds` → `packageIds`, `PrivateLabel` → `privateLabel`, `Repackaged` → `repackaged`, `CMSId` → `cmsId`, `RxNormList` → `rxNormList`, `BulkChemical` → `bulkChemical`, `AGSBeersCriteriaItems` → `agsBeersCriteriaItems`, `ProductModifiers` → `productModifiers`, `ProductNameLong` → `productNameLong`, `ProductNameType` → `productNameType`, `ProductNameShort` → `productNameShort`, `Marketer` → `marketer`, `LegendStatus` → `legendStatus`, `BrandGenericStatus` → `brandGenericStatus`, `FederalDEAClass` → `federalDEAClass`, `ReplacedByProductId` → `replacedByProductId`, `LicenseType` → `licenseType`, `MarketStatus` → `marketStatus`, `IngredientStrengthRouteFormInfo` → `ingredientStrengthRouteFormInfo`.
- Inside every object in `ProductIds`, the keys `IdType`, `Id` were also renamed to `idType`, `id`.
- Inside every object in `PregnancyTrimesters`, the keys `Number`, `PregnancyRatings` were also renamed to `number`, `pregnancyRatings`.
- Inside every object in `PregnancyTrimesters[*].PregnancyRatings`, the keys `RatingCode`, `Factors` were also renamed to `ratingCode`, `factors`.
- Inside `Items`, the keys `DrugItems`, `NondrugItems` were also renamed to `drugItems`, `nondrugItems`.
- Inside every object in `Items.DrugItems`, the keys `Id`, `Name`, `RouteOfAdministration`, `DoseForm` were also renamed to `id`, `name`, `routeOfAdministration`, `doseForm`.
- Inside `Items.DrugItems[*].RouteOfAdministration`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `Items.DrugItems[*].DoseForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside every object in `RxNormList`, the keys `RxCUI`, `Name`, `Type`, `PSN`, `TMSY`, `SY` were also renamed to `rxCUI`, `name`, `type`, `psn`, `tmsy`, `sy`.
- Inside every object in `IngredientStrengthRouteFormInfo`, the keys `Ingredient`, `Strength`, `StrengthUnitCode`, `PerVolume`, `PerVolumeUnitCode`, `Route`, `FDAForm`, `GSForm` were also renamed to `ingredient`, `strength`, `strengthUnitCode`, `perVolume`, `perVolumeUnitCode`, `route`, `fdaForm`, `gsForm`.
- Inside `IngredientStrengthRouteFormInfo[*].Ingredient`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].Route`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].FDAForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.
- Inside `IngredientStrengthRouteFormInfo[*].GSForm`, the keys `Id`, `Name` were also lowercased to `id`, `name`.

**Value changes:**

| Field path | Old (POST) value | New (GET) value |
|---|---|---|
| `ePrescribingName` | "Sulfacetamide Sodium 10% Ophthalmic Solution" | "Sulfacetamide 10% Ophth Solution" |
| `PregnancyTrimesters[0].PregnancyRatings[0].RatingCode` | "1" | "C " |
| `PregnancyTrimesters[1].PregnancyRatings[0].RatingCode` | "1" | "C " |
| `PregnancyTrimesters[2].PregnancyRatings[0].RatingCode` | "1" | "C " |
| `Attributes` | null | [] |

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
