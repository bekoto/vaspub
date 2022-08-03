/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthGuard, IAuthGuard} from '@nestjs/passport';
import {Request} from 'express';
import {User} from 'src/entity/user'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {


  public handleRequest(err:unknown, user : User): any{
    return user;
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    await super.canActivate(context);
    const {user} : Request = context.switchToHttp().getRequest();
    //console.log(user);
    return user ? true : false;
  }
  
}
