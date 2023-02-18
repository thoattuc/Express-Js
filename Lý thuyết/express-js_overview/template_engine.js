const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
// ---config Ejs---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    let name = 'Nam dv'
    res.render('index', {data: name});
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});