import "reflect-metadata";
import { DataSource } from "typeorm";
import {Product} from "./entity/Product";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin95",
    database: "product_manager",
    synchronize: false,
    logging: false,
    entities: [Product],
    migrations: [Product],
    // extra: {
    //     authPlugin: {
    //         mysql_native_password: {
    //             password: "admin95",
    //         }
    //     }
    // }
});