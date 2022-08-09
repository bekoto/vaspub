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
exports.categoryUserSchema = exports.CategoryUser = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryUser = class CategoryUser {
};
__decorate([
    (0, mongoose_1.Prop)({ _id: true, auto: true, }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], CategoryUser.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CategoryUser.prototype, "libelle", void 0);
CategoryUser = __decorate([
    (0, mongoose_1.Schema)()
], CategoryUser);
exports.CategoryUser = CategoryUser;
exports.categoryUserSchema = mongoose_1.SchemaFactory.createForClass(CategoryUser);
//# sourceMappingURL=category.js.map