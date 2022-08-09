import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/user';
import { UserManagement } from './user/user-manager';
export declare class AuthhelperService {
    private jwt;
    private userMan;
    constructor(jwt: JwtService, userMan: UserManagement);
    decode(token: string): Promise<unknown>;
    validateUser(decoded: any): Promise<User | any>;
    generateToken(user: User): string;
    isPasswordValid(pwd: string, userPwd: string): boolean;
    hashPassword(plainPwd: string): string;
    validate(token: string): Promise<boolean | never>;
}
export declare const AuthUser: (...dataOrPipes: any[]) => ParameterDecorator;
