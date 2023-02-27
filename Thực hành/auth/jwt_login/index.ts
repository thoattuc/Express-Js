import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const PORT = 3000;
const URL_DB = "mongodb://localhost:27017/jwt_login"
import router from "./src/routes/router";



const app = express();
mongoose.connect(URL_DB)
    .then(() => {console.log("Database Connected")})
    .catch((err) => {console.log("Database connection error",err.message)});

app.use(bodyParser.json());
app.use('/api',router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log("App running with port: http://localhost:" + PORT)
});