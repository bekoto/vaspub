import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getEnvPath, MatchConstraint, PasswordValidConstraint } from './util/util';
import { FileSchema } from './entity/file';
import { userSchema } from './entity/user';
import { ApplicationSchema } from './entity/application';
import { RoleSchema } from './entity/role';
import { moduleSchema } from './entity/module';
import { logActivitySchema } from './entity/log-activity';
import { AccountActivationSchema } from './entity/account-activation';
import { UserService } from './service/user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserExistsService } from './service/validator/user-exists/user-exists.service';
import { UniqueUserAppService } from './service/validator/unique-user-app/unique-user-app.service';
import { AuthService } from './service/auth/auth.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserManagementController } from './controller/usermanagement.controller';
import { join } from 'path';
import { AuthController } from './controller/auth.controller';
import { AuthhelperService } from './service/authhelper.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppexistvalidatorService } from './service/validator/appexistvalidator.service';
import { UniqueAppService } from './service/validator/uniqueapp.service';
import { InitbootstrappingService } from './service/initbootstrapping.service';
import { categoryUserSchema } from './entity/category';
import { JwtstrategyService } from './service/jwtstrategy.service';
const envFilePath: string = getEnvPath(`${__dirname}/`);
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy : 'jwt', property : 'user'
    }),
    JwtModule.registerAsync({
      inject : [ConfigService],
      useFactory : (config:ConfigService)=>({
        secret : config.get('JWT_KEY'),
        signOptions : {
          expiresIn :config.get('JWT_EXPIRES')
        }
      })
    }),

    MailerModule.forRoot({
      transport: {
        port :  465,
        host: 'smtp.gmail.com',
        secure : false,        
        auth: {
          user: 'no-reply@multivers-tech.com',
          pass: 'no-reply@2022',          
          credentials : {
            user: 'no-reply@multivers-tech.com',
            pass: 'no-reply@2022',  
          }
        },
      },template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (conf: ConfigService) => {

        if (conf.get('DATABASE_MUST_AUTH') == 'NO') {
          return ({
            uri: `mongodb://${conf.get('DATABASE_SERVER')}:${conf.get('DATABASE_PORT')}/${conf.get('DATABASE_SCHEMA')}`,
            useNewUrlParser: true
          })
        } else {
          console.log(`mongodb://${conf.get('DATABASE_USER')}:${conf.get('DATABASE_PASSWORD')} ${conf.get('DATABASE_SERVER')}:${conf.get('DATABASE_PORT')}/${conf.get('DATABASE_SCHEMA')}`)
          return ({
            uri: `mongodb://${conf.get('DATABASE_USER')}:${conf.get('DATABASE_PASSWORD')}@${conf.get('DATABASE_SERVER')}:${conf.get('DATABASE_PORT')}/${conf.get('DATABASE_SCHEMA')}`,
            useNewUrlParser: true
          })
        }
      },
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      { name: "Application", schema: ApplicationSchema },
      { name: "User", schema: userSchema },
      { name: "AccountActivation", schema: AccountActivationSchema },
      { name: "Role", schema: RoleSchema },
      { name: "CategoryUser", schema: categoryUserSchema },
      { name: "Module", schema: moduleSchema },
      { name: "LogActivity", schema: logActivitySchema },
      { name: "File", schema: FileSchema }]),
    //MongooseModule.forRoot('mongodb://localhost:27017/m_arch'),
    ConfigModule.forRoot(
      {
        envFilePath: envFilePath, isGlobal: true
      }
    )
  ],
  controllers: [AuthController, UserManagementController,],
  providers: [AppService, {
    provide: 'userManager',
    useClass: process.env.NODE_ENV == "DEV" ? UserService : UserService,


  }, AuthService, UserExistsService, UniqueUserAppService, AuthhelperService, AppexistvalidatorService, UniqueAppService, InitbootstrappingService, JwtstrategyService, MatchConstraint,PasswordValidConstraint],
})
export class AppModule { 
  
}
