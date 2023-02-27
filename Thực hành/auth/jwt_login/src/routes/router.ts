import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();
import {auth} from "../middlewares/auth";
import {UserModel} from "../models/user.model";
import {ProductModel} from "../models/product.model";

//router middleware kiem tra tat ca cac URL product
router.use('/product', auth)
router.post('/user/register', async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (!user) {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            let userData = {
                username: req.body.username,
                password: passwordHash,
            }
            const newUser = await UserModel.create(userData);
            res.json({user: newUser, code: 200});
        } else {
            res.json({
                error: "User has been already registered",
            })
        }
    } catch (err) {
        res.json({err: err})
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (user) {
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if (!comparePassword) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID",
                });
            }
            let payload = {
                user_id: user["_id"],
                username: user["username"],
            }
            const token = jwt.sign(payload, "SECRET", {expiresIn: "36000"});
            return res.json({token: token, code: 200});
        } else {
            return res.json({error: "User not found"});
        }
    } catch (err) {
        return res.json({err: err})
    }
});

router.post('/product/create', async (req, res) => {
    try {
        const product = await ProductModel.findOne({name: req.body.name});
        if (!product) {
            let productData = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
            }
            const productNew = await ProductModel.create(productData);
            res.json({product: productNew, code: 200});
        } else {
            res.json({
                error: "Product already exists",
            })
        }
    } catch (err) {
        return res.json({err: err})
    }
})

export default router