import mongoose from "mongoose";
import { ModulePrivileges } from "./role-module";
export declare type RoleDocument = Role & Document;
export declare class Role {
    id: mongoose.Types.ObjectId;
    role: string;
    modules: ModulePrivileges[];
}
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, any>, {}, {}, any, {}, "type", Role>;
