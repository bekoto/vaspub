"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationDto = void 0;
const application_1 = require("../entity/application");
class ApplicationDto {
    toEntity() {
        let a = new application_1.Application();
        a.appName = this.appName;
        a.code = this.code;
        a.email = this.email;
        a.phone = this.phone;
        a.url = this.url;
        a.redictUrl = this.redictUrl;
        a.urlConfirm = this.urlConfirm;
        console.log(a);
        return a;
    }
}
exports.ApplicationDto = ApplicationDto;
//# sourceMappingURL=application-dto.js.map