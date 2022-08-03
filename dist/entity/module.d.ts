import mongoose from "mongoose";
export declare type ModuleDocument = Module & Document;
export declare class Module {
    id: mongoose.Types.ObjectId;
    libelle: string;
    displayName: string;
}
export declare const moduleSchema: mongoose.Schema<Module, mongoose.Model<Module, any, any, any, any>, {}, {}, any, {}, "type", Module>;
