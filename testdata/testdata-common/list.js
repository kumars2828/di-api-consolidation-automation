export default {

    // Reports - ListColors Data Objects 
    ListColors_dataObjects: {

        dataset_1: {
            MaxResults: "100",
        },
        dataset_2: {
            MaxResults: "50"
        },
        dataset_3: {
            MaxResults: "25"
        },
        dataset_4: {
            MaxResults: "40"
        },
        dataset_5: {
            MaxResults: "20"
        },

    },

    // Reports - ListProductsByRxNorm Data Objects 
    ListProductsByRxNorm_dataObjects: {

        dataset_1: {
            RxNormId: "999649",
            MaxResults: "65"
        },
        dataset_2: {
            RxNormId: "993755",
            MaxResults: "10"
        },
        dataset_3: {
            RxNormId: "866511",
            MaxResults: "10"
        },
        dataset_4: {
            RxNormId: "1094126",
            MaxResults: "20"
        },
        dataset_5: {
            NameFilter: "%phenol%",
            MaxResults: "111"
        },
        dataset_6: {
            NameFilter: "%wash%",
            MaxResults: "120"
        },
        dataset_7: {
            NameFilter: "%mouth%",
            MaxResults: "73"
        },
        dataset_8: {
            NameFilter: "%human%",
            MaxResults: "33"
        },
        dataset_9: {
            NameFilter: "null",
            MaxResults: "18"
        },
        dataset_10: {
            NameFilter: "null",
        }

    },


    // Reports - ListTherapeuticConceptByProdct Data Objects 
    ListTherapeuticConceptByProdct_dataObjects: {

        valid_ndc9_00002_7394_dataset_1: { PackageOrProductFilter: { NDC9: ["00002-7394"] }, expectedStatus: 200 },
        valid_ndc9_00085_0620_dataset_2: { PackageOrProductFilter: { NDC9: ["00085-0620"] }, expectedStatus: 200 },
        valid_package_id_2064_dataset_3: { PackageOrProductFilter: { PackageId: ["2064"] }, expectedStatus: 200 },
        valid_package_id_2070_dataset_4: { PackageOrProductFilter: { PackageId: ["2070"] }, expectedStatus: 200 },
        valid_ndc10_0603_2115_32_dataset_5: { PackageOrProductFilter: { NDC10: ["0603-2115-32"] }, expectedStatus: 200 },
        valid_ndc10_0603_2116_28_dataset_6: { PackageOrProductFilter: { NDC10: ["0603-2116-28"] }, expectedStatus: 200 },
        valid_ndc11_00378_6173_01_dataset_7: { PackageOrProductFilter: { NDC11: ["00378-6173-01"] }, expectedStatus: 200 },
        valid_ndc11_00378_6174_01_dataset_8: { PackageOrProductFilter: { NDC11: ["00378-6174-01"] }, expectedStatus: 200 },
        valid_upcb_96295_11194_dataset_9: { PackageOrProductFilter: { UPCB: ["96295-11194"] }, expectedStatus: 200 },
        valid_upcb_96295_11195_dataset_10: { PackageOrProductFilter: { UPCB: ["96295-11195"] }, expectedStatus: 200 },
        valid_gtin12_310019662039_dataset_11: { PackageOrProductFilter: { GTIN12: ["310019662039"] }, expectedStatus: 200 },
        valid_gtin12_310019075877_dataset_12: { PackageOrProductFilter: { GTIN12: ["310019075877"] }, expectedStatus: 200 },
        valid_gtin14_00300780385664_dataset_13: { PackageOrProductFilter: { GTIN14: ["00300780385664"] }, expectedStatus: 200 },
        valid_gtin14_00300780386661_dataset_14: { PackageOrProductFilter: { GTIN14: ["00300780386661"] }, expectedStatus: 200 },
        valid_product_id_57866_dataset_15: { PackageOrProductFilter: { ProductId: ["57866"] }, expectedStatus: 200 },
        valid_product_id_17029_dataset_16: { PackageOrProductFilter: { ProductId: ["17029"] }, expectedStatus: 200 },
        valid_product_id_7284_dataset_17: { PackageOrProductFilter: { ProductId: ["7284"] }, expectedStatus: 200 },
        valid_product_id_7285_dataset_18: { PackageOrProductFilter: { ProductId: ["7285"] }, expectedStatus: 200 },
        valid_nhric_8287_126029_dataset_19: { PackageOrProductFilter: { NHRIC: ["8287-126029"] }, expectedStatus: 200 },
        valid_nhric_8287_126016_dataset_20: { PackageOrProductFilter: { NHRIC: ["8287-126016"] }, expectedStatus: 200 },
        valid_pin_50580010904_dataset_21: { PackageOrProductFilter: { PIN: ["50580010904"] }, expectedStatus: 200 },
        valid_pin_50580092218_dataset_22: { PackageOrProductFilter: { PIN: ["50580092218"] }, expectedStatus: 200 },
        empty_product_id_dataset_23: { PackageOrProductFilter: { ProductId: [""] }, expectedStatus: 400 },
        empty_id_type_dataset_24: { PackageOrProductFilter: { "": ["55786"] }, expectedStatus: 400 },
        numeric_ndc11_id_dataset_25: { PackageOrProductFilter: { NDC11: [1234567890] }, expectedStatus: 400 },
    },

    // Reports - ListProductImages Data Objects 
    ListProductImages_dataObjects: {
        dataset_1: {
            ProductId: {
                NDC9: ["00046-0868"]
            },
            MaxResults: 244
        },
        dataset_2: {
            ProductId: {
                NDC9: ["00046-0872"]
            },
            MaxResults: 121
        },
        dataset_3: {
            ProductId: {
                NDC9: ["00046-1000"]
            },
            MaxResults: 220
        },
        dataset_4: {
            ProductId: {
                NDC9: ["61958-0501"]
            },
            MaxResults: 0
        },
        dataset_5: {
            ProductId: {
                NDC9: ["61958-0501"]
            },
        },
        dataset_6: {
            ProductId: {
                ProductId: ["7285"]
            },
            MaxResults: 216
        },
        dataset_7: {
            ProductId: {
                ProductId: ["7286"]
            },
            MaxResults: 244
        },
        dataset_8: {
            ProductId: {
                ProductId: ["7287"]
            },
            MaxResults: 121
        },
        dataset_9: {
            ProductId: {
                ProductId: ["57866"]
            },
            MaxResults: 0
        },
        dataset_10: {
            ProductId: {
                ProductId: ["57888"]
            },
        },

    },


    // Reports - ListPackagePricesCurrent Data Objects 
    ListPackagePricesCurrent_dataObjects: {

        dataset_1: {
            PackageId: {
                NDC10: ["0002-7512-01"]
            },
            MaxResults: 30
        },
        dataset_2: {
            PackageId: {
                NDC10: ["0093-6108-12"]
            },
            MaxResults: 10
        },
        dataset_3: {
            PackageId: {
                NDC10: ["43547-344-50"]
            },
            MaxResults: 20
        },
        dataset_4: {
            PackageId: {
                NDC11: ["00121-1576-10"]
            },
            MaxResults: 30
        },
        dataset_5: {
            PackageId: {
                NDC11: ["00026-0670-50"]
            },
            MaxResults: 20
        },
        dataset_6: {
            PackageId: {
                NDC11: ["00409-4777-61"]
            },
            MaxResults: 50
        },
        dataset_7: {
            PackageId: {
                UPCB: ["96295-12007"]
            },
            MaxResults: 30
        },
        dataset_8: {
            PackageId: {
                UPCB: ["96295-11194"]
            },
            MaxResults: 20
        },
        dataset_9: {
            PackageId: {
                UPCB: ["38485-14001"]
            },
            MaxResults: 40
        },
        dataset_10: {
            PackageId: {
                GTIN12: ["310019662039"]
            },
            MaxResults: 20
        },
        dataset_11: {
            PackageId: {
                GTIN12: ["310019075877"]
            },
            MaxResults: 30
        },
        dataset_12: {
            PackageId: {
                GTIN12: ["351672520236"]
            },
            MaxResults: 10
        },
        dataset_13: {
            PackageId: {
                GTIN14: ["00300780385664"]
            },
            MaxResults: 40
        },
        dataset_14: {
            PackageId: {
                GTIN14: ["00351672406219"]
            },
            MaxResults: 20
        },
        dataset_15: {
            PackageId: {
                GTIN14: ["00305913220010"]
            },
            MaxResults: 30
        },
        dataset_16: {
            PackageId: {
                NHRIC: ["8595-070050"]
            },
            MaxResults: 20
        },
        dataset_17: {
            PackageId: {
                NHRIC: ["8373-982600"]
            },
            MaxResults: 20
        },
        dataset_18: {
            PackageId: {
                NHRIC: ["8290-091002"]
            },
            MaxResults: 40
        },
        dataset_19: {
            PackageId: {
                PIN: ["50580011108"]
            },
            MaxResults: 35
        },
        dataset_20: {
            PackageId: {
                PIN: ["50580049698"]
            },
            MaxResults: 20
        },
        dataset_21: {
            PackageId: {
                PIN: ["70030013513"]
            },
            MaxResults: 40
        },
        dataset_22: {
            PackageId: {
                PackageId: ["2052"]
            },
            MaxResults: 10
        },
        dataset_23: {
            PackageId: {
                PackageId: ["6474"]
            },
            MaxResults: 20
        },
        dataset_24: {
            PackageId: {
                PackageId: ["6475"]
            },
            MaxResults: 30
        },
    },


    // Reports - ListPharmEquivalentProducts  Data Objects 
    ListPharmEquivalentProducts_dataObjects: {

        dataset_1: {
            ProductId: {
                ProductId: ["7"]
            },
            ReturnProductModifier: true,
            MaxResults: "20",
        },
        dataset_2: {
            ProductId: {
                ProductId: ["19"]
            },
            ReturnProductModifier: true,
            MaxResults: "30",
        },
        dataset_3: {
            ProductId: {
                ProductId: ["85"]
            },
            ReturnProductModifier: true,
            MaxResults: "25",
        },
        dataset_4: {
            ProductId: {
                ProductId: ["33"]
            },
            ReturnProductModifier: true,
            MaxResults: "30",
        },
        dataset_5: {
            ProductId: {
                ProductId: ["88"]
            },
            ReturnProductModifier: true,
            MaxResults: "20",
        },
        dataset_6: {
            ProductId: {
                NDC9: ["00044-0090"]
            },
            ReturnProductModifier: true,
            MaxResults: "20",
        },
        dataset_7: {
            ProductId: {
                NDC9: ["00044-0208"]
            },
            ReturnProductModifier: true,
            MaxResults: "30",
        },
        dataset_8: {
            ProductId: {
                NDC9: ["00049-5370"]
            },
            ReturnProductModifier: true,
            MaxResults: "10",
        },
        dataset_9: {
            ProductId: {
                NDC9: ["00064-2300"]
            },
            ReturnProductModifier: true,
            MaxResults: "20",
        },
        dataset_10: {
            ProductId: {
                NDC9: ["00065-0526"]
            },
            ReturnProductModifier: true,
            MaxResults: "30",
        },
    },

    // Reports - ListProductStorage Data Objects 
    ListProductStorage_dataObjects: {

        dataset_1: {
            PackageOrProductId: {
                ProductId: ["34300"]
            },
            MaxResults: "10",
        },
        dataset_2: {
            PackageOrProductId: {
                ProductId: ["5300"]
            },
            MaxResults: "20"
        },

        dataset_3: {
            PackageOrProductId: {
                ProductId: ["19"]
            },
            MaxResults: "30"
        },

        dataset_4: {
            PackageOrProductId: {
                NDC9: ["61958-0501"]
            },
            MaxResults: "30"
        },

        dataset_5: {
            PackageOrProductId: {
                NDC9: ["66019-0101"]
            },
            MaxResults: "10"
        },

        dataset_6: {
            PackageOrProductId: {
                NDC9: ["59075-0730"]
            },
            MaxResults: "15"
        },

        dataset_7: {
            PackageOrProductId: {
                PackageId: ["260"]
            },
            MaxResults: "20"
        },

        dataset_8: {
            PackageOrProductId: {
                PackageId: ["53106"]
            },
            MaxResults: "10"
        },

        dataset_9: {
            PackageOrProductId: {
                PackageId: ["262"]
            },
            MaxResults: "30"
        },

        dataset_10: {
            PackageOrProductId: {
                NDC10: ["61570-079-01"]
            },
            MaxResults: "10"
        },

        dataset_11: {
            PackageOrProductId: {
                NDC10: ["0573-0218-25"]
            },
            MaxResults: "20"
        },

        dataset_12: {
            PackageOrProductId: {
                NDC10: ["0045-0500-08"]
            },
            MaxResults: "35"
        },

        dataset_13: {
            PackageOrProductId: {
                NDC11: ["00002-8730-59"]
            },
            MaxResults: "30"
        },

        dataset_14: {
            PackageOrProductId: {
                NDC11: ["00591-0810-55"]
            },
            MaxResults: "20"
        },

        dataset_15: {
            PackageOrProductId: {
                NDC11: ["00574-2004-16"]
            },
            MaxResults: "20"
        },

        dataset_16: {
            PackageOrProductId: {
                GTIN14: ["0030074-1555549"]
            },
            MaxResults: "10"
        },

        dataset_17: {
            PackageOrProductId: {
                GTIN14: ["00368462190050"]
            },
            MaxResults: "10"
        },

        dataset_18: {
            PackageOrProductId: {
                GTIN14: ["00368462369906"]
            },
            MaxResults: "30"
        },

        dataset_19: {
            PackageOrProductId: {
                GTIN12: ["300371000000"]
            },
            MaxResults: "10"
        },

        dataset_20: {
            PackageOrProductId: {
                GTIN12: ["301215000000"]
            },
            MaxResults: "20"
        },

        dataset_21: {
            PackageOrProductId: {
                GTIN12: ["304720000000"]
            },
            MaxResults: "20"
        },

        dataset_22: {
            PackageOrProductId: {
                UPCB: ["96295-12007"]
            },
            MaxResults: "10"
        },

        dataset_23: {
            PackageOrProductId: {
                UPCB: ["61059-29735"]
            },
            MaxResults: "20"
        },

        dataset_24: {
            PackageOrProductId: {
                UPCB: ["87701-89806"]
            },
            MaxResults: "30"
        },

        dataset_25: {
            PackageOrProductId: {
                NHRIC: ["8214-090737"]
            },
            MaxResults: "10"
        },

        dataset_26: {
            PackageOrProductId: {
                NHRIC: ["8604-000002"]
            },
            MaxResults: "20"
        },

        dataset_27: {
            PackageOrProductId: {
                NHRIC: ["8815-100009"]
            },
            MaxResults: "30"
        },

        dataset_28: {
            PackageOrProductId: {
                PIN: ["50580053916"]
            },
            MaxResults: "10"
        },

        dataset_29: {
            PackageOrProductId: {
                PIN: ["63824094827"]
            },
            MaxResults: "20"
        },

        dataset_30: {
            PackageOrProductId: {
                PIN: ["69968021909"]
            },
            MaxResults: "30"
        }

    },

    // Reports - ListTherapeuticConceptByProduct Data Objects 
    ListTherapeuticConceptByProduct_dataObjects: {

        dataset_1: {
            PackageOrProductFilter: {
                NDC9: ["00002-7394"]
            },
        },

        dataset_2: {
            PackageOrProductFilter: {
                NDC9: ["00085-0620"]
            },
        },

        dataset_3: {
            PackageOrProductFilter: {
                PackageId: ["2064"]
            },
        },
        dataset_4: {
            PackageOrProductFilter: {
                PackageId: ["2070"]
            },
        },
        dataset_5: {
            PackageOrProductFilter: {
                NDC10: ["0603-2115-32"]
            },
        },
        dataset_6: {
            PackageOrProductFilter: {
                NDC10: ["0603-2116-28"]
            },
        },

        dataset_7: {
            PackageOrProductFilter: {
                NDC11: ["00378-6173-01"]
            },
        },
        dataset_8: {
            PackageOrProductFilter: {
                NDC11: ["00378-6174-01"]
            },
        },
        dataset_9: {
            PackageOrProductFilter: {
                UPCB: ["96295-11194"]
            },
        },
        dataset_10: {
            PackageOrProductFilter: {
                UPCB: ["96295-11195"]
            },
        },

        dataset_11: {
            PackageOrProductFilter: {
                GTIN12: ["310019662039"]
            },
        },
        dataset_12: {
            PackageOrProductFilter: {
                GTIN12: ["310019075877"]
            },
        },

        dataset_13: {
            PackageOrProductFilter: {
                GTIN14: ["00300780385664"]
            },
        },
        dataset_14: {
            PackageOrProductFilter: {
                GTIN14: ["00300780386661"]
            },
        },

        dataset_15: {
            PackageOrProductFilter: {
                ProductId: ["57866"]
            },
        },
        dataset_16: {
            PackageOrProductFilter: {
                ProductId: ["17029"]
            },
        },
        dataset_17: {
            PackageOrProductFilter: {
                ProductId: ["7284"]
            },
        },
        dataset_18: {
            PackageOrProductFilter: {
                ProductId: ["7285"]
            },
        },
        dataset_19: {
            PackageOrProductFilter: {
                NHRIC: ["8287-126029"]
            },
        },
        dataset_20: {
            PackageOrProductFilter: {
                NHRIC: ["8287-126016"]
            },
        },

        dataset_21: {
            PackageOrProductFilter: {
                PIN: ["50580010904"]
            },
        },
        dataset_22: {
            PackageOrProductFilter: {
                PIN: ["50580092218"]
            },
        },
    },

    // Reports - ListAGSBeersQualityOfEvidence Data Objects 
    ListAGSBeersQualityOfEvidence_dataObjects: {

        dataset_1: {
            MaxResults: "100",
        },
        dataset_2: {
            MaxResults: "50"
        },
        dataset_3: {
            MaxResults: "25"
        },
        dataset_4: {
            MaxResults: "0"
        },
        dataset_5: {
           
        },

    },

    // Reports - ListAGSBeersStrengthOfRecommendation Data Objects 
    ListAGSBeersStrengthOfRecommendation_dataObjects: {

        dataset_1: {
            MaxResults: "100",
        },
        dataset_2: {
            MaxResults: "50"
        },
        dataset_3: {
            MaxResults: "25"
        },
        dataset_4: {
            MaxResults: "0"
        },
        dataset_5: {
            
        },

    },


    // Reports - ListAllergySubstanceClasses Data Objects 
    ListAllergySubstanceClasses_dataObjects: {

        valid_amino_filter_dataset_1: {
            NameFilter: "%amino%",
            MaxResults: "100",
            expectedStatus: 200
        },
        valid_acetyl_filter_dataset_2: {
            NameFilter: "%acetyl%",
            MaxResults: "50",
            expectedStatus: 200
        },
        valid_penicillin_filter_dataset_3: {
            NameFilter: "%peni%",
            MaxResults: "25",
            expectedStatus: 200
        },
        valid_alpha_filter_dataset_4: {
            NameFilter: "%alpha%",
            MaxResults: "40",
            expectedStatus: 200
        },
        invalid_name_filter_type_dataset_5: {
            NameFilter: 123456,
            MaxResults: "20",
            expectedStatus: 400
        },
        allergy_class_not_found_dataset_6: {
            NameFilter: "%jbcjbjc%",
            MaxResults: "30",
            expectedStatus: 404
        },
        empty_name_filter_dataset_7: {
            NameFilter: "",
            MaxResults: "20",
            expectedStatus: 400
        },
        invalid_access_token_dataset_8: {
            NameFilter: "%acetyl%",
            MaxResults: "30",
            tokenType: "invalid",
            postOnly: true,
            expectedStatus: 400,
            expectedError: {
                Type: "Authentication Error",
                Text: "AccessToken is invalid or expired"
            }
        },

    },


    // Reports - ListASPByPackage  Data Objects 
    ListASPByPackage_dataObjects: {

        dataset_1: {
            DrugId: {
                PackageId: ["51402"]
            },
            MaxResults: "100"
        },

        dataset_2: {
            DrugId: {
                PackageId: ["51403"]
            },
            MaxResults: "50"
        },

        dataset_3: {
            DrugId: {
                NDC11: ["10019-0506-45"]
            },
            MaxResults: "25"
        },

        dataset_4: {
            DrugId: {
                NDC11: ["10019-0506-10"]
            },
            MaxResults: "15"
        },

        dataset_5: {
            DrugId: {
                GTIN14: ["00307035062011"]
            },
            MaxResults: "15"
        },

        dataset_6: {
            DrugId: {
                GTIN14: ["00307035063018"]
            },
            MaxResults: "14"
        },

        dataset_7: {
            DrugId: {
                GTIN12: ["355390500051"]
            },
            MaxResults: "54"
        },

        dataset_8: {
            DrugId: {
                GTIN12: ["300741412040"]
            },
            MaxResults: "52"
        },

        dataset_9: {
            DrugId: {
                NDC10: ["65862-011-05"]
            },
            MaxResults: "51"
        },

        dataset_10: {
            DrugId: {
                NDC10: ["0378-4186-05"]
            },
            MaxResults: "54"
        },

        dataset_11: {
            DrugId: {
                PIN: ["00067810012"]
            },
            MaxResults: "12"
        },

        dataset_12: {
            DrugId: {
                PIN: ["52372666601"]
            },
            MaxResults: "16"
        },

        dataset_13: {
            DrugId: {
                MarketedProductId: ["25742"]
            },
            MaxResults: "10"
        },

        dataset_14: {
            DrugId: {
                MarketedProductId: ["34194"]
            },
            MaxResults: "20"
        },

        dataset_15: {
            DrugId: {
                SpecificProductId: ["472"]
            },
            MaxResults: "30"
        },

        dataset_16: {
            DrugId: {
                SpecificProductId: ["1337"]
            },
            MaxResults: "40"
        },

        dataset_17: {
            DrugId: {
                GenericProductClinicalId: ["4185"]
            },
            MaxResults: "5"
        },

        dataset_18: {
            DrugId: {
                GenericProductClinicalId: ["1743"]
            },
            MaxResults: "15"
        },

        dataset_19: {
            DrugId: {
                ProductId: ["68222"]
            },
            MaxResults: "55"
        },

        dataset_20: {
            DrugId: {
                ProductId: ["67172"]
            },
            MaxResults: "65"
        },

        dataset_21: {
            DrugId: {
                RxNormId: ["731381"]
            },
            MaxResults: "25"
        },

        dataset_22: {
            DrugId: {
                RxNormId: ["898578"]
            },
            MaxResults: "20"
        },

        dataset_23: {
            DrugId: {
                OrderableNameRouteFormId: ["502122"]
            },
            MaxResults: "20"
        },

        dataset_24: {
            DrugId: {
                OrderableNameRouteFormId: ["522569"]
            },
            MaxResults: "25"
        },

        dataset_25: {
            DrugId: {
                NDC9: ["11523-7157"]
            },
            MaxResults: "20"
        },

        dataset_26: {
            DrugId: {
                NDC9: ["55953-0020"]
            },
            MaxResults: "30"
        },

        dataset_27: {
            DrugId: {
                UPCB: ["61059-29735"]
            },
            MaxResults: "20"
        },

        dataset_28: {
            DrugId: {
                UPCB: ["96295-12007"]
            },
            MaxResults: "40"
        },

        dataset_29: {
            DrugId: {
                NHRIC: ["8373-982600"]
            },
            MaxResults: "50"
        },

        dataset_30: {
            DrugId: {
                NHRIC: ["8595-070050"]
            },
            MaxResults: "10"
        }


    },


    // Reports - ListBrandGenericStatuses Data Objects 
    ListBrandGenericStatuses_dataObjects: {

        dataset_1: {
            MaxResults: "100",
        },
        dataset_2: {
            MaxResults: "50"
        },
        dataset_3: {
            MaxResults: "25"
        },
        dataset_4: {
            MaxResults: "40"
        },
        dataset_5: {
            MaxResults: "0"
        },

    },


    // Reports - ListCoatings Data Objects 
    ListCoatings_dataObjects: {

        dataset_1: {
            MaxResults: "100",
        },
        dataset_2: {
            MaxResults: "50"
        },
        dataset_3: {
            MaxResults: "25"
        },
        dataset_4: {
            MaxResults: "0"
        },
        dataset_5: {
           
        },

    },

    // Reports - ListMFPByPackage Data Objects 
    ListMFPByPackage_dataObjects: {

        dataset_1: {
            DrugId: { NDC11: ["00003-0893-21"] }
        },
        dataset_2: {
            DrugId: { NDC11: ["00003-0894-70"] }
        },
        dataset_3: {
            DrugId: { NDC11: ["58406-0010-01"] }
        },
        dataset_4: {
            DrugId: { NDC11: ["58406-0425-34"] }
        },
        dataset_5: {
            DrugId: { NDC11: ["00078-0777-20"] }
        },
        dataset_6: {
            DrugId: { NDC11: ["00310-6210-30"] }
        },
        dataset_7: {
            DrugId: { NDC11: ["57962-0280-28"] }
        },
        dataset_8: {
            DrugId: { NDC11: ["00006-0277-01"] }
        },
        dataset_9: {
            DrugId: { NDC11: ["00597-0152-30"] }
        },
        dataset_10: {
            DrugId: { NDC11: ["00169-2100-11"] }
        },
        dataset_11: {
            DrugId: { NDC11: ["57894-0061-03"] }
        },
        dataset_12: {
            DrugId: { NDC11: ["50458-0579-30"] }
        },
        dataset_13: {
            DrugId: { NDC9: ["00003-0894"] }
        },
        dataset_14: {
            DrugId: { NDC9: ["58406-0010"] }
        },
        dataset_15: {
            DrugId: { NDC9: ["58406-0425"] }
        },
        dataset_16: {
            DrugId: { NDC9: ["00078-0777"] }
        },
        dataset_17: {
            DrugId: { NDC9: ["00310-6210"] }
        },
        dataset_18: {
            DrugId: { NDC9: ["57962-0280"] }
        },
        dataset_19: {
            DrugId: { NDC9: ["00006-0277"] }
        },
        dataset_20: {
            DrugId: { NDC9: ["00597-0152"] }
        },
        dataset_21: {
            DrugId: { NDC9: ["00169-2100"] }
        },
        dataset_22: {
            DrugId: { NDC9: ["57894-0061"] }
        },
        dataset_23: {
            DrugId: { NDC9: ["50458-0579"] }
        },
        dataset_24: {
            DrugId: { ProductId: ["64271"] }
        }

},


// Reports - ListCompanies Data Objects 
ListCompanies_dataObjects: {

    dataset_1: {
        NameFilter: "%health%",
            MaxResults: "20"
    },
    dataset_2: {
        NameFilter: "%company%",
            MaxResults: "30"
    },
    dataset_3: {
        NameFilter: "%pharm%",
            MaxResults: "25"
    },
    dataset_4: {
        NameFilter: "%Technologies%",
            MaxResults: "25"
    },
    dataset_5: {
        NameFilter: "%division%",
            MaxResults: "25"
    },

},


// Reports - ListDESIStatuses Data Objects 
ListDESIStatuses_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "40"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListDocumentationTypes Data Objects 
ListDocumentationTypes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "0"
    },
    dataset_5: {
       
    },

},


