import { Application } from "src/entity/application";
import { EntityTransformer } from "src/util/entity_transformer";
import { FileDto } from "./file_dto";
export declare class ApplicationDto implements EntityTransformer<Application> {
    id: string;
    appName: string;
    code: string;
    email: string;
    url: string;
    urlConfirm: string;
    phone: string;
    redictUrl: string;
    logo: FileDto;
    token: string;
    nom: string;
    prenom: string;
    toEntity(): Application;
}
