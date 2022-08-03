"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const application_dto_1 = require("../dto/application-dto");
const module_dto_1 = require("../dto/module-dto");
const user_form_1 = require("../dto/user-form");
const category_1 = require("../entity/category");
const auth_guard_1 = require("./guards/auth.guard");
let UserManagementController = class UserManagementController {
    constructor(userMan) {
        this.userMan = userMan;
    }
    getUsers() {
        return this.userMan.getUsers();
    }
    getCategories() {
        return this.userMan.getCategories();
    }
    addUser(data) {
        return this.userMan.addUser(data);
    }
    addApp(data) {
        return this.userMan.addApp(data);
    }
    editApp(id, data, user) {
        return this.userMan.editApp(id, data, user);
    }
    getApp(id) {
        return this.userMan.getApp(id);
    }
    searchApp(pattern) {
        return this.userMan.searchApp(pattern);
    }
    getApps() {
        return this.userMan.getApps();
    }
    getUser(id) {
        return this.userMan.getUser(id);
    }
    findByUsername(username) {
        return this.userMan.findByUsername(username);
    }
    findByUsernameAndApp(username, app) {
        return this.userMan.findByUsernameAndApp(username, app);
    }
    findByUsernameOrPhoneOrEmailAndApp(username, app, email, phone) {
        console.log("aaaa", app, username);
        return this.userMan.findByUsernameOrPhoneOrEmailAndApp(username, phone, email, app);
    }
    getUsersByApp(app) {
        return this.userMan.getUsersByApp(app);
    }
    getModules() {
        return this.userMan.getModules();
    }
    addModule(modules) {
        let app = "";
        return this.userMan.addModule(modules.toEntity(), app);
    }
    addModuleToRole(module, role) {
        return this.userMan.addModuleToRole(module, role);
    }
    addModulesToRole(modules, role) {
        throw new Error('Method not implemented.');
    }
    editModule(id, data, user) {
        throw new Error('Method not implemented.');
    }
    addRole(role) {
        throw new Error('Method not implemented.');
    }
    addRoles(roles) {
        throw new Error('Method not implemented.');
    }
    addRolesToUser(roles, user, doneBy) {
        throw new Error('Method not implemented.');
    }
    removeRolesFromUser(roles, user, doneBy) {
        throw new Error('Method not implemented.');
    }
    enableUser(user, doneBy) {
        throw new Error('Method not implemented.');
    }
    disableUser(user, doneBy) {
        throw new Error('Method not implemented.');
    }
    addCategory(data) {
        return this.userMan.addCategory(data);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserManagementController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserManagementController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_form_1.UserForm]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)("app"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [application_dto_1.ApplicationDto]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "addApp", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, application_dto_1.ApplicationDto, String]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "editApp", null);
__decorate([
    (0, common_1.Get)("apps/:app"),
    __param(0, (0, common_1.Param)('app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "getApp", null);
__decorate([
    (0, common_1.Get)("apps/search"),
    __param(0, (0, common_1.Query)(':q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserManagementController.prototype, "searchApp", null);
__decorate([
    (0, common_1.Get)("apps"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserManagementController.prototype, "getApps", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('find/:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Get)('apps/:app/users/:user'),
    __param(0, (0, common_1.Param)('user')),
    __param(1, (0, common_1.Param)('app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", rxjs_1.Subject)
], UserManagementController.prototype, "findByUsernameAndApp", null);
__decorate([
    (0, common_1.Get)('apps/:app/users/:user/or/:phone/or/:email'),
    __param(0, (0, common_1.Param)('user')),
    __param(1, (0, common_1.Param)('app')),
    __param(2, (0, common_1.Param)('email')),
    __param(3, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserManagementController.prototype, "findByUsernameOrPhoneOrEmailAndApp", null);
__decorate([
    (0, common_1.Get)('apps/:app/users'),
    __param(0, (0, common_1.Param)('app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserManagementController.prototype, "getUsersByApp", null);
__decorate([
    (0, common_1.Get)('modules'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserManagementController.prototype, "getModules", null);
__decorate([
    (0, common_1.Post)('modules'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [module_dto_1.ModuleDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserManagementController.prototype, "addModule", null);
__decorate([
    (0, common_1.Post)("categories"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_1.CategoryUser]),
    __metadata("design:returntype", void 0)
], UserManagementController.prototype, "addCategory", null);
UserManagementController = __decorate([
    (0, common_1.Controller)("users"),
    (0, common_1.UseGuards)(new auth_guard_1.JwtAuthGuard()),
    __param(0, (0, common_1.Inject)("userManager")),
    __metadata("design:paramtypes", [Object])
], UserManagementController);
exports.UserManagementController = UserManagementController;
//# sourceMappingURL=usermanagement.controller.js.map