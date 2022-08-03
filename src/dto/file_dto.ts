import { File } from "src/entity/file";
import { FileNature } from "src/model/file_nature";
import { EntityTransformer } from "src/util/entity_transformer";


export class FileDto extends EntityTransformer<File>{
    
    type : string ;
    data : any;
    nature : FileNature;
    createdAt : number;
    obs : string;
    
    toEntity(): File {
        let f = new File();
       return f;
    }

}