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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const application_dto_1 = require("../dto/application-dto");
const pwd_dto_1 = require("../dto/pwd-dto");
const user_form_1 = require("../dto/user-form");
const jwt_request_1 = require("../model/jwt-request");
const auth_service_1 = require("../service/auth/auth.service");
const auth_guard_1 = require("./guards/auth.guard");
let AuthController = class AuthController {
    constructor(authService, userMan) {
        this.authService = authService;
        this.userMan = userMan;
    }
    changePwdPassword(username, pwdData, app) {
        console.log("pppppp");
        return this.authService.changeOurPwd(username, pwdData, app);
    }
    addApp(username, data) {
        console.log("pppppp");
        return this.userMan.addApp(data);
    }
    validateToken(token) {
        return this.authService.validate(token);
    }
    login(auth) {
        return this.authService.login(auth);
    }
    logup(data) {
        return this.authService.logup(data);
    }
    activation(code) {
        return this.authService.activation(code);
    }
    requestActivation(username, app) {
        return this.authService.requestActivation(username, app);
    }
    refresh(token) {
        console.log("tttt", token);
        return this.authService.refresh(token);
    }
};
__decorate([
    (0, common_1.Post)('caccount/pwd/:user'),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-request-app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pwd_dto_1.PwdDto, String]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "changePwdPassword", null);
__decorate([
    (0, common_1.Post)('app'),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, application_dto_1.ApplicationDto]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "addApp", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Headers)('x-app-auth-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jwt_request_1.JwtRequest]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_form_1.UserForm]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "logup", null);
__decorate([
    (0, common_1.Post)('activate'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "activation", null);
__decorate([
    (0, common_1.Post)('account/init'),
    __param(0, (0, common_1.Query)('account')),
    __param(1, (0, common_1.Headers)('x-request-app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "requestActivation", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Headers)('x-app-auth-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, common_1.Controller)(""),
    __param(1, (0, common_1.Inject)("userManager")),
    __metadata("design:paramtypes", [auth_service_1.AuthService, Object])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map