import { Inject, Injectable , OnApplicationBootstrap, OnModuleInit} from '@nestjs/common';
import { CategoryUser } from 'src/entity/category';
import { UserManagement } from './user/user-manager';

@Injectable()
export class InitbootstrappingService implements OnApplicationBootstrap, OnModuleInit{

    constructor(@Inject('userManager') public authSys : UserManagement){

    }
    onModuleInit() {
        console.log("APP BOOTSTRATING")
        
        this.authSys.getCategories().subscribe( c =>{
            if(!c || c.length == 0){
                let cArr = ["USER", "SYSTEM", "API", "PARTENAIRE"];
                cArr.forEach( i =>{
                    let cc = new CategoryUser();
                    cc.libelle = i; 
                    this.authSys.addCategory(cc).subscribe( s =>{
                        console.log(s);
                    } , e =>{
                        console.log(e);
                    });
                } )
            }
            console.log(c.length);
        }, e =>{
            console.log("eeeerrrr",e)
        })
    }
    onApplicationBootstrap() {
       
    }
        
 }
