import { User } from "src/entity/user";
import { AccessPlatform } from "src/model/access-platform";
import { EntityTransformer } from "src/util/entity_transformer";
export declare class UserForm implements EntityTransformer<User> {
    id: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    repassword: string;
    oldpassword: string;
    nom: string;
    app: string;
    isAllowed: boolean;
    pwdHasChanged: boolean;
    createdAt: Date;
    modifiedAt: Date;
    createdBy: string;
    category: string;
    accessPlatform: AccessPlatform;
    toEntity(): User;
}
