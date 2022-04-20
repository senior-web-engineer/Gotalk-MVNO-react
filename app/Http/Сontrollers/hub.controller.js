const {TestController} = require("./test.controller");
const {AuthController} = require("./auth.controller");
const {UserController} = require("./user.controller");
const {PlanController} = require("./plan.controller");
const {CompanyController} = require("./company.controller");
const {PlintronPlanController} = require('./plintronPlan.controller');
const {SimController} = require('./sim.controller');
const {BasketController} = require('./basket.controller');
const {DeliveryController} = require("./delivery.controller");
const {PayController} = require("./pay.controller");
const {WholesalePlanController} = require("./wholesalePlan.controller");
const {OrdersController} = require("./orders.controller");
const {SystemController} = require("./system.controller");
const {CouponController} = require("./coupon.controller");
const {CouponUsageController} = require("./couponUsage.controller");

module.exports = {
    auth : new AuthController(),
    user : new UserController(),
    plan : new PlanController(),
    company : new CompanyController(),
    plintronPlan : new PlintronPlanController(),
    test : new TestController(),
    sim : new SimController(),
    basket : new BasketController(),
    delivery : new DeliveryController(),
    pay : new PayController(),
    wholesalePlan : new WholesalePlanController(),
    orders : new OrdersController(),
    system : new SystemController(),
    coupon : new CouponController(),
    couponUsage : new CouponUsageController()
};
