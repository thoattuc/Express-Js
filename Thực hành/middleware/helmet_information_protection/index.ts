import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(helmet());

//...

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello Namdv! How are you?',
    });
});

app.use(
    helmet({
        referrerPolicy: { policy: "no-referrer" },
    })
);

app.use(
    helmet({
        contentSecurityPolicy : false,
    })
);

app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});