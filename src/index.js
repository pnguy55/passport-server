const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

// SCHEMA MUST BE REQUIRED BEFORE PASSPORT
require('../models/User');
require('../services/passport');

const app = express();

require('../routes/authRoutes') (app);

// Client ID & Client Secret - in dev.env
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');


app.use(express.static(publicDirectoryPath));


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});