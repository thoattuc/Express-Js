"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("./entity/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin95",
    database: "product_management",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product],
    migrations: [Product_1.Product],
});
//# sourceMappingURL=data-source.js.map