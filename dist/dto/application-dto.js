"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationDto = void 0;
const application_1 = require("../entity/application");
class ApplicationDto {
    constructor() {
        this.roles = [];
        this.modules = [];
    }
    toEntity() {
        let a = new application_1.Application();
        a.appName = this.appName;
        a.code = this.code;
        a.email = this.email;
        a.phone = this.phone;
        a.url = this.url;
        a.redictUrl = this.redictUrl;
        a.urlConfirm = this.urlConfirm;
        if (this.roles && this.roles.length > 0) {
            for (const r of this.roles) {
                a.roles.push(r);
            }
        }
        if (this.modules && this.modules.length > 0) {
            for (const m of this.modules) {
                a.modules.push(m);
            }
        }
        return a;
    }
}
exports.ApplicationDto = ApplicationDto;
//# sourceMappingURL=application-dto.js.map