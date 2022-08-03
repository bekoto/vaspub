/// <reference types="node" />
import { File } from 'src/entity/file';
export declare class FileUtil {
    static baseFolder: string;
    static fromBase64(raw64: string): Buffer;
    static toBase64(filename: string): string;
    static toFile(data: Buffer, type: string, origine?: string): Promise<File>;
    static delFile(filename: string): Promise<boolean>;
    static base64toFile(raw64: string, type: string): Promise<String>;
    static removeNullFromArray(arr: any): any[];
    static Bas64ExtensionImageFile(data: String): string;
    static Bas64Url(data: String): string;
    static Base64Compile(data: String): Array<String>;
}
