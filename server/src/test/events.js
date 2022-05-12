const { app } = require('../server.js');
const { database } = require('../database.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');

chai.use(chaiHttp);

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { events } = require('../database.js');

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
var testEvent = undefined;

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
        testUser = await (await userRef.get()).val();

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
                members: {},
                location: {
                    longtitude: 0,
                    latitude: 0,
                    address: 'stockholm',
                },
            };
            var res = await post('/events').send(event);

            assert.equal(res.status, 200);
            assert.equal(res.body.title, event.title);
            assert.equal(res.body.description, event.description);
            assert.equal(res.body.startDateTime, event.startDateTime);
            assert.equal(res.body.endDateTime, event.endDateTime);
            assert.deepEqual(res.body.location, event.location);
            assert.equal(res.body.creatorId, testUser.id);
            assert.exists(res.body.id);
            assert.exists(res.body.creationDate);

            testEvent = res.body;
        });
    });

    describe('/PATCH /events/:id', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).patch('/events/sslokgdonhgos');
            assert.equal(res.status, 401);
        });

        it('return 400 with empty body', async function () {
            var res = await patch(`/events/${testEvent.id}`).send({});
            assert.equal(res.status, 400);
        });

        it('return 200 with valid body', async function () {
            const event = {
                title: 'newtitle',
            };
            var res = await patch(`/events/${testEvent.id}`).send(event);
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { ...testEvent, ...event });
        });
    });

    describe('/PATCH /events/:id/self', function () {
        it('return 401 without authentication', async function () {
            var res = await chai
                .request(app)
                .patch('/events/sslokgdonhgos/self');
            assert.equal(res.status, 401);
        });

        it('return 400 with empty body', async function () {
            // Setup
            const setupRes = await patch(`/events/${testEvent.id}`).send({
                members: {
                    [testUser.id]: {
                        id: testUser.id,
                        location: undefined,
                        requriesCarpooling: false,
                    },
                },
            });

            var res = await patch(`/events/${testEvent.id}/self`).send({});
            assert.equal(res.status, 400);
        });

        it('return 200 with valid body', async function () {
            var res = await patch(`/events/${testEvent.id}/self`).send({
                requiresCarpooling: true,
            });
            assert.equal(res.status, 200);
            assert.equal(res.body.requiresCarpooling, true);
        });
    });

    describe('/GET /events', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).get('/events');
            assert.equal(res.status, 401);
        });

        it('return 200 when authenticated', async function () {
            var res = await get('/events/');
            assert.equal(res.body.length, 1);
        });
    });
});