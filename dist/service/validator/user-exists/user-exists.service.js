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
exports.UserExistsValidator = exports.UserExistsService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let UserExistsService = class UserExistsService {
    constructor(authSys) {
        this.authSys = authSys;
    }
    validate(value, validationArguments) {
        if (value == null) {
            return false;
        }
        if (value.id == null || value.id.length == 0) {
            return false;
        }
        return this.authSys.getUser(value.id).toPromise().then(u => { return true; }).catch(e => { return false; });
    }
    defaultMessage(validationArguments) {
        return "Please set a valid individu";
    }
};
UserExistsService = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'UserExist', async: true }),
    __param(0, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [Object])
], UserExistsService);
exports.UserExistsService = UserExistsService;
function UserExistsValidator(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'UserExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: UserExistsService,
        });
    };
}
exports.UserExistsValidator = UserExistsValidator;
//# sourceMappingURL=user-exists.service.js.map