
import { Application } from "src/entity/application";
import { Observable, Subject } from "rxjs";
import { ApplicationDto } from "src/dto/application-dto";
import { UserForm } from "src/dto/user-form";
import { User } from "src/entity/user";
import {Module} from "src/entity/module";
import { Role } from "src/entity/role";
import { MailerService } from '@nestjs-modules/mailer';
import { CategoryUser } from "src/entity/category";
import { AccountActivation } from "src/entity/account-activation";
import { ModulePrivileges } from "src/entity/role-module";
export interface UserManagement{

    addUser(data : UserForm) : Subject<User>;
    addApp(data : ApplicationDto) : Subject<Application>;
    editApp( id:string, data : ApplicationDto,  user:string) : Subject<Application>;
    getApp(id : string) :Subject<Application>;
    searchApp(pattern : string) :Observable<Application[]>
    getApps():Observable<Application[]>;
    getUser(id:string):Subject<User>;

    appHasRole(app : string, role : string) : Subject<boolean>;
    appHasModule(app: string, module : string) : Subject<boolean>;

    getUsers():Observable<User[]>;
    getUsersByApp(app:string) : Observable<User[]>;
    findByUsername(username:string):Subject<User>;
    findByUsernameOrPhoneOrEmailAndApp(username:string, phone:string, email:string, app:string):Subject<User>;
    findByUsernameAndApp(username:string, app:string):Subject<User>;
    findAppByCode(code:string) : Subject<Application>;
    findAppByEmailOrPhone(email: string,phone:string): Subject<Application>;
    getModules():Observable<Module[]>
    addModule(modules :Module, app : string) : Subject<Module>;
    addModules(modules :Module[], app : string) : Observable<Module[]>;
    addModuleToRole(module:ModulePrivileges, role:Role) : Observable<Role>;
    addModulesToRole(modules:ModulePrivileges[], role:Role) : Observable<Role>;
    editModule(id:string, data:Module, user:User):Subject<Module>;
    addRole(role :Role) :Subject<Role>;
    addRoles(roles :Role[]):Observable<Role[]>;
    getRoles():Observable<Role[]>;
    getCategories() : Observable<CategoryUser[]>;
    addCategory(c : CategoryUser) :Observable<CategoryUser>;
    addRolesToUser(roles:Role[], user :User , doneBy:User): Subject<User>;
    removeRolesFromUser(roles:Role[], user :User, doneBy:User):Subject<User>;
    enableUser(user:User, doneBy:User):Subject<boolean>;
    disableUser(user:User, doneBy:User):Subject<boolean>;
    activation(code:string) : Subject<User>;
    requestActivation(username:string, app:string) : Subject<AccountActivation>;
    changePassword(idaccount, hashPwd) : Subject<User>;

    
}