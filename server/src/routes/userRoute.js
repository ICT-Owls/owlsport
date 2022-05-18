const { body, param, oneOf } = require('express-validator');
const { validate, authorize } = require('../utils.js');
const { users } = require('../database.js');
const { AvatarGenerator } = require('random-avatar-generator');
const express = require('express');
const { randomInt, randomBytes, randomFillSync } = require('crypto');
const router = express.Router();

const avatarGenerator = new AvatarGenerator();

const avatarURLRequirements = {
    require_tld: false,
    require_host: false,
    require_valid_protocol: false,
    allow_underscores: true,
    allow_protocol_relative_urls: true,
};

/**
 * Create a user from both the user object we receive from firebase authentication, but also additional info in the request body.
 */
router.post(
    '/',
    authorize,
    body('firstName').isString().withMessage('Invalid first name'),
    body('lastName').isString().withMessage('Invalid last name'),
    body('dateOfBirth').isNumeric().withMessage('Invalid date of birth'),
    body('avatar')
        .optional()
        .isURL(avatarURLRequirements)
        .withMessage('Invalid avatar url'),
    validate,
    async (req, res) => {
        const { firstName, lastName, dateOfBirth, avatar } = req.body;

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
            avatar: avatar
                ? avatar
                : avatarGenerator.generateRandomAvatar(
                      randomBytes(100000).toString()
                  ),
            creationDate: Date.now(),
        });

        const user = await userRef.get();

        res.send(user.val());
    }
);

/**
 * Get all users (name and email)
 */
router.get('/list', validate, async (req, res) => {
    const usersRef = await users.get();
    const userStore = usersRef.val();

    if (!userStore || typeof userStore !== 'object') {
        console.warn('invalid response from firebase in GET /list');
        console.warn('-\t-\t-\t-\t-');
        console.warn(userStore);
        return res.send('[]');
    }

    const userList = Object.keys(userStore)
        .map((userId) => {
            if (
                userStore[userId].email &&
                userStore[userId].firstName &&
                userStore[userId].lastName
            )
                return {
                    email: userStore[userId].email,
                    name:
                        userStore[userId].firstName +
                        ' ' +
                        userStore[userId].lastName,
                };
        })
        .filter((v) => {
            return v !== undefined && v !== null;
        });

    return res.send(userList);
});

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

        // Update outdated users
        if (!user.avatar) {
            user.avatar = avatarGenerator.generateRandomAvatar(
                randomBytes(100000).toString()
            );
            userRef.child('avatar').set(user.avatar);
        }

        res.send(user);
    }
);

/**
 * Get a user by their email
 */
router.get(
    '/email/:email',
    authorize,
    param('email').isEmail(),
    validate,
    async (req, res) => {
        const email = req.params.email;

        const usersRef = await users.get();
        const matchedUsers = Object.values(usersRef.val()).filter(
            (u) => u.email == email
        );

        if (matchedUsers.length == 0)
            return res.status(404).send('User not found');
        else return res.send(matchedUsers[0]);
    }
);

/**
 * Update a user.
 * Only fields that can be updated are the email, avatar, and friends.
 */
router.patch(
    '/',
    authorize,
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('friends').optional().isArray().withMessage('Friends is not an array'),
    body('friends.*').isString().withMessage('Friend id is not a string'),
    body('avatar')
        .optional()
        .isURL(avatarURLRequirements)
        .withMessage('Avatar is not a path'),
    oneOf([
        body('friends').exists(),
        body('email').exists(),
        body('avatar').exists(),
    ]),
    validate,
    async (req, res) => {
        const authUser = req.user;
        const { email, friends, avatar } = req.body;

        const userRef = users.child(authUser.uid);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists())
            return res.status(404).send('User not found');

        var update = {};
        if (email) update.email = email;
        if (friends) update.friends = friends;

        update.avatar = avatar
            ? avatar
            : avatarGenerator.generateRandomAvatar(
                  randomBytes(100000).toString()
              );
        await userRef.update(update);

        const updatedUser = await userRef.get();

        res.send(updatedUser.val());
    }
);

module.exports = router;
