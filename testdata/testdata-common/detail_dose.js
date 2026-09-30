export default {

    // Reports - DetailProduct Data Objects 
    DetailProduct_dataObjects: {
        valid_product_id: {
            ProductId: {
                ProductId: ["7"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: true,
            expectedStatus: 200
        },
        valid_ndc9: {
            ProductId: {
                NDC9: ["00044-0090"]
            },
            returnBeersInfo: false,
            returnIngredientStrengthRouteForm: false,
            returnRxNormSynonyms: false,
            returnProductModifier: false,
            expectedStatus: 200
        },
        optional_fields_omitted: {
            ProductId: {
                ProductId: ["7"]
            },
            expectedStatus: 200
        },
        missing_product_id: {
            ProductId: null,
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: false,
            expectedStatus: 400
        },
        invalid_ndc9: {
            ProductId: {
                NDC9: ["abcdefchi"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: false,
            expectedStatus: 400
        },
        product_not_found: {
            ProductId: {
                ProductId: ["128976789"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: true,
            expectedStatus: 404
        },
        empty_ndc9: {
            ProductId: {
                NDC9: [""]
            },
            returnBeersInfo: false,
            returnIngredientStrengthRouteForm: false,
            returnRxNormSynonyms: false,
            returnProductModifier: false,
            expectedStatus: 400
        },
        invalid_access_token: {
            ProductId: {
                ProductId: ["7"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: true,
            tokenType: "invalid",
            postOnly: true,
            expectedStatus: 400,
            expectedError: {
                Type: "Authentication Error",
                Text: "AccessToken is invalid or expired"
            }
        }
    },

}