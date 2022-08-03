/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, ClassSerializerInterceptor, Controller, Get, Header, Headers, Inject, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';

import { Subject, Observable } from 'rxjs';
import { ApplicationDto } from 'src/dto/application-dto';
import { ModuleDataDto, ModuleDto } from 'src/dto/module-dto';
import { UserForm } from 'src/dto/user-form';
import { Application } from 'src/entity/application';
import { CategoryUser } from 'src/entity/category';
import { Module } from 'src/entity/module';
import { Role } from 'src/entity/role';
import { ModulePrivileges } from 'src/entity/role-module';
import { User } from 'src/entity/user';
import { UserManagement } from 'src/service/user/user-manager';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller("users")
@UseGuards(new JwtAuthGuard())  
//
export class UserManagementController {

    constructor( @Inject("userManager") private readonly userMan : UserManagement){

    }
    @Get('')
    //@UseInterceptors(ClassSerializerInterceptor)
    getUsers(){
        return this.userMan.getUsers();
    }
    @Get('categories')
    getCategories(){
        return this.userMan.getCategories();
    }
    @Post("")
    addUser(@Body() data: UserForm): Subject<User> {        
        return this.userMan.addUser(data);
    }
    @Post("app")
    addApp(@Body() data: ApplicationDto): Subject<Application> {
        return this.userMan.addApp(data);
    }
    @Put(':id')
    editApp(@Param('id') id: string,@Body() data: ApplicationDto, user: string): Subject<Application> {
        return this.userMan.editApp(id, data, user);
    }
    @Get("apps/:app")
    getApp(@Param('app') id: string): Subject<Application> {
        return this.userMan.getApp(id);
    }
    @Get("apps/search")
    searchApp(@Query(':q') pattern: string): Observable<Application[]> {
        return this.userMan.searchApp(pattern);
    }
    @Get("apps")
    getApps(): Observable<Application[]> {
        return this.userMan.getApps();
    }
    @Get(':id')
    getUser(@Param('id')id: string): Subject<User> {
        return this.userMan.getUser(id);
    }
    @Get('find/:username')
    findByUsername(@Param('username') username: string): Subject<User> {
        return this.userMan.findByUsername(username);
    }
    @Get('apps/:app/users/:user')
    findByUsernameAndApp(@Param('user')username: string,@Param('app') app: string): Subject<User> {
        return this.userMan.findByUsernameAndApp(username, app);
    }
    @Get('apps/:app/users/:user/or/:phone/or/:email')
    findByUsernameOrPhoneOrEmailAndApp(@Param('user')username: string,@Param('app') app: string,@Param('email') email : string,@Param('phone') phone : string){
        console.log("aaaa", app, username)
        return this.userMan.findByUsernameOrPhoneOrEmailAndApp(username, phone, email, app);
    }

    @Get('apps/:app/users')
    getUsersByApp(@Param('app') app: string){
        return this.userMan.getUsersByApp(app);
    }
    @Get('modules')
    getModules(): Observable<Module[]> {
        return this.userMan.getModules();
    }
    @Post('modules')
    addModule(
        modules: ModuleDto): Observable<Module> {
            let app = "";
       return this.userMan.addModule(modules.toEntity(),app);
    }
    addModuleToRole(module: ModulePrivileges, role: Role): Observable<Role> {
        return this.userMan.addModuleToRole(module, role);
    }
    addModulesToRole(modules: Module[], role: Role): Observable<Role> {
        throw new Error('Method not implemented.');
    }
    editModule(id: string, data: Module, user: User): Subject<Module> {
        throw new Error('Method not implemented.');
    }
    addRole(role: Role): Subject<Role> {
        throw new Error('Method not implemented.');
    }
    addRoles(roles: Role[]): Observable<Role> {
        throw new Error('Method not implemented.');
    }
    addRolesToUser(roles: Role[], user: User, doneBy: User): Subject<User> {
        throw new Error('Method not implemented.');
    }
    removeRolesFromUser(roles: Role[], user: User, doneBy: User): Subject<User> {
        throw new Error('Method not implemented.');
    }
    enableUser(user: User, doneBy: User): Subject<boolean> {
        throw new Error('Method not implemented.');
    }
    disableUser(user: User, doneBy: User): Subject<boolean> {
        throw new Error('Method not implemented.');
    }

    @Post("categories")
    addCategory(@Body() data : CategoryUser){
        return this.userMan.addCategory(data);
    }

    
}
