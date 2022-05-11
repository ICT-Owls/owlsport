const { body, param, oneOf } = require('express-validator');
const { validate, authorize } = require('../utils.cjs');
const { users } = require('../database.cjs');

const express = require('express');
const router = express.Router();

/**
 * Create a user from both the user object we receive from firebase authentication, but also additional info in the request body.
 */
router.post(
    '/',
    authorize,
    body('firstName').isString().withMessage('Invalid first name'),
    body('lastName').isString().withMessage('Invalid last name'),
    body('dateOfBirth').isNumeric().withMessage('Invalid date of birth'),
    validate,
    async (req, res) => {
        const { firstName, lastName, dateOfBirth } = req.body;
        const authUser = req.user;

        const userRef = users.child(authUser.uid);

        // Doublecheck that the user does not exist yet in the realtime database
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists())
            return res.status(409).send('User already exists');

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

/**
 * Get a user by their ID.
 */
router.get(
    '/:id',
    authorize,
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

/**
 * Update a user.
 * Only fields that can be updated are the email, and friends.
 */
router.patch(
    '/',
    authorize,
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('friends').optional().isArray().withMessage('Friends is not an array'),
    body('friends.*').isString().withMessage('Friend id is not a string'),
    oneOf([body('friends').exists(), body('email').exists()]),
    validate,
    async (req, res) => {
        const authUser = req.user;
        const { email, friends } = req.body;

        const userRef = users.child(authUser.uid);
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
