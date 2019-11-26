const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('../models/User');
require('../services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

// this line will ensure that any kind of request body is parsed and assigned to req.body
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('../routes/authRoutes')(app);
// because the route files return functions, they are immediately called by app
require('../routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, 'client/build')));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
});