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
exports.ModuleMustExist = exports.ModulemustexistService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const rxjs_1 = require("rxjs");
let ModulemustexistService = class ModulemustexistService {
    constructor(userMan) {
        this.userMan = userMan;
    }
    validate(value, validationArguments) {
        console.log(validationArguments);
        if (!value || !module.id) {
            return false;
        }
        return (0, rxjs_1.firstValueFrom)(this.userMan.findModuleOfRole(value.id)).then(v => {
            if (v) {
                return true;
            }
        }).catch(e => {
            console.log(e);
            return false;
        });
    }
    defaultMessage(validationArguments) {
        return "module not found";
    }
};
ModulemustexistService = __decorate([
    (0, common_1.Injectable)(),
    (0, class_validator_1.ValidatorConstraint)({ name: 'ModuleMustExist', async: true }),
    __param(0, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [Object])
], ModulemustexistService);
exports.ModulemustexistService = ModulemustexistService;
function ModuleMustExist(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'ModuleMustExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: ModulemustexistService,
        });
    };
}
exports.ModuleMustExist = ModuleMustExist;
//# sourceMappingURL=modulemustexist.service.js.map