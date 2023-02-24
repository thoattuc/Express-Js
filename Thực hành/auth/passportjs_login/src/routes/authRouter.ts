import express from 'express'
import passport from "passport";
import multer from "multer";
import validator from "validator";

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

const upload = multer();

router.post('/login', upload.none(), (req, res, next) => {
    console.log(req.body);
    const username: String = req.body.username
    //---Them vao tinh nang validate du lieu---//
    if (validator.isEmail(username)) {
        console.log('username is valid');
        passport.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send('Wrong email or password');
            }
            req.login(user, () => {
                res.send('You are authenticated!');
            })
        })(req, res, next);
    } else {
        console.log('Wrong username');
        res.send('Wrong username');
    }

})

export default router;