import express from "express";
import bodyParser from 'body-parser';
import * as mongoose from "mongoose";
const URL_DB = "mongodb://localhost:27017/";
import productRouter from "./src/routes/product.router";

const PORT = 3000;
const app = express();
app.use("/product", productRouter);

mongoose.connect(URL_DB)
    .then(() => {console.log("Connected to MongoDB");})
    .catch((error) => {console.log("Error connecting to MongoDB", error.message);});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log("App running with port: http://localhost:" + PORT)
});