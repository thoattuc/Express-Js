const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//---config ejs & static files---//
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//---config file-upload---//
app.use(fileUpload({}));

app.get('/staffs/create', (req, res) => {
    res.render('create');
});
app.post('/staffs/create', (req, res) => {
    if (!req.body || !req.files) {
        return res.status(400).send('Invalid input.');
    }

    let staff = {
        name: req.body.name,
        salary: req.body.salary,
        position: req.body.position,
    };

    let avatar = req.files.avatar;
    let avatarName = avatar.name;

    //---config save files---//
    avatar.mv(path.join(__dirname, 'public', 'images', avatarName), (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(">>> staff:", staff);
        let insertSQL = `INSERT INTO staffs(name, salary, position, path)
                         VALUES (?, ?, ?, ?)`;
        connection.query(insertSQL, [staff.name, staff.salary, staff.position, avatarName], (err, result) => {
            if (err) {
                throw err.stack;
            } else {
                res.redirect('/staffs');
            }
        })
    });
});

app.get('/staffs', (req, res) => {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 3;
    let offset = (page - 1) * limit;
    let totalItems;

    let selectCountSQL = `SELECT COUNT(*) AS total
                          FROM staffs`;

    let selectDataSQL = `SELECT id, name, salary, position
                         FROM staffs limit ${limit}
                         offset ${offset}`;

    connection.query(selectCountSQL, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            totalItems = result[0].total;
        }
    });
    connection.query(selectDataSQL, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            let totalPages = Math.ceil(totalItems / limit);
            res.render('staffs', {
                staffs: result,
                totalPages,
                currentPage: page,
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}/staffs/create`);
})

