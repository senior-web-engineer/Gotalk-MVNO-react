module.exports = (req, res, next) => {
    if (!req.user.validation) {
        return res.sendStatus(403);
    }
    next();
}