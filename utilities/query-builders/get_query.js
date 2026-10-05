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
        const query = new URLSearchParams();
        if (id !== undefined && id !== null) query.set('id', String(id));
        if (type !== undefined && type !== null) query.set('type', type);
        const queryString = query.toString();
        return `/knowledge/product/therapeutic-concept${queryString ? `?${queryString}` : ''}`;
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
    },

    // Builds the ListFederal GET query from the dataset's PackageOrProductFilter (Id -> id, IdType -> type)
    ListFederal_GetPath: function buildListFederalGetPath(dataset) {
        const filter = dataset?.PackageOrProductFilter || {};
        const query = new URLSearchParams();
        if (filter.Id !== undefined && filter.Id !== null) query.append('id', String(filter.Id));
        if (filter.IdType !== undefined && filter.IdType !== null) query.append('type', filter.IdType);
        const queryString = query.toString();
        return `/knowledge/federal-state/federal-drug-info${queryString ? `?${queryString}` : ''}`;
    },

    // Builds the ListStateDEAClassification GET query from the mapped state and product identifier.
    ListStateDEAClassification_GetPath: function buildListStateDEAClassificationGetPath(mappedDataPost) {
        if (!mappedDataPost) {
            throw new Error('mappedDataPost is required to build ListStateDEAClassification GET path');
        }
        const query = new URLSearchParams();
        if (mappedDataPost.StateId !== undefined) query.append('stateId', mappedDataPost.StateId);
        if (mappedDataPost.ProductId?.Id !== undefined) query.append('id', String(mappedDataPost.ProductId.Id));
        if (mappedDataPost.ProductId?.IdType !== undefined) query.append('type', mappedDataPost.ProductId.IdType);
        return `/knowledge/federal-state/state-dea-class?${query.toString()}`;
    },

    // Builds the RxNorm GET query from the mapped product identifier and synonym flag.
    ListRxNormByProduct_GetPath: function buildListRxNormByProductGetPath(mappedDataPost) {
        const query = new URLSearchParams();
        if (mappedDataPost.ReturnRxNormSynonyms !== undefined) {
            query.append('returnRxNormSynonyms', String(mappedDataPost.ReturnRxNormSynonyms));
        }
        if (mappedDataPost.ProductId?.Id !== undefined) query.append('id', String(mappedDataPost.ProductId.Id));
        if (mappedDataPost.ProductId?.IdType !== undefined) query.append('type', mappedDataPost.ProductId.IdType);
        return `/knowledge/product/rxnorm?${query.toString()}`;
    }
};