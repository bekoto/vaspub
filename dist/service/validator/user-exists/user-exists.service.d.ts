import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserForm } from 'src/dto/user-form';
import { UserManagement } from 'src/service/user/user-manager';
export declare class UserExistsService implements ValidatorConstraintInterface {
    authSys: UserManagement;
    constructor(authSys: UserManagement);
    validate(value: UserForm, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function UserExistsValidator(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
