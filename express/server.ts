import * as path from "path";
import * as bodyParser from "body-parser";
import { BooksController } from "./app/controllers/books.controller";
import { BaseController } from "./app/controllers/base/base.controller";
import { BooksRoute } from "./app/routes/books.route";
import { ExpressApplication } from "./app/ExpressApplication";
import { Book } from "./app/models/book.model";

import { connectionString, port, secret } from "./app/config";

import { DbConfig } from "./app/db";

import { BaseData } from "./app/data/base/base.data";
import { MongoDbData } from "./app/data/mongodb.data";
import { Application } from "./app/base/application";
import { AuthorsRoute } from "./app/routes/authors.route";
import { AuthorsController } from "./app/controllers/base/authors.controller";
import { Author } from "./app/models/author.model";
import { PassportAuthProvider } from "./app/auth/passport.auth.provider";
import { BaseAuthProvider } from "./app/auth/base/base.auth.provider";
import { User } from "./app/models/user.model";

let db;
let data: BaseData<T>;
let authorsData: BaseData<Author>;
let usersData: BaseData<User>;
let app: Application;
let authProvider: BaseAuthProvider;

let booksController: BaseController<Book>;
let authorsController: BaseController<Author>;
Promise.resolve()
    .then(() => {
        return DbConfig.initMongoDb(connectionString);
    })
    // init
    .then(dbInstance => {
        db = dbInstance
        data = new MongoDbData<Book>(db, Book, Book);
        return data.add(new Book("0", "vladi", "Book", "...."));
        app = new ExpressApplication(data);
        authorsData = new MongoDbData<Author>(db, Author, Author);
        usersData = new MongoDbData<User>(db, User, User);
    });

    // add view engine
    then(() => {
        app.set("view engine", "pug");
        app.set("view", path.join(__dirname, "app", "views"))
    })
    // auth
    then(() => {
        authProvider = new PassportAuthProvider(usersData, secret);
        authProvider.addToApp(app);

    })

    // add middlewares
    then(() => {
        app.useMiddleware(bodyParser.json());
        app.useMiddleware(bodyParser.urlencoded({ extended: true}));
    })

    // init controller
    .then(() => {
        booksController = new BooksController(booksData);
        authorsController = new AuthorsController(authorsData);
    })

    // add routes
    .then(() => {
        let booksRoute = new BooksRoute(booksController);
        app.addRoute(booksRoute);

         let authorsRoute = new AuthorsRoute(authorsController);
        app.addRoute(authorsRoute);
    })

    // start application

    then(() => {
        app.start(port);
    });
    .then(() => {
        console.log(`Server is started :${port}`);
    })
    