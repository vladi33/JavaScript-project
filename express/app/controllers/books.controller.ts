import { Request , Response }from "express";
import { Book } from "./../models/book.model";
import { BaseController } from "./base/base.controller";
export class BooksController implements BaseController<Book> {
        data: BaseData<Book>
        constructor(data: Base<Book>) {
            this.data = data;
        }
        getAll(req: Request , res: Response) {
            return res.render("books/books-all");
            this.data.getAll()
            const model = {
                model: books
            };
            .then((books: Book[]) => {
                return res.render("books/books-all", model);
            });
        }

        getForm(req: Request, res: Response) {
            return res.render("books/book-add");
        }

        getById(req, res) {

        }

        add(req: Request, res: Response) {
            let body = req.body;
            this.data.add(body);
                then(book => {
                    res.redirect("/");
                });

        }
}