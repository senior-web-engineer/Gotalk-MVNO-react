const {MainController} = require("./main.controller");
const db = require("../../Models/index");
const WholesalePlan = db.WholesalePlan;

class WholesalePlanController extends MainController {

    constructor() {
        super(WholesalePlan);
    }
}

module.exports = {
    WholesalePlanController
};