// Reports - ListDoseForms Data Objects 
ListDoseForms_dataObjects: {

    dataset_1: {
        NameFilter: "%table%",
            MaxResults: "20"
    },
    dataset_2: {
        NameFilter: "%capsu%",
            MaxResults: "30"
    },
    dataset_3: {
        NameFilter: "%powde%",
            MaxResults: "25"
    },
    dataset_4: {
        NameFilter: "%chew%",
            MaxResults: "25"
    },
    dataset_5: {
        NameFilter: "%bladder%",
            MaxResults: "25"
    },

},


// Reports - ListDrugInteractionReferences Data Objects 
ListDrugInteractionReferences_dataObjects: {

    dataset_1: {
        DrugInteractionId: "4",
            MaxResults: "10"
    },
    dataset_2: {
        DrugInteractionId: "4",
            MaxResults: "30"
    },
    dataset_3: {
        DrugInteractionId: "5",
            MaxResults: "20"
    },
    dataset_4: {
        DrugInteractionId: "28",
            MaxResults: "10"
    },
    dataset_5: {
        DrugInteractionId: "118",
            MaxResults: "10"
    },

},


// Reports - ListFederal  Data Objects 
ListFederal_dataObjects: {
    valid_product_id_46624_dataset_1: {
        PackageOrProductFilter: { IdType: "ProductId", Id: "46624" },
        expectedStatus: 200
    },
    valid_product_id_108_dataset_2: {
        MaxResults: "100",
        PackageOrProductFilter: { IdType: "ProductId", Id: "108" },
        expectedStatus: 200
    },
    valid_package_id_69735_dataset_3: {
        MaxResults: "20",
        PackageOrProductFilter: { IdType: "PackageId", Id: "69735" },
        expectedStatus: 200
    },
    valid_zero_max_results_dataset_4: {
        MaxResults: "0",
        PackageOrProductFilter: { IdType: "PackageId", Id: "151" },
        expectedStatus: 200
    },
    valid_ndc9_filter_dataset_5: {
        PackageOrProductFilter: { IdType: "NDC9", Id: "49884-0483" },
        expectedStatus: 200
    },
    valid_upcb_filter_dataset_6: {
        PackageOrProductFilter: { IdType: "UPCB", Id: "96295010217" },
        expectedStatus: 200
    },
    valid_nhric_filter_dataset_7: {
        PackageOrProductFilter: { IdType: "NHRIC", Id: "8290322065" },
        expectedStatus: 200
    },
    valid_pin_filter_dataset_8: {
        PackageOrProductFilter: { IdType: "PIN", Id: "50580089507" },
        expectedStatus: 200
    },
    valid_ndc10_filter_dataset_9: {
        PackageOrProductFilter: { IdType: "NDC10", Id: "5374613201" },
        expectedStatus: 200
    },
    valid_ndc11_filter_dataset_10: {
        PackageOrProductFilter: { IdType: "NDC11", Id: "53746013201" },
        expectedStatus: 200
    },
    valid_gtin12_filter_dataset_11: {
        PackageOrProductFilter: { IdType: "GTIN12", Id: "300937436010" },
        expectedStatus: 200
    },
    valid_gtin14_filter_dataset_12: {
        PackageOrProductFilter: { IdType: "GTIN14", Id: "00365162313147" },
        expectedStatus: 200
    },
    missing_package_or_product_filter_dataset_13: {
        MaxResults: "10",
        expectedStatus: 400
    },
    missing_id_dataset_14: {
        PackageOrProductFilter: { IdType: "ProductId" },
        expectedStatus: 400
    },
    missing_id_type_dataset_15: {
        MaxResults: "5",
        PackageOrProductFilter: { Id: "108" },
        expectedStatus: 400
    }
},


