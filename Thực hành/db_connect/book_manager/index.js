const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin95',
    database: 'book_manager',
});

connection.connect((err) => {
    if (err) {
        throw err.stack;
    } else {
        console.log('Connect database successfully !');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/books', (req, res) => {
    const selectSQL = 'SELECT id, name, price, author, status FROM books';
    connection.query(selectSQL, (err, result) => {
        if (err) {
            throw err.stack;
        }
        console.log(result);
        res.render("books", {books: result});
    })
});

app.get('/books/create', (req, res) => {
    res.render('create');
});
app.post('/books/create', (req, res) => {
    const {name, price,status, author} = req.body;
    console.log(req.body);
    const insertSQL = `INSERT INTO books (name, price,status, author) VALUES ?`;
    const value = [
        [name, price, status, author]
    ];
    connection.query(insertSQL, [value], (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            res.redirect('/books');
        }
    });
});

app.get('/books/:id/delete', (req, res) => {
    const idBook = req.params.id;
    const deleteByIdSQL = 'DELETE FROM books WHERE id = '+ idBook;
    connection.query(deleteByIdSQL, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            res.redirect('/books');
        }
    })
})

app.get('/books/:id/update', (req, res) => {
    const idBook = req.params.id;
    const selectByIdSQL = 'SELECT * FROM books WHERE id = '+ idBook;
    connection.query(selectByIdSQL, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            res.render('update', {book: result[0]});
        }
    })
});

app.post('/books/:id/update', (req, res) => {
    const idBook = req.params.id;
    const updateByIdSQL = 'UPDATE books SET name =?, price =?, status =?, author =? WHERE id =?';
    const {name, price, status, author} = req.body;
    const value = [name, price, status, author, idBook];
    console.log(value);
    connection.query(updateByIdSQL, value, (err, result) => {
        if (err) {
            throw err.stack;
        } else {
            console.log(result);
            res.redirect('/books');
        }
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});