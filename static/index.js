const express = require("express");
const bodyParser = require('body-parser');
const compression = require('compression')
const config = require("../config/index.config");
const appFrontend = express();
appFrontend.use(compression());
appFrontend.use(bodyParser.urlencoded({extended: false}));
appFrontend.use(bodyParser.json());
appFrontend.use('/admin/', express.static(config.frontend.admin_dir, config.frontend.options));
appFrontend.use('/admin/*', express.static(config.frontend.admin_dir, config.frontend.options));
appFrontend.use('/', express.static(config.frontend.frontend_dir, config.frontend.options));
appFrontend.use('*', express.static(config.frontend.frontend_dir, config.frontend.options));
appFrontend.listen(config.frontend.frontend_port, () => {
    console.log(`Frontend is running on port ${config.frontend.frontend_port}.`);
});