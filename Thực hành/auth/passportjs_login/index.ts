import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import session from "express-session";
import passport from  "./src/middlewares/passport"
import authRouter from "./src/routes/authRouter";

const PORT = 3000;
const app = express();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/passportjs_login";
mongoose.connect(DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Database connection error", err));

app.set('view engine','ejs');
app.set('views','./src/views');
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(session({
    secret : 'Namdv',
    resave : false,
    saveUninitialized : true,
    cookie: {maxAge: 1000*60*60}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log("App running with port: http://localhost:" + PORT)
});