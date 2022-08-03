"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDto = void 0;
const file_1 = require("../entity/file");
const entity_transformer_1 = require("../util/entity_transformer");
class FileDto extends entity_transformer_1.EntityTransformer {
    toEntity() {
        let f = new file_1.File();
        return f;
    }
}
exports.FileDto = FileDto;
//# sourceMappingURL=file_dto.js.map