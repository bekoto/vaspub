import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Application, ApplicationDocument } from 'src/entity/application';
import { Subject, Observable, from } from 'rxjs';
import { ApplicationDto } from 'src/dto/application-dto';
import { UserForm } from 'src/dto/user-form';
import { Module, ModuleDocument } from 'src/entity/module';
import { Role, RoleDocument } from 'src/entity/role';
import { User, UserDocument } from 'src/entity/user';
import { UserManagement } from './user-manager';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { CategoryUser, CategoryUserDocument } from 'src/entity/category';
import { AccountActivation, AccountActivationDocument, AccountActivationStatus } from 'src/entity/account-activation';
import { FileDocument } from 'src/entity/file';
import { validate } from 'class-validator';
import mongoose, { Model, ObjectId } from 'mongoose';
import { randomUUID } from 'crypto';
import { Util } from 'src/util/util';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcryptjs'
import { use } from 'passport';
import { ModulePrivileges } from 'src/entity/role-module';
import { doc } from 'prettier';

@Injectable()
export class UserService implements UserManagement {
    rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    constructor(
        @InjectModel("User") private readonly userrModel: Model<UserDocument>,
        @InjectModel("Role") private readonly roleModel: Model<RoleDocument>,
        @InjectModel("Application") private readonly appModel: Model<ApplicationDocument>,
        @InjectModel("Module") private readonly moduleModel: Model<ModuleDocument>,
        @InjectModel("CategoryUser") private readonly categoryModel: Model<CategoryUserDocument>,
        @InjectModel("AccountActivation") private readonly acModel: Model<AccountActivationDocument>,
        @InjectModel("File") private readonly FileModel: Model<FileDocument>,
        private mailerService: MailerService,
        @InjectConnection() private readonly connection: mongoose.Connection) {

    }
    addModuleToRole(module: ModulePrivileges, role: Role): Observable<Role> {

        return new Observable<Role>(sub => {
            validate(module).then(err => {
                if (err && err.length > 0) {
                    let e = new HttpException({
                        msg: 'bad data',
                        errs: err
                    }, HttpStatus.BAD_REQUEST);
                    sub.error(e)
                }

                this.roleModel.findOne({
                    id: role.id
                }).exec().then(r => {
                    let rf = (r as Role);
                    rf.modules.push();
                    new this.roleModel(rf).save().then(rfm => {
                        sub.next(rfm);
                        sub.complete();
                    }).catch(e => {
                        sub.error(e);
                    });

                }).catch(er => {
                    sub.error(er);
                })
            })
        })
    }

