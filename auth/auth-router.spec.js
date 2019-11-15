const request = require('supertest');

const db = require('../database/dbConfig');

const server = require('../api/server');



describe('POST /api/auth/register', function () {
    beforeEach(async () => {
        await db('users').truncate();
    }); //clears table before each test

    it('should return 201 when registered', async () => {
        const auth = await request(server)
        .post('/api/auth/register')
        .send({
            username: 'tester',
            password: 'password'
        });

        expect(auth.status).toBe(201);
    });

    it('should be a json response when registerd', async () => {
        const auth = await request(server)
        .post('/api/auth/register')
        .send({
            username: 'tester',
            password: 'password'
        })

        expect(auth.type).toMatch(/json/i)
    })
});