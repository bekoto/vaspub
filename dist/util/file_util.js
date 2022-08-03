"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
const path_1 = require("path");
const fs = require("fs");
const crypto_1 = require("crypto");
const file_1 = require("../entity/file");
const common_1 = require("@nestjs/common");
class FileUtil {
    static fromBase64(raw64) {
        try {
            let buffer = Buffer.from(raw64, 'base64');
            return buffer;
        }
        catch (e) {
            throw new Error("Can't decode file");
        }
    }
    static toBase64(filename) {
        try {
            if (fs.existsSync(filename)) {
                return fs.readFileSync(filename, { encoding: 'base64' });
            }
            throw new common_1.NotFoundException("file not found");
        }
        catch (error) {
            throw new Error("Error appended");
        }
    }
    static toFile(data, type, origine = "jpg") {
        return new Promise((r, die) => {
            try {
                let filename = (0, crypto_1.randomUUID)() + new Date().getTime() + "." + type;
                fs.writeFileSync(FileUtil.baseFolder + "/" + filename, data);
                let stat = fs.statSync(FileUtil.baseFolder + "/" + filename);
                let f = new file_1.File();
                f.size = stat.size;
                f.fileType = type;
                f.createdAt = stat.ctime;
                f.emp = FileUtil.baseFolder;
                f.url = FileUtil.baseFolder + "/" + filename;
                f.fileType = origine;
                return r(f);
            }
            catch (error) {
                die(error);
            }
        });
    }
    static delFile(filename) {
        return new Promise((r, die) => {
            try {
                if (fs.existsSync(filename)) {
                    fs.unlinkSync(filename);
                    return r(true);
                }
                else {
                    return r(false);
                }
            }
            catch (error) {
                die(error);
            }
        });
    }
    static base64toFile(raw64, type) {
        return new Promise((r, die) => {
            try {
                let b = FileUtil.fromBase64(raw64);
                let filename = FileUtil.baseFolder + (0, crypto_1.randomUUID)() + new Date().getTime() + type;
                fs.writeFileSync(filename, b);
                return r(filename);
            }
            catch (error) {
                die(error);
            }
        });
    }
    static removeNullFromArray(arr) {
        let narw = [];
        return narw;
    }
    static Bas64ExtensionImageFile(data) {
        var r = /image\/(png|jpg|jpeg)/;
        let d = data.match(r);
        if (d.length > 0) {
            return d[1];
        }
        return "";
    }
    static Bas64Url(data) {
        var r = /^data:image\/(png|jpg|jpeg);base64,/;
        let d = data.match(r) || "";
        if (d.length > 0) {
            return data.replace(r, "");
        }
        return "";
    }
    static Base64Compile(data) {
        let r = /^data:image\/(png|jpg|jpeg);base64,/;
        let ext = "";
        let url = "";
        let match = data.match(r);
        if (match && match.length > 0) {
            ext = FileUtil.Bas64ExtensionImageFile(data);
            url = FileUtil.Bas64Url(data);
            return [ext, url];
        }
        throw Error("Bad file");
    }
}
exports.FileUtil = FileUtil;
FileUtil.baseFolder = (0, path_1.resolve)("./files/");
//# sourceMappingURL=file_util.js.map