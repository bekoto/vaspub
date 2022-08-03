import { Module } from "./module";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ModulePrivileges } from "./role-module";

export type RoleDocument =  Role & Document;
@Schema({
    _id : false
})
export class Role{
    @Prop(
        { _id :true, auto:true}
    )
    id:mongoose.Types.ObjectId 
    @Prop({uniuqe : true})
    role : string;
    @Prop(
        
    )
    modules : ModulePrivileges[]


}
export const RoleSchema = SchemaFactory.createForClass(Role);