// Reports - ListFederalDEAClassifications Data Objects 
ListFederalDEAClassifications_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "40"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListFlavors Data Objects 
ListFlavors_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "40"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListGenericProductClinicals Data Objects 
ListGenericProductClinicals_dataObjects: {

    dataset_1: {
        NameFilter: "%sulfate%",
            MaxResults: "50"
    },
    dataset_2: {
        NameFilter: "%calcium%",
            MaxResults: "20"
    },
    dataset_3: {
        NameFilter: "%Aspirin%",
            MaxResults: "100"
    },
    dataset_4: {
        NameFilter: "%Glycerin%",
            MaxResults: "10"
    },
    dataset_5: {
        NameFilter: "%acid%",
            MaxResults: "25"
    },

},


// Reports - ListGSTerms Data Objects 
ListGSTerms_dataObjects: {

    dataset_1: {
        FilterType: "GSTermId",
            Filter: "984",
                MaxResults: "10"
    },
    dataset_2: {
        FilterType: "GSTermId",
            Filter: "1012",
                MaxResults: "20"
    },
    dataset_3: {
        FilterType: "GSTermId",
            Filter: "1027",
                MaxResults: "10"
    },
    dataset_4: {
        FilterType: "GSTermName",
            Filter: "idiopatic%",
                MaxResults: "10"
    },
    dataset_5: {
        FilterType: "GSTermName",
            Filter: "hypereosinophilic%",
                MaxResults: "30"
    },
    dataset_6: {
        FilterType: "GSTermName",
            Filter: "intrahepatic%",
                MaxResults: "40"
    },

},


// Reports - ListGSTermsByCategory Data Objects 
ListGSTermsByCategory_dataObjects: {

    dataset_1: {
        FilterType: "GSTermId",
            Filter: "984",
                MaxResults: "10"
    },
    dataset_2: {
        FilterType: "GSTermId",
            Filter: "1012",
                MaxResults: "20"
    },
    dataset_3: {
        FilterType: "GSTermId",
            Filter: "1027",
                MaxResults: "10"
    },
    dataset_4: {
        FilterType: "GSTermName",
            Filter: "idiopatic%",
                MaxResults: "10"
    },
    dataset_5: {
        FilterType: "GSTermName",
            Filter: "hypereosinophilic%",
                MaxResults: "30"
    },
    dataset_6: {
        FilterType: "GSTermName",
            Filter: "intrahepatic%",
                MaxResults: "40"
    },

},


// Reports - ListHCPCSByPackage  Data Objects 
ListHCPCSByPackage_dataObjects: {

    dataset_1: { DrugId: { PackageId: ["114"] }, MaxResults: "100" },
    dataset_2: { DrugId: { PackageId: ["151"] }, MaxResults: "50" },
    dataset_3: { DrugId: { PackageId: ["173"] }, MaxResults: "25" },
    dataset_4: { DrugId: { PackageId: ["418"] }, MaxResults: "20" },
    dataset_5: { DrugId: { PackageId: ["418"] }, MaxResults: "6" },
    dataset_6: { DrugId: { NDC11: ["00574-0850-05"] }, MaxResults: "25" },
    dataset_7: { DrugId: { NDC11: ["00574-0850-10"] }, MaxResults: "15" },
    dataset_8: { DrugId: { NDC11: ["00591-3128-79"] }, MaxResults: "24" },
    dataset_9: { DrugId: { GTIN14: ["00307033018126"] }, MaxResults: "15" },
    dataset_10: { DrugId: { GTIN14: ["00307033019123"] }, MaxResults: "14" },
    dataset_11: { DrugId: { GTIN14: ["00307034636015"] }, MaxResults: "48" },
    dataset_12: { DrugId: { GTIN12: ["361703325181"] }, MaxResults: "54" },
    dataset_13: { DrugId: { GTIN12: ["355513028011"] }, MaxResults: "52" },
    dataset_14: { DrugId: { GTIN12: ["355513111010"] }, MaxResults: "53" },
    dataset_15: { DrugId: { MarketedProductId: ["3188"] }, MaxResults: "10" },
    dataset_16: { DrugId: { MarketedProductId: ["7314"] }, MaxResults: "20" },
    dataset_17: { DrugId: { MarketedProductId: ["31453"] }, MaxResults: "30" },
    dataset_18: { DrugId: { SpecificProductId: ["10695"] }, MaxResults: "30" },
    dataset_19: { DrugId: { SpecificProductId: ["10697"] }, MaxResults: "40" },
    dataset_20: { DrugId: { SpecificProductId: ["6510"] }, MaxResults: "45" },
    dataset_21: { DrugId: { GenericProductClinicalId: ["751"] }, MaxResults: "5" },
    dataset_22: { DrugId: { GenericProductClinicalId: ["2450"] }, MaxResults: "15" },
    dataset_23: { DrugId: { GenericProductClinicalId: ["2947"] }, MaxResults: "25" },
    dataset_24: { DrugId: { ProductId: ["38326"] }, MaxResults: "55" },
    dataset_25: { DrugId: { ProductId: ["38327"] }, MaxResults: "65" },
    dataset_26: { DrugId: { ProductId: ["38328"] }, MaxResults: "5" },
    dataset_27: { DrugId: { ProductId: ["38371"] }, MaxResults: "10" },
    dataset_28: { DrugId: { ProductId: ["38373"] }, MaxResults: "15" },
    dataset_29: { DrugId: { RxNormId: ["1665046"] }, MaxResults: "25" },
    dataset_30: { DrugId: { RxNormId: ["105552"] }, MaxResults: "20" },
    dataset_31: { DrugId: { RxNormId: ["242754"] }, MaxResults: "30" },
    dataset_32: { DrugId: { OrderableNameRouteFormId: ["502122"] }, MaxResults: "25" },
    dataset_33: { DrugId: { OrderableNameRouteFormId: ["522569"] }, MaxResults: "15" },
    dataset_34: { DrugId: { OrderableNameRouteFormId: ["583920"] }, MaxResults: "24" },
    dataset_35: { DrugId: { UPCB: ["16837-85575"] }, MaxResults: "15" },
    dataset_36: { DrugId: { UPCB: ["41100-80602"] }, MaxResults: "14" },
    dataset_37: { DrugId: { UPCB: ["41100-80604"] }, MaxResults: "48" },
    dataset_38: { DrugId: { NHRIC: ["8290-091002"] }, MaxResults: "54" },
    dataset_39: { DrugId: { NHRIC: ["8290-091003"] }, MaxResults: "52" },
    dataset_40: { DrugId: { NHRIC: ["8290-094010"] }, MaxResults: "53" },
    dataset_41: { DrugId: { PIN: ["61056-025-01"] }, MaxResults: "51" },
    dataset_42: { DrugId: { PIN: ["62125-318-13"] }, MaxResults: "14" },
    dataset_43: { DrugId: { PIN: ["70030013513"] }, MaxResults: "48" },
    dataset_44: { DrugId: { NDC10: ["51672-4061-4"] }, MaxResults: "54" },
    dataset_45: { DrugId: { NDC10: ["51672-4061-2"] }, MaxResults: "52" },
    dataset_46: { DrugId: { NDC10: ["53489-376-01"] }, MaxResults: "53" }

},


