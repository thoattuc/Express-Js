const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin95',
    database: 'staff_management',
    charset: 'utf8mb4',
});

connection.connect((err) => {
    if (err) {
        throw err.stack;
    } else {
        console.log("Connect database success!");
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));

app.get('/staffs/create', (req, res) => {
        res.render('create');
    });
app.post('/staffs/create', (req, res) => {
        let {name, salary, position} = req.body;
        console.log(">>> req.body:",req.body);
        let insertSQL = `INSERT INTO staffs(name, salary, position) VALUES ?`;
        let value = [
            [name, salary, position]
        ];
        connection.query(insertSQL, [value], (err, result) => {
            if (err) {
                throw err.stack;
            } else {
                console.log(">>> result:",result)
                res.redirect('/staffs');
            }
        })
    });

app.get('/staffs', (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 3;
    let offset = (page - 1) * limit;
    let totalItems;

    let selectCountSQL = `SELECT COUNT(*) AS total FROM staffs`;
    let selectDataSQL = `SELECT id, name, salary, position FROM staffs limit ${limit} offset ${offset}`;

    connection.query(selectCountSQL, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            totalItems = result[0].total;
        }
    })
    connection.query(selectDataSQL, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            let totalPages = Math.ceil(totalItems / limit);
            res.render('staffs', {
                staffs: result,
                totalPages,
                currentPage: page,
            })
        }
    })
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}/staffs/create`);
})

