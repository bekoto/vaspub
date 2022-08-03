import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Individu } from "src/model/individu";


export type FileDocument =  File & Document;

@Schema({
    _id : false
})
export class File {
    
    @Prop(
        { _id :true, auto:true,  }
    )
    id:mongoose.Schema.Types.ObjectId  
    @Prop()
    filename: string;
    @Prop()
    fileType : string;
    @Prop()
    createdAt : Date;
    @Prop()
    owner: Individu;
    @Prop()
    size : number;
    @Prop()
    url : string;
    @Prop()
    emp : string;
    @Prop()
    obs : string;

    
}

export const FileSchema = SchemaFactory.createForClass(File);