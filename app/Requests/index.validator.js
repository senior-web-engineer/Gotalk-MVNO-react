const auth = require("./auth.validator");
const user = require("./user.validator");
const plan = require("./plan.validator");
const plintronPlan = require("./plintronPlan.validator");
const company = require("./company.validator");
const sim = require("./sim.validator");
const delivery = require("./delivery.validator");
const wholesalePlan = require("./wholesalePlan.validator");
const basket = require("./basket.validator");

module.exports = {
    auth,
    user,
    plan,
    plintronPlan,
    company,
    sim,
    delivery,
    wholesalePlan,
    basket
};