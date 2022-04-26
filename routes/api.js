const controller = require("../app/Http/Сontrollers/hub.controller");
const forms = require("../app/Requests/index.validator");
const middleware = require("../app/Http/Middleware/index.middleware");
require('../app/Http/Middleware/passport.middleware');
const passport = require('passport');
const createError = require('http-errors');
const xmlparser = require('express-xml-bodyparser')

module.exports = function (app) {
    app.use(middleware.headers);

    app.group("/api/v1", (router) => {

        //#region Allow Anonymous
        router.post("/plintron-notify-data", xmlparser(), controller.plintronPlan.asynchResponse);

        router.group("/auth", (router) => {
            router.post('/signup', [forms.auth.rule('signup'), middleware.validator], controller.auth.signup);
            router.post('/login', [forms.auth.rule('signin'), middleware.validator], controller.auth.signin);
            router.post('/adminSignin', [forms.auth.rule('adminSignin'), middleware.validator], controller.auth.adminSignin);
            router.group("/password", (router) => {
                router.post('/reset', [forms.auth.rule('reset'), middleware.validator], controller.auth.resetPassword);
                router.post('/set', [forms.auth.rule('set'), middleware.validator], controller.auth.setPassword);
            });
        });

        router.group("/buy", (router) => {
            router.post("/",[forms.basket.rule('buy'), middleware.validator], controller.basket.buy);
            router.post("/check", controller.basket.checkBuy);
            router.post("/repeat", controller.basket.repeatBuy);
        });

        router.group("/plans", (router) => {
            router.get("/", controller.plan.findAll);
            router.get("/:id", controller.plan.findOne);
        });

        router.group("/coupons", (router) => {
            router.get("/canUseCoupon", controller.coupon.canUseCoupon);
        });
        //#endregion

        //#region Authorized Only
        router.use(passport.authenticate('jwt', {session: false}));

        router.get("/test",middleware.role('Owner'), controller.test.test);
        router.post("/testPlintron",middleware.role('Owner'), controller.test.testPlintron);

        router.group("/system", (router) => {
            router.use(middleware.role('Owner'));
            router.get("/statistics", controller.system.getPlintronStatistics);
            router.post("/logs", controller.system.create);
            router.delete("/logs", controller.system.clear);
        });

        router.group("/mfa", (router) => {
            router.get('/sendEmail', controller.auth.sendEmailFactor);
            router.post('/switchMFA', [middleware.validator,middleware.MFA], controller.auth.switchMultiFactor);
            router.post('/verificationMFA', [middleware.validator], controller.auth.verificationMultiFactor);
        });
        router.use(middleware.MFA);

        router.group("/pay", (router) => {
            router.post("/", controller.pay.refillBalance);
            router.get("/verify/:id", controller.pay.verifyRefillBalance);
        });

        router.group("/delivery", (router) => {
            router.put("/:id",[forms.delivery.rule('update'), middleware.validator], controller.delivery.update);
            router.use(middleware.role('Owner'));
            router.get("/", controller.delivery.findAll);
            router.get("/:id", controller.delivery.findOne);
            router.post("/",[forms.delivery.rule('create'), middleware.validator], controller.delivery.create);
            router.delete("/:id", controller.delivery.delete);
        });

        router.group("/sim", (router) => {
            router.post("/unlocking", controller.sim.unlocking);
            router.post("/cancel-purchase", controller.sim.cancelPurchase);
            router.post("/activate-physical", controller.sim.activatePhysicalSim);
            router.post("/buy", controller.basket.buy);
            router.group("/esim", (router) => {
                router.post("/activate", controller.sim.activateESim);
                router.get("/qr", controller.sim.eSimQr);
            });
            router.post("/change", [forms.sim.rule('changeSim'), middleware.validator], controller.sim.changeSim);
            router.post("/set-phone", [forms.sim.rule('switchingAnotherOperator'), middleware.validator], controller.sim.switchingAnotherOperatorBooking);

            router.group("/admin", (router) => {
                router.use(middleware.role('Owner'));
                router.get("/", controller.sim.findAll);
                router.get("/:id", controller.sim.findOne);
                router.post("/", [forms.sim.rule('create'), middleware.validator], controller.sim.create);
                router.post("/physical", [forms.sim.rule('createPhysical'), middleware.validator], controller.sim.addPhysicalSim);
                router.put("/:id", [forms.sim.rule('update'), middleware.validator], controller.sim.update);
                router.post("/change",[forms.sim.rule('changeSimOwner'), middleware.validator], controller.sim.changeSim);
                router.post("/change-status", [forms.sim.rule('changeStatus'), middleware.validator], controller.sim.changeStatus);
                router.delete("/:id", controller.sim.delete);
                router.get("/import", controller.sim.import);
                router.post("/upload", controller.sim.upload);
            });

            router.group("/company", (router) => {
                router.use(middleware.isCompanyOwner);
                router.post("/buy", controller.sim.buySimCompany);
                router.post("/check", controller.sim.checkBuySimCompany);
                router.post("/activate", controller.sim.simActivateCompany);
            });
        });

        router.group("/users", (router) => {
            router.get("/me", controller.user.me);
            router.group("/products", (router) => {
                router.get("/", controller.sim.getUserProducts);
                router.get("/:id", middleware.checkUserSimPlan, controller.plan.getProductDetails);
                router.get("/history/:id", middleware.checkUserSimPlan, controller.plan.getProductHistory);
            });
            router.put("/", controller.user.update);
            router.post('/change-password', [forms.auth.rule('changePassword'), middleware.validator], controller.auth.changePassword);
            router.use(middleware.isCompanyOwner);
            router.get("/details/:id", controller.user.getDetails);
            router.post("/", [middleware.role('Owner'), forms.user.rule(), middleware.validator], controller.user.create);
            router.get("/", controller.user.findAll);
            router.get("/:id", controller.user.getUser);
            router.delete("/:id", controller.user.delete);
        });

        router.group("/profile", (router) => {
            router.get('/owner', middleware.role('Owner'), controller.user.ownerBoard);
            router.get('/manager', middleware.role('Manager'), controller.user.managerBoard);
            router.get('/viewer', middleware.role('Viewer'), controller.user.viewerBoard);
            router.get('/customer', middleware.role('Customer'), controller.user.customerBoard);
        });

        router.group("/plans", (router) => {
            router.put("/change", middleware.checkUserSimPlan, controller.plan.changePlan);
            router.put("/confirming-change", controller.plan.confirmingPlanChange);
            router.group("/company", (router) => {
                router.use(middleware.isCompanyOwner);
                router.put("/change", controller.plan.changePlanCompany);
                router.put("/confirming-change",controller.plan.confirmingPlanChangeCompany);
                router.post("/get-user-detail",controller.plan.getProductDetailCompany);
            });
            router.use(middleware.role('Owner'));
            router.post("/", [forms.plan.rule(), middleware.validator], controller.plan.create);
            router.put("/:id", controller.plan.update);
            router.delete("/:id", controller.plan.delete);
        });

        router.group("/plintron-plans", (router) => {
            router.use(middleware.role('Owner'));
            router.group("/wholesales", (router) => {
                router.post("/", [forms.wholesalePlan.rule('create'), middleware.validator], controller.wholesalePlan.create);
                router.put("/:id", controller.wholesalePlan.update);
                router.get("/", controller.wholesalePlan.findAll);
                router.get("/:id", controller.wholesalePlan.findOne);
                router.delete("/:id", controller.wholesalePlan.delete);
            });
            router.post("/", controller.plintronPlan.create);
            router.put("/:id", controller.plintronPlan.update);
            router.post("/search", controller.plintronPlan.getOptimizePlan);
            router.post("/", [forms.plintronPlan.rule(), middleware.validator], controller.plintronPlan.create);
            router.get("/", controller.plintronPlan.findAll);
            router.get("/:id", controller.plintronPlan.findOne);
            router.delete("/:id", controller.plintronPlan.delete);
        });

        router.group("/company", (router) => {
            router.post("/", [middleware.role('Owner'), forms.company.rule("create"), middleware.validator], controller.company.create);
            router.get("/", [middleware.role('Owner')], controller.company.findAll);
            router.use(middleware.isCompanyOwner);
            router.get("/pay", controller.company.pay);
            router.group("/users", (router) => {
                router.get("/", controller.company.userList);
                router.post("/change-status", controller.company.changeStatus);
                router.post("/", [forms.company.rule("attachUser"), middleware.validator], controller.company.usersCompany);
                router.post("/invite", [forms.company.rule("userInvite"), middleware.validator], controller.company.userInvite);
            });
            router.get("/:id", controller.company.findOne);
            router.put("/:id", [forms.company.rule("update"), middleware.validator], controller.company.update);
            router.delete("/:id", controller.company.delete);
        });

        router.group("/orders", (router) => {
            router.use(middleware.role('Owner'));
            router.get("/",controller.orders.findAll);
            router.get("/:id", controller.orders.findOne);
            router.delete("/:id", controller.orders.destroy);
        });

        router.group("/coupons", (router) => {
            router.get("/", [middleware.role('Owner')], controller.coupon.findAll);
            router.get("/:id", [middleware.role('Owner')], controller.coupon.findOne);
            router.post("/", [middleware.role('Owner'), middleware.validator], controller.coupon.create);
            router.put("/:id", [middleware.role('Owner'), middleware.validator], controller.coupon.update);
            router.delete("/:id", [middleware.role('Owner'), middleware.validator], controller.coupon.delete);
        });

        router.group("/couponUsages", (router) => {
            router.get("/", [middleware.role('Owner')], controller.couponUsage.findAll);
            router.get("/byCouponId/:id", [middleware.role('Owner')], controller.couponUsage.findAllByCouponId);
            router.get("/:id", [middleware.role('Owner')], controller.couponUsage.findOne);
            router.post("/", [middleware.role('Owner'), middleware.validator], controller.couponUsage.create);
            router.put("/:id", [middleware.role('Owner'), middleware.validator], controller.couponUsage.update);
        });
        //#endregion

    });

    app.use((req, res, next) => next(createError(404)));
    app.use(middleware.jsonErrorHandler);
};
