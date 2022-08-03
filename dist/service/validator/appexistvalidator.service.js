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
exports.AppExist = exports.AppexistvalidatorService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let AppexistvalidatorService = class AppexistvalidatorService {
    constructor(userMan) {
        this.userMan = userMan;
    }
    validate(value, validationArguments) {
        if (value == null) {
            return false;
        }
        if (value == null || value.length == 0) {
            return false;
        }
        let v = validationArguments.object;
        return this.userMan.getApp(value).toPromise().then(d => {
            if (d) {
                return true;
            }
            false;
        }).catch(e => {
            console.log(e);
            return false;
        });
    }
    defaultMessage(validationArguments) {
        return "App not found";
    }
};
AppexistvalidatorService = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'AppExist', async: true }),
    __param(0, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [Object])
], AppexistvalidatorService);
exports.AppexistvalidatorService = AppexistvalidatorService;
function AppExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'AppExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: AppexistvalidatorService,
        });
    };
}
exports.AppExist = AppExist;
//# sourceMappingURL=appexistvalidator.service.js.map