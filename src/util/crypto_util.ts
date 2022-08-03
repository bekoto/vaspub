import { FileDto } from '../dto/file_dto'
import * as fs from 'fs';
import * as crypto from 'crypto';
import { FileUtil } from './file_util';
import { File } from 'src/entity/file';

var iv = crypto.randomBytes(16);
var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
var cipher = crypto.createCipher('aes-256-cbc', key);
var algo = "aes-256-cbc";
var decipher = crypto.createDecipher(algo, key);

export class CryptoUtil {

    static encryptFileFromBase64(data, format: string): Promise<File> {

        let b = FileUtil.fromBase64(data);
        var crypted = Buffer.concat([iv, cipher.update(b), cipher.final()]);

        return FileUtil.toFile(b, format);
    }
   static encrypt(data): Buffer {
        let b = FileUtil.fromBase64(data);
        var crypted = Buffer.concat([iv, cipher.update(b), cipher.final()]);

        return crypted;
    }
   static decrypt(chunk) {

        var decipher,
            result,
            iv;

        // Get the iv: the first 16 bytes
        iv = chunk.slice(0, 16);

        // Get the rest
        chunk = chunk.slice(16);

        // Create a decipher
        decipher = crypto.createDecipher(algo, key);

        // Actually decrypt it
        result = Buffer.concat([decipher.update(chunk), decipher.final()]);

        return result;
    }

    decryptFile(chunk, format : string) {

        var decipher,
            result,
            iv;

        // Get the iv: the first 16 bytes
        iv = chunk.slice(0, 16);

        // Get the rest
        chunk = chunk.slice(16);

        // Create a decipher
        decipher = crypto.createDecipheriv(algo, key, iv);

        // Actually decrypt it
        result = Buffer.concat([decipher.update(FileUtil.fromBase64(chunk)), decipher.final()]);

        return FileUtil.toFile(result, format);
    }

}

