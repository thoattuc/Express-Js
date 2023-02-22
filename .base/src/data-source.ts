import "reflect-metadata"
import {DataSource} from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin95",
    database: "",
    synchronize: false,
    logging: false,
    entities: ["dist/src/entity/*.ts"],
    migrations: ["dist/src/migrations/*.ts"],
});