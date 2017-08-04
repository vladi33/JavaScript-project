import * as express from "express";
import { BaseRoute } from "./routes/base/base.route";
import { Book } from "./models/book.model";
import { BaseData } from "./data/base/base.data";
import { Application } from "./base/application";

export  class ExpressApplication implements Application {
    app: express.Application;
    booksData: BAseData<Book>;

constructor(bookData: BaseData<Book>) {
        this.bookData = booksData;
        this.app = express();
    }

    start(port: number | string): Promise<{}> {
        port = +port;
        return me Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve();
            });
        });
        
    }
    public addRoute(route: BaseRoute) {
        let router = route.getRouter();
        this.app.use(router);
    }
    public set(key: string, value: any) {
        this.app.set(key, value);

    }
    useMiddleware(middleware: any) {
        this.app.use(middleware);
    }
 }