import { AccessPlatform } from "src/model/access-platform";
import { Application } from "./application";
import { File } from "./file";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import mongoose from "mongoose";
import { CategoryUser } from "./category";
import { Role } from "./role";
import TransformDate from "src/util/util";
import { Transform } from "class-transformer";
export type UserDocument = User & Document;
@Schema({
    //_id : false
})
export class User {
    [x: string]: any;
    @Prop(
        { _id: true, auto: true, }
    )
    id: mongoose.Types.ObjectId
    @Prop({ unique: true, index: true })
    username: string;
    @Prop()
    type: string;
    @Prop()
    phone: string;
    @Prop({ index: true })
    email: string;
    @Exclude({})
    @Prop()
    password: string;
    repassword: string;
    @Prop()
    nom: string;
    @Prop()
    prenom: string;
    @Prop()
    isAllowed: boolean = false;
    @Prop()
    hasPasswordSet: boolean = false;
    @Prop()
    code: string;
    @Prop()
    @TransformDate()
    @Transform(value => (value as unknown as Date).toISOString(), {
        toPlainOnly: true
      })
    createdAt: Date = new Date();
    @Prop(
        { type: mongoose.Types.ObjectId, ref: 'User' }
    )
    createdBy: User;
    @Prop(
        { type: mongoose.Types.ObjectId, ref: 'Application' }
    )
    application: Application;

    profile: File;
    pin: string;
    accessPlatform: AccessPlatform;
    @Prop(
        { type: mongoose.Types.ObjectId, ref: 'User' }
    )
    modifiedBy: User;
    @Prop()
    modifiedAt: Date;
    @Prop()
    other: String;
    @Prop()
    category: CategoryUser;
    @Prop({
        type: [{ type: mongoose.Types.ObjectId, ref: 'Role' }]
    })
    roles: Role[] = []

    static removePassword(userObj: User) {
        return Object.fromEntries(
            Object.entries(userObj).filter(([key, val]) => key !== 'password')
        );
    }
}
export const userSchema = SchemaFactory.createForClass(User);