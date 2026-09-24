export default {
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
    }
};