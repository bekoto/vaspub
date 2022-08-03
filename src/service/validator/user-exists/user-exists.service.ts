import { Inject, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserForm } from 'src/dto/user-form';
import { User } from 'src/entity/user';
import { UserManagement } from 'src/service/user/user-manager';

@Injectable()
@ValidatorConstraint({ name: 'UserExist', async: true })
export class UserExistsService implements ValidatorConstraintInterface {
    
    constructor(@Inject('userManager') public authSys : UserManagement){
        console.log(authSys);
    }
    validate(value: UserForm, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        //console.log(value)
        if(value == null){
            return false;
        }

        if(value.id == null ||value.id.length == 0){
            return false;
        }
        return this.authSys.getUser(value.id).toPromise().then(u =>{return true}).catch(e=>{return false});
            
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "Please set a valid individu";
    }
}

export function UserExistsValidator(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'UserExists',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: UserExistsService,
      });
    };
  }