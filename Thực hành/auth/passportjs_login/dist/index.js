"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./src/middlewares/passport"));
const authRouter_1 = __importDefault(require("./src/routes/authRouter"));
const PORT = 3000;
const app = (0, express_1.default)();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/passportjs_login";
mongoose_1.default.connect(DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Database connection error", err));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'Namdv',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/auth', authRouter_1.default);
app.listen(PORT, () => {
    console.log("App running with port: http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map