    appHasRole(app: string, role: string): Subject<boolean> {
        let s = new Subject<boolean>();
        if (!app || !role) {
            throw new HttpException('Bad data ', HttpStatus.BAD_REQUEST);
        }
        this.appModel.findOne({
            id: app
        }).populate(["roles"]).exec().then(a => {
            if (!a) {
                throw new HttpException('app not found', HttpStatus.BAD_REQUEST);
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

        })
        return s;
    }
    appHasModule(app: string, module: string): Subject<boolean> {
        let s = new Subject<boolean>();
        if (!app || !module) {
            throw new HttpException('Bad data ', HttpStatus.BAD_REQUEST);
        }
        this.appModel.findOne({
            id: app
        }).populate(["roles"]).exec().then(a => {
            if (!a) {
                throw new HttpException('app not found', HttpStatus.BAD_REQUEST);
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

        })
        return s;
    }
    addModules(modules: Module[], app: string): Observable<Module[]> {
        let s = new Subject<Module[]>();
        if (!modules || modules.length == 0 || !app) {
            throw new HttpException('bad data', HttpStatus.BAD_REQUEST);
        }

        this.appModel.findOne({ id: app }).populate(['modules']).exec().then(a => {
            let mInApp: Module[] = [];
            if (!a) {
                throw new HttpException('app not found', HttpStatus.BAD_REQUEST);
            }
            if (!a.modules || a.modules.length == 0) {
                a.modules = modules;
            } else {
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
        })

        return s;
    }
    changePassword(idaccount: User, hashPwd: string): Subject<User> {
        let s  = new Subject<User>();
        console.log(idaccount, hashPwd);
        if(!idaccount || !hashPwd)  {
            s.error(new HttpException('Bad data', HttpStatus.BAD_GATEWAY));
        }
        new this.userrModel(doc).save().then( uSaved  =>{
            s.next(uSaved);
            s.complete();
        }).catch(e =>{
            console.log(e);
            s.error(e);
        })
        return s;
    }
    getUsersByApp(app: string): Observable<User[]> {
        let s = new Observable<User[]>(sub => {
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

    activation(code: string): Subject<User> {
        const s = new Subject<User>();
        this.acModel.findOne({
            code: code
        }).populate(['user']).exec().then(c => {
            if (!c) {
                s.error("Bad code");
            }
            if (c.status == AccountActivationStatus.EXPIRED) {
                s.error("Code expired");
            }

            if (c.status == AccountActivationStatus.USED) {
                s.error("Code already used");
            }
            console.log("useracc", )
            this.userrModel.findById((c.user as any)._id).exec().then(uf => {
                if (!uf) {
                    throw new HttpException('Bad code', HttpStatus.BAD_REQUEST);
                }
                uf.isAllowed = true;
                uf.save().then( uUser =>{
                    s.next(uf as unknown as User);
                    s.complete();
                }).catch(e =>{
                    s.error(e);
                })
               

            }).catch(e => {
                s.error(e);
            })

        })
        return s;
    }

    requestActivation(username: string, app: string): Subject<AccountActivation> {
        let s = new Subject<AccountActivation>();
        if (!username || !app) {
            s.error("bad datas");
        }
        this.findByUsernameOrPhoneOrEmailAndApp(username, username, username, app).subscribe(u => {
            if (!u) {
                let e = new HttpException('Account not found', HttpStatus.NOT_FOUND);
                s.error(e);
            }

            let ac = new AccountActivation();
            ac.code = Util.randomString(10);
            ac.user = u;
            ac.expiredAt = moment().add(1, 'days').toDate();
            
            ac.status = AccountActivationStatus.PENDING;
            new this.acModel(ac).save().then(acs => {
                s.next(acs);
                
            }).catch(e => {

                s.error(e);
            });
        }, e => {
            s.error(e);
        })
        return s;
    }

    getCategories(): Observable<CategoryUser[]> {
        return new Observable<CategoryUser[]>(s => {
            this.categoryModel.find().exec().then(d => {
                s.next(d.map(c => { c.id = c._id; c._id = null; return c }));
                s.complete();
            }).catch(e => {
                s.error(e)
            })
        })
    }

    addCategory(c: CategoryUser): Observable<CategoryUser> {
        let s = new Subject<CategoryUser>();

        new this.categoryModel(c).save().then(cs => {
            s.next(cs);
            s.complete();
        }, e => {
            console.log(e);
            s.error(e);
        });
        return s;
    }

    getUsers(): Observable<User[]> {
        let s: Observable<User[]|any> = new Observable(subscriber => {
            this.userrModel.find().populate(['category', 'application', 'roles']).exec().then(users => {
               
                subscriber.next(users);
                subscriber.complete();
            })
        })
        return s;
    }
    getRoles(): Observable<Role[]> {
        return new Observable<Role[]>(sub => {
            this.roleModel.find().exec().then(r => {
                sub.next(r);
                sub.complete();
            }).catch(e => {
                sub.error(e);
            })
        });
    }
    findAppByCode(code: string): Subject<Application> {
        let s = new Subject<Application>();
        this.appModel.find({
            code: code
        }).exec().then(a => {
            s.next(a as unknown as Application);
            s.complete();
        }).catch(e => {
            s.error(e);
        })
        return s;

    }
    findAppByEmailOrPhone(email: string, phone: string): Subject<Application> {
        let u = new Subject<Application>;
        this.appModel.findOne({
            $or: [
                {
                    email: email,
                    phone: phone,
                }
            ]
        }).exec().then(d => {
            //d.createdAt = d.createdAt.getTime();
            u.next(d);

        }).catch(e => {
            u.error(e)
        });

        return u;
    }

    findByUsernameOrPhoneOrEmailAndApp(username: string, phone: string, email: string, app: string): Subject<User> {
        let u = new Subject<User>;
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
                    application: new mongoose.Types.ObjectId(app)

                },


            ]

        }).populate('application').exec().then(d => {
            if (!d) {
                u.error(new HttpException('account not found', HttpStatus.NOT_FOUND));
            } else {
                //d.createdAt = d.createdAt.getTime();
                u.next(d);
                u.complete();
            }
        }).catch(e => {

            u.error(e);
        })

        return u;
    }

    addUser(data: UserForm): Subject<User> {
        let s = new Subject<User>();
        const salt = bcrypt.genSaltSync(10);
        console.log("passhasshh", bcrypt.hashSync("123456", salt));
        validate(data).then(async e => {
            //console.log('OOOOOOOOOooo');
            console.log("eeeee", e);
            let u: User = data.toEntity();
            
            u.password = bcrypt.hashSync("123456", salt)
          
            u.hasPasswordSet = false;
            u.isAllowed = false;
            u.username = Util.generateOTP(10);
            u.createdAt = new Date();
            u.category = await this.categoryModel.findById(data.category).exec();
            u.application = await this.appModel.findById(data.app).exec();

            new this.userrModel(u).save().then(us => {
                let ac = new AccountActivation();
                ac.code = Util.randomString(10);
                ac.user = us;
                ac.expiredAt = moment().add(1, 'days').toDate();
                ac.status = AccountActivationStatus.PENDING;
                new this.acModel(ac).save().then(acs => {
                    s.next(us);
                    s.complete();
                }).catch(e => {
                    console.log(e);
                    s.error(e);
                });
            }).catch(e => {
                //console.log(e);
                s.error(e);
            });

        }).catch(e => {
            //console.log(e);
            s.error(e);
        });


        return s;
    }
    addApp(data: ApplicationDto): Subject<Application> {
        let s = new Subject<Application>();
        validate(data).then(d => {

            return this.connection.startSession().then(cs => {
                cs.startTransaction();
                new this.appModel(data.toEntity()).save().then(a => {
                    let u = new User();
                    u.email = data.email
                    u.nom = data.nom;
                    u.prenom = data.prenom;
                    u.username = Util.randomString(20);
                    u.application = a as Application;

                    return new this.userrModel(u).save().then(uu => {
                        let ac = new AccountActivation();
                        ac.code = Util.randomString(10);
                        ac.user = uu;
                        ac.expiredAt = moment().add(1, 'days').toDate();

                        ac.status = AccountActivationStatus.PENDING;
                        return new this.acModel(ac).save().then(acs => {
                            cs.commitTransaction();
                            this.mailerService.sendMail({
                                to: "djbrandon.ekoto@gmail.com",
                                subject: "try",
                                template: "mail",
                                context: {
                                    name: "brandon"
                                }
                            })
                            s.next(a);
                            s.complete();



                        }).catch(e => {
                            console.log(e)
                            cs.abortTransaction();
                            s.error(e);

                        });

                    }).catch(e => {
                        console.log(e)
                        cs.abortTransaction();
                        s.error(e);
                    })

                }).catch(e => {
                    console.log(e);
                    s.error("Error on saving");
                });
            }).catch(e => {
                console.log(e)
                s.error(e);
            });
        }).catch(e => {
            console.log(e)
            s.error(e);
        });

        return s;
    }

    editApp(id: string, data: ApplicationDto, user: string): Subject<Application> {
        return null;
    }
    getApp(id: string): Subject<Application> {
        let s = new Subject<Application>();
        this.appModel.findById(id
        ).exec().then(a => {
            s.next(a);
            s.complete();
        }).catch(e => {
            s.error(e);
        })

        return s;
    }
    searchApp(pattern: string): Observable<Application[]> {
        return new Observable(sub => {
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
            })
        })
    }
    getApps(): Observable<Application[]> {
        return new Observable(s => {
            this.appModel.find().exec().then(d => {
                s.next(d)
                s.complete();
            }).catch(e => {
                s.error(e)
            })
        })
    }
    getUser(id: string): Subject<User> {
        let u = new Subject<User>;

        this.userrModel.findOne({
            id : new mongoose.Types.ObjectId(id)
        }).populate(["application", "category", "roles"]) .exec().then(d => {
            u.next(d)
            //console.log("iiicccc", d);
            u.complete();
        }).catch(e => {
            console.log(e);
            u.error(e);
        })
        return u;
    }
    findByUsername(username: string): Subject<User> {
        let s = new Subject<User>();
        this.userrModel.findOne({
            username: username
        }).exec().then(u => {
            s.next(u);
            s.complete();
        }).catch(e => {
            s.error(e);
        })
        return s;
    }
    findByUsernameAndApp(username: string, app: any): Subject<User> {
        let u = new Subject<User>;

        this.userrModel.findOne({
            $and: [
                {
                    username: (username)
                },
                {
                    application: new mongoose.Types.ObjectId(app)
                    
                }
            ]
        }).populate(['application', 'category', 'roles']) .exec().then(d => {

            u.next(d)
        }).catch(e => {
            
            u.error(e);
        })
        return u;
    }
    getModules(): Observable<Module[]> {
        return new Observable<Module[]>(s => {
            this.moduleModel.find().exec().then(d => {
                s.next(d);
                s.complete();
            }).catch(e => {

                s.error(e);
            })
        });
    }
    addModule(modules: Module): Subject<Module> {
        let s = new Subject<Module>();
        validate(modules).then(err => {
            if (err && err.length > 0) {
                let e = new HttpException({
                    msg: 'bad datat',
                    errs: err
                }, HttpStatus.BAD_REQUEST);
                s.error(e);
            }
            new this.moduleModel(modules).save().then(m => {
                s.next(m);
                s.complete();
            }).catch(e => {
                s.error(e);
            })

        })
        return
    }


