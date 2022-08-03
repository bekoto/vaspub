import mongoose from "mongoose";
import { User } from "./user";
export declare type LogActivityDocument = LogActivity & Document;
export declare class LogActivity {
    id: mongoose.Types.ObjectId;
    module: string;
    acte: string;
    action: string;
    description: string;
    startAction: Date;
    endAction: Date;
    logAt: Date;
    code: string;
    status: string;
    error: string;
    others: string;
    user: User;
}
export declare const logActivitySchema: mongoose.Schema<LogActivity, mongoose.Model<LogActivity, any, any, any, any>, {}, {}, any, {}, "type", LogActivity>;
