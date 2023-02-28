import {Router} from 'express';
import {ProductModel} from "../models/product.model";
import multer from 'multer';

const productRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

productRouter.get('/create', (req, res) => {
    res.render("createProduct", {title: "Create Product"});
});

productRouter.post('/create', upload.single("image"), async (req, res) => {
    try {
        console.log(">>>req.body", req.body, req.file);
        const checkProduct = await ProductModel.findOne({name: req.body.name});
        if(!checkProduct){
            const {name, price, producer} = req.body
            const image = req.file.originalname;
            console.log(image);
            const productNew = new ProductModel({name, price, producer, image});
            const product = await productNew.save();
            if(product) {
                res.render("success");
            } else {
                res.render("error");
            }
        } else {
            res.render("error");
            console.log("Product already exists");
        }

    } catch (err) {
        res.render("error");
    }
});

productRouter.get('/list', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.render("listProduct", {products: products, title: "List Products"});
    } catch (error) {
        res.render("error");
    }
});

export default productRouter;