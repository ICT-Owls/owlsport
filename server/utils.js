const { validationResult } = require('express-validator');

const validate = function async(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else {
        res.status(400).send(errors);
    }
};

module.exports = { validate };
