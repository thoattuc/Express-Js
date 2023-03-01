"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    role: String
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map