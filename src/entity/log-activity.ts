
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user";
export type LogActivityDocument =  LogActivity & Document;
@Schema(
    {
        _id : false
    }
)
export class LogActivity{
    @Prop(
        { _id :true, auto:true}
    )
    id:mongoose.Types.ObjectId
    module : string;
    acte : string;
    action : string;
    description: string;
    startAction:Date;
    endAction:Date;
    logAt : Date;
    code : string;
    status : string;
    error : string;
    others : string;
    user : User
}
export const logActivitySchema = SchemaFactory.createForClass(LogActivity);
