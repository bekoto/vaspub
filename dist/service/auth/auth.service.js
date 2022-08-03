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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const rxjs_1 = require("rxjs");
const authhelper_service_1 = require("../authhelper.service");
let AuthService = class AuthService {
    constructor(authHelper, userMan) {
        this.authHelper = authHelper;
        this.userMan = userMan;
    }
    changeOurPwd(username, pwdData, app) {
        let s = new rxjs_1.Subject();
        (0, class_validator_1.validate)(pwdData).then(err => {
            this.userMan.findByUsernameOrPhoneOrEmailAndApp(username, username, username, app).subscribe(u => {
                if (!u) {
                    s.error(new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND));
                }
                if (!this.authHelper.isPasswordValid(u.password, pwdData.oldPassword)) {
                    s.error(new common_1.HttpException('Bad password', common_1.HttpStatus.BAD_REQUEST));
                }
                u.password = this.authHelper.hashPassword(pwdData.password);
                u.hasPasswordSet = true;
                this.userMan.changePassword(u, u.password).subscribe(res => {
                    if (res) {
                        s.next(res);
                        s.complete();
                    }
                    else {
                        s.error(new common_1.HttpException('Error on changing password, please try', common_1.HttpStatus.BAD_REQUEST));
                    }
                }, e => {
                    console.log(e);
                    s.error(e);
                });
            }, e => {
                console.log(e);
                s.error(e);
            });
        }).catch(e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }
    validate(token) {
        const s = new rxjs_1.Subject();
        this.authHelper.validate(token).then(r => {
            s.next(r);
            s.complete();
        }).catch(e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }
    login(auth) {
        const s = new rxjs_1.Subject();
        console.log(auth);
        (0, class_validator_1.validate)(auth).then(d => {
            this.userMan.findByUsernameAndApp(auth.username, auth.app).subscribe(u => {
                if (!u) {
                    s.error(new common_1.HttpException('Account not found', common_1.HttpStatus.UNAUTHORIZED));
                }
                else if (!this.authHelper.isPasswordValid(auth.password, u.password)) {
                    s.error(new common_1.HttpException('Bad password, please try again', common_1.HttpStatus.UNAUTHORIZED));
                }
                else {
                    const o = u;
                    o.createdAt = u.createdAt.getTime();
                    const jwtr = {
                        data: o,
                        token: this.authHelper.generateToken(u)
                    };
                    s.next(jwtr);
                    s.complete();
                }
            }, e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    logup(data) {
        const s = new rxjs_1.Subject();
        (0, class_validator_1.validate)(data).then(ok => {
            console.log(ok);
            this.userMan.addUser(data).subscribe(u => {
                console.log(u);
                if (!u) {
                    throw new common_1.HttpException('', common_1.HttpStatus.BAD_REQUEST);
                }
                s.next(u);
                s.complete();
            }, e => {
                console.log(e);
                s.error(e);
            });
        }).catch(e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }
    activation(code) {
        const s = new rxjs_1.Subject();
        if (!code || code.length == 0) {
            throw new common_1.HttpException('Please type code', common_1.HttpStatus.BAD_REQUEST);
        }
        this.userMan.activation(code).subscribe(d => {
            console.log(d);
            if (d) {
                const token = this.authHelper.generateToken(d);
                const jwtRes = {
                    data: d,
                    token: token
                };
                s.next(jwtRes);
                s.complete();
            }
            else {
                let e = new common_1.HttpException('Bad code', common_1.HttpStatus.BAD_REQUEST);
                s.error(e);
            }
        }, e => {
            s.error(e);
        });
        return s;
    }
    requestActivation(username, app) {
        let s = new rxjs_1.Subject();
        if (!username || username.length == 0 || !app || app.length == 0) {
            s.error(new common_1.HttpException('Bad data', common_1.HttpStatus.BAD_REQUEST));
        }
        else {
            this.userMan.requestActivation(username, app).subscribe(res => {
                if (res) {
                    s.next(true);
                    s.complete();
                }
                else {
                    s.error(new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND));
                }
            }, e => {
                s.error(e);
            });
        }
        return s;
    }
    refresh(token) {
        const s = new rxjs_1.Subject();
        console.log(token);
        this.authHelper.validate(token).then(r => {
            if (r) {
                this.authHelper.decode(token).then((decoded) => {
                    if (decoded) {
                        this.userMan.getUser(decoded.id).subscribe(uf => {
                            if (uf) {
                                const jwtr = {
                                    data: uf,
                                    token: this.authHelper.generateToken(uf)
                                };
                                s.next(jwtr);
                                s.complete();
                            }
                            else {
                                s.error(new common_1.HttpException('Bad token', common_1.HttpStatus.UNAUTHORIZED));
                            }
                        }, e => {
                            s.error(new common_1.HttpException('Bad token', common_1.HttpStatus.UNAUTHORIZED));
                        });
                    }
                    else {
                        s.error(new common_1.HttpException('Bad token', common_1.HttpStatus.UNAUTHORIZED));
                    }
                });
            }
            else {
                s.error(new common_1.HttpException('Bad token', common_1.HttpStatus.UNAUTHORIZED));
            }
        }, e => {
            s.error(new common_1.HttpException('Bad token', common_1.HttpStatus.UNAUTHORIZED));
        });
        return s;
    }
};
__decorate([
    __param(0, (0, common_1.Query)('account')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", rxjs_1.Subject)
], AuthService.prototype, "requestActivation", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('userManager')),
    __metadata("design:paramtypes", [authhelper_service_1.AuthhelperService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map