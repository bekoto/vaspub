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
exports.AccountActivationStatus = exports.AccountActivationSchema = exports.AccountActivation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_1 = require("./user");
let AccountActivation = class AccountActivation {
    constructor() {
        this.dateCreated = new Date();
        this.status = AccountActivationStatus.PENDING;
    }
};
__decorate([
    (0, mongoose_1.Prop)({
        _id: true, auto: true
    }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], AccountActivation.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true
    }),
    __metadata("design:type", String)
], AccountActivation.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], AccountActivation.prototype, "dateCreated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_1.User)
], AccountActivation.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], AccountActivation.prototype, "expiredAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AccountActivation.prototype, "status", void 0);
AccountActivation = __decorate([
    (0, mongoose_1.Schema)({})
], AccountActivation);
exports.AccountActivation = AccountActivation;
exports.AccountActivationSchema = mongoose_1.SchemaFactory.createForClass(AccountActivation);
var AccountActivationStatus;
(function (AccountActivationStatus) {
    AccountActivationStatus["USED"] = "USED";
    AccountActivationStatus["PENDING"] = "PENDING";
    AccountActivationStatus["EXPIRED"] = "EXPIRED";
})(AccountActivationStatus = exports.AccountActivationStatus || (exports.AccountActivationStatus = {}));
//# sourceMappingURL=account-activation.js.map