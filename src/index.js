const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('../services/passport');

const app = express();

require('../routes/authRoutes') (app);
// Client ID & Client Secret - in dev.env
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

mongoose.connect(process.env.MONGO_URI);

app.use(express.static(publicDirectoryPath));





app.listen(port, () => {
    console.log('Server is up on port ' + port)
});