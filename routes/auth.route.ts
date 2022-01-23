import { Router, Request, Response } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { checkAuthenticated, checkNotAuthenticated } from "../middleware/auth.middleware";
import { users } from "../utils/mockDB.util";

const router = Router();

router.get("/", checkAuthenticated, (req: Request, res: Response) => {
    res.render("index.ejs", { name: req.user?.name });
});

router.get("/login", checkNotAuthenticated, (req: Request, res: Response) => {
    res.render("login.ejs");
});

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/register", checkNotAuthenticated, (req: Request, res: Response) => {
    res.render("register.ejs");
});

router.post("/register", checkNotAuthenticated, async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect("/login");
    } catch (err) {
        console.log(err);
        res.redirect("/register");
    }
    console.log(users);
});

router.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

export default router;