const passport = require('passport');
// the GoogleStrategy actually exports multiple modules but we'll only need the strategy module
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// Creates new instance of the GoogleStrategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // this route will be added later
        callbackURL: '/auth/google/callback'
    },
    // once google approves of google and hits the callback route it goes here
    (accessToken, refreshToken, profile, done) => {
        console.log('access token: ', accessToken);
        console.log('refresh token: ', refreshToken);
        console.log('profile: ', profile);
    })
);
