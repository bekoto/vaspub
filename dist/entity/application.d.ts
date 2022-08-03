import mongoose from "mongoose";
import { File } from "./file";
import { Module } from "./module";
import { Role } from "./role";
export declare type ApplicationDocument = Application & Document;
export declare class Application {
    id: mongoose.Types.ObjectId;
    appName: string;
    code: string;
    email: string;
    phone: string;
    url: string;
    urlConfirm: string;
    redictUrl: string;
    logo: File;
    token: string;
    roles: Role[];
    modules: Module[];
}
export declare const ApplicationSchema: mongoose.Schema<Application, mongoose.Model<Application, any, any, any, any>, {}, {}, any, {}, "type", Application>;
