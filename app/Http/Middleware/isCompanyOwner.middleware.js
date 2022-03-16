const db = require("../../Models/index");
const Company = db.Company;

module.exports = async (req, res, next) => {
    const {user} = req;

    if (user.role === "Owner") {
        if (!req.query.company_id)
            return next();
        user.company_id = Number(req.query.company_id);
    }else {
        const company = await Company.findOne({where: {ownerId: user.id}});
        user.company_id = company.id;
    }

    if (!user.company_id)
        return res.status(404).json({message: "You do not have access"})

    return next();
}