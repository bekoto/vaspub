import { AccessPlatform } from "src/model/access-platform";
import { Application } from "./application";
import { File } from "./file";
import mongoose from "mongoose";
import { CategoryUser } from "./category";
import { Role } from "./role";
export declare type UserDocument = User & Document;
export declare class User {
    [x: string]: any;
    id: mongoose.Types.ObjectId;
    username: string;
    type: string;
    phone: string;
    email: string;
    password: string;
    repassword: string;
    nom: string;
    prenom: string;
    isAllowed: boolean;
    hasPasswordSet: boolean;
    code: string;
    createdAt: Date;
    createdBy: User;
    application: Application;
    profile: File;
    pin: string;
    accessPlatform: AccessPlatform;
    modifiedBy: User;
    modifiedAt: Date;
    other: String;
    category: CategoryUser;
    roles: Role[];
    static removePassword(userObj: User): {
        [k: string]: any;
    };
}
export declare const userSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, any, {}, "type", User>;
