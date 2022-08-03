import { MaxLength, MinLength } from "class-validator";
import { IsValidPwd, Match } from "src/util/util";

export class PwdDto {

    @MinLength(4)
    @MaxLength(20)
    @IsValidPwd()
    password: string;
    @Match('password')
    rpassword: string;
    oldPassword: string;
    username : string;
}