// Reports - ListImprintText Data Objects 
ListImprintText_dataObjects: {

    dataset_1: {
        Filter: "%ORTHO%",
            MaxResults: "10"
    },
    dataset_2: {
        Filter: "%ZYVOX%",
            MaxResults: "5"
    },
    dataset_3: {
        Filter: "%VALEANT%",
            MaxResults: "10"
    },
    dataset_4: {
        Filter: "%DYNACIN%",
            MaxResults: "5"
    },
    dataset_5: {
        Filter: "%IMPAX%",
            MaxResults: "10"
    },
    dataset_6: {
        Filter: "%A105%",
            MaxResults: "5"
    },

},


// Reports - ListIngredientNameSources Data Objects 
ListIngredientNameSources_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "40"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListIngredients Data Objects 
ListIngredients_dataObjects: {

    dataset_1: {
        NameFilter: "%ethane%",
            MaxResults: "20"
    },
    dataset_2: {
        NameFilter: "%hexane%",
            MaxResults: "30"
    },
    dataset_3: {
        NameFilter: "%octane%",
            MaxResults: "25"
    },
    dataset_4: {
        NameFilter: "%glycer%",
            MaxResults: "30"
    },
    dataset_5: {
        NameFilter: "%fluro%",
            MaxResults: "20"
    },
    dataset_6: {
        NameFilter: "%salt%",
            MaxResults: "30"
    },

},


// Reports - ListIVContainerMaterials Data Objects 
ListIVContainerMaterials_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListLanguages Data Objects 
ListLanguages_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListLegendStatuses Data Objects 
ListLegendStatuses_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListLicenses Data Objects 
ListLicenses_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListLifestyleInteractionReferen Data Objects 
ListLifestyleInteractionReferen_dataObjects: {

    dataset_1: {
        DrugInteractionId: "38",
            MaxResults: "10"
    },
    dataset_2: {
        DrugInteractionId: "56",
            MaxResults: "30"
    },
    dataset_3: {
        DrugInteractionId: "57",
            MaxResults: "20"
    },
    dataset_4: {
        DrugInteractionId: "66",
            MaxResults: "10"
    },
    dataset_5: {
        DrugInteractionId: "2",
            MaxResults: "10"
    },

},


// Reports - ListLimitedDistribution Data Objects 
ListLimitedDistribution_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListMarketedProducts Data Objects 
ListMarketedProducts_dataObjects: {

    dataset_1: {
        IncludeOffMarket: false,
            NameFilter: "%mycin%",
                MaxResults: "43"
    },
    dataset_2: {
        IncludeOffMarket: true,
            NameFilter: "%Vaniqa%",
                MaxResults: "216"
    },
    dataset_3: {
        IncludeOffMarket: true,
            NameFilter: "Oph%",
                MaxResults: "23"
    },
    dataset_4: {
        IncludeOffMarket: true,
            NameFilter: "Pro%",
                MaxResults: "42"
    },
    dataset_5: {
        IncludeOffMarket: true,
            NameFilter: "warf%",
                MaxResults: "25"
    },


},


// Reports - ListMedGuides Data Objects 
ListMedGuides_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListMonographNames Data Objects 
ListMonographNames_dataObjects: {

    dataset_1: {
        NameFilter: "%Akurza%",
            MaxResults: "100"
    },
    dataset_2: {
        NameFilter: "%Aktipak%",
            MaxResults: "50"
    },
    dataset_3: {
        NameFilter: "%Akten%",
            MaxResults: "25"
    },
    dataset_4: {
        NameFilter: "%AK-Spore HC Ophthalmic%",
            MaxResults: "20"
    },

},


// Reports - ListMorphineEquivalentDosing Data Objects 
ListMorphineEquivalentDosing_dataObjects: {

    dataset_1: {
        FilterType: "ProductName",
            Filter: "%xyco%",
                MaxResults: 10
    },

    dataset_2: {
        FilterType: "ProductName",
            Filter: "%Acetaminophen%",
                MaxResults: 50
    },

    dataset_3: {
        FilterType: "ProductName",
            Filter: "abelcet%",
                MaxResults: 30
    },

    dataset_4: {
        FilterType: "ProductId",
            Filter: "38214",
                MaxResults: 30
    },

    dataset_5: {
        FilterType: "ProductId",
            Filter: "230",
                MaxResults: 10
    },

    dataset_6: {
        FilterType: "ProductId",
            Filter: "280",
                MaxResults: 20
    },

    dataset_7: {
        FilterType: "IngredientName",
            Filter: "%Levorp%",
                MaxResults: 30
    },

    dataset_8: {
        FilterType: "IngredientName",
            Filter: "%Meperidine%",
                MaxResults: 40
    },

    dataset_9: {
        FilterType: "IngredientName",
            Filter: "%chloride%",
                MaxResults: 10
    },

    dataset_10: {
        FilterType: "IngredientId",
            Filter: "329",
                MaxResults: 20
    },

    dataset_11: {
        FilterType: "IngredientId",
            Filter: "639",
                MaxResults: 10
    },

    dataset_12: {
        FilterType: "IngredientId",
            Filter: "711",
                MaxResults: 30
    },

    dataset_13: {
        FilterType: "NDC9",
            Filter: "00026-3782",
                MaxResults: 50
    },

    dataset_14: {
        FilterType: "NDC9",
            Filter: "00026-3783",
                MaxResults: 50
    },

    dataset_15: {
        FilterType: "NDC9",
            Filter: "00026-3785",
                MaxResults: 50
    }

},


// Reports - ListNCPDPBillingUnits Data Objects 
ListNCPDPBillingUnits_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListOrderableNames Data Objects 
ListOrderableNames_dataObjects: {

    dataset_1: {
        SearchString: "%Fosino%",
            BrandOrGeneric: "Both",
                BaseIngredientsOnly: false,
                    MaxResults: "20"
    },
    dataset_2: {
        SearchString: "%Isoptin%",
            BrandOrGeneric: "Generic",
                BaseIngredientsOnly: true,
                    MaxResults: "10"
    },
    dataset_3: {
        SearchString: "%Ace%",
            BrandOrGeneric: "Both",
                BaseIngredientsOnly: false,
                    MaxResults: "50"
    },
    dataset_4: {
        SearchString: "%cream%",
            BrandOrGeneric: "Generic",
                BaseIngredientsOnly: false,
                    MaxResults: "10"
    },
    dataset_5: {
        SearchString: "%oral%",
            BrandOrGeneric: "Brand",
                BaseIngredientsOnly: false,
                    MaxResults: "20"
    },
    dataset_6: {
        SearchString: "%hmol%",
            BrandOrGeneric: "Generic",
                BaseIngredientsOnly: true,
                    MaxResults: "100"
    },

},


// Reports - ListPackagePrices Data Objects 
ListPackagePrices_dataObjects: {

    dataset_1: {
        PackageId: {
            NDC10: ["0002-7512-01"]
        },
        MaxResults: 30
    },
    dataset_2: {
        PackageId: {
            NDC10: ["0093-6108-12"]
        },
        MaxResults: 10
    },
    dataset_3: {
        PackageId: {
            NDC10: ["43547-344-50"]
        },
        MaxResults: 20
    },
    dataset_4: {
        PackageId: {
            NDC11: ["00121-1576-10"]
        },
        MaxResults: 30
    },
    dataset_5: {
        PackageId: {
            NDC11: ["00026-0670-50"]
        },
        MaxResults: 20
    },
    dataset_6: {
        PackageId: {
            NDC11: ["00409-4777-61"]
        },
        MaxResults: 50
    },
    dataset_7: {
        PackageId: {
            UPCB: ["96295-12007"]
        },
        MaxResults: 30
    },
    dataset_8: {
        PackageId: {
            UPCB: ["96295-11194"]
        },
        MaxResults: 20
    },
    dataset_9: {
        PackageId: {
            UPCB: ["38485-14001"]
        },
        MaxResults: 40
    },
    dataset_10: {
        PackageId: {
            GTIN12: ["310019662039"]
        },
        MaxResults: 20
    },
    dataset_11: {
        PackageId: {
            GTIN12: ["310019075877"]
        },
        MaxResults: 30
    },
    dataset_12: {
        PackageId: {
            GTIN12: ["351672520236"]
        },
        MaxResults: 10
    },
    dataset_13: {
        PackageId: {
            GTIN14: ["00300780385664"]
        },
        MaxResults: 40
    },
    dataset_14: {
        PackageId: {
            GTIN14: ["00351672406219"]
        },
        MaxResults: 20
    },
    dataset_15: {
        PackageId: {
            GTIN14: ["00305913220010"]
        },
        MaxResults: 30
    },
    dataset_16: {
        PackageId: {
            NHRIC: ["8595-070050"]
        },
        MaxResults: 20
    },
    dataset_17: {
        PackageId: {
            NHRIC: ["8373-982600"]
        },
        MaxResults: 20
    },
    dataset_18: {
        PackageId: {
            NHRIC: ["8290-091002"]
        },
        MaxResults: 40
    },
    dataset_19: {
        PackageId: {
            PIN: ["50580011108"]
        },
        MaxResults: 35
    },
    dataset_20: {
        PackageId: {
            PIN: ["50580049698"]
        },
        MaxResults: 20
    },
    dataset_21: {
        PackageId: {
            PIN: ["70030013513"]
        },
        MaxResults: 40
    },
    dataset_22: {
        PackageId: {
            PackageId: ["2052"]
        },
        MaxResults: 10
    },
    dataset_23: {
        PackageId: {
            PackageId: ["6474"]
        },
        MaxResults: 20
    },
    dataset_24: {
        PackageId: {
            PackageId: ["6475"]
        },
        MaxResults: 30
    },

},

// new dataset for ListPackagePrices MFP

