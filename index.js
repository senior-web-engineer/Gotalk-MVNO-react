const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
require('./static/index');
require('express-group-routes');
require('./app/Http/Middleware/passport.middleware');

const config = require("./config/index.config");
const {kernel} = require("./app/Console/kernel");
const db = require("./app/Models/index");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('./app/Utils/logger');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(passport.initialize());
app.use(express.static('public'));
app.use(cors({ origin: '*'})); // config.cors.corsOptions
app.use(morgan('combined', {stream: winston.logger.stream}));

db.sequelize.sync({logging: false}).then((result) => {
}).catch((err) => console.log(err));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

require('./routes/api')(app);

kernel.index();

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}.`);
});
