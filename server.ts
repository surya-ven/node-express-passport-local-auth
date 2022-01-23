if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv");
    dotenv.config();
}

import express from "express";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import initializePassport from "./utils/passportConfig.util";
import authRoutes from "./routes/auth.route";
import { users } from "./utils/mockDB.util";

const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.use("/", authRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));