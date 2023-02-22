import {Router} from 'express';
const bookRouter = Router();
import {Book} from '../shemas/Book';
import multer from 'multer';
const upload = multer();

bookRouter.get('/create', (req, res) => {
    res.render('createBook', {title: 'Create Book'});
});

bookRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const bookNew = new Book(req.body);
        const book = await bookNew.save();
        if (book) {
            res.render('success', {title: 'Book Created', book: book});
        } else {
            res.render('error', {title: 'Book Creation Error'});
        }
    } catch (err) {
        res.render('error', {title: 'Book Creation Error'});
    }
});

bookRouter.get('/list', async (req, res) => {
    try {
        const books = await Book.find();
        if(!books) {
            res.send('No books found');
        } else {
            res.render('listBook', {books: books});
        }
    } catch (err) {
        res.render('error', {title: 'Book Listing Error'});
    }
});

bookRouter.get('/update/:id', async (req, res) => {
    try {
        const book = await Book.findById({ _id: req.params.id });
        console.log(book, 'book');
        if (book) {
            res.render('updateBook', {title: 'Book Update', book: book});
        } else {
            res.render('error', {title: 'Book Update Error'});
        }

    } catch (err) {
        res.render('error', {title: 'Book Update Error'});
    }
});

bookRouter.post('/update', upload.none('file'), async (req, res) => {
    try {
        const book = await Book.findById({ _id: req.body.id });
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        await book.save();
        if (book) {
            res.render("success", {title: 'Book Updated'});
        } else {
            res.render('error', {title: 'Book Update Error'});
        }
    } catch (err) {
        res.render('error', {title: 'Book Update Error'});
    }
});

bookRouter.delete('/delete/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (book) {
            await book.remove();
            res.status(200).json({message: 'Book Deleted'});
        } else {
            res.render('error', {title: 'Book Delete Error'});
        }
    } catch (err) {
        res.render('error', {title: 'Book Delete Error'});
    }
});

export default bookRouter;
