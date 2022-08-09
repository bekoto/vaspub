"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
const crypto = require("crypto");
const file_util_1 = require("./file_util");
var iv = crypto.randomBytes(16);
var key = '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
var cipher = crypto.createCipher('aes-256-cbc', key);
var algo = "aes-256-cbc";
var decipher = crypto.createDecipher(algo, key);
class CryptoUtil {
    static encryptFileFromBase64(data, format) {
        let b = file_util_1.FileUtil.fromBase64(data);
        var crypted = Buffer.concat([iv, cipher.update(b), cipher.final()]);
        return file_util_1.FileUtil.toFile(b, format);
    }
    static encrypt(data) {
        let b = file_util_1.FileUtil.fromBase64(data);
        var crypted = Buffer.concat([iv, cipher.update(b), cipher.final()]);
        return crypted;
    }
    static decrypt(chunk) {
        var decipher, result, iv;
        iv = chunk.slice(0, 16);
        chunk = chunk.slice(16);
        decipher = crypto.createDecipher(algo, key);
        result = Buffer.concat([decipher.update(chunk), decipher.final()]);
        return result;
    }
    decryptFile(chunk, format) {
        var decipher, result, iv;
        iv = chunk.slice(0, 16);
        chunk = chunk.slice(16);
        decipher = crypto.createDecipheriv(algo, key, iv);
        result = Buffer.concat([decipher.update(file_util_1.FileUtil.fromBase64(chunk)), decipher.final()]);
        return file_util_1.FileUtil.toFile(result, format);
    }
}
exports.CryptoUtil = CryptoUtil;
//# sourceMappingURL=crypto_util.js.map