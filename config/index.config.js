const db = require("./db.config");
const auth = require("./auth.config");
const app = require("./app.config");
const mailer = require("./mailer.config");
const cors = require("./cors.config");
const filesystems = require("./filesystems.config");
const plintron = require("./plintron.config");
const frontend = require("./frontend.config");

module.exports = {
    db,
    auth,
    app,
    mailer,
    cors,
    filesystems,
    plintron,
    frontend
};