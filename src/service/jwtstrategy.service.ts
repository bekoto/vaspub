import { Injectable , Inject} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {User} from 'src/entity/user';
import { AuthhelperService } from './authhelper.service';

@Injectable()
export class JwtstrategyService extends PassportStrategy(Strategy){ 

    constructor(private readonly helper : AuthhelperService, private config : ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('JWT_KEY') ,
            ignoreExpiration : true
        })
    }

    private validate(payload:string ): Promise<User|never>{
        ExtractJwt.fromAuthHeaderWithScheme('jwt')
        //console.log("jwttt",payload);
        return this.helper.validateUser(payload);
    }

 }
