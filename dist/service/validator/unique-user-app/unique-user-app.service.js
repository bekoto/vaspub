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
exports.UniqueUser = exports.UniqueUserAppService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const rxjs_1 = require("rxjs");
let UniqueUserAppService = class UniqueUserAppService {
    constructor(authSys) {
        this.authSys = authSys;
    }
    validate(value, validationArguments) {
        if (value == null) {
            return false;
        }
        if (value == null || value.length == 0) {
            return false;
        }
        let v = validationArguments.object;
        switch ((validationArguments.constraints[0])) {
            case "username": {
                return (0, rxjs_1.firstValueFrom)(this.authSys.findByUsernameAndApp(value, v.app)).then(u => {
                    if (u) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }).catch(e => {
                    if (e.id) {
                        return false;
                    }
                    return true;
                });
            }
            case "phone": {
                return (0, rxjs_1.firstValueFrom)(this.authSys.findByUsernameOrPhoneOrEmailAndApp(value, value, value, v.app)).then(u => {
                    if (u) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }).catch(e => {
                    return true;
                    if (e.id) {
                        return false;
                    }
                    return false;
                });
            }
            case "email": {
                return (0, rxjs_1.firstValueFrom)(this.authSys.findByUsernameOrPhoneOrEmailAndApp(value, value, value, v.app)).then(u => {
                    if (u) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }).catch(e => {
                    return true;
                    console.log("uuusseeseeee", e);
                    if (e.id) {
                        return false;
                    }
                    return true;
                });
            }
            default:
                return false;
        }
        console.log('ihhhhhiiieee');
    }
    defaultMessage(validationArguments) {
        return "username already existe";
    }
};
UniqueUserAppService = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'UniqueUser', async: true }),
    __param(0, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [Object])
], UniqueUserAppService);
exports.UniqueUserAppService = UniqueUserAppService;
function UniqueUser(obj, validationOptions) {
    return function (object, propertyName) {
        console.log("uniqueUser property :" + propertyName);
        (0, class_validator_1.registerDecorator)({
            name: 'UniqueUser',
            target: object.constructor,
            constraints: [obj.forWhat, obj.app],
            propertyName: propertyName,
            options: validationOptions,
            validator: UniqueUserAppService,
        });
    };
}
exports.UniqueUser = UniqueUser;
//# sourceMappingURL=unique-user-app.service.js.map