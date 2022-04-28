const { body, param, oneOf } = require('express-validator');
const { validate } = require('../utils.js');
const { users } = require('../database.js');

const express = require('express');
const router = express.Router();

router.post(
    '/create',
    body('firstName').isString().withMessage('Invalid first name'),
    body('lastName').isString().withMessage('Invalid last name'),
    body('dateOfBirth').isNumeric().withMessage('Invalid date of birth'),
    validate,
    async (req, res) => {
        const { firstName, lastName, dateOfBirth } = req.body;
        const authUser = req.user;

        const userRef = users.child(`/${authUser.uid}`);
        await userRef.set({
            id: authUser.uid,
            firstName: firstName,
            lastName: lastName,
            email: authUser.email,
            dateOfBirth: dateOfBirth,
            friends: [],
            creationDate: Date.now(),
        });

        const user = await userRef.get();

        res.send(user.val());
    }
);

router.get(
    '/:id',
    param('id').isString().withMessage('Id is not a string'),
    validate,
    async (req, res) => {
        const id = req.params.id;

        const userRef = users.child(id);
        const user = await (await userRef.get()).val();
        if (!user) return res.status(404).send('User not found');

        res.send(user);
    }
);

router.post(
    '/:id',
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('friends').optional().isArray().withMessage('Friends is not an array'),
    body('friends.*').isString().withMessage('Friend id is not a string'),
    oneOf([body('friends').exists(), body('email').exists()]),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const { email, friends } = req.body;

        const userRef = users.child(id);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists())
            return res.status(404).send('User not found');

        var update = {};
        if (email) update.email = email;
        if (friends) update.friends = friends;

        await userRef.update(update);

        const updatedUser = await userRef.get();

        res.send(updatedUser.val());
    }
);

module.exports = router;
