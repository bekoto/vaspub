import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserManagement } from 'src/service/user/user-manager';
export declare class UniqueUserAppService implements ValidatorConstraintInterface {
    authSys: UserManagement;
    constructor(authSys: UserManagement);
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function UniqueUser(obj: {
    forWhat: string;
    app: string;
}, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
