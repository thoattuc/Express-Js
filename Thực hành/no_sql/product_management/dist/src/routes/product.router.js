"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_model_1 = require("../models/product.model");
const multer_1 = __importDefault(require("multer"));
const productRouter = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
productRouter.get('/create', (req, res) => {
    res.render("createProduct", { title: "Create Product" });
});
productRouter.post('/create', upload.single("image"), async (req, res) => {
    try {
        console.log(">>>req.body", req.body, req.file);
        const checkProduct = await product_model_1.ProductModel.findOne({ name: req.body.name });
        if (!checkProduct) {
            const { name, price, producer } = req.body;
            const image = req.file.originalname;
            console.log(image);
            const productNew = new product_model_1.ProductModel({ name, price, producer, image });
            const product = await productNew.save();
            if (product) {
                res.render("success");
            }
            else {
                res.render("error");
            }
        }
        else {
            res.render("error");
            console.log("Product already exists");
        }
    }
    catch (err) {
        res.render("error");
    }
});
productRouter.get('/list', async (req, res) => {
    try {
        let limit;
        let offset;
        if (!req.query.limit || !req.query.limit) {
            limit = 3;
            offset = 0;
        }
        else {
            limit = parseInt(req.query.limit);
            offset = parseInt(req.query.offset);
        }
        const products = await product_model_1.ProductModel.find().limit(limit).skip(limit * offset);
        res.render("listProduct", { products: products, title: "List Products" });
    }
    catch (error) {
        res.render("error");
    }
});
exports.default = productRouter;
//# sourceMappingURL=product.router.js.map