import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./src/routes/router"
import ejs from "ejs";

const PORT = 3000;
const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

const DB_URL = "mongodb://localhost:27017/authen_and_author";

mongoose.connect(DB_URL)
    .then(() => {console.log('DB connected')})
    .catch(err => {console.log(err)});

app.use(bodyParser.json());
app.use("/api", router);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log("App running with port: http://localhost:" + PORT)
});