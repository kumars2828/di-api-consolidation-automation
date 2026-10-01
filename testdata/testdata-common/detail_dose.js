export default {

    // Reports - DetailProduct Data Objects 
    DetailProduct_dataObjects: {
        valid_product_id_dataset_1: {
            ProductId: {
                ProductId: ["7"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: true,
            expectedStatus: 200
        },
        valid_ndc9_dataset_2: {
            ProductId: {
                NDC9: ["00044-0090"]
            },
            returnBeersInfo: false,
            returnIngredientStrengthRouteForm: false,
            returnRxNormSynonyms: false,
            returnProductModifier: false,
            expectedStatus: 200
        },
        optional_fields_omitted_dataset_3: {
            ProductId: {
                ProductId: ["7"]
            },
            expectedStatus: 200
        },
        missing_product_id_dataset_4: {
            ProductId: null,
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: false,
            expectedStatus: 400
        },
        invalid_ndc9_dataset_5: {
            ProductId: {
                NDC9: ["abcdefchi"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: false,
            expectedStatus: 400
        },
        product_not_found_dataset_6: {
            ProductId: {
                ProductId: ["128976789"]
            },
            returnBeersInfo: true,
            returnIngredientStrengthRouteForm: true,
            returnRxNormSynonyms: true,
            returnProductModifier: true,
            expectedStatus: 404
        },
        empty_ndc9_dataset_7: {
            ProductId: {
                NDC9: [""]
            },
            returnBeersInfo: false,
            returnIngredientStrengthRouteForm: false,
            returnRxNormSynonyms: false,
            returnProductModifier: false,
            expectedStatus: 400
        },
        invalid_access_token_dataset_8: {
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