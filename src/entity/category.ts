import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";
export type CategoryUserDocument =  CategoryUser & Document;

@Schema()
export class CategoryUser{    
    @Prop(
        { _id :true, auto:true,}
    )
    id : mongoose.Types.ObjectId;
   
    @Prop()
    libelle : string;
    
}

export const categoryUserSchema = SchemaFactory.createForClass(CategoryUser);
