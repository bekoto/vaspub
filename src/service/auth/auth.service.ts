import { CallHandler, ExecutionContext, Headers, HttpException, HttpStatus, Inject, Injectable, NestInterceptor, Post, Query } from '@nestjs/common';
import { Validate, validate } from 'class-validator';
import { AnyObject } from 'mongoose';
import { map, Observable, Subject } from 'rxjs';
import { PwdDto } from 'src/dto/pwd-dto';
import { UserForm } from 'src/dto/user-form';
import { User } from 'src/entity/user';
import { JwtRequest } from 'src/model/jwt-request';
import { JwtResponse } from 'src/model/jwt-response';
import { AuthhelperService } from '../authhelper.service';
import { UserManagement } from '../user/user-manager';
import { AuthenticationManager } from './authentication-manager';

@Injectable()
export class AuthService implements AuthenticationManager {


    constructor(private authHelper: AuthhelperService, @Inject('userManager') private userMan: UserManagement) {

    }

    changeOurPwd(username: string, pwdData: PwdDto, app: string) {
        let s = new Subject<User>();
        validate(pwdData).then(err => {
            this.userMan.findByUsernameOrPhoneOrEmailAndApp(username, username, username, app).subscribe(u => {
                if (!u) {
                    s.error(new HttpException('User not found', HttpStatus.NOT_FOUND));
                }
                if (!this.authHelper.isPasswordValid(u.password, pwdData.oldPassword)) {
                    s.error(new HttpException('Bad password', HttpStatus.BAD_REQUEST));
                }
                u.password = this.authHelper.hashPassword(pwdData.password);
                u.hasPasswordSet = true;
                this.userMan.changePassword(u, u.password).subscribe(res => {
                    if (res) {
                        s.next(res);
                        s.complete();
                    } else {
                        s.error(new HttpException('Error on changing password, please try', HttpStatus.BAD_REQUEST));
                    }
                }, e => {
                    console.log(e);
                    s.error(e);

                })
            }, e => {
                console.log(e)
                s.error(e);
            })
        }).catch(e => {
            console.log(e);
            s.error(e);
        });

        return s;
    }

    validate(token: any): Subject<boolean> {
        const s = new Subject<boolean>();
        this.authHelper.validate(token).then(r => {
            s.next(r);
            s.complete();
        }).catch(e => {
            console.log(e);
            s.error(e);
        })
        return s;
    }

    login(auth: JwtRequest): Subject<JwtResponse<User>> {
        const s: Subject<JwtResponse<User|any>> = new Subject();
        console.log(auth);
        validate(auth).then(d => {
            this.userMan.findByUsernameAndApp(auth.username, auth.app).subscribe(u => {
                if (!u) {
                    s.error(new HttpException('Account not found', HttpStatus.UNAUTHORIZED));
                } else if (!this.authHelper.isPasswordValid(auth.password, u.password)) {
                    s.error(new HttpException('Bad password, please try again', HttpStatus.UNAUTHORIZED));
                } else {
                    const o : User|any = u;
                    o.createdAt = u.createdAt.getTime();
                    
                    const jwtr: JwtResponse<User> = {
                        data: o,
                        token: this.authHelper.generateToken(u)
                    };

                    s.next(jwtr);
                    s.complete();
                }
            }, e => {
                s.error(e);
            });

        }).catch(e => {
            s.error(e);
        })

        return s;
    }
    logup(data: UserForm): Subject<User> {
        const s = new Subject<User>();

        validate(data).then(ok => {
            console.log(ok);
            this.userMan.addUser(data).subscribe(u => {
                console.log(u);
                if (!u) {
                    throw new HttpException('', HttpStatus.BAD_REQUEST)
                }
                s.next(u);
                s.complete();
            }, e => {
                console.log(e);
                s.error(e);
            });
        }).catch(e => {
            console.log(e);
            s.error(e);
        })

        return s;
    }
    activation(code: string): Subject<JwtResponse<User>> {
        const s = new Subject<JwtResponse<User>>();
        if (!code || code.length == 0) {
            throw new HttpException('Please type code', HttpStatus.BAD_REQUEST);
        }

        this.userMan.activation(code).subscribe(d => {
            console.log(d);
            if (d) {
                const token = this.authHelper.generateToken(d);
                const jwtRes: JwtResponse<User> = {
                    data: d,
                    token: token
                };

                s.next(jwtRes);
                s.complete();
            } else {
                let e = new HttpException('Bad code', HttpStatus.BAD_REQUEST);
                s.error(e);
            }
        }, e => {
            s.error(e);
        });

        return s;

    }


    requestActivation(@Query('account') username: any, app: string): Subject<boolean> {
        let s = new Subject<boolean>();
        if (!username || username.length == 0 || !app || app.length == 0) {
            s.error(new HttpException('Bad data', HttpStatus.BAD_REQUEST));
        } else {

            this.userMan.requestActivation(username, app).subscribe(res => {
                if (res) {
                    s.next(true);
                    s.complete()
                } else {
                    s.error(new HttpException('Account not found', HttpStatus.NOT_FOUND))
                }
            }, e => {
                s.error(e);
            });

        }

        return s;
    }
    refresh(token: string): Subject<JwtResponse<User>> {
        const s = new Subject<JwtResponse<User>>();
        console.log(token);
        this.authHelper.validate(token).then(r => {
            if (r) {
                this.authHelper.decode(token).then((decoded: any) => {
                    if (decoded) {


                        this.userMan.getUser(decoded.id).subscribe(uf => {
                            if (uf) {
                                const jwtr: JwtResponse<User> = {
                                    data: uf as User,
                                    token: this.authHelper.generateToken(uf as User)
                                };
                                s.next(jwtr);
                                s.complete();
                            } else {
                                s.error(new HttpException('Bad token', HttpStatus.UNAUTHORIZED))
                            }
                        }, e => {
                            s.error(new HttpException('Bad token', HttpStatus.UNAUTHORIZED))
                        })


                    } else {
                        s.error(new HttpException('Bad token', HttpStatus.UNAUTHORIZED))
                    }
                })
            } else {
                s.error(new HttpException('Bad token', HttpStatus.UNAUTHORIZED))
            }
        }, e => {
            s.error(new HttpException('Bad token', HttpStatus.UNAUTHORIZED))
        })

        return s;
    }

}