// Reports - ListPackagePrices Data Objects 
ListPackagePrices_dataObjects_mfp: {
    dataset_1: { PackageId: { PackageId: ["105928"] }, MaxResults: 25 },
    dataset_2: { PackageId: { PackageId: ["105922"] }, MaxResults: 20 },
    dataset_3: { PackageId: { PackageId: ["170741"] }, MaxResults: 6 },
    dataset_4: { PackageId: { PackageId: ["199920"] }, MaxResults: 10 },
    dataset_5: { PackageId: { PackageId: ["170740"] }, MaxResults: 20 },
    dataset_6: { PackageId: { PackageId: ["199919"] }, MaxResults: 25 },
    dataset_7: { PackageId: { PackageId: ["132179"] }, MaxResults: 15 },
    dataset_8: { PackageId: { PackageId: ["132181"] }, MaxResults: 24 },
    dataset_9: { PackageId: { PackageId: ["118491"] }, MaxResults: 16 },
    dataset_10: { PackageId: { PackageId: ["125090"] }, MaxResults: 15 },
    dataset_11: { PackageId: { PackageId: ["118539"] }, MaxResults: 14 },
    dataset_12: { PackageId: { PackageId: ["125091"] }, MaxResults: 48 },
    dataset_13: { PackageId: { PackageId: ["192411"] }, MaxResults: 54 },
    dataset_14: { PackageId: { PackageId: ["159164"] }, MaxResults: 52 },
    dataset_15: { PackageId: { PackageId: ["158371"] }, MaxResults: 53 },
    dataset_16: { PackageId: { PackageId: ["70749"] }, MaxResults: 51 },
    dataset_17: { PackageId: { PackageId: ["123277"] }, MaxResults: 54 },
    dataset_18: { PackageId: { PackageId: ["179684"] }, MaxResults: 12 },
    dataset_19: { PackageId: { PackageId: ["184376"] }, MaxResults: 16 },
    dataset_20: { PackageId: { PackageId: ["172173"] }, MaxResults: 15 },
    dataset_21: { PackageId: { PackageId: ["145159"] }, MaxResults: 10 },
    dataset_22: { PackageId: { PackageId: ["80536"] }, MaxResults: 20 },
    dataset_23: { PackageId: { PackageId: ["150351"] }, MaxResults: 30 },
    dataset_24: { PackageId: { PackageId: ["164184"] }, MaxResults: 40 },
    dataset_25: { PackageId: { PackageId: ["94894"] }, MaxResults: 55 },
    dataset_26: { PackageId: { NDC11: ["00003089321"] }, MaxResults: 50 },
    dataset_27: { PackageId: { NDC11: ["00003089331"] }, MaxResults: 25 },
    dataset_28: { PackageId: { NDC11: ["00003089341"] }, MaxResults: 20 },
    dataset_29: { PackageId: { NDC11: ["00003089421"] }, MaxResults: 20 },
    dataset_30: { PackageId: { NDC11: ["00003089431"] }, MaxResults: 6 },
    dataset_31: { PackageId: { NDC11: ["00003089441"] }, MaxResults: 10 },
    dataset_32: { PackageId: { NDC11: ["00003089470"] }, MaxResults: 20 },
    dataset_33: { PackageId: { NDC11: ["00003376474"] }, MaxResults: 25 },
    dataset_34: { PackageId: { NDC11: ["58406001001"] }, MaxResults: 15 },
    dataset_35: { PackageId: { NDC11: ["58406001004"] }, MaxResults: 24 },
    dataset_36: { PackageId: { NDC11: ["58406002101"] }, MaxResults: 16 },
    dataset_37: { PackageId: { NDC11: ["58406002104"] }, MaxResults: 15 },
    dataset_38: { PackageId: { NDC11: ["58406003201"] }, MaxResults: 14 },
    dataset_39: { PackageId: { NDC11: ["58406003204"] }, MaxResults: 48 },
    dataset_40: { PackageId: { NDC11: ["58406004401"] }, MaxResults: 54 },
    dataset_41: { PackageId: { NDC11: ["58406004404"] }, MaxResults: 52 },
    dataset_42: { PackageId: { NDC11: ["58406005504"] }, MaxResults: 53 },
    dataset_43: { PackageId: { NDC11: ["58406042534"] }, MaxResults: 51 },
    dataset_44: { PackageId: { NDC11: ["58406042541"] }, MaxResults: 54 },
    dataset_45: { PackageId: { NDC11: ["58406043501"] }, MaxResults: 12 },
    dataset_46: { PackageId: { NDC11: ["58406043504"] }, MaxResults: 16 },
    dataset_47: { PackageId: { NDC11: ["58406044501"] }, MaxResults: 15 },
    dataset_48: { PackageId: { NDC11: ["58406044504"] }, MaxResults: 10 },
    dataset_49: { PackageId: { NDC11: ["58406044601"] }, MaxResults: 20 },
    dataset_50: { PackageId: { NDC11: ["58406044604"] }, MaxResults: 30 },
    dataset_51: { PackageId: { NDC11: ["58406045501"] }, MaxResults: 40 },
    dataset_52: { PackageId: { NDC11: ["58406045504"] }, MaxResults: 55 },
    dataset_53: { PackageId: { NDC11: ["58406045601"] }, MaxResults: 50 },
    dataset_54: { PackageId: { NDC11: ["58406045604"] }, MaxResults: 10 },
    dataset_55: { PackageId: { NDC11: ["00078065920"] }, MaxResults: 20 },
    dataset_56: { PackageId: { NDC11: ["00078065935"] }, MaxResults: 30 },
    dataset_57: { PackageId: { NDC11: ["00078065961"] }, MaxResults: 40 },
    dataset_58: { PackageId: { NDC11: ["00078065967"] }, MaxResults: 45 },
    dataset_59: { PackageId: { NDC11: ["00078069620"] }, MaxResults: 15 },
    dataset_60: { PackageId: { NDC11: ["00078069635"] }, MaxResults: 25 },
    dataset_61: { PackageId: { NDC11: ["00078069661"] }, MaxResults: 35 },
    dataset_62: { PackageId: { NDC11: ["00078069667"] }, MaxResults: 10 },
    dataset_63: { PackageId: { NDC11: ["00078077720"] }, MaxResults: 5 },
    dataset_64: { PackageId: { NDC11: ["00078077735"] }, MaxResults: 15 },
    dataset_65: { PackageId: { NDC11: ["00078077761"] }, MaxResults: 25 },
    dataset_66: { PackageId: { NDC11: ["00078077767"] }, MaxResults: 35 },
    dataset_67: { PackageId: { NDC11: ["00078123120"] }, MaxResults: 45 },
    dataset_68: { PackageId: { NDC11: ["00078123820"] }, MaxResults: 55 },
    dataset_69: { PackageId: { NDC11: ["71610080632"] }, MaxResults: 65 },
    dataset_70: { PackageId: { NDC11: ["71610080737"] }, MaxResults: 5 },
    dataset_71: { PackageId: { NDC11: ["71610081032"] }, MaxResults: 10 },
    dataset_72: { PackageId: { NDC11: ["00003142711"] }, MaxResults: 15 },
    dataset_73: { PackageId: { NDC11: ["00003142712"] }, MaxResults: 25 },
    dataset_74: { PackageId: { NDC11: ["00003142713"] }, MaxResults: 20 },
    dataset_75: { PackageId: { NDC11: ["00003142714"] }, MaxResults: 30 },
    dataset_76: { PackageId: { NDC11: ["00003142791"] }, MaxResults: 50 },
    dataset_77: { PackageId: { NDC11: ["00003142811"] }, MaxResults: 25 },
    dataset_78: { PackageId: { NDC11: ["00003142812"] }, MaxResults: 20 },
    dataset_79: { PackageId: { NDC11: ["00003142813"] }, MaxResults: 20 },
    dataset_80: { PackageId: { NDC11: ["00003142814"] }, MaxResults: 6 },
    dataset_81: { PackageId: { NDC11: ["00003142891"] }, MaxResults: 10 },
    dataset_82: { PackageId: { NDC11: ["00310620530"] }, MaxResults: 20 },
    dataset_83: { PackageId: { NDC11: ["00310620590"] }, MaxResults: 25 },
    dataset_84: { PackageId: { NDC11: ["00310621030"] }, MaxResults: 15 },
    dataset_85: { PackageId: { NDC11: ["00310621039"] }, MaxResults: 24 },
    dataset_86: { PackageId: { NDC11: ["00310621090"] }, MaxResults: 16 },
    dataset_87: { PackageId: { NDC11: ["66993045630"] }, MaxResults: 15 },
    dataset_88: { PackageId: { NDC11: ["66993045730"] }, MaxResults: 14 },
    dataset_89: { PackageId: { NDC11: ["57962000712"] }, MaxResults: 48 },
    dataset_90: { PackageId: { NDC11: ["57962001428"] }, MaxResults: 54 },
    dataset_91: { PackageId: { NDC11: ["57962007028"] }, MaxResults: 52 },
    dataset_92: { PackageId: { NDC11: ["57962014009"] }, MaxResults: 53 },
    dataset_93: { PackageId: { NDC11: ["57962014012"] }, MaxResults: 51 },
    dataset_94: { PackageId: { NDC11: ["57962028028"] }, MaxResults: 54 },
    dataset_95: { PackageId: { NDC11: ["57962042028"] }, MaxResults: 12 },
    dataset_96: { PackageId: { NDC11: ["57962056028"] }, MaxResults: 16 },
    dataset_97: { PackageId: { NDC11: ["00006011201"] }, MaxResults: 15 },
    dataset_98: { PackageId: { NDC11: ["00006011228"] }, MaxResults: 10 },
    dataset_99: { PackageId: { NDC11: ["00006011231"] }, MaxResults: 20 },
    dataset_100: { PackageId: { NDC11: ["00006011254"] }, MaxResults: 30 },
    dataset_101: { PackageId: { NDC11: ["00006022101"] }, MaxResults: 40 },
    dataset_102: { PackageId: { NDC11: ["00006022128"] }, MaxResults: 55 },
    dataset_103: { PackageId: { NDC11: ["00006022131"] }, MaxResults: 50 },
    dataset_104: { PackageId: { NDC11: ["00006022154"] }, MaxResults: 10 },
    dataset_105: { PackageId: { NDC11: ["00006027701"] }, MaxResults: 20 },
    dataset_106: { PackageId: { NDC11: ["00006027702"] }, MaxResults: 30 },
    dataset_107: { PackageId: { NDC11: ["00006027714"] }, MaxResults: 40 },
    dataset_108: { PackageId: { NDC11: ["00006027727"] }, MaxResults: 45 },
    dataset_109: { PackageId: { NDC11: ["00006027728"] }, MaxResults: 15 },
    dataset_110: { PackageId: { NDC11: ["00006027730"] }, MaxResults: 25 },
    dataset_111: { PackageId: { NDC11: ["00006027731"] }, MaxResults: 35 },
    dataset_112: { PackageId: { NDC11: ["00006027733"] }, MaxResults: 10 },
    dataset_113: { PackageId: { NDC11: ["00006027754"] }, MaxResults: 5 },
    dataset_114: { PackageId: { NDC11: ["00006027774"] }, MaxResults: 15 },
    dataset_115: { PackageId: { NDC11: ["00006027782"] }, MaxResults: 25 },
    dataset_116: { PackageId: { NDC11: ["00597015230"] }, MaxResults: 35 },
    dataset_117: { PackageId: { NDC11: ["00597015237"] }, MaxResults: 45 },
    dataset_118: { PackageId: { NDC11: ["00597015290"] }, MaxResults: 55 },
    dataset_119: { PackageId: { NDC11: ["00597015330"] }, MaxResults: 65 },
    dataset_120: { PackageId: { NDC11: ["00597015337"] }, MaxResults: 5 },
    dataset_121: { PackageId: { NDC11: ["00597015390"] }, MaxResults: 10 },
    dataset_122: { PackageId: { NDC11: ["00169210011"] }, MaxResults: 15 },
    dataset_123: { PackageId: { NDC11: ["00169210112"] }, MaxResults: 25 },
    dataset_124: { PackageId: { NDC11: ["00169210125"] }, MaxResults: 20 },
    dataset_125: { PackageId: { NDC11: ["00169320111"] }, MaxResults: 30 },
    dataset_126: { PackageId: { NDC11: ["00169320415"] }, MaxResults: 50 },
    dataset_127: { PackageId: { NDC11: ["00169320511"] }, MaxResults: 25 },
    dataset_128: { PackageId: { NDC11: ["00169320515"] }, MaxResults: 20 },
    dataset_129: { PackageId: { NDC11: ["00169320611"] }, MaxResults: 20 },
    dataset_130: { PackageId: { NDC11: ["00169320615"] }, MaxResults: 6 },
    dataset_131: { PackageId: { NDC11: ["00169330312"] }, MaxResults: 10 },
    dataset_132: { PackageId: { NDC11: ["00169633910"] }, MaxResults: 20 },
    dataset_133: { PackageId: { NDC11: ["00169750111"] }, MaxResults: 25 },
    dataset_134: { PackageId: { NDC11: ["73070010011"] }, MaxResults: 15 },
    dataset_135: { PackageId: { NDC11: ["73070010210"] }, MaxResults: 24 },
    dataset_136: { PackageId: { NDC11: ["73070010215"] }, MaxResults: 16 },
    dataset_137: { PackageId: { NDC11: ["73070010310"] }, MaxResults: 15 },
    dataset_138: { PackageId: { NDC11: ["73070010315"] }, MaxResults: 14 },
    dataset_139: { PackageId: { NDC11: ["57894005427"] }, MaxResults: 48 },
    dataset_140: { PackageId: { NDC11: ["57894006002"] }, MaxResults: 54 },
    dataset_141: { PackageId: { NDC11: ["57894006003"] }, MaxResults: 52 },
    dataset_142: { PackageId: { NDC11: ["57894006102"] }, MaxResults: 53 },
    dataset_143: { PackageId: { NDC11: ["57894006103"] }, MaxResults: 51 },
    dataset_144: { PackageId: { NDC11: ["50458057501"] }, MaxResults: 54 },
    dataset_145: { PackageId: { NDC11: ["50458057701"] }, MaxResults: 12 },
    dataset_146: { PackageId: { NDC11: ["50458057710"] }, MaxResults: 16 },
    dataset_147: { PackageId: { NDC11: ["50458057718"] }, MaxResults: 15 },
    dataset_148: { PackageId: { NDC11: ["50458057760"] }, MaxResults: 10 },
    dataset_149: { PackageId: { NDC11: ["50458057801"] }, MaxResults: 20 },
    dataset_150: { PackageId: { NDC11: ["50458057810"] }, MaxResults: 30 },
    dataset_151: { PackageId: { NDC11: ["50458057830"] }, MaxResults: 40 },
    dataset_152: { PackageId: { NDC11: ["50458057890"] }, MaxResults: 55 },
    dataset_153: { PackageId: { NDC11: ["50458057901"] }, MaxResults: 50 },
    dataset_154: { PackageId: { NDC11: ["50458057910"] }, MaxResults: 10 },
    dataset_155: { PackageId: { NDC11: ["50458057930"] }, MaxResults: 20 },
    dataset_156: { PackageId: { NDC11: ["50458057989"] }, MaxResults: 30 },
    dataset_157: { PackageId: { NDC11: ["50458057990"] }, MaxResults: 40 },
    dataset_158: { PackageId: { NDC11: ["50458058001"] }, MaxResults: 45 },
    dataset_159: { PackageId: { NDC11: ["50458058010"] }, MaxResults: 15 },
    dataset_160: { PackageId: { NDC11: ["50458058030"] }, MaxResults: 25 },
    dataset_161: { PackageId: { NDC11: ["50458058090"] }, MaxResults: 35 },
    dataset_162: { PackageId: { NDC11: ["50458058451"] }, MaxResults: 10 },
    dataset_163: { PackageId: { NDC11: ["55154142200"] }, MaxResults: 5 },
    dataset_164: { PackageId: { NDC11: ["55154142308"] }, MaxResults: 15 },
    dataset_165: { PackageId: { NDC11: ["55154142400"] }, MaxResults: 25 },
    dataset_166: { PackageId: { NDC11: ["55154142408"] }, MaxResults: 35 }

},


