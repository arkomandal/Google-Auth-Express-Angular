const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require('./middlewares/jwt/jwt');
const errorHandler = require('./middlewares/jwt/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());
app.use(errorHandler);

app.use('/auth', require('./routes/auth.google.route'));

app.listen(3000, () => console.log('app is listening'));