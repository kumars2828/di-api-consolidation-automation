import { get } from "browser-sync"

export default{



    CERT_Env : 'cert-api',
    CERT_New_Env : "cert-api",  


    //Getter methods to efficently call the required environment value
    get cert_env(){
        return this.CERT_Env
    },

    get prod_old_env(){
        return this.Prod_old_Env
    },

    get prod_new_env(){
        return this.Prod_new_Env
    },

    get prod_staging_env(){
        return this.Prod_staging_Env
    },

    get cert_new_env(){
        return this.CERT_New_Env
    }


    


}