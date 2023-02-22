import { AppDataSource } from "./src/data-source";
import express from "express";
import bodyParser from 'body-parser';
const PORT = 3000;

AppDataSource.initialize().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    //---create EntityRepo by connection.getRepository(Entity)---//


    app.listen(PORT, () => {
        console.log("App running with port: " + PORT)
    });
});