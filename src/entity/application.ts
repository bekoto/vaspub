import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { File } from "./file";
import { Module } from "./module";
import { Role } from "./role";
export type ApplicationDocument =  Application & Document;
@Schema({
   
})
export class Application{
    @Prop(
        { _id :true, auto:true,}
    )
    id:mongoose.Types.ObjectId 
    @Prop()
    appName : string;
    @Prop()
    code : string = randomUUID();
    @Prop({
        unique:true
    })
    email : string;
    @Prop({
        unique :true
    })
    phone : string;
    @Prop()
    url : string;
    @Prop()
    urlConfirm : string;
    @Prop()
    redictUrl : string;
    @Prop(
        { type: mongoose.Types.ObjectId, ref: 'File' }
    )
    logo : File;
    @Prop()
    token : string;
    @Prop({
        
    })
    roles : Role[]
    @Prop()
    modules : Module[];
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);