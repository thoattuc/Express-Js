import {AppDataSource} from "./src/data-source";
import {Product} from "./src/entity/Product";
import express from "express";
import * as bodyParser from "body-parser";

const PORT = 3000;

AppDataSource.initialize().then(async connection => {
    //---config---//
    const app = express();
    app.use(bodyParser.json());
    const ProductRepo = connection.getRepository(Product);

    //---routes---//
    app.get("/products", async (req, res) => {
        try {
            const products = await ProductRepo.find();
            if (!products) {
                res.status(200).json({
                    message: "No products found"
                })
            } else {
                res.status(200).json({
                    message: "Success",
                    products: products
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });

    app.post("/product/create", async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({name: req.body.name});
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
                    product : product,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }

    });

    app.get("/product/detail", async (req, res) => {
        // 127.0.0.1:3000/product/detail?productId=1
        try {
            let productId = parseInt(req.query.productId as string);
            const product = await ProductRepo.findOneBy({ id : productId});
            if (product) {
                res.status(200).json({
                    message: "Success",
                    product
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    })

    app.put("/product/update", async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({name: req.body.name});
            if (!productSearch) {
                res.status(500).json({
                    message: "Product is not exist"
                })
            }
            const product = await ProductRepo.update({id: req.body.id}, req.body);
            res.status(200).json({
                message: "Product updated successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });

    app.delete("/product/delete", async (req, res) => {
        try {
            let productSearch = await ProductRepo.findOneBy({id: req.body.id});
            if (!productSearch) {
                res.status(500).json({
                    message: "Product is not exist"
                });
            }
            const product = await ProductRepo.delete({id: req.body.id});
            res.status(200).json({
                message: "Product deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                message : error.message,
            });
        }
    });



    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
