"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 3000;
const URL_DB = "mongodb://localhost:27017/jwt_login";
const router_1 = __importDefault(require("./src/routes/router"));
const app = (0, express_1.default)();
mongoose_1.default.connect(URL_DB)
    .then(() => { console.log("Database Connected"); })
    .catch((err) => { console.log("Database connection error", err.message); });
app.use(body_parser_1.default.json());
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(PORT, () => {
    console.log("App running with port: http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map