const { body, param, oneOf } = require('express-validator');
const { validate } = require('../utils.js');
const { database } = require('../database.js');

const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
    if (!req.user) return res.send(403);

    const ref = database.ref(`events/${req.user.uid}`);
    const data = await (await ref.get()).val();

    res.send(data);
});

router.post(
    '',
    body('creatorId').isString(),
    body('members').isArray(),
    body('members.*').isString(),
    body('title').isString(),
    body('description').isString(),
    body('startDateTime').isInt(),
    body('endDateTime').isInt(),
    validate,
    async (req, res) => {
        if (!req.user) return res.send(403);

        const {
            creatorId,
            members,
            title,
            description,
            startDateTime,
            endDateTime,
        } = req.body;

        const ref = database.ref(`events/${req.user.uid}`);
        const data = await ref.push({
            creatorId,
            members,
            title,
            description,
            startDateTime,
            endDateTime,
        });

        res.send(data.key);
    }
);

module.exports = router;
