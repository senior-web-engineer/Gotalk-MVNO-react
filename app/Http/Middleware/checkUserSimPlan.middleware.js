const db = require("../../Models/index");
const UserSimPlan = db.UserSimPlan;

module.exports = async (req, res, next) => {
    try {
        const {user} = req;
        const body = req.body;
        const userId = (user.role === 'Owner') ? body.userId || req.query.userId : user.id;
        if (!userId) return res.status(404).json({message: "User not found"})

        let productId;
        if (body.productId) productId = body.productId;
        else if (req.query.productId) productId = req.query.productId;
        else if (req.params.id) productId = req.params.id;

        let userSimPlan = await UserSimPlan.findOne({where: {id: productId, userId: userId}});
        if (!userSimPlan)
            return res.status(404).json({message: "Insufficient rights to edit the product"})
        return next();
    } catch (e) {
        return res.status(400).json({code: e.code || 0, message: e.message || "Error"});
    }
}