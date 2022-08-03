import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { Module } from "src/entity/module";

import { EntityTransformer } from "src/util/entity_transformer";

export class ModuleDto implements EntityTransformer<Module>{
    toEntity(): Module {
        let m = new Module();
        m.libelle = this.libelle;
        m.displayName = this.displayName;
        m.id = new mongoose.Types.ObjectId(this.id);
        return m;
    }
    id: string;
    @IsNotEmpty()
    libelle : string;
    @IsNotEmpty()
    displayName : string;
    
}


export class ModuleDataDto{
    modules : ModuleDto[];
}