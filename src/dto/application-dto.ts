import { Application } from "src/entity/application";
import { EntityTransformer } from "src/util/entity_transformer";
import { FileDto } from "./file_dto";

export class ApplicationDto implements EntityTransformer<Application>{
    
    id:string;
    appName : string;
    code : string;

    email : string;
    url : string;
    urlConfirm : string;
    phone:string;
    redictUrl : string;
    logo : FileDto;
    token : string;

    //For user
    nom : string;
    prenom : string;

    toEntity(): Application {
        let a  = new Application();
            a.appName = this.appName;
            a.code = this.code;
            a.email = this.email;
            a.phone = this.phone;
            a.url = this.url;
            a.redictUrl = this.redictUrl;
            a.urlConfirm = this.urlConfirm;
            
        console.log(a);
        return a ;
    }
}