import express from 'express'
import {Request, Response} from "express";
import * as bodyParser from "body-parser";
import {AppDataSource} from "./src/data-source";
import {Contact} from "./src/entity/Contact";
import multer from "multer";

const PORT = 3000;
const upload = multer();

//---Xu ly bat dong bo ket noi database---//
AppDataSource.initialize().then(async connection => {
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", "views");

    app.use(express.static("public"));

    app.use(bodyParser.json());

    app.use(express.json());

    const ContactRepo = connection.getRepository(Contact);

    app.get("/contacts/create", (req: Request, res: Response) => {
        res.render("create");
    });

    app.post("/contacts/create", upload.none(), async (req: any, res: any) => {
        const contactData = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone
        };
        const contact = await ContactRepo.save(contactData);
        console.log(contact);
        res.redirect("/contacts");
    });

    app.get("/contacts", async (req:Request, res: Response) => {
        const contacts = await ContactRepo.find();
        res.render("contacts", { contacts: contacts });
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});

