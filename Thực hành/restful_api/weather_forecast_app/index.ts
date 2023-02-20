import express from "express";
import bodyParser from 'body-parser';
import axios from 'axios';

const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());

app.get('/', async (req, res) => {

    try {
        const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?id=1581130&appid=f85ab99b5bc59e66e6412b4153a0772b';
        const response = await axios.get(apiUrl);
        const data = response.data;
        console.log(data);
        if (data) {
            res.render("weather", {data: data})
        } else {
            res.end('<h1>Error<h1>')
        }
    } catch (err) {
        res.end('<h1>Error<h1>')
    }

})

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})