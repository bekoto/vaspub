"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const util_1 = require("./util/util");
const file_1 = require("./entity/file");
const user_1 = require("./entity/user");
const application_1 = require("./entity/application");
const role_1 = require("./entity/role");
const module_1 = require("./entity/module");
const log_activity_1 = require("./entity/log-activity");
const account_activation_1 = require("./entity/account-activation");
const user_service_1 = require("./service/user/user.service");
const mailer_1 = require("@nestjs-modules/mailer");
const user_exists_service_1 = require("./service/validator/user-exists/user-exists.service");
const unique_user_app_service_1 = require("./service/validator/unique-user-app/unique-user-app.service");
const auth_service_1 = require("./service/auth/auth.service");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const usermanagement_controller_1 = require("./controller/usermanagement.controller");
const path_1 = require("path");
const auth_controller_1 = require("./controller/auth.controller");
const authhelper_service_1 = require("./service/authhelper.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const appexistvalidator_service_1 = require("./service/validator/appexistvalidator.service");
const uniqueapp_service_1 = require("./service/validator/uniqueapp.service");
const initbootstrapping_service_1 = require("./service/initbootstrapping.service");
const category_1 = require("./entity/category");
const jwtstrategy_service_1 = require("./service/jwtstrategy.service");
const modulemustexist_service_1 = require("./service/validator/modulemustexist.service");
const envFilePath = (0, util_1.getEnvPath)(`${__dirname}/`);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt', property: 'user'
            }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_KEY'),
                    signOptions: {
                        expiresIn: config.get('JWT_EXPIRES')
                    }
                })
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    port: 465,
                    host: 'smtp.gmail.com',
                    secure: false,
                    auth: {
                        user: 'no-reply@multivers-tech.com',
                        pass: 'no-reply@2022',
                        credentials: {
                            user: 'no-reply@multivers-tech.com',
                            pass: 'no-reply@2022',
                        }
                    },
                }, template: {
                    dir: (0, path_1.join)(__dirname, 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (conf) => {
                    if (conf.get('DATABASE_MUST_AUTH') == 'NO') {
                        return ({
                            uri: `mongodb://${conf.get('DATABASE_SERVER')}:${conf.get('DATABASE_PORT')}/${conf.get('DATABASE_SCHEMA')}`,
                            useNewUrlParser: true
                        });
                    }
                    else {
                        console.log(`mongodb://${conf.get('DATABASE_USER')}:${conf.get('DATABASE_PASSWORD')}@${conf.get('DATABASE_SERVER')}:${conf.get('DATABASE_PORT')}/${conf.get('DATABASE_SCHEMA')}`);
                        return ({
                            uri: `mongodb://${conf.get('DATABASE_USER')}:${conf.get('DATABASE_PASSWORD')}@${conf.get('DATABASE_SERVER')}:${conf.get('DATABASE_PORT')}/${conf.get('DATABASE_SCHEMA')}`,
                            useNewUrlParser: true
                        });
                    }
                },
                inject: [config_1.ConfigService]
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: "Application", schema: application_1.ApplicationSchema },
                { name: "User", schema: user_1.userSchema },
                { name: "AccountActivation", schema: account_activation_1.AccountActivationSchema },
                { name: "Role", schema: role_1.RoleSchema },
                { name: "CategoryUser", schema: category_1.categoryUserSchema },
                { name: "Module", schema: module_1.moduleSchema },
                { name: "LogActivity", schema: log_activity_1.logActivitySchema },
                { name: "File", schema: file_1.FileSchema }
            ]),
            config_1.ConfigModule.forRoot({
                envFilePath: envFilePath, isGlobal: true
            })
        ],
        controllers: [auth_controller_1.AuthController, usermanagement_controller_1.UserManagementController,],
        providers: [app_service_1.AppService, {
                provide: 'userManager',
                useClass: process.env.NODE_ENV == "DEV" ? user_service_1.UserService : user_service_1.UserService,
            }, auth_service_1.AuthService, user_exists_service_1.UserExistsService, unique_user_app_service_1.UniqueUserAppService, authhelper_service_1.AuthhelperService, appexistvalidator_service_1.AppexistvalidatorService, uniqueapp_service_1.UniqueAppService, initbootstrapping_service_1.InitbootstrappingService, jwtstrategy_service_1.JwtstrategyService, util_1.MatchConstraint, util_1.PasswordValidConstraint, modulemustexist_service_1.ModulemustexistService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map