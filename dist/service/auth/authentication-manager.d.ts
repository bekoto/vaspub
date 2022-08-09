import { Subject } from 'rxjs';
import { UserForm } from 'src/dto/user-form';
import { User } from 'src/entity/user';
import { JwtRequest } from 'src/model/jwt-request';
import { JwtResponse } from 'src/model/jwt-response';
export interface AuthenticationManager {
    login(auth: JwtRequest): Subject<JwtResponse<User>>;
    logup(data: UserForm): Subject<User>;
    activation(code: string): Subject<JwtResponse<User>>;
    requestActivation(username: any, app: string): Subject<boolean>;
    refresh(token: string): Subject<JwtResponse<User>>;
    validate(token: any): Subject<boolean>;
}
