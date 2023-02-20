import "reflect-metadata"
import {DataSource} from "typeorm"
import {Blog} from "./entity/Blog";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin95",
    database: "blogging_app",
    synchronize: false,
    logging: false,
    entities: [Blog],
    migrations: [Blog],
});