import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import bcrypt from "bcrypt";
import { User } from "./mockDB.util";

type GetUserByEmail = (email: string) => User | undefined;
type GetUserById = (id: string) => User | undefined;

const initialize = (passport: PassportStatic, getUserByEmail: GetUserByEmail, getUserById: GetUserById) => {
    const authenticateUser: VerifyFunction = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (!user) return done(null, false, { message: "No user with that email"});
        
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password is incorrect" });
            }
        } catch (err) {
            done(err);
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, authenticateUser));

    passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
        done(null, (<User>user).id);
    });

    passport.deserializeUser((id, done) => {
        done(null, getUserById(<string>id));
    });
}

export default initialize;