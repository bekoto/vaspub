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
exports.InitbootstrappingService = void 0;
const common_1 = require("@nestjs/common");
const module_dto_1 = require("../dto/module-dto");
const role_module_dto_1 = require("../dto/role-module-dto");
const category_1 = require("../entity/category");
let InitbootstrappingService = class InitbootstrappingService {
    constructor(authSys) {
        this.authSys = authSys;
    }
    onModuleInit() {
        console.log("APP BOOTSTRATING");
        this.authSys.getCategories().subscribe(c => {
            console.log(c);
            if (!c || c.length == 0) {
                let cArr = ["USER", "SYSTEM", "API", "PARTENAIRE"];
                cArr.forEach(i => {
                    let cc = new category_1.CategoryUser();
                    cc.libelle = i;
                    this.authSys.addCategory(cc).subscribe(s => {
                        console.log(s);
                    }, e => {
                        console.log(e);
                    });
                });
            }
        }, e => {
            console.log("eeeerrrr", e);
        });
        this.authSys.getRoles().subscribe(r => {
            if (!r || r.length == 0) {
                let rArr = ["SUPERADMIN", "ADMIN", "USER"].map(e => {
                    let role = new role_module_dto_1.RoleDto();
                    role.libelle = e;
                    return role;
                });
                this.authSys.addRoles(rArr).subscribe(s => {
                    console.debug("Success");
                });
            }
        });
        this.authSys.getModules().subscribe(modules => {
            if (!modules || modules.length == 0) {
                let rArr = [{ libelle: "USERS", display: "Users Management" }, { libelle: "LOGS", display: "Activity" }].map(e => {
                    let role = new module_dto_1.ModuleDto();
                    role.displayName = e.display;
                    role.libelle = e.libelle;
                    return role;
                });
                this.authSys.addModules(rArr).subscribe(s => {
                    console.debug("Success");
                });
            }
        });
    }
    onApplicationBootstrap() {
    }
};
InitbootstrappingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [Object])
], InitbootstrappingService);
exports.InitbootstrappingService = InitbootstrappingService;
//# sourceMappingURL=initbootstrapping.service.js.map