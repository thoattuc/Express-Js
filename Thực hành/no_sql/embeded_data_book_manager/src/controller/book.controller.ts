import {Request, Response} from 'express';
import {Book} from "../shema/Book";

class BookController {
    constructor() {
    }

    async showCreate(req: Request, res: Response) {
        await res.render('createBook', {title: 'Create Book'});
    }

    async createBook(req: Request, res: Response) {
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
    }
}

export default new BookController();