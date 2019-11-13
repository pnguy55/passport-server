#Passport for this app
*** npm i env-cmd --save-dev
1) npm i --save passport passport-google-oauth20
2) import the following modules
    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20').Strategy;

3) Use the following method call
    passport.use(new GoogleStrategy());

4) Make a new project on google API website at
    console.developers.google.com
5) Select that project from a dropdown
6) Enable google oAuth API from that website
7) SEARCH GOOGLE+ API FROM THE LIST
8) Create credentials by not clicking the create button, but by clicking credentials on the left sidebar
9) Select OAuth Client id from this create credential dropdown
10) Make a consent screen - only field necessary is the app name
11) Web app
12) Name of web app
    [name]
    Authorized Javascript origin
    http://localhost:3000
    Authorized redirect url
    http://localhost:3000/auth/google.callback
13) Create
14) Copy client ID and secret in dev.env file
15) add that file to .gitignore
16) 