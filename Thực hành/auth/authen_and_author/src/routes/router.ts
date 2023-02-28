import express from "express";

export const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/user.model";
import {ProductModel} from "../models/product.model";
import {auth} from "../middlewares/auth";
import multer from "multer";

const upload = multer();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

router.use(cookieParser());
router.use(bodyParser.urlencoded({extended: false}));

//---su dung middleware auth khi vao product---//
router.use('/product', upload.none(), auth);

router.get("/user/login", async (req, res) => {
    res.render("login");
});

router.get("/home", async (req, res) => {
    res.render("home");
});

router.get('/list', async (req, res) => {
    const products = await ProductModel.find();
    res.render("list", {products: products});
});

router.get('/create', async (req, res) => {
    const token = await req.cookies.token;
    res.render("create", {token: token});
});


router.post('/user/register', async (req, res) => {
    try {
        const user = await UserModel.findOne({
            username: req.body.username
        });
        if (!user) {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            let userData = {
                username: req.body.username,
                role: req.body.role,
                password: passwordHash
            }
            const newUser = await UserModel.create(userData);
            res.json({user: newUser, code: 200});
        } else {
            res.json({error: "Username already exists"});
        }
    } catch (error) {
        res.json({error: error.message});
    }
});

router.post('/user/login', upload.none(), async (req, res) => {
    try {

        const user = await UserModel.findOne({username: req.body.username});
        console.log(user);
        if (user) {
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if (!comparePassword) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID"
                });
            } else {
                let payload = {
                    user_id: user["_id"],
                    username: user["username"],
                    role: user["role"]
                }
                const token = jwt.sign(payload, "SECRET", {expiresIn: 3600});
                res.cookie('token', token);
                res.render("home", {token: token});
            }
        } else {
            return res.json({error: "Wrong username or password"});
        }
    } catch (error) {
        res.json({error: error.message});
    }
});

router.post("/product/create", async (req: any, res) => {

    try {

        const user = req.decoded;

        if (user.role !== "admin") {

            res.render("error");

            return;

        }
        {

            const product = await ProductModel.findOne({name: req.body.name});

            if (!product) {

                let productData = {

                    name: req.body.name,

                    price: req.body.price,

                    category: req.body.category,

                }

                const productNew = await ProductModel.create(productData);

                res.render("success")

            } else {

                res.json({err: "Product exited"})

            }

        }

    } catch (err) {

        res.json({err: err})

    }

});

export default router;


