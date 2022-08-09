import { Role } from "src/entity/role";
import { Privilege } from "src/model/privileges";
import { EntityTransformer } from "src/util/entity_transformer";
import { ModuleDto } from "./module-dto";
export declare class ModulesPrivilegesDto {
    module: ModuleDto;
    privileges: Privilege[];
}
export declare class RoleDto {
    id: string;
    libelle: string;
    modules: ModulesPrivilegesDto[];
    toEntity(): Role;
}
export declare class RoleSimpleDto implements EntityTransformer<Role> {
    id: string;
    libelle: string;
    toEntity(): Role;
}
