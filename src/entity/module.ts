import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export type ModuleDocument =  Module & Document;
@Schema({
    _id : false
})
export class Module{
    @Prop(
        { _id :true, auto:true}
    )
    id: mongoose.Types.ObjectId 
    @IsNotEmpty()
    libelle : string;
    @IsNotEmpty()
    displayName : string;
}

export const moduleSchema = SchemaFactory.createForClass(Module);