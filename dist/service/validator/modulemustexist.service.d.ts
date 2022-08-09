import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { ModuleDto } from 'src/dto/module-dto';
import { UserManagement } from 'src/service/user/user-manager';
export declare class ModulemustexistService implements ValidatorConstraintInterface {
    userMan: UserManagement;
    constructor(userMan: UserManagement);
    validate(value: ModuleDto, validationArguments?: ValidationArguments): boolean | Promise<boolean>;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function ModuleMustExist(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
