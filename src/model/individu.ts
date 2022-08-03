import { IsNotEmpty } from "class-validator";




export class Individu {
    
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    nom: string;

}