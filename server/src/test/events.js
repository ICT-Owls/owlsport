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

describe('Events', function () {
    before(async function () {
        const credentials = await generateTestCredentials();
        testToken = credentials.user.accessToken;

        const userRef = database.ref(`/users/${credentials.user.uid}`);
        await userRef.set({
            firstName: 'firstname',
            lastName: 'lastName',
            dateOfBirth: Date.now().valueOf(),
            email: 'testitest@testest.com',
            id: credentials.user.uid,
            creationDate: Date.now().valueOf(),
        });

        testUser = (await userRef.get()).val();

        const eventsRef = await database.ref('/events').get();
        if (!eventsRef.val()) return;
        const userEvents = Object.values(eventsRef.val()).filter(
            (e) => e.creatorId == credentials.user.uid
        );

        for (const event of userEvents) {
            const ref = database.ref(`/events/${event.id}`);
            await ref.remove();
        }
    });

    describe('/POST /events', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).post('/events').send({
                email: 'test@gmail.com',
            });
            assert.equal(res.status, 401);
        });

        it('return 400 with empty body', async function () {
            var res = await post('/events');
            assert.equal(res.status, 400);
        });

        it('return 400 with missing fields', async function () {
            var res = await post('/events').send({
                title: 'a',
                description: 'a',
                startDateTime: 1,
            });
            assert.equal(res.status, 400);

            res = await post('/events').send({
                title: 'a',
                description: 'a',
                endDateTime: 1,
            });
            assert.equal(res.status, 400);

            res = await post('/events').send({
                title: 'a',
                startDateTime: 1,
                endDateTime: 1,
            });
            assert.equal(res.status, 400);

            res = await post('/events').send({
                description: 'a',
                startDateTime: 1,
                endDateTime: 1,
            });
            assert.equal(res.status, 400);
        });

        it('return 400 with invalid format', async function () {
            var res = await post('/events').send({
                title: 'a',
                description: 'a',
                startDateTime: 1,
                endDateTime: 'a',
            });
            assert.equal(res.status, 400);

            res = await post('/events').send({
                title: {
                    other: 'test',
                },
                description: 'a',
                startDateTime: 1,
                endDateTime: 1,
            });
            assert.equal(res.status, 400);
        });

        it('return 200 with valid body', async function () {
            const event = {
                title: 'title',
                description: 'description',
                startDateTime: 0,
                endDateTime: 1000,
                members: {
                    testuserid: {
                        id: 'testuserid',
                        requiresCarpooling: false,
                        location: {
                            latitude: 0,
                            longitude: 0,
                            address: 'address',
                        },
                    },
                },
                location: {
                    latitude: 0,
                    longitude: 0,
                    address: 'address',
                },
            };
            var res = await post('/events').send(event);
            assert.equal(res.status, 200);
            assert.equal(res.body.title, event.title);
            assert.equal(res.body.description, event.description);
            assert.equal(res.body.startDateTime, event.startDateTime);
            assert.equal(res.body.endDateTime, event.endDateTime);
            assert.equal(res.body.creatorId, testUser.id);
            assert.exists(res.body.id);
            assert.exists(res.body.creationDate);
        });
    });

    describe('/PATCH /events', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).patch('/events/sslokgdonhgos');
            assert.equal(res.status, 401);
        });
    });

    describe('/GET /events', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).get('/events');
            assert.equal(res.status, 401);
        });

        it('return 200 when authenticated', async function () {
            var res = await get('/events');
            assert.equal(res.status, 200);
        });
    });
});
