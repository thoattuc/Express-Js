"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.router.use((0, cookie_parser_1.default)());
exports.router.use(body_parser_1.default.urlencoded({ extended: false }));
exports.router.use('/product', upload.none(), auth_1.auth);
exports.router.get("/user/login", async (req, res) => {
    res.render("login");
});
exports.router.get("/home", async (req, res) => {
    res.render("home");
});
exports.router.get('/list', async (req, res) => {
    const products = await product_model_1.ProductModel.find();
    res.render("list", { products: products });
});
exports.router.get('/create', async (req, res) => {
    const token = await req.cookies.token;
    res.render("create", { token: token });
});
exports.router.post('/user/register', async (req, res) => {
    try {
        const user = await user_model_1.UserModel.findOne({
            username: req.body.username
        });
        if (!user) {
            const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
            let userData = {
                username: req.body.username,
                role: req.body.role,
                password: passwordHash
            };
            const newUser = await user_model_1.UserModel.create(userData);
            res.json({ user: newUser, code: 200 });
        }
        else {
            res.json({ error: "Username already exists" });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.router.post('/user/login', upload.none(), async (req, res) => {
    try {
        const user = await user_model_1.UserModel.findOne({ username: req.body.username });
        console.log(user);
        if (user) {
            const comparePassword = await bcrypt_1.default.compare(req.body.password, user.password);
            if (!comparePassword) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID"
                });
            }
            else {
                let payload = {
                    user_id: user["_id"],
                    username: user["username"],
                    role: user["role"]
                };
                const token = jsonwebtoken_1.default.sign(payload, "SECRET", { expiresIn: 3600 });
                res.cookie('token', token);
                res.render("home", { token: token });
            }
        }
        else {
            return res.json({ error: "Wrong username or password" });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.router.post("/product/create", async (req, res) => {
    try {
        const user = req.decoded;
        if (user.role !== "admin") {
            res.render("error");
            return;
        }
        {
            const product = await product_model_1.ProductModel.findOne({ name: req.body.name });
            if (!product) {
                let productData = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,
                };
                const productNew = await product_model_1.ProductModel.create(productData);
                res.render("success");
            }
            else {
                res.json({ err: "Product exited" });
            }
        }
    }
    catch (err) {
        res.json({ err: err });
    }
});
exports.default = exports.router;
//# sourceMappingURL=router.js.map