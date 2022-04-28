const { app, database } = require('../server/server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const { body } = require('express-validator');

chai.use(chaiHttp);

describe('Users', function () {
    var testUserRef = undefined;
    var testUser = undefined;

    before(async function () {
        const users = database.ref('/users');

        const userRef = users.child('/test');
        userRef.set({
            first_name: 'user',
            last_name: 'name',
            email: 'some@email.com',
            date_of_birth: Date.now(),
            friends: [],
        });

        testUserRef = userRef;
        testUser = await userRef.get();
    });

    describe('/GET /user/:id', function () {
        it('return 404 with unknown id', async function () {
            var res = await chai.request(app).get('/user/pdghfjdljkfnbgornt');
            assert.equal(res.status, 404);
        });

        it('return user with valid id', async function () {
            var res = await chai.request(app).get(`/user/${testUserRef.key}`);
            assert.equal(res.status, 200);
            assert.equal(res.body.email, 'some@email.com');
        });
    });

    describe('/POST /user/:id', function () {
        it('return 404 with unknown id', async function () {
            var res = await chai
                .request(app)
                .post('/user/skfgodgfbntyndlnbgfldf')
                .send({ email: 'test@gmail.com' });
            assert.equal(res.status, 404);
        });

        it('return 400 with empty body', async function () {
            var res = await chai.request(app).post('/user/test');
            assert.equal(res.status, 400);
        });

        it('return 400 with invalid email format', async function () {
            var res = await chai
                .request(app)
                .post('/user/test')
                .send({ email: 'test' });
            assert.equal(res.status, 400);

            res = await chai
                .request(app)
                .post('/user/test')
                .send({ email: 'test@test' });
            assert.equal(res.status, 400);

            res = await chai
                .request(app)
                .post('/user/test')
                .send({ email: '@test.com' });
            assert.equal(res.status, 400);

            res = await chai
                .request(app)
                .post('/user/test')
                .send({ email: 'testing.com' });
            assert.equal(res.status, 400);
        });

        it('return 400 with invalid friend id format', async function () {
            var res = await chai
                .request(app)
                .post('/user/someid')
                .send({ friends: [0, 1, 2, 'test'] });
            assert.equal(res.status, 400);
        });

        it('return updated user with new email', async function () {
            var res = await chai
                .request(app)
                .post('/user/test')
                .send({ email: 'new@email.com' });
            assert.equal(res.status, 200);
            assert.equal(res.body.email, 'new@email.com');
        });

        it('return updated user with new friends', async function () {
            var res = await chai
                .request(app)
                .post('/user/test')
                .send({ friends: ['some', 'friends'] });
            assert.equal(res.status, 200);
            assert.isArray(res.body.friends);
            assert.deepEqual(res.body.friends, ['some', 'friends']);
        });
    });
});
