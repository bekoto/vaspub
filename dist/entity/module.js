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
exports.moduleSchema = exports.Module = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
let Module = class Module {
};
__decorate([
    (0, mongoose_1.Prop)({ _id: true, auto: true }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Module.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Module.prototype, "libelle", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Module.prototype, "displayName", void 0);
Module = __decorate([
    (0, mongoose_1.Schema)({
        _id: false
    })
], Module);
exports.Module = Module;
exports.moduleSchema = mongoose_1.SchemaFactory.createForClass(Module);
//# sourceMappingURL=module.js.map