    addModulesToRole(modules: ModulePrivileges[], role: Role): Observable<Role> {
        let s = new Subject<Role>();
        if (!modules || modules.length == 0 || !role) {
            throw new HttpException('bad data', HttpStatus.BAD_REQUEST);
        }

        this.roleModel.findOne({ id: role }).populate(['modules']).exec().then(r => {
            let mInApp: ModulePrivileges[] = [];

            if (!r) {
                throw new HttpException('app not found', HttpStatus.BAD_REQUEST);
            }
            if (!r.modules || r.modules.length == 0) {
                r.modules = modules;
            } else {
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
        })

        return s;
    }

    editModule(id: string, data: Module, user: User): Subject<Module> {
        throw new Error('Method not implemented.');
    }
    addRole(role: Role): Subject<Role> {
        throw new Error('Method not implemented.');
    }
    addRoles(roles: Role[]): Observable<Role[]> {
        throw new Error('Method not implemented.');
    }
    addRolesToUser(roles: Role[], user: User, doneBy: User): Subject<User> {

        if (!roles || roles.length == 0 || !user || !doneBy) {
            throw new HttpException('Bad datas', HttpStatus.BAD_REQUEST);
        }
        let rolesInSystem

        throw new Error('Method not implemented.');
    }

    removeRolesFromUser(roles: Role[], user: User, doneBy: User): Subject<User> {
        let s = new Subject<User>();
        this.userrModel.findOne({
            id: user.id
        }).exec().then(u => {
            if (!u) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }
            let uf: User = u as User;
            let nRoles: Role[] = [];

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
            })


        });

        return s;
    }



    enableUser(user: User, doneBy: User): Subject<boolean> {
        if (!user || !user.id) {
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
        let s = new Subject<boolean>();
        this.userrModel.findOne({
            id: user.id
        }).exec().then(uf => {
            if (!uf) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }
            if (uf.isAllowed) {
                throw new HttpException('Account already enabled', HttpStatus.BAD_REQUEST);
            }
            uf.isAllowed = true;
            new this.userrModel(uf as User).save().then(uUpdated => {
                s.next(true);
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });

        return s;
    }
    disableUser(user: User, doneBy: User): Subject<boolean> {
        if (!user || !user.id) {
            throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
        }
        let s = new Subject<boolean>();
        this.userrModel.findOne({
            id: user.id
        }).exec().then(uf => {
            if (!uf) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }
            if (!uf.isAllowed) {
                throw new HttpException('Account already enabled', HttpStatus.BAD_REQUEST);
            }
            uf.isAllowed = false;
            new this.userrModel(uf as User).save().then(uUpdated => {
                s.next(true);
            }).catch(e => {
                s.error(e);
            });
        }).catch(e => {
            s.error(e);
        });

        return s;

    }

}
