/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, ClassSerializerInterceptor, Controller, Get, Header, Headers, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Subject } from 'rxjs';
import { PwdDto } from 'src/dto/pwd-dto';
import { UserForm } from 'src/dto/user-form';
import { User } from 'src/entity/user';
import { JwtRequest } from 'src/model/jwt-request';
import { JwtResponse } from 'src/model/jwt-response';
import { AuthService } from 'src/service/auth/auth.service';
import { JwtAuthGuard } from './guards/auth.guard';


@Controller("")
export class AuthController{

    constructor(private authService : AuthService){
        
    }

    @Post('caccount/pwd/:user')
    //@UseGuards(JwtAuthGuard)
    changePwdPassword( username : string, @Body() pwdData : PwdDto, @Headers('x-request-app') app: string):Subject<User|any>{
        console.log("pppppp");
        //return new Subject();
        return this.authService.changeOurPwd(username, pwdData, app);
    }

    @Post('validate')    
    validateToken(@Headers('x-app-auth-token') token : string){
        console.log("token ::", token);
        return this.authService.validate(token);
    }

    @Post('auth')
    login(@Body()auth: JwtRequest): Subject<JwtResponse<User>> {
        return this.authService.login(auth);
    }
    @Post('register')
    //@UseInterceptors(ClassSerializerInterceptor)
    logup(@Body()data: UserForm): Subject<User> {
        return this.authService.logup(data);
    }
    @Post('activate')
    activation(@Query('code')code: string): Subject<JwtResponse<User>> {
        return this.authService.activation(code);
    }
    @Post('account/init')
    requestActivation(@Query('account') username: any,@Headers('x-request-app') app: string): Subject<boolean> {
        return this.authService.requestActivation(username, app);
    }
    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    refresh(@Headers('x-app-auth-token') token: string): Subject<JwtResponse<User>> {
        console.log("tttt", token);
       return this.authService.refresh(token);
    } 

    
}
