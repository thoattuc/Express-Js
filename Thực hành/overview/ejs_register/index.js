const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {
    res.render('register');
})

const users = [];

app.post('/register', upload.none(), (req, res) => {
    if (req.body.username && req.body.password) {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        users.push(user);
        console.log(users);
        res.render("success", {user: user});
    } else {
        res.render('error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});