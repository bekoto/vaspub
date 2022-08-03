import { Subject } from 'rxjs';
import { PwdDto } from 'src/dto/pwd-dto';
import { UserForm } from 'src/dto/user-form';
import { User } from 'src/entity/user';
import { JwtRequest } from 'src/model/jwt-request';
import { JwtResponse } from 'src/model/jwt-response';
import { AuthService } from 'src/service/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    changePwdPassword(username: string, pwdData: PwdDto, app: string): Subject<User | any>;
    validateToken(token: string): Subject<boolean>;
    login(auth: JwtRequest): Subject<JwtResponse<User>>;
    logup(data: UserForm): Subject<User>;
    activation(code: string): Subject<JwtResponse<User>>;
    requestActivation(username: any, app: string): Subject<boolean>;
    refresh(token: string): Subject<JwtResponse<User>>;
}
