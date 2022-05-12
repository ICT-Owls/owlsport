const { app } = require('../server.js');
const { database } = require('../database.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');

chai.use(chaiHttp);

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { doesNotMatch } = require('assert');

const generateTestCredentials = async function () {
    const firebaseConfig = {
        apiKey: '***REMOVED***',
        authDomain: '***REMOVED***',
        databaseURL:
            '***REMOVED***',
        projectId: '***REMOVED***',
        storageBucket: '***REMOVED***',
        messagingSenderId: '***REMOVED***',
        appId: '***REMOVED***',
        measurementId: '***REMOVED***',
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const credentials = await signInWithEmailAndPassword(
        auth,
        'unittest@test.com',
        'testing'
    );
    return credentials;
};

var testToken = undefined;
var testUser = undefined;

const get = function (path) {
    return chai
        .request(app)
        .get(path)
        .set('authorization', `Bearer ${testToken}`);
};

const post = function (path) {
    return chai
        .request(app)
        .post(path)
        .set('authorization', `Bearer ${testToken}`);
};

const patch = function (path) {
    return chai
        .request(app)
        .patch(path)
        .set('authorization', `Bearer ${testToken}`);
};

const del = function (path) {
    return chai
        .request(app)
        .delete(path)
        .set('authorization', `Bearer ${testToken}`);
};

describe('Users', function () {
    before(async function () {
        const credentials = await generateTestCredentials();
        testToken = credentials.user.accessToken;

        const userRef = database.ref(`/users/${credentials.user.uid}`);
        await userRef.remove();
    });

    describe('/POST /user', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).post('/user');
            assert.equal(res.status, 401);
        });

        it('return 200 with valid body', async function () {
            var res = await post('/user').send({
                firstName: 'first',
                lastName: 'last',
                dateOfBirth: 0,
            });
            assert.equal(res.status, 200);
            testUser = res.body;
        });

        it('return 409 when user already exists', async function () {
            var res = await post('/user').send({
                firstName: 'first',
                lastName: 'last',
                dateOfBirth: 0,
            });
            assert.equal(res.status, 409);
        });

        it('return 400 with invalid body format', async function () {
            var res = await post('/user').send({
                firstName: 'first',
                lastName: 'last',
                dateOfBirth: 'text',
            });
            assert.equal(res.status, 400);

            res = await post('/user').send({
                firstName: 'first',
                lastName: 'last',
            });
            assert.equal(res.status, 400);

            res = await post('/user').send({
                firstName: 'first',
                lastName: 123,
                dateOfBirth: 'text',
            });
            assert.equal(res.status, 400);

            res = await post('/user').send({});
            assert.equal(res.status, 400);
        });
    });

    describe('/GET /user/:id', function () {
        it('return 404 with unknown id', async function () {
            var res = await get('/user/pdghfjdljkfnbgornt');
            assert.equal(res.status, 404);
        });

        it('return user with valid id', async function () {
            var res = await get(`/user/${testUser.id}`);
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, testUser);
        });
    });

    describe('/PATCH /user', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).patch('/user').send({
                email: 'test@gmail.com',
            });
            assert.equal(res.status, 401);
        });

        it('return 400 with empty body', async function () {
            var res = await patch('/user');
            assert.equal(res.status, 400);
        });

        it('return 400 with invalid email format', async function () {
            var res = await patch('/user').send({ email: 'test' });
            assert.equal(res.status, 400);

            res = await patch('/user').send({ email: 'test@test' });
            assert.equal(res.status, 400);

            res = await patch('/user').send({ email: '@test.com' });
            assert.equal(res.status, 400);

            res = await patch('/user').send({ email: 'testing.com' });
            assert.equal(res.status, 400);
        });

        it('return 400 with invalid friend id format', async function () {
            var res = await patch('/user').send({
                friends: [0, 1, 2, 'test'],
            });
            assert.equal(res.status, 400);
        });

        it('return updated user with new email', async function () {
            var res = await patch('/user').send({ email: 'new@email.com' });
            assert.equal(res.status, 200);
            assert.equal(res.body.email, 'new@email.com');
        });

        it('return updated user with new friends', async function () {
            var res = await patch('/user').send({
                friends: ['some', 'friends'],
            });
            assert.equal(res.status, 200);
            assert.isArray(res.body.friends);
            assert.deepEqual(res.body.friends, ['some', 'friends']);
        });
    });
});
