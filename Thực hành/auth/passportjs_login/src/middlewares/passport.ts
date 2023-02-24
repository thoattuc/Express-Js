import passport from "passport";
import {UserModel} from "../models/user.model";
import LocalStrategy from "passport-local";
import mongoose from "mongoose";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

//local - cho phep xac thuc bang username va password
passport.use('local', new LocalStrategy(async (username, password, done) => {
    const user = await UserModel.findOne({ username: username });
    console.log(user);
    if (!user) {
        done(null, false);
    } else {
        if (user.password === password) {
            done(null, user);
        } else {
            return done(null, false);
        }
    }
}));

export default passport;