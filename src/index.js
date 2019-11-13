const express = require('express');
const path = require('path');
const passport = require('passport');
// the GoogleStrategy actually exports multiple modules but we'll only need the strategy module
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
// Client ID & Client Secret - in dev.env

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// Creates new instance of the GoogleStrategy
passport.use(new GoogleStrategy());



app.listen(port, () => {
    console.log('Server is up on port ' + port)
});