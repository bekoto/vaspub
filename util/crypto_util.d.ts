/// <reference types="node" />
import { File } from 'src/entity/file';
export declare class CryptoUtil {
    static encryptFileFromBase64(data: any, format: string): Promise<File>;
    static encrypt(data: any): Buffer;
    static decrypt(chunk: any): any;
    decryptFile(chunk: any, format: string): Promise<File>;
}
