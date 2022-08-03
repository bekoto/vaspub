import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthhelperService } from './authhelper.service';
declare const JwtstrategyService_base: new (...args: any[]) => Strategy;
export declare class JwtstrategyService extends JwtstrategyService_base {
    private readonly helper;
    private config;
    constructor(helper: AuthhelperService, config: ConfigService);
    private validate;
}
export {};
