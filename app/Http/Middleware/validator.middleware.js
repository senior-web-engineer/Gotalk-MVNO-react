const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({errors: errors.array()});
        return next();
    } catch(err) {
       res.status(500).json({message: err.message});
    }
};