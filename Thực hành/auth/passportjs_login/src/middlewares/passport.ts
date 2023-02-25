import passport from "passport";
import {UserModel} from "../models/user.model";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

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

//google - cho phep xac thuc bang id + email
passport.use('google', new GoogleStrategy({
    clientID: "1029978913242-odrh8du56gdcpfv140a1ttunoslq5918.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile, 'profile');
        let existingUser = await UserModel.findOne({ 'google.id': profile.id });
        // neu nguoi dung ton tai tra ve nguoi dung
        if (existingUser) {
            return done(null, existingUser);
        }
        // neu khong tao moi nguoi dung
        console.log('Creating new user ...');
        const newUser = new UserModel({
            google: {
                id: profile.id,
            },
            username: profile.emails[0].value,
            password: null
        });
        await newUser.save();
        console.log(newUser, 'newUser');
        return done(null, newUser);
    }catch (error) {
        return done(null, false);
    }
    }
    ));

export default passport;