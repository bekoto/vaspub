"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchConstraint = exports.PasswordValidConstraint = exports.IsValidPwd = exports.Match = exports.Util = exports.getEnvPath = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const fs_1 = require("fs");
const path_1 = require("path");
function getEnvPath(dest) {
    var _a, _b;
    const env = process.env.NODE_ENV ? (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === null || _b === void 0 ? void 0 : _b.toLowerCase() : '';
    const fallback = (0, path_1.resolve)(`${dest}/config/config.cfg`);
    const filename = env ? `${env}.config.cfg` : '/config/config.cfg';
    let filePath = (0, path_1.resolve)(`${dest}/config/${filename}`.toLowerCase());
    console.log("ddd:", filePath);
    if (!(0, fs_1.existsSync)(filePath)) {
        filePath = fallback;
    }
    return filePath;
}
exports.getEnvPath = getEnvPath;
class Util {
    static randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }
    static generateOTP(max) {
        const NUMERIC_STRING = "0123456789";
        var otp = "";
        for (let i = 0; i < max; i++) {
            let pos = Math.floor(Math.random() * (NUMERIC_STRING.length + 1));
            while (pos == null || pos == undefined || pos >= NUMERIC_STRING.length) {
                pos = Math.floor(Math.random() * (NUMERIC_STRING.length + 1));
            }
            otp += NUMERIC_STRING[pos];
        }
        return otp;
    }
}
exports.Util = Util;
class AppUtilities {
    static convertPhoneToInternationalAnnotation(prefix, phone, message) {
        try {
            phone = phone.trim().replace("/+/g", "");
            if (phone.startsWith("00")) {
                phone = phone.substring(2, phone.length - 1);
            }
            if (phone.startsWith("0")) {
                phone = prefix + phone.substring(1, phone.length);
            }
            if (phone.trim().length <= 0) {
                throw message;
            }
        }
        catch (e) {
            phone = null;
        }
        if (phone == null) {
            throw message;
        }
        return phone;
    }
    static controlStringValue(value, message) {
        if (value == null || (value != null && value.trim().length <= 0)) {
            throw message;
        }
    }
    static controlNumberValue(value, message) {
        if (value == null || (value != null && value <= 0)) {
            throw message;
        }
    }
    static removeNullFromArray(arr) {
        let narw = [];
        for (const e of arr) {
            if (e) {
                narw.push(e);
            }
        }
        return narw;
    }
}
function Match(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            name: 'MatchPassword',
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}
exports.Match = Match;
function IsValidPwd(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            name: 'PasswordValids',
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: PasswordValidConstraint,
        });
    };
}
exports.IsValidPwd = IsValidPwd;
let PasswordValidConstraint = class PasswordValidConstraint {
    validate(value, args) {
        let reg = new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
        return reg.test(value);
    }
    defaultMessage(validationArguments) {
        return "Bad password";
    }
};
PasswordValidConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'PasswordValids', async: true }),
    (0, common_1.Injectable)()
], PasswordValidConstraint);
exports.PasswordValidConstraint = PasswordValidConstraint;
let MatchConstraint = class MatchConstraint {
    validate(value, args) {
        const [relatedPropertyName] = args.constraints;
        console.log("epppp", value);
        const relatedValue = args.object[relatedPropertyName];
        return value === relatedValue;
    }
    defaultMessage(validationArguments) {
        return "Password and confirmation pasword don't match";
    }
};
MatchConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'MatchPassword', async: true }),
    (0, common_1.Injectable)()
], MatchConstraint);
exports.MatchConstraint = MatchConstraint;
const class_transformer_1 = require("class-transformer");
function TransformDate() {
    const toPlain = (0, class_transformer_1.Transform)((value) => value.getTime(), {
        toPlainOnly: true,
    });
    const toClass = (0, class_transformer_1.Transform)((value) => new Date(value), {
        toClassOnly: true,
    });
    return function (target, key) {
        toPlain(target, key);
        toClass(target, key);
    };
}
exports.default = TransformDate;
//# sourceMappingURL=util.js.map