// Reports - ListPackages Data Objects 
ListPackages_dataObjects: {

    dataset_1: {
        FilterType: "PackageId",
            Filter: "1718",
                MaxResults: "15"
    },

    dataset_2: {
        FilterType: "PackageId",
            Filter: "53087",
                MaxResults: "105"
    },

    dataset_3: {
        FilterType: "ProductName",
            Filter: "%Megestrol%",
                MaxResults: "50"
    },

    dataset_4: {
        FilterType: "ProductName",
            Filter: "%Nail Stick%",
                MaxResults: "20"
    },

    dataset_5: {
        FilterType: "IngredientName",
            Filter: "%abaca%",
                MaxResults: "30"
    },

    dataset_6: {
        FilterType: "IngredientName",
            Filter: "%phosphate%",
                MaxResults: "50"
    },

    dataset_7: {
        FilterType: "NDC10",
            Filter: "0026-0670-30",
                MaxResults: "20"
    },

    dataset_8: {
        FilterType: "NDC10",
            Filter: "0002-7512-01",
                MaxResults: "70"
    },

    dataset_9: {
        FilterType: "NDC11",
            Filter: "00026-0670-50",
                MaxResults: "100"
    },

    dataset_10: {
        FilterType: "NDC11",
            Filter: "00409-4777-61",
                MaxResults: "90"
    },

    dataset_11: {
        FilterType: "GTIN12",
            Filter: "309442940029",
                MaxResults: "100"
    },

    dataset_12: {
        FilterType: "GTIN12",
            Filter: "310019662039",
                MaxResults: "60"
    },

    dataset_13: {
        FilterType: "GTIN14",
            Filter: "00309442940036",
                MaxResults: "100"
    },

    dataset_14: {
        FilterType: "GTIN14",
            Filter: "00300780385664",
                MaxResults: "40"
    },

    dataset_15: {
        FilterType: "ProductId",
            Filter: "32972",
                MaxResults: "100"
    },

    dataset_16: {
        FilterType: "ProductId",
            Filter: "41449",
                MaxResults: "200"
    },

    dataset_17: {
        FilterType: "NDC9",
            Filter: "00026-3782",
                MaxResults: "50"
    },

    dataset_18: {
        FilterType: "NDC9",
            Filter: "00026-3783",
                MaxResults: "50"
    },

    dataset_19: {
        FilterType: "UPCB",
            Filter: "96295-12007",
                MaxResults: "100"
    },

    dataset_20: {
        FilterType: "UPCB",
            Filter: "96295-11194",
                MaxResults: "60"
    },

    dataset_21: {
        FilterType: "NHRIC",
            Filter: "8595-070050",
                MaxResults: "100"
    },

    dataset_22: {
        FilterType: "NHRIC",
            Filter: "8373-982600",
                MaxResults: "40"
    },

    dataset_23: {
        FilterType: "PIN",
            Filter: "00135-008969",
                MaxResults: "100"
    },

    dataset_24: {
        FilterType: "PIN",
            Filter: "50428373019",
                MaxResults: "200"
    },

},

// Reports - ListPackagesByCompany Data Objects 
ListPackagesByCompany_dataObjects: {

    dataset_1: {
        CompanyId: "163",
            CompanyIdType: "CompanyId",
                MaxResults: "10"
    },
    dataset_2: {
        CompanyId: "164",
            CompanyIdType: "CompanyId",
                MaxResults: "10"
    },
    dataset_3: {
        CompanyId: "168",
            CompanyIdType: "CompanyId",
                MaxResults: "10"
    },
    dataset_4: {
        CompanyId: "59911",
            CompanyIdType: "LabelerCode",
                MaxResults: "20"
    },
    dataset_5: {
        CompanyId: "60492",
            CompanyIdType: "LabelerCode",
                MaxResults: "30"
    },
    dataset_6: {
        CompanyId: "66019",
            CompanyIdType: "LabelerCode",
                MaxResults: "10"
    },

},

// Reports - ListPatientPackageInserts Data Objects 
ListPatientPackageInserts_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListPregnancyRatings Data Objects 
ListPregnancyRatings_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListPriceChangeReasons Data Objects 
ListPriceChangeReasons_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListPriceTypes Data Objects 
ListPriceTypes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListProductActiveIngredients  Data Objects 
ListProductActiveIngredients_dataObjects: {

    dataset_1: {
        ProductId: {
            ProductId: ["229"]
        },
        MaxResults: "30",
        },
    dataset_2: {
        ProductId: {
            ProductId: ["230"]
        },
        MaxResults: "20",
        },
    dataset_3: {
        ProductId: {
            ProductId: ["236"]
        },
        MaxResults: "25",
        },
    dataset_4: {
        ProductId: {
            NDC9: ["52544-0884"]
        },
        MaxResults: "30",
        },
    dataset_5: {
        ProductId: {
            NDC9: ["64731-0820"]
        },
        MaxResults: "20",
        },
    dataset_6: {
        ProductId: {
            NDC9: ["64731-0830"]
        },
        MaxResults: "30",
        },
},

// Reports - ListProductAttributes Data Objects 
ListProductAttributes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListProductInactiveIngredients  Data Objects 
ListProductInactiveIngredients_dataObjects: {

    dataset_1: {
        ProductId: {
            ProductId: ["230"]
        },
        MaxResults: "20",
        },
    dataset_2: {
        ProductId: {
            ProductId: ["236"]
        },
        MaxResults: "30",
        },
    dataset_3: {
        ProductId: {
            ProductId: ["279"]
        },
        MaxResults: "25",
        },
    dataset_4: {
        ProductId: {
            NDC9: ["63402-0511"]
        },
        MaxResults: "30",
        },
    dataset_5: {
        ProductId: {
            NDC9: ["00085-3305"]
        },
        MaxResults: "25",
        },
    dataset_6: {
        ProductId: {
            NDC9: ["00088-1795"]
        },
        MaxResults: "15",
        },
},

// Reports - ListProductModifiers Data Objects 
ListProductModifiers_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListProductModifierTypes Data Objects 
ListProductModifierTypes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListProductNames Data Objects 
ListProductNames_dataObjects: {

    dataset_1: {
        NameFilter: "%Lisin%",
            MaxResults: "5"
    },
    dataset_2: {
        NameFilter: "%10mg Tablet%",
            MaxResults: "20"
    },
    dataset_3: {
        NameFilter: "%500mg Capsule%",
            MaxResults: "10"
    },
    dataset_4: {
        NameFilter: "%Uni%",
            MaxResults: "8"
    },
    dataset_5: {
        NameFilter: "%zyvox%",
            MaxResults: "6"
    },
    dataset_6: {
        NameFilter: "%Tab%",
            MaxResults: "40"
    },

},


// Reports - ListProductNameTypes Data Objects 
ListProductNameTypes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},

