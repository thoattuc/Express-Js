"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("multer"));
const validator_1 = __importDefault(require("validator"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login');
});
const upload = (0, multer_1.default)();
router.post('/login', upload.none(), (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    if (validator_1.default.isEmail(username)) {
        console.log('username is valid');
        passport_1.default.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send('Wrong email or password');
            }
            req.login(user, () => {
                res.send('You are authenticated!');
            });
        })(req, res, next);
    }
    else {
        console.log('Wrong username');
        res.send('Wrong username');
    }
});
router.get('/login/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google'), (req, res) => {
    res.send("You are authenticated!");
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map