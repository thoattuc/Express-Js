"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRouter = (0, express_1.Router)();
const Book_1 = require("../shemas/Book");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
bookRouter.get('/create', (req, res) => {
    res.render('createBook', { title: 'Create Book' });
});
bookRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const bookNew = new Book_1.Book(req.body);
        const book = await bookNew.save();
        if (book) {
            res.render('success', { title: 'Book Created', book: book });
        }
        else {
            res.render('error', { title: 'Book Creation Error' });
        }
    }
    catch (err) {
        res.render('error', { title: 'Book Creation Error' });
    }
});
bookRouter.get('/list', async (req, res) => {
    try {
        const books = await Book_1.Book.find();
        if (!books) {
            res.send('No books found');
        }
        else {
            res.render('listBook', { books: books });
        }
    }
    catch (err) {
        res.render('error', { title: 'Book Listing Error' });
    }
});
bookRouter.get('/update/:id', async (req, res) => {
    try {
        const book = await Book_1.Book.findById({ _id: req.params.id });
        console.log(book, 'book');
        if (book) {
            res.render('updateBook', { title: 'Book Update', book: book });
        }
        else {
            res.render('error', { title: 'Book Update Error' });
        }
    }
    catch (err) {
        res.render('error', { title: 'Book Update Error' });
    }
});
bookRouter.post('/update', upload.none('file'), async (req, res) => {
    try {
        const book = await Book_1.Book.findById({ _id: req.body.id });
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        await book.save();
        if (book) {
            res.render("success", { title: 'Book Updated' });
        }
        else {
            res.render('error', { title: 'Book Update Error' });
        }
    }
    catch (err) {
        res.render('error', { title: 'Book Update Error' });
    }
});
bookRouter.delete('/delete/:id', async (req, res) => {
    try {
        const book = await Book_1.Book.findOne({ _id: req.params.id });
        if (book) {
            await book.remove();
            res.status(200).json({ message: 'Book Deleted' });
        }
        else {
            res.render('error', { title: 'Book Delete Error' });
        }
    }
    catch (err) {
        res.render('error', { title: 'Book Delete Error' });
    }
});
exports.default = bookRouter;
//# sourceMappingURL=book.router.js.map