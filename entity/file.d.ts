import mongoose from "mongoose";
import { Individu } from "src/model/individu";
export declare type FileDocument = File & Document;
export declare class File {
    id: mongoose.Schema.Types.ObjectId;
    filename: string;
    fileType: string;
    createdAt: Date;
    owner: Individu;
    size: number;
    url: string;
    emp: string;
    obs: string;
}
export declare const FileSchema: mongoose.Schema<File, mongoose.Model<File, any, any, any, any>, {}, {}, any, {}, "type", File>;
