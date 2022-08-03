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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const user_1 = require("../../entity/user");
const mongoose_1 = require("@nestjs/mongoose");
const moment = require("moment");
const account_activation_1 = require("../../entity/account-activation");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const util_1 = require("../../util/util");
const mailer_1 = require("@nestjs-modules/mailer");
const bcrypt = require("bcryptjs");
const prettier_1 = require("prettier");
let UserService = class UserService {
    constructor(userrModel, roleModel, appModel, moduleModel, categoryModel, acModel, FileModel, mailerService, connection) {
        this.userrModel = userrModel;
        this.roleModel = roleModel;
        this.appModel = appModel;
        this.moduleModel = moduleModel;
        this.categoryModel = categoryModel;
        this.acModel = acModel;
        this.FileModel = FileModel;
        this.mailerService = mailerService;
        this.connection = connection;
        this.rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    }
    addModuleToRole(module, role) {
        return new rxjs_1.Observable(sub => {
            (0, class_validator_1.validate)(module).then(err => {
                if (err && err.length > 0) {
                    let e = new common_1.HttpException({
                        msg: 'bad data',
                        errs: err
                    }, common_1.HttpStatus.BAD_REQUEST);
                    sub.error(e);
                }
                this.roleModel.findOne({
                    id: role.id
                }).exec().then(r => {
                    let rf = r;
                    rf.modules.push();
                    new this.roleModel(rf).save().then(rfm => {
                        sub.next(rfm);
                        sub.complete();
                    }).catch(e => {
                        sub.error(e);
                    });
                }).catch(er => {
                    sub.error(er);
                });
            });
        });
    }
    appHasRole(app, role) {
        let s = new rxjs_1.Subject();
        if (!app || !role) {
            throw new common_1.HttpException('Bad data ', common_1.HttpStatus.BAD_REQUEST);
        }
        this.appModel.findOne({
            id: app
        }).populate(["roles"]).exec().then(a => {
            if (!a) {
                throw new common_1.HttpException('app not found', common_1.HttpStatus.BAD_REQUEST);
            }
            for (const ap of a.roles) {
                console.log(ap.id.toString());
                if (ap.id.toHexString() == (role)) {
                    s.next(true);
                    s.complete();
                    break;
                }
            }
            s.next(false);
        });
        return s;
    }
    appHasModule(app, module) {
        let s = new rxjs_1.Subject();
        if (!app || !module) {
            throw new common_1.HttpException('Bad data ', common_1.HttpStatus.BAD_REQUEST);
        }
        this.appModel.findOne({
            id: app
        }).populate(["roles"]).exec().then(a => {
            if (!a) {
                throw new common_1.HttpException('app not found', common_1.HttpStatus.BAD_REQUEST);
            }
            for (const ap of a.modules) {
                if (ap.id.toString() == module) {
                    s.next(true);
                    s.complete();
                    break;
                }
            }
            s.next(false);
            s.complete();
        });
        return s;
    }
    addModules(modules, app) {
        let s = new rxjs_1.Subject();
        if (!modules || modules.length == 0 || !app) {
            throw new common_1.HttpException('bad data', common_1.HttpStatus.BAD_REQUEST);
        }
        this.appModel.findOne({ id: app }).populate(['modules']).exec().then(a => {
            let mInApp = [];
            if (!a) {
                throw new common_1.HttpException('app not found', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!a.modules || a.modules.length == 0) {
                a.modules = modules;
            }
            else {
                mInApp = a.modules;
                mInApp = [...mInApp, ...modules];
            }
            mInApp = [...new Set(mInApp)];
            a.modules = mInApp;
            a.save().then(a => {
                s.next(a.modules);
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    changePassword(idaccount, hashPwd) {
        let s = new rxjs_1.Subject();
        console.log(idaccount, hashPwd);
        if (!idaccount || !hashPwd) {
            s.error(new common_1.HttpException('Bad data', common_1.HttpStatus.BAD_GATEWAY));
        }
        new this.userrModel(prettier_1.doc).save().then(uSaved => {
            s.next(uSaved);
            s.complete();
        }).catch(e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }
    getUsersByApp(app) {
        let s = new rxjs_1.Observable(sub => {
            this.userrModel.find({
                application: {
                    id: app
                }
            }).exec().then(users => {
                sub.next(users);
                sub.complete();
            }).catch(e => {
                sub.error(e);
            });
        });
        return s;
    }
    activation(code) {
        const s = new rxjs_1.Subject();
        this.acModel.findOne({
            code: code
        }).populate(['user']).exec().then(c => {
            if (!c) {
                s.error("Bad code");
            }
            if (c.status == account_activation_1.AccountActivationStatus.EXPIRED) {
                s.error("Code expired");
            }
            if (c.status == account_activation_1.AccountActivationStatus.USED) {
                s.error("Code already used");
            }
            console.log("useracc");
            this.userrModel.findById(c.user._id).exec().then(uf => {
                if (!uf) {
                    throw new common_1.HttpException('Bad code', common_1.HttpStatus.BAD_REQUEST);
                }
                uf.isAllowed = true;
                uf.save().then(uUser => {
                    s.next(uf);
                    s.complete();
                }).catch(e => {
                    s.error(e);
                });
            }).catch(e => {
                s.error(e);
            });
        });
        return s;
    }
    requestActivation(username, app) {
        let s = new rxjs_1.Subject();
        if (!username || !app) {
            s.error("bad datas");
        }
        this.findByUsernameOrPhoneOrEmailAndApp(username, username, username, app).subscribe(u => {
            if (!u) {
                let e = new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND);
                s.error(e);
            }
            let ac = new account_activation_1.AccountActivation();
            ac.code = util_1.Util.randomString(10);
            ac.user = u;
            ac.expiredAt = moment().add(1, 'days').toDate();
            ac.status = account_activation_1.AccountActivationStatus.PENDING;
            new this.acModel(ac).save().then(acs => {
                s.next(acs);
            }).catch(e => {
                s.error(e);
            });
        }, e => {
            s.error(e);
        });
        return s;
    }
    getCategories() {
        return new rxjs_1.Observable(s => {
            this.categoryModel.find().exec().then(d => {
                s.next(d.map(c => { c.id = c._id; c._id = null; return c; }));
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        });
    }
    addCategory(c) {
        let s = new rxjs_1.Subject();
        new this.categoryModel(c).save().then(cs => {
            s.next(cs);
            s.complete();
        }, e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }
    getUsers() {
        let s = new rxjs_1.Observable(subscriber => {
            this.userrModel.find().populate(['category', 'application', 'roles']).exec().then(users => {
                subscriber.next(users);
                subscriber.complete();
            });
        });
        return s;
    }
    getRoles() {
        return new rxjs_1.Observable(sub => {
            this.roleModel.find().exec().then(r => {
                sub.next(r);
                sub.complete();
            }).catch(e => {
                sub.error(e);
            });
        });
    }
    findAppByCode(code) {
        let s = new rxjs_1.Subject();
        this.appModel.find({
            code: code
        }).exec().then(a => {
            s.next(a);
            s.complete();
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    findAppByEmailOrPhone(email, phone) {
        let u = new rxjs_1.Subject;
        this.appModel.findOne({
            $or: [
                {
                    email: email,
                    phone: phone,
                }
            ]
        }).exec().then(d => {
            u.next(d);
        }).catch(e => {
            u.error(e);
        });
        return u;
    }
    findByUsernameOrPhoneOrEmailAndApp(username, phone, email, app) {
        let u = new rxjs_1.Subject;
        this.userrModel.findOne({
            $and: [
                {
                    $or: [
                        {
                            username: username
                        },
                        { email: email },
                        {
                            phone: phone
                        }
                    ]
                },
                {
                    application: new mongoose_2.default.Types.ObjectId(app)
                },
            ]
        }).populate('application').exec().then(d => {
            if (!d) {
                u.error(new common_1.HttpException('account not found', common_1.HttpStatus.NOT_FOUND));
            }
            else {
                u.next(d);
                u.complete();
            }
        }).catch(e => {
            u.error(e);
        });
        return u;
    }
    addUser(data) {
        let s = new rxjs_1.Subject();
        const salt = bcrypt.genSaltSync(10);
        console.log("passhasshh", bcrypt.hashSync("123456", salt));
        (0, class_validator_1.validate)(data).then(async (e) => {
            console.log("eeeee", e);
            let u = data.toEntity();
            u.password = bcrypt.hashSync("123456", salt);
            u.hasPasswordSet = false;
            u.isAllowed = false;
            u.username = util_1.Util.generateOTP(10);
            u.createdAt = new Date();
            u.category = await this.categoryModel.findById(data.category).exec();
            u.application = await this.appModel.findById(data.app).exec();
            new this.userrModel(u).save().then(us => {
                let ac = new account_activation_1.AccountActivation();
                ac.code = util_1.Util.randomString(10);
                ac.user = us;
                ac.expiredAt = moment().add(1, 'days').toDate();
                ac.status = account_activation_1.AccountActivationStatus.PENDING;
                new this.acModel(ac).save().then(acs => {
                    s.next(us);
                    s.complete();
                }).catch(e => {
                    console.log(e);
                    s.error(e);
                });
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    addApp(data) {
        let s = new rxjs_1.Subject();
        (0, class_validator_1.validate)(data).then(d => {
            return this.connection.startSession().then(cs => {
                cs.startTransaction();
                new this.appModel(data.toEntity()).save().then(a => {
                    let u = new user_1.User();
                    u.email = data.email;
                    u.nom = data.nom;
                    u.prenom = data.prenom;
                    u.username = util_1.Util.randomString(20);
                    u.application = a;
                    return new this.userrModel(u).save().then(uu => {
                        let ac = new account_activation_1.AccountActivation();
                        ac.code = util_1.Util.randomString(10);
                        ac.user = uu;
                        ac.expiredAt = moment().add(1, 'days').toDate();
                        ac.status = account_activation_1.AccountActivationStatus.PENDING;
                        return new this.acModel(ac).save().then(acs => {
                            cs.commitTransaction();
                            this.mailerService.sendMail({
                                to: "djbrandon.ekoto@gmail.com",
                                subject: "try",
                                template: "mail",
                                context: {
                                    name: "brandon"
                                }
                            });
                            s.next(a);
                            s.complete();
                        }).catch(e => {
                            console.log(e);
                            cs.abortTransaction();
                            s.error(e);
                        });
                    }).catch(e => {
                        console.log(e);
                        cs.abortTransaction();
                        s.error(e);
                    });
                }).catch(e => {
                    console.log(e);
                    s.error("Error on saving");
                });
            }).catch(e => {
                console.log(e);
                s.error(e);
            });
        }).catch(e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }
    editApp(id, data, user) {
        return null;
    }
    getApp(id) {
        let s = new rxjs_1.Subject();
        this.appModel.findById(id).exec().then(a => {
            s.next(a);
            s.complete();
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    searchApp(pattern) {
        return new rxjs_1.Observable(sub => {
            this.appModel.find({
                $or: [
                    {
                        appName: {
                            $regex: this.rgx(pattern)
                        }
                    },
                    {
                        code: {
                            $regex: this.rgx(pattern)
                        }
                    },
                    {
                        email: {
                            $regex: this.rgx(pattern)
                        }
                    },
                    {
                        phone: {
                            $regex: this.rgx(pattern)
                        }
                    }
                ]
            }).exec().then(apps => {
                sub.next(apps);
                sub.complete();
            }).catch(e => {
                sub.error(e);
            });
        });
    }
    getApps() {
        return new rxjs_1.Observable(s => {
            this.appModel.find().exec().then(d => {
                s.next(d);
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        });
    }
    getUser(id) {
        let u = new rxjs_1.Subject;
        this.userrModel.findOne({
            id: new mongoose_2.default.Types.ObjectId(id)
        }).populate(["application", "category", "roles"]).exec().then(d => {
            u.next(d);
            u.complete();
        }).catch(e => {
            console.log(e);
            u.error(e);
        });
        return u;
    }
    findByUsername(username) {
        let s = new rxjs_1.Subject();
        this.userrModel.findOne({
            username: username
        }).exec().then(u => {
            s.next(u);
            s.complete();
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    findByUsernameAndApp(username, app) {
        let u = new rxjs_1.Subject;
        this.userrModel.findOne({
            $and: [
                {
                    username: (username)
                },
                {
                    application: new mongoose_2.default.Types.ObjectId(app)
                }
            ]
        }).populate(['application', 'category', 'roles']).exec().then(d => {
            u.next(d);
        }).catch(e => {
            u.error(e);
        });
        return u;
    }
    getModules() {
        return new rxjs_1.Observable(s => {
            this.moduleModel.find().exec().then(d => {
                s.next(d);
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        });
    }
    addModule(modules) {
        let s = new rxjs_1.Subject();
        (0, class_validator_1.validate)(modules).then(err => {
            if (err && err.length > 0) {
                let e = new common_1.HttpException({
                    msg: 'bad datat',
                    errs: err
                }, common_1.HttpStatus.BAD_REQUEST);
                s.error(e);
            }
            new this.moduleModel(modules).save().then(m => {
                s.next(m);
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        });
        return;
    }
    addModulesToRole(modules, role) {
        let s = new rxjs_1.Subject();
        if (!modules || modules.length == 0 || !role) {
            throw new common_1.HttpException('bad data', common_1.HttpStatus.BAD_REQUEST);
        }
        this.roleModel.findOne({ id: role }).populate(['modules']).exec().then(r => {
            let mInApp = [];
            if (!r) {
                throw new common_1.HttpException('app not found', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!r.modules || r.modules.length == 0) {
                r.modules = modules;
            }
            else {
                mInApp = r.modules;
                mInApp = [...mInApp, ...modules];
            }
            mInApp = [...new Set(mInApp)];
            r.modules = mInApp;
            r.save().then(a => {
                s.next(a);
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    editModule(id, data, user) {
        throw new Error('Method not implemented.');
    }
    addRole(role) {
        throw new Error('Method not implemented.');
    }
    addRoles(roles) {
        throw new Error('Method not implemented.');
    }
    addRolesToUser(roles, user, doneBy) {
        if (!roles || roles.length == 0 || !user || !doneBy) {
            throw new common_1.HttpException('Bad datas', common_1.HttpStatus.BAD_REQUEST);
        }
        let rolesInSystem;
        throw new Error('Method not implemented.');
    }
    removeRolesFromUser(roles, user, doneBy) {
        let s = new rxjs_1.Subject();
        this.userrModel.findOne({
            id: user.id
        }).exec().then(u => {
            if (!u) {
                throw new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND);
            }
            let uf = u;
            let nRoles = [];
            for (const rr of roles) {
                uf.roles.forEach((r, i) => {
                    if (r.id != rr.id) {
                        if (!nRoles.includes(r)) {
                            nRoles.push(r);
                        }
                    }
                });
            }
            uf.roles = nRoles;
            new this.userrModel(uf).save().then(d => {
                s.next(d);
                s.complete();
            }).catch(e => {
                s.error(e);
            });
        });
        return s;
    }
    enableUser(user, doneBy) {
        if (!user || !user.id) {
            throw new common_1.HttpException('Bad data', common_1.HttpStatus.BAD_REQUEST);
        }
        let s = new rxjs_1.Subject();
        this.userrModel.findOne({
            id: user.id
        }).exec().then(uf => {
            if (!uf) {
                throw new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (uf.isAllowed) {
                throw new common_1.HttpException('Account already enabled', common_1.HttpStatus.BAD_REQUEST);
            }
            uf.isAllowed = true;
            new this.userrModel(uf).save().then(uUpdated => {
                s.next(true);
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
    disableUser(user, doneBy) {
        if (!user || !user.id) {
            throw new common_1.HttpException('Bad data', common_1.HttpStatus.BAD_REQUEST);
        }
        let s = new rxjs_1.Subject();
        this.userrModel.findOne({
            id: user.id
        }).exec().then(uf => {
            if (!uf) {
                throw new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (!uf.isAllowed) {
                throw new common_1.HttpException('Account already enabled', common_1.HttpStatus.BAD_REQUEST);
            }
            uf.isAllowed = false;
            new this.userrModel(uf).save().then(uUpdated => {
                s.next(true);
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });
        return s;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __param(1, (0, mongoose_1.InjectModel)("Role")),
    __param(2, (0, mongoose_1.InjectModel)("Application")),
    __param(3, (0, mongoose_1.InjectModel)("Module")),
    __param(4, (0, mongoose_1.InjectModel)("CategoryUser")),
    __param(5, (0, mongoose_1.InjectModel)("AccountActivation")),
    __param(6, (0, mongoose_1.InjectModel)("File")),
    __param(8, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mailer_1.MailerService, mongoose_2.default.Connection])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map