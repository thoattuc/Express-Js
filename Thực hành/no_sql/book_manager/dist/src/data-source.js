"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URL_DB = 'mongodb://localhost:27017';
mongoose_1.default.connect(URL_DB)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
exports.db = mongoose_1.default.connection;
//# sourceMappingURL=data-source.js.map