# RunAllPostGetParallel-DetailProductPostGet — Differences Report

Generated: 2026-09-29T13:00:13.882Z

Total tests: 8 | Passed: 0 | Failed: 8

## Summary

| API | Dataset | Mode | Result | Old Status | New Status | Difference |
|---|---|---|---|---|---|---|
| DetailProduct | dataset_1 | POST vs GET | FAILED | 200 | 200 | Data differences (13) + casing |
| DetailProduct | dataset_2 | POST vs GET | FAILED | 200 | 200 | Data differences (13) + casing |
| DetailProduct | dataset_3 | POST vs GET | FAILED | 200 | 200 | Data differences (13) + casing |
| DetailProduct | dataset_4 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |
| DetailProduct | dataset_5 | POST vs GET | FAILED | 200 | 200 | Data differences (2) + casing |
| DetailProduct | dataset_6 | POST vs GET | FAILED | 200 | 200 | Data differences (8) + casing |
| DetailProduct | dataset_7 | POST vs GET | FAILED | 200 | 200 | Data differences (10) + casing |
| DetailProduct | dataset_8 | POST vs GET | FAILED | 200 | 200 | Data differences (5) + casing |

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

There are **real data differences**: 6 value change(s), 1 array size change(s), 3 field(s)/item(s) only in Old (POST). Field-name casing also changed (listed below).

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
| `PackageIds[1]` | 73177 | 213359 |
| `PackageIds[2]` | 213253 | 73177 |
| `PackageIds[3]` | 213359 | 213253 |
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
