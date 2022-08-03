import { IsNotEmpty } from "class-validator";


export class JwtRequest{
    @IsNotEmpty()
    username:string;
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    app:string;
    token:string
}