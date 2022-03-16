const role = require("./role.middleware");
const MFA = require("./authMFA.middleware");
const jsonErrorHandler = require("./jsonErrorHandler.middleware");
const headers = require("./headers.middleware");
const validator = require("./validator.middleware");
const isCompanyOwner = require("./isCompanyOwner.middleware");
const checkUserSimPlan = require("./checkUserSimPlan.middleware");

module.exports = {
    role,
    MFA,
    jsonErrorHandler,
    headers,
    validator,
    isCompanyOwner,
    checkUserSimPlan
};