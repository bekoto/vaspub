import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/user';
import { UserManagement } from './user/user-manager';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';
import { createParamDecorator } from '@nestjs/common';

@Injectable()
export class AuthhelperService {

    constructor(private jwt : JwtService,@Inject('userManager') private userMan : UserManagement  ){

    }

    public async decode(token : string ):Promise<unknown>{
        return this.jwt.decode(token, null);
    }

    public async validateUser(decoded : any ): Promise<User|any>{
        return firstValueFrom(this.userMan.getUser(decoded.id))
    }
    public generateToken(user : User) : string{
        return this.jwt.sign({id:user.id, email : user.email, app : user.application.id})
    }
    public isPasswordValid(pwd : string, userPwd : string) : boolean{
        return bcrypt.compareSync(pwd, userPwd);
    }

    public hashPassword(plainPwd : string):string{
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainPwd, salt);
    }
    public async validate(token : string):Promise<boolean|never>{
        const decoded : unknown = this.jwt.verify(token);
        console.log(decoded);
        if(!decoded){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const user : User = await this.validateUser(decoded);
        console.log("aaaaaaaaa", user);
        if(!user){
            throw new UnauthorizedException();
        }
        return true;
    }

    
}




export const AuthUser = createParamDecorator((data, req) => {
    console.log(req);
  return req.user;
});