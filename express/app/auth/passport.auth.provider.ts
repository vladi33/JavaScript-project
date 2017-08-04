import * as passport from "passport";
import { Strategy } from "passport-local";
import { BaseAuthProvider } from "./base/base.auth.provider";
import { Application } from "../base/application";
import { User } from "../models/user.model";

import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";

data: BaseData<User>;

export class PassportAuthProvider implements BaseAuthProvider {
    secret: string;
    constructor(data: BaseData<User>, secret: string) {
    this.init();
    this.secret = secret
}

 public addToApp(app: Application) {
        app.useMiddleware(cookieParser());
        app.useMiddleware(bodyParser.json());
        app.useMiddleware(bodyParser.urlencoded({ extended: true}));
        app.useMiddleware(session(session({
            secret: this.secret,
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 1000 * 60 }
        }));

        app.useMiddleware(passport.initialize());
        app.useMiddleware(passport.session());  
    }

        passport.use(new Strategy((username: string, password: string, done: Function) => {
            this.data.findOne({username, password})
                .then(user => {
                    if(!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
                .catch(err => done(err));

        }));


        passport.serializeUser(function(user: User, done) {
           done(null, user.id);
        });

        passport.deserializeUser(function(id: string, done) {
            this.data.getById(id);
            .then(user => {
                console.log(user);
                done(null, user);
            });
            .catch(err => done(err));
        });
    } 
}    