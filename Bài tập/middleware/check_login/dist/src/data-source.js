"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin95",
    database: "check_login",
    synchronize: false,
    logging: false,
    entities: [User_1.User],
    migrations: [User_1.User],
});
//# sourceMappingURL=data-source.js.map