"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(bodyParser.json());
    const ProductRepo = connection.getRepository(Product_1.Product);
    app.get("/products", async (req, res) => {
        try {
            const products = await ProductRepo.find();
            if (!products) {
                res.status(200).json({
                    message: "No products found"
                });
            }
            else {
                res.status(200).json({
                    message: "Success",
                    products: products
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
    app.post("/product/create", async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                res.status(500).json({
                    message: "Product is already exist",
                });
            }
            const productData = {
                price: req.body.price,
                name: req.body.name,
                author: req.body.author,
                avatar: req.body.avatar,
            };
            const product = await ProductRepo.save(productData);
            if (product) {
                res.status(200).json({
                    message: "Product created successfully",
                    product: product,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
    app.get("/product/detail", async (req, res) => {
        try {
            let productId = parseInt(req.query.productId);
            const product = await ProductRepo.findOneBy({ id: productId });
            if (product) {
                res.status(200).json({
                    message: "Success",
                    product
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
    app.put("/product/update", async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({ name: req.body.name });
            if (!productSearch) {
                res.status(500).json({
                    message: "Product is not exist"
                });
            }
            const product = await ProductRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "Product updated successfully",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
    app.delete("/product/delete", async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    message: "Product is not exist"
                });
            }
            const product = await ProductRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Product deleted successfully",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map