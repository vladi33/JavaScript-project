import { Request , Response }from "express";
import { Book } from "./../models/book.model";
import { BaseController } from "./base/base.controller";
import { Author } from "../../models/author.model";
export class AuthorsController implements BaseController<Author> {
        data: BaseData<Author>
        constructor(data: BaseData<Author>) {
            this.data = data;
        }
        getAll(req: Request , res: Response) {
            return res.render("books/books-all");
            this.data.getAll()
            const model = {
                model: books
            };
            .then((books: Author[]) => {
                return res.render("authors/authors-all", model);
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