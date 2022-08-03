
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user";

export type AccountActivationDocument =  AccountActivation & Document;
@Schema({
    //_id : false
})
export class AccountActivation{
    @Prop({
        _id : true, auto:true
    })
    id : mongoose.Types.ObjectId
    @Prop({
        unique: true
    })
    code:string;    
    @Prop()
    dateCreated : Date = new Date();    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user : User;
    @Prop()
    expiredAt : Date ;
    @Prop()
    status : AccountActivationStatus = AccountActivationStatus.PENDING;
    
}

export const AccountActivationSchema = SchemaFactory.createForClass(AccountActivation);

export enum AccountActivationStatus{
    USED="USED", PENDING="PENDING", EXPIRED="EXPIRED"
}
