import { Inject, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserManagement } from 'src/service/user/user-manager';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { firstValueFrom, lastValueFrom } from 'rxjs';


@Injectable()
@ValidatorConstraint({ name: 'UniqueUser', async: true })
export class UniqueUserAppService implements ValidatorConstraintInterface {

    constructor(@Inject('userManager') public authSys: UserManagement) {

    }
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
       
        if (value == null) {
            return false;
        }

        if (value == null || value.length == 0) {
            

            return false;
        }
        let v = validationArguments.object as any;
        //console.log('iiiieee', v, value);
       
        switch ((validationArguments.constraints[0])) {
            case "username": {
                return firstValueFrom(this.authSys.findByUsernameAndApp(value, v.app)).then(u =>{
                    //console.log("uuuss", u);
                    if(u){
                        return false;
                    }else{
                        return true;
                    }

                }).catch(e =>{
                    //console.log("uuussee", e);
                    if(e.id){
                        return false;
                    }
                    return true;
                });
                

            }
            case "phone": {
                
                return firstValueFrom(this.authSys.findByUsernameOrPhoneOrEmailAndApp(value, value, value, v.app)).then(u =>{
                    //console.log("uuussppppp", u);
                    if(u){
                        return false;
                    }else{
                        return true;
                    }

                }).catch(e =>{
                    //console.log("uuussseeeseeppp", e);
                    return true;
                    if(e.id){
                        return false;
                    }
                    return false;
                })

            }
            case "email": {
                return firstValueFrom(this.authSys.findByUsernameOrPhoneOrEmailAndApp(value, value, value, v.app)).then(u =>{
                    //console.log("fiiinnn",u)
                    if(u){
                        return false;
                    }else{
                        return true;
                    }

                }).catch(e =>{
                    return true;
                    console.log("uuusseeseeee", e);
                    if(e.id){
                        return false;
                    }
                    return true;
                })
                

            }
            default : 
            return false;
        }

        console.log('ihhhhhiiieee');
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "username already existe";
    }

}


export function UniqueUser(obj: { forWhat: string, app: string }, validationOptions?: ValidationOptions) {

    return function (object: any, propertyName: string) {
        console.log("uniqueUser property :" + propertyName);
        registerDecorator({
            name: 'UniqueUser',
            target: object.constructor,
            constraints: [obj.forWhat, obj.app],
            propertyName: propertyName,
            options: validationOptions,
            validator: UniqueUserAppService,
        });
    };
}