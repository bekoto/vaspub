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
exports.AuthUser = exports.AuthhelperService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const rxjs_1 = require("rxjs");
const common_2 = require("@nestjs/common");
let AuthhelperService = class AuthhelperService {
    constructor(jwt, userMan) {
        this.jwt = jwt;
        this.userMan = userMan;
    }
    async decode(token) {
        return this.jwt.decode(token, null);
    }
    async validateUser(decoded) {
        console.log("ooooifi", decoded);
        return (0, rxjs_1.firstValueFrom)(this.userMan.getUser(decoded.id));
    }
    generateToken(user) {
        var _a;
        console.log(user);
        let uF = user;
        user.id = uF._id.toString();
        console.debug("ffffff", uF, user);
        return this.jwt.sign({ id: (_a = user.id) !== null && _a !== void 0 ? _a : uF._id.toString(), email: user.email, app: user.application.id });
    }
    isPasswordValid(pwd, userPwd) {
        return bcrypt.compareSync(pwd, userPwd);
    }
    hashPassword(plainPwd) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainPwd, salt);
    }
    async validate(token) {
        const decoded = this.jwt.verify(token);
        console.log(decoded);
        if (!decoded) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.validateUser(decoded);
        console.log("aaaaaaaaa", user);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
};
AuthhelperService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object])
], AuthhelperService);
exports.AuthhelperService = AuthhelperService;
exports.AuthUser = (0, common_2.createParamDecorator)((data, req) => {
    console.log(req);
    return req.user;
});
//# sourceMappingURL=authhelper.service.js.map