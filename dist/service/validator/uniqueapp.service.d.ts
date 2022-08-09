import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserManagement } from '../user/user-manager';
export declare class UniqueAppService implements ValidatorConstraintInterface {
    userMan: UserManagement;
    constructor(userMan: UserManagement);
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function UniqueApp(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
