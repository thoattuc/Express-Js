import express from "express";
import bodyParser from 'body-parser';
import bookRouter from "./src/router/book.router";
const PORT = 3000;
const app = express();

//---config ejs, static file, body parser---//
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---connect database---//
import mongoose from 'mongoose';
const URL_DB = 'mongodb://localhost:27017';
mongoose.connect(URL_DB)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));

app.use('/book', bookRouter);

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
});