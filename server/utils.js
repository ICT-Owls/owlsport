const { validationResult } = require('express-validator');

/**
 * Express middleware that checks for validation errors,
 * and returns a 400 Bad Request with the error as the body.
 */
const validate = function async(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else {
        // TODO: Might not want to just include the error in the response in the futre for security reasons.
        res.status(400).send(errors);
    }
};

const testing = process.env.DEV || false;

/**
 * Express middleware that returns 401 if the request comes from an unauthenticated user.
 */
const authorize = async function (req, res, next) {
    if (!req.user) return res.status(401).send('Unauthenticated');
    else next();
};

module.exports = { validate, authorize };
