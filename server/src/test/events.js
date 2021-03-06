const { app } = require('../server.js');
const { database } = require('../database.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const prettier = require('prettier');

chai.use(chaiHttp);

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { events } = require('../database.js');
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

let testToken = undefined;

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
    let testUser = undefined;
    let testEvent = undefined;

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
                    longitude: 0,
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
            testEvent = { ...testEvent, ...event };
        });
    });

    describe('/GET /events/:id', function () {
        it('return 401 without authentication', async function () {
            var res = await chai.request(app).get(`/events/${testEvent.id}`);
            assert.equal(res.status, 401);
        });

        it('return 200 with valid body when authenticated', async function () {
            var res = await get(`/events/${testEvent.id}`);
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { ...testEvent });
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
                        isDriver: true,
                        isPassenger: false,
                        seats: 1,
                    },
                },
            });

            var res = await patch(`/events/${testEvent.id}/self`).send({});
            assert.equal(res.status, 400);
        });

        it('return 200 with valid body', async function () {
            var res = await patch(`/events/${testEvent.id}/self`).send({
                requiresCarpooling: true,
                seats: 2,
            });
            assert.equal(res.status, 200);
            assert.equal(res.body.requiresCarpooling, true);
            assert.equal(res.body.seats, 2);
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

    describe('/POST /events/:id/car', function () {
        const test_car = {
            model: 'Ferrari',
            registration: 'ABC 123',
            seats: 3,
        };
        const test_location = {
            address: 'Nowhere',
            latitude: 51.774,
            longitude: 31.222,
        };

        it('return 401 without authentication', async function () {
            var res = await chai
                .request(app)
                .post(`/events/${testEvent.id}/car`);
            assert.equal(res.status, 401);
        });

        it('return 400 with empty body', async function () {
            var res = await post(`/events/${testEvent.id}/car`);
            assert.equal(res.status, 400);
        });

        it('return 404 with invalid id', async function () {
            var res = await post(`/events/unknown123/car`).send({
                car: test_car,
                location: test_location,
            });
            assert.equal(res.status, 404);
        });

        it('return 200 with valid body', async function () {
            var res = await post(`/events/${testEvent.id}/car`).send({
                car: test_car,
                location: test_location,
            });
            assert.equal(res.status, 200);
            assert.equal(res.body.members[testUser.id].isDriver, true);
            assert.equal(res.body.members[testUser.id].isPassenger, false);
        });
    });

    describe('/POST /events/:id/pickup', function () {
        const member = {
            id: '123',
            location: {
                address: 'Nowhere',
                latitude: 51.774,
                longitude: 31.222,
            },
            seats: 1,
            requiresCarpooling: true,
            isDriver: false,
            isPassenger: true,
        };

        before(async function () {
            // setup
            return await events.child(testEvent.id).update({
                members: {
                    [member.id]: member,
                    [testUser.id]: {
                        id: testUser.id,
                        location: {
                            address: 'Nowhere',
                            latitude: 51.774,
                            longitude: 31.222,
                        },
                        car: {
                            model: 'CoolCar 2007',
                            registration: 'TNR 117',
                            seats: 3,
                        },
                        requiresCarpooling: false,
                        isDriver: true,
                        isPassenger: false,
                    },
                },
            });
        });

        it('return 401 without authentication', async function () {
            var res = await chai
                .request(app)
                .post(`/events/${testEvent.id}/pickup`);
            assert.equal(res.status, 401);
        });

        it('return 400 with empty body', async function () {
            var res = await post(`/events/${testEvent.id}/pickup`);
            assert.equal(res.status, 400);
        });

        it('return 404 with unknown event', async function () {
            var res = await post(`/events/unknown123/pickup`).send({
                passengerId: '123',
            });
            assert.equal(res.status, 404);
        });

        it('return 400 is passenger id equals user id', async function () {
            var res = await post(`/events/unknown123/pickup`).send({
                passengerId: testUser.id,
            });
            assert.equal(res.status, 400);
        });

        it('return 200 with correct body', async function () {
            var res = await post(`/events/${testEvent.id}/pickup`).send({
                passengerId: member.id,
            });

            assert.equal(
                res.status,
                200,
                'Received response: "' +
                    res.text +
                    '"\n' +
                    'Event in database: \n' +
                    prettier.format(
                        JSON.stringify(
                            (await events.child(testEvent.id).get()).toJSON()
                        ),
                        { semi: false, parser: 'json' }
                    ) +
                    '\n'
            );

            assert.equal(res.body.members[member.id].isPassenger, true);
            assert.deepEqual(res.body.members[testUser.id].passengers, [
                passengerId,
            ]);
            assert.deepEqual(res.body.members[testUser.id].isDriver, true);
        });
    });
});
