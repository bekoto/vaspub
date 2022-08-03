import mongoose from "mongoose";
export declare type CategoryUserDocument = CategoryUser & Document;
export declare class CategoryUser {
    id: mongoose.Types.ObjectId;
    libelle: string;
}
export declare const categoryUserSchema: mongoose.Schema<CategoryUser, mongoose.Model<CategoryUser, any, any, any, any>, {}, {}, any, {}, "type", CategoryUser>;
