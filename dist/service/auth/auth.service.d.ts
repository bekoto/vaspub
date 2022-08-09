import { Subject } from 'rxjs';
import { PwdDto } from 'src/dto/pwd-dto';
import { UserForm } from 'src/dto/user-form';
import { User } from 'src/entity/user';
import { JwtRequest } from 'src/model/jwt-request';
import { JwtResponse } from 'src/model/jwt-response';
import { AuthhelperService } from '../authhelper.service';
import { UserManagement } from '../user/user-manager';
import { AuthenticationManager } from './authentication-manager';
export declare class AuthService implements AuthenticationManager {
    private authHelper;
    private userMan;
    constructor(authHelper: AuthhelperService, userMan: UserManagement);
    changeOurPwd(username: string, pwdData: PwdDto, app: string): Subject<User>;
    validate(token: any): Subject<boolean>;
    login(auth: JwtRequest): Subject<JwtResponse<User>>;
    logup(data: UserForm): Subject<User>;
    activation(code: string): Subject<JwtResponse<User>>;
    requestActivation(username: any, app: string): Subject<boolean>;
    refresh(token: string): Subject<JwtResponse<User>>;
}
