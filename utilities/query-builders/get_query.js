export default {
    // Builds the ListWarningLabels GET query string from a dataset's filter fields
    ListWarningLabels_GetPath: function buildListWarningLabelsGetPath(dataset) {
        if (!dataset) {
            throw new Error('dataset is required to build ListWarningLabels GET path');
        }

        const query = new URLSearchParams();
        if (dataset.FilterType !== undefined && dataset.FilterType !== null) {
            query.append('type', dataset.FilterType);
        }
        if (dataset.Filter !== undefined && dataset.Filter !== null) {
            query.append('q', dataset.Filter);
        }
        if (dataset.LanguageCode !== undefined && dataset.LanguageCode !== null) {
            query.append('languageCode', dataset.LanguageCode);
        }

        if (dataset.VendorId !== undefined && dataset.VendorId !== null && dataset.VendorId !== '') {
            query.append('vendorId', dataset.VendorId);
        }

        query.append('returnShortText', 'true');

        if (dataset.MaxResults !== undefined && dataset.MaxResults !== null && dataset.MaxResults !== '') {
            query.append('size', dataset.MaxResults);
        }

        return `/knowledge/warning-label/label?${query.toString()}`;
    },

    // Builds the DetailProduct GET query string from the mapped POST payload
    DetailProduct_GetPath: function buildDetailProductGetPath(mappedDataPost) {
        if (!mappedDataPost) {
            throw new Error('mappedDataPost is required to build DetailProduct GET path');
        }

        const query = new URLSearchParams();
        const optionalParameters = {
            returnBeersInfo: mappedDataPost.ReturnBeersInfo,
            returnIngredientStrengthRouteForm: mappedDataPost.ReturnIngredientStrengthRouteForm,
            returnProductModifier: mappedDataPost.ReturnProductModifier,
            returnRxNormSynonyms: mappedDataPost.ReturnRxNormSynonyms
        };

        for (const [name, value] of Object.entries(optionalParameters)) {
            if (value !== undefined) {
                query.append(name, String(value));
            }
        }

        if (mappedDataPost.ProductId) {
            query.append('id', mappedDataPost.ProductId.Id ?? '');
            query.append('type', mappedDataPost.ProductId.IdType ?? '');
        }

        const queryString = query.toString();
        return `/knowledge/product/detail${queryString ? `?${queryString}` : ''}`;
    },

    // Static GET path for ListCoatings (no query parameters)
    ListCoatings_GetPath: function buildListCoatingsGetPath() {
        return '/knowledge/list/coating';
    },

    ListColors_GetPath: function buildListColorsGetPath() {
        return '/knowledge/list/color';
    },

    ListLegendStatuses_GetPath: function buildListLegendStatusesGetPath() {
        return '/knowledge/federal-state/federal-legend-status';
    },

    ListDESIStatuses_GetPath: function buildListDESIStatusesGetPath() {
        return '/knowledge/list/desi-status';
    },

    ListBrandGenericStatuses_GetPath: function buildListBrandGenericStatusesGetPath() {
        return '/knowledge/list/brand-generic-status';
    },

    ListIVContainerMaterials_GetPath: function buildListIVContainerMaterialsGetPath() {
        return '/knowledge/federal-state/iv-container-material';
    },

    ListAGSBeersQualityOfEvidence_GetPath: function buildListAGSBeersQualityOfEvidenceGetPath() {
        return '/knowledge/beers/quality-of-evidence';
    },

    ListAGSBeersStrengthOfRecommendation_GetPath: function buildListAGSBeersStrengthOfRecommendationGetPath() {
        return '/knowledge/beers/strength-of-recommendation';
    },

    // Builds the ListTherapeuticConceptByProduct GET query from its product filter
    ListTherapeuticConceptByProduct_GetPath: function buildListTherapeuticConceptByProductGetPath(dataset) {
        const productOrPackageFilter = dataset?.PackageOrProductFilter;
        const [type, identifiers] = Object.entries(productOrPackageFilter || {})[0] || [];
        const id = Array.isArray(identifiers) ? identifiers[0] : identifiers;
        if (!type || id === undefined || id === null || id === '') {
            throw new Error('dataset with a PackageOrProductFilter identifier is required to build ListTherapeuticConceptByProduct GET path');
        }

        const query = new URLSearchParams({ id: String(id), type });
        return `/knowledge/product/therapeutic-concept?${query.toString()}`;
    },

    // Static GET path for ListDocumentationTypes (no query parameters)
    ListDocumentationTypes_GetPath: function buildListDocumentationTypesGetPath() {
        return '/knowledge/list/documentation-type';
    },

    // Builds the ListAllergySubstanceClasses GET query from its name filter and result limit
    ListAllergySubstanceClasses_GetPath: function buildListAllergySubstanceClassesGetPath(dataset) {
        if (!dataset) {
            throw new Error('dataset is required to build ListAllergySubstanceClasses GET path');
        }

        const query = new URLSearchParams();
        if (dataset.NameFilter !== undefined && dataset.NameFilter !== null) {
            query.append('q', dataset.NameFilter);
        }
        if (dataset.MaxResults !== undefined && dataset.MaxResults !== null && dataset.MaxResults !== '') {
            query.append('size', dataset.MaxResults);
        }

        return `/knowledge/search/allergy-substance-class?${query.toString()}`;
    }
};