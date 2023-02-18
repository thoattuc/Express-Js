import "reflect-metadata"

import {DataSource} from "typeorm"

import {Contact} from "./entity/Contact"


export const AppDataSource = new DataSource({

    type: "mysql",

    host: "localhost",

    port: 3306,

    username: "root",

    password: "admin95",

    database: "contact_manager",

    synchronize: true,

    logging: false,

    entities: [Contact],

    migrations: [Contact],

});