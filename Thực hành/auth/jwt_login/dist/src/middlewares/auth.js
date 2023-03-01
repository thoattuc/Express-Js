"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        let access_token = req.body['access_token'];
        if (access_token) {
            jsonwebtoken_1.default.verify(access_token, 'SECRET', (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        message: err.message,
                        status: 401,
                    });
                }
                else {
                    req.decode = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(400).json({
                message: 'No access token provided',
                status: 401,
            });
        }
    }
    catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401
        });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map