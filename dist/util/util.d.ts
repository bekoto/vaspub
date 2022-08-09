import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function getEnvPath(dest: string): string;
export declare class Util {
    static randomString(len: number, charSet?: string): string;
    static generateOTP(max: any): string;
}
export declare function Match(property?: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare function IsValidPwd(property?: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare class PasswordValidConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
export declare class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
export default function TransformDate(): (target: any, key: string) => void;
