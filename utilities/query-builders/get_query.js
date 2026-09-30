export default {
    // Builds the ListWarningLabels GET query string from a dataset's filter fields
    ListWarningLabels_GetPath: function buildListWarningLabelsGetPath(dataset) {
        if (!dataset) {
            throw new Error('dataset is required to build ListWarningLabels GET path');
        }

        const query = new URLSearchParams();
        query.append('type', dataset.FilterType);
        query.append('q', dataset.Filter);
        query.append('languageCode', dataset.LanguageCode);

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
        if (!mappedDataPost || !mappedDataPost.ProductId) {
            throw new Error('mappedDataPost with ProductId is required to build DetailProduct GET path');
        }

        const query = new URLSearchParams({
            returnBeersInfo: String(mappedDataPost.ReturnBeersInfo),
            returnIngredientStrengthRouteForm: String(mappedDataPost.ReturnIngredientStrengthRouteForm),
            returnProductModifier: String(mappedDataPost.ReturnProductModifier),
            returnRxNormSynonyms: String(mappedDataPost.ReturnRxNormSynonyms),
            id: mappedDataPost.ProductId.Id,
            type: mappedDataPost.ProductId.IdType
        }).toString();

        return `/knowledge/product/detail?${query}`;
    },

    // Static GET path for ListCoatings (no query parameters)
    ListCoatings_GetPath: function buildListCoatingsGetPath() {
        return '/knowledge/list/coating';
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
    }
};