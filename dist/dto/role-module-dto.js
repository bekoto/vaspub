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
exports.RoleSimpleDto = exports.RoleDto = exports.ModulesPrivilegesDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const module_1 = require("../entity/module");
const role_1 = require("../entity/role");
const role_module_1 = require("../entity/role-module");
const modulemustexist_service_1 = require("../service/validator/modulemustexist.service");
const module_dto_1 = require("./module-dto");
class ModulesPrivilegesDto {
}
__decorate([
    (0, modulemustexist_service_1.ModuleMustExist)(),
    __metadata("design:type", module_dto_1.ModuleDto)
], ModulesPrivilegesDto.prototype, "module", void 0);
exports.ModulesPrivilegesDto = ModulesPrivilegesDto;
class RoleDto {
    constructor() {
        this.modules = [];
    }
    toEntity() {
        let r = new role_1.Role();
        r.id = new mongoose_1.default.Types.ObjectId(this.id);
        r.role = this.libelle;
        for (const p of this.modules) {
            let m = new module_1.Module();
            m.id = new mongoose_1.default.Types.ObjectId(p.module.id),
                m.libelle = p.module.libelle;
            m.displayName = p.module.displayName;
            let mp = new role_module_1.ModulePrivileges();
            mp.module = m;
            mp.privileges = p.privileges;
            r.modules.push(mp);
        }
        return r;
    }
}
exports.RoleDto = RoleDto;
class RoleSimpleDto {
    toEntity() {
        let r = new role_1.Role();
        r.role = this.libelle;
        if (this.id) {
            r.id = new mongoose_1.default.Types.ObjectId(this.id);
        }
        return r;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RoleSimpleDto.prototype, "libelle", void 0);
exports.RoleSimpleDto = RoleSimpleDto;
//# sourceMappingURL=role-module-dto.js.map