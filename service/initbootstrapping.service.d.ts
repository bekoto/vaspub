import { OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { UserManagement } from './user/user-manager';
export declare class InitbootstrappingService implements OnApplicationBootstrap, OnModuleInit {
    authSys: UserManagement;
    constructor(authSys: UserManagement);
    onModuleInit(): void;
    onApplicationBootstrap(): void;
}
