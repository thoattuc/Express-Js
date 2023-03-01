"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        let accessToken = await req.body["access_token"];
        console.log('>>>accessToken', accessToken);
        console.log('>>>req.body', req.body);
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, "SECRET", (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        message: err.message,
                        status: 401,
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(400).json({
                message: "No token provided.",
                status: 401,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 401,
        });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map