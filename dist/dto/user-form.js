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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserForm = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
const user_1 = require("../entity/user");
const access_platform_1 = require("../model/access-platform");
const appexistvalidator_service_1 = require("../service/validator/appexistvalidator.service");
const unique_user_app_service_1 = require("../service/validator/unique-user-app/unique-user-app.service");
class UserForm {
    constructor() {
        this.id = (0, crypto_1.randomUUID)();
        this.accessPlatform = access_platform_1.AccessPlatform.ALL;
    }
    toEntity() {
        let u = new user_1.User();
        u.nom = this.nom;
        u.id = new mongoose_1.default.Types.ObjectId(this.id);
        u.username = this.username;
        u.phone = this.phone;
        u.password = this.password;
        u.repassword = this.repassword;
        u.code = this.category;
        u.accessPlatform = this.accessPlatform;
        u.createdAt = this.createdAt;
        u.hasPasswordSet = this.pwdHasChanged;
        return u;
    }
}
__decorate([
    (0, unique_user_app_service_1.UniqueUser)({ forWhat: "phone", app: "001" }),
    __metadata("design:type", String)
], UserForm.prototype, "phone", void 0);
__decorate([
    (0, unique_user_app_service_1.UniqueUser)({ forWhat: "email", app: "001" }),
    __metadata("design:type", String)
], UserForm.prototype, "email", void 0);
__decorate([
    (0, appexistvalidator_service_1.AppExist)(),
    __metadata("design:type", String)
], UserForm.prototype, "app", void 0);
exports.UserForm = UserForm;
//# sourceMappingURL=user-form.js.map