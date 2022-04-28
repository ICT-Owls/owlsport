const { validationResult } = require('express-validator');

const validate = function async(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else {
        res.status(400).send(errors);
    }
};

const testing = process.env.DEV || false;

const authorize = async function (req, res, next) {
    if (!req.user) return res.sendStatus(401);
    else next();
};

module.exports = { validate, authorize };
