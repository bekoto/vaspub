import { Inject, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserManagement } from '../user/user-manager';

@Injectable()
@ValidatorConstraint({ name: 'AppExist', async: true })
export class AppexistvalidatorService implements ValidatorConstraintInterface { 
    

    constructor(@Inject('userManager') public userMan : UserManagement){
       
    }
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
       
        if(value == null){
            return false;
        }
        
        if(value == null ||value.length == 0){
            
            return false;
        }
        let v = validationArguments.object as any;
        
       return this.userMan.getApp(value).toPromise().then(d =>{
            if(d){
                return true;
            }
            false;
        }).catch(  e=>{
            console.log(e);
            return false;
        });
        

        
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
       return "App not found";
    }
 }

 
export function AppExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'AppExist',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: AppexistvalidatorService,
      });
    };
  }