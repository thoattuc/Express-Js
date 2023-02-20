"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.contentSecurityPolicy());
app.use(helmet_1.default.crossOriginEmbedderPolicy());
app.use(helmet_1.default.crossOriginOpenerPolicy());
app.use(helmet_1.default.crossOriginResourcePolicy());
app.use(helmet_1.default.dnsPrefetchControl());
app.use(helmet_1.default.expectCt());
app.use(helmet_1.default.frameguard());
app.use(helmet_1.default.hidePoweredBy());
app.use(helmet_1.default.hsts());
app.use(helmet_1.default.ieNoOpen());
app.use(helmet_1.default.noSniff());
app.use(helmet_1.default.originAgentCluster());
app.use(helmet_1.default.permittedCrossDomainPolicies());
app.use(helmet_1.default.referrerPolicy());
app.use(helmet_1.default.xssFilter());
app.get('/', (req, res) => {
    res.json({
        message: 'Hello Namdv! How are you?',
    });
});
app.use((0, helmet_1.default)({
    referrerPolicy: { policy: "no-referrer" },
}));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});
//# sourceMappingURL=index.js.map