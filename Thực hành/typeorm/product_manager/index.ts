import multer from 'multer'
import express from 'express'
import bodyParser from 'body-parser'
import {Product} from "./src/entity/Product";
import {AppDataSource} from "./src/data-source";
import {Request, Response} from "express";
const PORT = 3000;

//---connect db---//
AppDataSource
.initialize()
.then(() => {
    console.log('DB initialized');
})
.catch((err) => {
    console.error("Error initializing DB: " + err);
});

const app = express();

//---config---//
app.set("views", "views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

//---multer--//
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

app.get('/products', async (req: Request, res: Response) => {
    let products = await AppDataSource.getRepository(Product) .find();
    console.log(products);
    res.render('products', {products: products});
});

app.get('/products/create', (req: Request, res: Response) => {
    res.render('create');
});
app.post("/products/create", upload.single('image'), async (req: any, res: any) => {
    try {

        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;

        const productRepository = AppDataSource.getRepository(Product)
        await productRepository.save(product);
        res.redirect("/products")
    }catch (e) {
        console.log(e.message);
    }
});

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});