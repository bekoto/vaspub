import mongoose from "mongoose";
import { User } from "./user";
export declare type AccountActivationDocument = AccountActivation & Document;
export declare class AccountActivation {
    id: mongoose.Types.ObjectId;
    code: string;
    dateCreated: Date;
    user: User;
    expiredAt: Date;
    status: AccountActivationStatus;
}
export declare const AccountActivationSchema: mongoose.Schema<AccountActivation, mongoose.Model<AccountActivation, any, any, any, any>, {}, {}, any, {}, "type", AccountActivation>;
export declare enum AccountActivationStatus {
    USED = "USED",
    PENDING = "PENDING",
    EXPIRED = "EXPIRED"
}
