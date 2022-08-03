import { Module } from "src/entity/module";
import { EntityTransformer } from "src/util/entity_transformer";
export declare class ModuleDto implements EntityTransformer<Module> {
    toEntity(): Module;
    id: string;
    libelle: string;
    displayName: string;
}
export declare class ModuleDataDto {
    modules: ModuleDto[];
}
