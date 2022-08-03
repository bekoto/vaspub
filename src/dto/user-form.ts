import mongoose from "mongoose";
import { CategoryUser } from "src/entity/category";
import { User } from "src/entity/user";
import { AccessPlatform } from "src/model/access-platform";
import { AppExist } from "src/service/validator/appexistvalidator.service";
import { UniqueUser } from "src/service/validator/unique-user-app/unique-user-app.service";
import { EntityTransformer } from "src/util/entity_transformer";


export class UserForm implements EntityTransformer<User>{
    
    id: string;
    //@UniqueUser({forWhat : "username", app : "001"})
    username: string;
    @UniqueUser({forWhat : "phone", app : "001"})
    phone : string;
    @UniqueUser({forWhat : "email", app : "001"})
    email : string;
    password:string;
    repassword:string;
    oldpassword : string;
    nom:string;
    @AppExist()
    app : string;
    isAllowed:boolean;
    pwdHasChanged:boolean;
    createdAt:Date;
    modifiedAt:Date;
    createdBy:string;
    category:string;
    accessPlatform : AccessPlatform = AccessPlatform.ALL
    
    toEntity(): User {
        let u = new User();
        u.nom = this.nom;
        u.id = new mongoose.Types.ObjectId(this.id);
        u.username = this.username;
        u.phone = this.phone;
        u.password = this.password;
        u.repassword = this.repassword;
        u.code = this.category;
        u.accessPlatform = this.accessPlatform ;
        u.createdAt = this.createdAt;
        u.hasPasswordSet = this.pwdHasChanged;
        

        return u;
    }
}