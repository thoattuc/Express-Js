"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Blog_1 = require("./entity/Blog");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin95",
    database: "blogging_app",
    synchronize: false,
    logging: false,
    entities: [Blog_1.Blog],
    migrations: [Blog_1.Blog],
});
//# sourceMappingURL=data-source.js.map