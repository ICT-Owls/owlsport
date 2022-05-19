require('dotenv').config();
const { NodePath } = require('@babel/core');
const { validationResult } = require('express-validator');
const GoogleMapsClient = require('@googlemaps/google-maps-services-js/dist/client').Client

let gmapKey = process.env.GOOGLE_MAPS_API_KEY;

if(!gmapKey){
    console.error("No google maps api key set");
}

const gmapClient = new GoogleMapsClient({});

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

const authorize = async function (req, res, next) {
    if (!req.user) return res.status(401).send('Unauthenticated');
    else next();
};

const validateLocation = function (loc) {
    return (
        loc == undefined ||
        (parseFloat(loc.longitude) !== NaN &&
            parseFloat(loc.latitude) !== NaN &&
            (loc.address == undefined || typeof loc.address == 'string'))
    );
};

module.exports = { validate, authorize, validateLocation, gmapClient, gmapKey};
