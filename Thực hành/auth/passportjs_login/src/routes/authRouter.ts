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

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// truy suat du lieu nguoi dung bang ma thong bao try cap nhan duoc
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send("You are authenticated!");
})

export default router;