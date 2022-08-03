import { resolve } from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { FileDto } from 'src/dto/file_dto';
import { File } from 'src/entity/file';
import { NotFoundException } from '@nestjs/common';

export class FileUtil {

    static baseFolder: string = resolve("./files/");

    static fromBase64(raw64: string): Buffer {
        try {
            let buffer = Buffer.from(raw64, 'base64');

            return buffer;
        } catch (e) {
            throw new Error("Can't decode file");
        }
    }

    static toBase64(filename :string):string{
        try {
            if(fs.existsSync(filename)){
                return fs.readFileSync(filename,{encoding:'base64'});

            }
            throw new NotFoundException("file not found");
        } catch (error) {
            throw new Error("Error appended");
        }
    }

    static toFile(data : Buffer, type : string, origine : string = "jpg"):Promise<File>{
        return new Promise((r, die) => {
            try {
                //let filefolder = FileUtil.baseFolder +"/";
                let filename: string =  randomUUID() + new Date().getTime() + "."+type;
                fs.writeFileSync(FileUtil.baseFolder +"/"+filename, data);
                let stat = fs.statSync(FileUtil.baseFolder +"/"+filename);
                let f  = new File();
                f.size = stat.size;
                f.fileType =type;
                f.createdAt = stat.ctime;
                f.emp = FileUtil.baseFolder;
                f.url = FileUtil.baseFolder +"/"+filename;
                f.fileType = origine;               

                return r(f);

            } catch (error) {
                die(error);
            }
        }
        )
    }

    static delFile(filename : string): Promise<boolean>{
        return new Promise((r, die) => {
            try {
               
                if(fs.existsSync(filename)){
                    fs.unlinkSync(filename);
                    return r(true);
                }else{
                    return r(false);
                }
               

            } catch (error) {
                die(error);
            }
        }
        )
    }

    static base64toFile(raw64: string, type: string): Promise<String> {
        return new Promise((r, die) => {
            try {
                let b = FileUtil.fromBase64(raw64);
                let filename: string = FileUtil.baseFolder + randomUUID() + new Date().getTime() + type;

                fs.writeFileSync(filename, b);
                return r(filename);

            } catch (error) {
                die(error);
            }
        }
        )
    }


    static removeNullFromArray(arr: any) {
        let narw: Array<any> = [];
       /* $.each(arr, ((i: any, element) => {
            if (element != null) {
                let o :{field :any, value : any} ;
                o = {field : i, value:element};
                
                narw.push(o);
            }
           
        }));*/
        return narw;
    }

    static Bas64ExtensionImageFile(data: String) {
        var r = /image\/(png|jpg|jpeg)/;
        let d = data.match(r);

        if (d!.length > 0) {
            return d![1];
        }
        return "";
    }

    static Bas64Url(data: String) {
        var r = /^data:image\/(png|jpg|jpeg);base64,/;
        let d = data.match(r) || "";
        if (d.length > 0) {
            return data.replace(r, "");
        }
        return "";
    }

    static Base64Compile(data: String): Array<String> {
        let r: RegExp = /^data:image\/(png|jpg|jpeg);base64,/;
        let ext = "";
        let url = ""
        let match: RegExpMatchArray | null = data.match(r);
        if (match && match.length > 0) {
            ext = FileUtil.Bas64ExtensionImageFile(data);
            url = FileUtil.Bas64Url(data);
            return [ext, url];
        }
        throw Error("Bad file");
    }
    


}