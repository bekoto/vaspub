/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Inject } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { use } from 'passport';
import { UserManagement } from '../user/user-manager';

@Injectable()
@ValidatorConstraint({ name: 'UniqueApp', async: true })
export class UniqueAppService implements ValidatorConstraintInterface {


    constructor(@Inject('userManager') public userMan : UserManagement){
       
    }
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
       //console.log(validationArguments, validationArguments.constraints)
        if(value == null){
            return false;
        }
        
        if(value == null ||value.length == 0){
            
            return false;
        }
        let v = validationArguments.object as any;
        
       return this.userMan.getApp(value).toPromise().then(d =>{
            if(d){
                return false;
            }
            true;
        }).catch(  e=>{
            return false;
        });
        

        
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
       return "username already existe";
    }
}
export function UniqueApp(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'UniqueApp',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: UniqueAppService,
      });
    };
  }