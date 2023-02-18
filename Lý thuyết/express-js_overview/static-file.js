const express = require('express');
const app = express();

//---config static file---//
app.use(express.static('/public'));
    //  or
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('static-file');
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});