// Reports - ListProducts Data Objects 
ListProducts_dataObjects: {

    dataset_1: {
        FilterType: "ProductName",
            Filter: "%A-Hydrocort%",
                BeersFilter: {
            AGSBeersStrengthOfRecommendation: "Item1",
                AGSBeersQualityOfEvidence: "Item1"
        },
        ReturnIngredientStrengthRouteForm: true,
            LimitedDistributionId: "0",
                ReturnLimitedDistribution: true,
                    MaxResults: "104"
    },
    dataset_2: {
        FilterType: "ProductName",
            Filter: "abelcet%",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "20"
    },

    dataset_3: {
        FilterType: "ProductName",
            Filter: "%abil%",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "49"
    },

    dataset_4: {
        FilterType: "IngredientName",
            Filter: "%Aloe%",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "46"
    },

    dataset_5: {
        FilterType: "IngredientName",
            Filter: "%Alpha%",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "8",
                        ReturnLimitedDistribution: true,
                            MaxResults: "17"
    },

    dataset_6: {
        FilterType: "IngredientName",
            Filter: "%alcoh%",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "4",
                        ReturnLimitedDistribution: true,
                            MaxResults: "51"
    },

    dataset_7: {
        FilterType: "ProductId",
            Filter: "220",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_8: {
        FilterType: "ProductId",
            Filter: "230",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_9: {
        FilterType: "ProductId",
            Filter: "280",
                ReturnIngredientStrengthRouteForm: false,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_10: {
        FilterType: "NDC9",
            Filter: "17478-0402",
                ReturnIngredientStrengthRouteForm: false,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_11: {
        FilterType: "NDC9",
            Filter: "58394-0011",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "20"
    },

    dataset_12: {
        FilterType: "NDC9",
            Filter: "57664-0471",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "49"
    },

    dataset_13: {
        FilterType: "GenericProductClinicalId",
            Filter: "653",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "46"
    },

    dataset_14: {
        FilterType: "GenericProductClinicalId",
            Filter: "682",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "17"
    },

    dataset_15: {
        FilterType: "GenericProductClinicalId",
            Filter: "723",
                ReturnIngredientStrengthRouteForm: false,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "51"
    },

    dataset_16: {
        FilterType: "MarketedProductId",
            Filter: "3178",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_17: {
        FilterType: "MarketedProductId",
            Filter: "91898",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_18: {
        FilterType: "MarketedProductId",
            Filter: "2216",
                ReturnIngredientStrengthRouteForm: false,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_19: {
        FilterType: "RxNormId",
            Filter: "477343",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "50"
    },

    dataset_20: {
        FilterType: "RxNormId",
            Filter: "543549",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "100"
    },

    dataset_21: {
        FilterType: "RxNormId",
            Filter: "309686",
                ReturnIngredientStrengthRouteForm: false,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "30"
    },


},


// Reports - ListProductsByCompany Data Objects 
ListProductsByCompany_dataObjects: {

    dataset_1: {
        Id: "161",
            IdType: "CompanyId",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "10",
        },
    dataset_2: {
        Id: "182",
            IdType: "CompanyId",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "8",
                        ReturnLimitedDistribution: true,
                            MaxResults: "30",
        },
    dataset_3: {
        Id: "369",
            IdType: "CompanyId",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "20",
        },
    dataset_4: {
        Id: "781",
            IdType: "LabelerCode",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "4",
                        ReturnLimitedDistribution: true,
                            MaxResults: "40",
        },
    dataset_5: {
        Id: "17478",
            IdType: "LabelerCode",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "4",
                        ReturnLimitedDistribution: true,
                            MaxResults: "20",
        },
    dataset_6: {
        Id: "45802",
            IdType: "LabelerCode",
                ReturnIngredientStrengthRouteForm: true,
                    LimitedDistributionId: "0",
                        ReturnLimitedDistribution: true,
                            MaxResults: "30",
        },

},


// Reports - ListProductsByTherapeuticConceptTree Data Objects - Type 1
ListProductsByTherapeuticConceptTree_dataObjects: {
    dataset_1: {
        TherapeuticConceptTreeTreeId: "190",
            ReturnIngredientStrengthRouteForm: true,
                LimitedDistributionId: "0",
                    ReturnLimitedDistribution: true,
                        MaxResults: "100",
                            patient: {
            NDC10: ["0002-7512-01"],
            },
        physician: {
            NDC10: ["0054-5747-25"],
            },
    },

    dataset_2: {
        TherapeuticConceptTreeTreeId: "1048",
            ReturnIngredientStrengthRouteForm: true,
                LimitedDistributionId: "0",
                    ReturnLimitedDistribution: true,
                        MaxResults: "50",
                            patient: {
            NDC11: ["00409-4777-61"],
            },
        physician: {
            ICD10: ["I70.508"],
            },
    },

    dataset_3: {
        TherapeuticConceptTreeTreeId: "1673",
            ReturnIngredientStrengthRouteForm: true,
                LimitedDistributionId: "0",
                    ReturnLimitedDistribution: true,
                        MaxResults: "30",
                            patient: {
            UPCB: ["96295-12007"],
            },
    },

    dataset_4: {
        TherapeuticConceptTreeTreeId: "16",
            ReturnIngredientStrengthRouteForm: true,
                LimitedDistributionId: "0",
                    ReturnLimitedDistribution: true,
                        MaxResults: "50",
                            patient: {
            NDC10: ["0093-6108-12"],
            },
    },
    dataset_5: {
        TherapeuticConceptTreeTreeId: "17",
            ReturnIngredientStrengthRouteForm: true,
                LimitedDistributionId: "0",
                    ReturnLimitedDistribution: true,
                        MaxResults: "50",
                            patient: {
            NDC10: ["0093-6108-12"],
                ProductId: ["697"]
        },
    },
    dataset_6: {
        TherapeuticConceptTreeTreeId: "18",
            ReturnIngredientStrengthRouteForm: true,
                LimitedDistributionId: "0",
                    ReturnLimitedDistribution: true,
                        MaxResults: "50",
                            patient: {
            NDC11: ["00009-5134-02"],
                NDC9: ["58394-0011"]
        },
    },
},


// Reports - ListProductStorageConceptLocation  Data Objects 
ListProductStorageConceptLocation_dataObjects: {

    dataset_1: {
        PackageOrProductId: {
            ProductId: ["19"]
        },
        MaxResults: "10"
    },

    dataset_2: {
        PackageOrProductId: {
            ProductId: ["34300"]
        },
        MaxResults: "10"
    },

    dataset_3: {
        PackageOrProductId: {
            ProductId: ["30"]
        },
        MaxResults: "20"
    },

    dataset_4: {
        PackageOrProductId: {
            PackageId: ["52827"]
        },
        MaxResults: "20"
    },

    dataset_5: {
        PackageOrProductId: {
            PackageId: ["53119"]
        },
        MaxResults: "30"
    },

    dataset_6: {
        PackageOrProductId: {
            NDC9: ["00002-7394"]
        },
        MaxResults: "30"
    },

    dataset_7: {
        PackageOrProductId: {
            NDC9: ["59075-0730"]
        },
        MaxResults: "20"
    },

    dataset_8: {
        PackageOrProductId: {
            UPCB: ["96295-10274"]
        },
        MaxResults: "20"
    },

    dataset_9: {
        PackageOrProductId: {
            UPCB: ["96295-11194"]
        },
        MaxResults: "20"
    },

    dataset_10: {
        PackageOrProductId: {
            NHRIC: ["8290-328335"]
        },
        MaxResults: "30"
    },

    dataset_11: {
        PackageOrProductId: {
            NHRIC: ["8548-050938"]
        },
        MaxResults: "30"
    },

    dataset_12: {
        PackageOrProductId: {
            PIN: ["50428221366"]
        },
        MaxResults: "20"
    },

    dataset_13: {
        PackageOrProductId: {
            PIN: ["50428219642"]
        },
        MaxResults: "20"
    },

    dataset_14: {
        PackageOrProductId: {
            NDC10: ["0031-2283-78"]
        },
        MaxResults: "20"
    },

    dataset_15: {
        PackageOrProductId: {
            NDC10: ["61570-079-01"]
        },
        MaxResults: "10"
    },

    dataset_16: {
        PackageOrProductId: {
            NDC11: ["00002-8730-59"]
        },
        MaxResults: "30"
    },

    dataset_17: {
        PackageOrProductId: {
            NDC11: ["00574-2004-16"]
        },
        MaxResults: "20"
    },

    dataset_18: {
        PackageOrProductId: {
            GTIN12: ["300370707104"]
        },
        MaxResults: "20"
    },

    dataset_19: {
        PackageOrProductId: {
            GTIN12: ["304720226604"]
        },
        MaxResults: "10"
    },

    dataset_20: {
        PackageOrProductId: {
            GTIN14: ["00300370707104"]
        },
        MaxResults: "30"
    },

    dataset_21: {
        PackageOrProductId: {
            GTIN14: ["00301725360609"]
        },
        MaxResults: "20"
    }


},


// Reports - ListREMS Data Objects 
ListREMS_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListRoutesOfAdministration Data Objects 
ListRoutesOfAdministration_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListRxNormByProduct  Data Objects 
ListRxNormByProduct_dataObjects: {

    valid_product_synonyms_dataset_1: {
        ProductId: {
            ProductId: ["38273"]
        },
        ReturnRxNormSynonyms: true,
        expectedStatus: 200
    },

    valid_product_no_synonyms_dataset_2: {
        ProductId: {
            ProductId: ["12379"]
        },
        ReturnRxNormSynonyms: false,
        expectedStatus: 200
    },

    zero_max_results_dataset_3: {
        ProductId: {
            ProductId: ["12399"]
        },
        MaxResults: 0,
        expectedStatus: 200
    },

    valid_ndc9_dataset_4: {
        ProductId: {
            NDC9: ["66591-0335"]
        },
        expectedStatus: 200
    },

    valid_alternate_ndc9_dataset_5: {
        ProductId: {
            NDC9: ["00002-4462"]
        },
        expectedStatus: 200
    },

    ndc9_limit_40_dataset_6: {
        ProductId: {
            NDC9: ["00002-5121"]
        },
        MaxResults: 40,
        expectedStatus: 200
    },

    missing_product_id_dataset_7: {
        ProductId: {
            ProductId: []
        },
        expectedStatus: 400
    },

    missing_product_id_type_dataset_8: {
        ProductId: {
            '': ["784"]
        },
        expectedStatus: 400
    },

},


// Reports - ListScriptForms Data Objects 
ListScriptForms_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListSeverityTypes Data Objects 
ListSeverityTypes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListShapes Data Objects 
ListShapes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListSigAdditionalInstructions Data Objects 
ListSigAdditionalInstructions_dataObjects: {

    dataset_1: {
        FilterType: "SigAdditionalInstructionId",
            Filter: "17",
                MaxResults: "100"
    },
    dataset_2: {
        FilterType: "SigAdditionalInstructionId",
            Filter: "5",
                MaxResults: "150"
    },
    dataset_3: {
        FilterType: "SigAdditionalInstructionId",
            Filter: "34",
                MaxResults: "100"
    },
    dataset_4: {
        FilterType: "SigAdditionalInstructionText",
            Filter: "%take%",
                MaxResults: "100"
    },
    dataset_5: {
        FilterType: "SigAdditionalInstructionText",
            Filter: "%exceed%",
                MaxResults: "180"
    },
    dataset_6: {
        FilterType: "SigAdditionalInstructionText",
            Filter: "%acetaminophen%",
                MaxResults: "180"
    },

},


// Reports - ListSigAdminMethods Data Objects 
ListSigAdminMethods_dataObjects: {

    dataset_1: {
        FilterType: "SigAdminMethodText",
            Filter: "%wish",
                MaxResults: "20"
    },

    dataset_2: {
        FilterType: "SigAdminMethodText",
            Filter: "%ser%",
                MaxResults: "20"
    },

    dataset_3: {
        FilterType: "SigAdminMethodText",
            Filter: "%still",
                MaxResults: "20"
    },

    dataset_4: {
        FilterType: "SigAdminMethodId",
            Filter: "10",
                MaxResults: "10"
    },

    dataset_5: {
        FilterType: "SigAdminMethodId",
            Filter: "2",
                MaxResults: "10"
    },

    dataset_6: {
        FilterType: "SigAdminMethodId",
            Filter: "3",
                MaxResults: "10"
    },

    dataset_7: {
        FilterType: "SNOMEDCT",
            Filter: "419652001",
                MaxResults: "100"
    },

    dataset_8: {
        FilterType: "SNOMEDCT",
            Filter: "417924000",
                MaxResults: "100"
    },

    dataset_9: {
        FilterType: "SNOMEDCT",
            Filter: "421257003",
                MaxResults: "100"
    }


},


// Reports - ListSigFrequencies Data Objects 
ListSigFrequencies_dataObjects: {

    dataset_1: {
        FilterType: "SigFrequencyText",
            Filter: "as needed",
                MaxResults: "200"
    },

    dataset_2: {
        FilterType: "SigFrequencyText",
            Filter: "as required",
                MaxResults: "400"
    },

    dataset_3: {
        FilterType: "SigFrequencyText",
            Filter: "once",
                MaxResults: "400"
    },

    dataset_4: {
        FilterType: "SigFrequencyId",
            Filter: "40",
                MaxResults: "100"
    },

    dataset_5: {
        FilterType: "SigFrequencyId",
            Filter: "44",
                MaxResults: "200"
    },

    dataset_6: {
        FilterType: "SigFrequencyId",
            Filter: "51",
                MaxResults: "200"
    },

    dataset_7: {
        FilterType: "SNOMEDCT",
            Filter: "422231003",
                MaxResults: "30"
    },

    dataset_8: {
        FilterType: "SNOMEDCT",
            Filter: "422135004",
                MaxResults: "100"
    },

    dataset_9: {
        FilterType: "SNOMEDCT",
            Filter: "420449005",
                MaxResults: "100"
    }


},



// Reports - ListSigPrescribingReasons Data Objects 
ListSigPrescribingReasons_dataObjects: {

    dataset_1: {
        FilterType: "SigPrescribingReasonText",
            Filter: "%acute%",
                MaxResults: "35"
    },

    dataset_2: {
        FilterType: "ICD9",
            Filter: "787.3",
                MaxResults: "10"
    },

    dataset_3: {
        FilterType: "ICD9",
            Filter: "V62.3",
                MaxResults: "100"
    },

    dataset_4: {
        FilterType: "ICD9",
            Filter: "313.83",
                MaxResults: "100"
    },

    dataset_5: {
        FilterType: "SNOMEDCT",
            Filter: "F-52421",
                MaxResults: "100"
    },

    dataset_6: {
        FilterType: "SNOMEDCT",
            Filter: "F-50812",
                MaxResults: "100"
    },

    dataset_7: {
        FilterType: "SNOMEDCT",
            Filter: "F-50860",
                MaxResults: "100"
    },

    dataset_8: {
        FilterType: "SigPrescribingReasonId",
            Filter: "10",
                MaxResults: "200"
    },

    dataset_9: {
        FilterType: "SigPrescribingReasonId",
            Filter: "11",
                MaxResults: "200"
    },

    dataset_10: {
        FilterType: "SigPrescribingReasonId",
            Filter: "12",
                MaxResults: "200"
    }


},


// Reports - ListSigRouteCategories Data Objects 
ListSigRouteCategories_dataObjects: {

    dataset_1: {
        FilterType: "SigRouteCategoryId",
            Filter: "3",
                MaxResults: "23"
    },

    dataset_2: {
        FilterType: "SigRouteCategoryId",
            Filter: "1",
                MaxResults: "25"
    },

    dataset_3: {
        FilterType: "SigRouteCategoryId",
            Filter: "2",
                MaxResults: "25"
    },

    dataset_4: {
        FilterType: "SigRouteCategoryText",
            Filter: "rectal",
                MaxResults: "23"
    },

    dataset_5: {
        FilterType: "SigRouteCategoryText",
            Filter: "vaginal",
                MaxResults: "23"
    },

    dataset_6: {
        FilterType: "SigRouteCategoryText",
            Filter: "topical",
                MaxResults: "23"
    }


},


// Reports - ListSigRoutesOfAdministration Data Objects 
ListSigRoutesOfAdministration_dataObjects: {

    dataset_1: {
        FilterType: "RouteText",
            Filter: "%mouth%",
                MaxResults: "10"
    },

    dataset_2: {
        FilterType: "RouteText",
            Filter: "%venous%",
                MaxResults: "10"
    },

    dataset_3: {
        FilterType: "RouteText",
            Filter: "%mouth%",
                MaxResults: "10"
    },

    dataset_4: {
        FilterType: "RouteId",
            Filter: "60",
                MaxResults: "20"
    },

    dataset_5: {
        FilterType: "RouteId",
            Filter: "2",
                MaxResults: "10"
    },

    dataset_6: {
        FilterType: "RouteId",
            Filter: "3",
                MaxResults: "20"
    },

    dataset_7: {
        FilterType: "SNOMEDCT",
            Filter: "261100002",
                MaxResults: "15"
    },

    dataset_8: {
        FilterType: "SNOMEDCT",
            Filter: "422231003",
                MaxResults: "30"
    },

    dataset_9: {
        FilterType: "SNOMEDCT",
            Filter: "422135004",
                MaxResults: "100"
    }


},


// Reports - ListSigUnits Data Objects 
ListSigUnits_dataObjects: {

    dataset_1: {
        FilterType: "SigUnitText",
            Filter: "inhalation",
                MaxResults: "100"
    },

    dataset_2: {
        FilterType: "SigUnitText",
            Filter: "tablet",
                MaxResults: "100"
    },

    dataset_3: {
        FilterType: "SigUnitText",
            Filter: "capsule",
                MaxResults: "100"
    },

    dataset_4: {
        FilterType: "SNOMEDCT",
            Filter: "428673006",
                MaxResults: "10"
    },

    dataset_5: {
        FilterType: "SNOMEDCT",
            Filter: "385049006",
                MaxResults: "10"
    },

    dataset_6: {
        FilterType: "SNOMEDCT",
            Filter: "428673006",
                MaxResults: "10"
    },

    dataset_7: {
        FilterType: "SigUnitId",
            Filter: "9",
                MaxResults: "40"
    },

    dataset_8: {
        FilterType: "SigUnitId",
            Filter: "11",
                MaxResults: "50"
    },

    dataset_9: {
        FilterType: "SigUnitId",
            Filter: "12",
                MaxResults: "60"
    }


},


// Reports - ListSpecificProducts  Data Objects 
ListSpecificProducts_dataObjects: {

    dataset_1: {
        MaxResults: "15",
            NameFilter: "%gauge%"
    },


    dataset_2: {
        MaxResults: "15",
            NameFilter: "%caffeine%"
    },


    dataset_3: {
        MaxResults: "15",
            NameFilter: "%inert%"
    },

    dataset_4: {
        PackageOrProductFilter: {
            ProductId: ["3391"]
        },
        MaxResults: "20"
    },

    dataset_5: {
        PackageOrProductFilter: {
            ProductId: ["3392"]
        },
        MaxResults: "20"
    },

    dataset_6: {
        PackageOrProductFilter: {
            NDC9: ["66267-0995"]
        },
        MaxResults: "90"
    },

    dataset_7: {
        PackageOrProductFilter: {
            NDC9: ["66267-0016"]
        },
        MaxResults: "105"
    },

    dataset_8: {
        PackageOrProductFilter: {
            PackageId: ["4767"]
        },
        MaxResults: "20"
    },

    dataset_9: {
        PackageOrProductFilter: {
            PackageId: ["4770"]
        },
        MaxResults: "20"
    },

    dataset_10: {
        PackageOrProductFilter: {
            NDC10: ["59630-411-90"]
        },
        MaxResults: "100"
    },

    dataset_11: {
        PackageOrProductFilter: {
            NDC10: ["0258-3690-90"]
        },
        MaxResults: "100"
    },

    dataset_12: {
        PackageOrProductFilter: {
            UPCB: ["96295-10274"]
        },
        MaxResults: "20"
    },

    dataset_13: {
        PackageOrProductFilter: {
            UPCB: ["96295-11194"]
        },
        MaxResults: "20"
    },

    dataset_14: {
        PackageOrProductFilter: {
            NHRIC: ["8290-328335"]
        },
        MaxResults: "30"
    },

    dataset_15: {
        PackageOrProductFilter: {
            NHRIC: ["8548-050938"]
        },
        MaxResults: "30"
    },

    dataset_16: {
        PackageOrProductFilter: {
            PIN: ["50428221366"]
        },
        MaxResults: "20"
    },

    dataset_17: {
        PackageOrProductFilter: {
            PIN: ["50428219642"]
        },
        MaxResults: "20"
    },

    dataset_18: {
        PackageOrProductFilter: {
            GTIN12: ["300370707104"]
        },
        MaxResults: "20"
    },

    dataset_19: {
        PackageOrProductFilter: {
            GTIN12: ["304720226604"]
        },
        MaxResults: "10"
    },

    dataset_20: {
        PackageOrProductFilter: {
            GTIN14: ["00300370707104"]
        },
        MaxResults: "30"
    },

    dataset_21: {
        PackageOrProductFilter: {
            GTIN14: ["00301725360609"]
        },
        MaxResults: "20"
    },

    dataset_22: {
        PackageOrProductFilter: {
            NDC11: ["00002-8730-59"]
        },
        MaxResults: "20"
    },

    dataset_23: {
        PackageOrProductFilter: {
            NDC11: ["00574-2004-16"]
        },
        MaxResults: "20"
    }


},


// Reports - ListStateDEAClassification  Data Objects 
ListStateDEAClassification_dataObjects: {

    valid_ndc9_wi_dataset_1: {
        ProductId: { NDC9: ["58177-0426"] },
        StateId: "WI",
        expectedStatus: 200
    },
    valid_ndc9_la_dataset_2: {
        ProductId: { NDC9: ["00573-0189"] },
        StateId: "LA",
        expectedStatus: 200
    },
    valid_ndc9_ms_dataset_3: {
        ProductId: { NDC9: ["00591-0396"] },
        StateId: "MS",
        expectedStatus: 200
    },
    valid_ndc9_mi_dataset_4: {
        ProductId: { NDC9: ["00591-0395"] },
        StateId: "MI",
        expectedStatus: 200
    },
    valid_product_id_ks_dataset_5: {
        ProductId: { ProductId: ["343"] },
        StateId: "KS",
        expectedStatus: 200
    },
    valid_product_id_ga_dataset_6: {
        ProductId: { ProductId: ["353"] },
        StateId: "GA",
        expectedStatus: 200
    },
    valid_product_id_il_dataset_7: {
        ProductId: { ProductId: ["373"] },
        StateId: "IL",
        expectedStatus: 200
    },
    valid_product_id_la_dataset_8: {
        ProductId: { ProductId: ["374"] },
        StateId: "LA",
        expectedStatus: 200
    },
    missing_state_id_dataset_9: {
        ProductId: { IdType: "ProductId", Id: "7284" },
        expectedStatus: 400
    },
    missing_product_id_type_dataset_10: {
        ProductId: { Id: "374" },
        StateId: "LA",
        expectedStatus: 400
    },
    missing_product_id_dataset_11: {
        ProductId: { IdType: "ProductId" },
        StateId: "GA",
        expectedStatus: 400
    },
},

// Reports - ListStateLegendStatus  Data Objects 
ListStateLegendStatus_dataObjects: {

    dataset_1: {
        ProductId: {
            NDC9: ["58177-0426"]
        },
        StateId: "WI",
        },
    dataset_2: {
        ProductId: {
            NDC9: ["00573-0189"]
        },
        StateId: "LA",
        },
    dataset_3: {
        ProductId: {
            NDC9: ["00591-0396"]
        },
        StateId: "MS",
        },
    dataset_4: {
        ProductId: {
            NDC9: ["00591-0395"]
        },
        StateId: "MI",
        },
    dataset_5: {
        ProductId: {
            ProductId: ["274"]
        },
        StateId: "MS",
        },
    dataset_6: {
        ProductId: {
            ProductId: ["312"]
        },
        StateId: "IN",
        },
    dataset_7: {
        ProductId: {
            ProductId: ["689"]
        },
        StateId: "OR",
        },
    dataset_8: {
        ProductId: {
            ProductId: ["274"]
        },
        StateId: "GA",
        },
},


// Reports - ListStates Data Objects 
ListStates_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListStorage Data Objects 
ListStorage_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },


},


// Reports - ListSubCandidateProducts  Data Objects 
ListSubCandidateProducts_dataObjects: {

    dataset_1: {
        ProductId: {
            NDC9: ["64909-0114"]
        },
        ReturnProductModifier: true,
            MaxResults: "12",
        },
    dataset_2: {
        ProductId: {
            NDC9: ["00591-0660"]
        },
        ReturnProductModifier: true,
            MaxResults: "20",
        },
    dataset_3: {
        ProductId: {
            NDC9: ["00591-0409"]
        },
        ReturnProductModifier: true,
            MaxResults: "10",
        },
    dataset_4: {
        ProductId: {
            NDC9: ["00591-0726"]
        },
        ReturnProductModifier: true,
            MaxResults: "15",
        },
    dataset_5: {
        ProductId: {
            NDC9: ["00591-0745"]
        },
        ReturnProductModifier: true,
            MaxResults: "25",
        },
    dataset_6: {
        ProductId: {
            ProductId: ["69132"]
        },
        ReturnProductModifier: true,
            MaxResults: "15",
        },
    dataset_7: {
        ProductId: {
            ProductId: ["53674"]
        },
        ReturnProductModifier: true,
            MaxResults: "25",
        },
    dataset_8: {
        ProductId: {
            ProductId: ["46484"]
        },
        ReturnProductModifier: true,
            MaxResults: "100",
        },
    dataset_9: {
        ProductId: {
            ProductId: ["38266"]
        },
        ReturnProductModifier: true,
            MaxResults: "50",
        },
    dataset_10: {
        ProductId: {
            ProductId: ["540"]
        },
        ReturnProductModifier: true,
            MaxResults: "100",
        },
},


// Reports - ListTherapeuticConceptTree Data Objects 
ListTherapeuticConceptTree_dataObjects: {

    dataset_1: {
        FilterType: "TherapeuticConceptId",
            Filter: "1369",
                MaxResults: "20"
    },
    dataset_2: {
        FilterType: "TherapeuticConceptId",
            Filter: "1",
                MaxResults: "100"
    },
    dataset_3: {
        FilterType: "TherapeuticConceptId",
            Filter: "943",
                MaxResults: "25"
    },
    dataset_4: {
        FilterType: "TherapeuticConceptId",
            Filter: "277",
                MaxResults: "30"
    },
    dataset_5: {
        FilterType: "TherapeuticConceptName",
            Filter: "%agents%",
                MaxResults: "25"
    },
    dataset_6: {
        FilterType: "TherapeuticConceptName",
            Filter: "%ment%",
                MaxResults: "100"
    },
    dataset_7: {
        FilterType: "TherapeuticConceptName",
            Filter: "%ster%",
                MaxResults: "200"
    },
    dataset_8: {
        FilterType: "TherapeuticConceptName",
            Filter: "%pro%",
                MaxResults: "200"
    },

},


// Reports - ListTherapeuticEquivalenceCodes Data Objects 
ListTherapeuticEquivalenceCodes_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListUnitDoseIndicators Data Objects 
ListUnitDoseIndicators_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListUnits Data Objects 
ListUnits_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - ListWarningLabels Data Objects 
ListWarningLabels_dataObjects: {

    valid_warning_label_id_dataset_1: {
        FilterType: "WarningLabelId",
        Filter: "1369",
        LanguageCode: "es",
        VendorId: "1",
        MaxResults: "15",
        expectedStatus: 200
    },
    valid_warning_label_text_french_dataset_2: {
        FilterType: "WarningLabelText",
        Filter: "%para%",
        LanguageCode: "fr",
        MaxResults: "20",
        expectedStatus: 200
    },
    valid_warning_label_id_without_vendor_dataset_3: {
        FilterType: "WarningLabelId",
        Filter: "10",
        LanguageCode: "es",
        MaxResults: "20",
        expectedStatus: 200
    },
    valid_warning_label_text_spanish_dataset_4: {
        FilterType: "WarningLabelText",
        Filter: "%tomar%",
        LanguageCode: "es",
        VendorId: "1",
        MaxResults: "30",
        expectedStatus: 200
    },
    max_results_omitted_dataset_5: {
        FilterType: "WarningLabelId",
        Filter: "1369",
        LanguageCode: "es",
        expectedStatus: 200
    },
    missing_language_code_dataset_6: {
        FilterType: "WarningLabelText",
        Filter: "%para%",
        MaxResults: "20",
        expectedStatus: 400
    },
    invalid_filter_value_dataset_7: {
        FilterType: "WarningLabelText",
        Filter: "10",
        LanguageCode: "es",
        MaxResults: "20",
        expectedStatus: 400
    },
    max_results_out_of_range_dataset_8: {
        FilterType: "WarningLabelText",
        Filter: "%tomar%",
        LanguageCode: "es",
        VendorId: "1",
        MaxResults: "20000000000",
        expectedStatus: 400
    },
    empty_filter_dataset_9: {
        FilterType: "WarningLabelText",
        Filter: "",
        LanguageCode: "fr",
        MaxResults: "20",
        expectedStatus: 400
    },
    invalid_access_token_dataset_10: {
        FilterType: "WarningLabelText",
        Filter: "%para%",
        LanguageCode: "fr",
        MaxResults: "20",
        tokenType: "invalid",
        postOnly: true,
        expectedStatus: 400,
        expectedError: {
            Type: "Authentication Error",
            Text: "AccessToken is invalid or expired"
        }
    },

},


// Reports - ListWarningLabelVendors Data Objects 
ListWarningLabelVendors_dataObjects: {

    dataset_1: {
        MaxResults: "100",
        },
    dataset_2: {
        MaxResults: "50"
    },
    dataset_3: {
        MaxResults: "25"
    },
    dataset_4: {
        MaxResults: "20"
    },
    dataset_5: {
        MaxResults: "0"
    },

},


// Reports - MedGuide Data Objects 
MedGuide_dataObjects: {

    dataset_1: {
        MedGuideId: "1",
        },
    dataset_2: {
        MedGuideId: "4"
    },
    dataset_3: {
        MedGuideId: "5"
    },
    dataset_4: {
        MedGuideId: "10"
    },
    dataset_6: {
        MedGuideId: "30"
    },
    dataset_7: {
        MedGuideId: "40"
    },
    dataset_8: {
        MedGuideId: "50"
    },

},

}
