const request = require('supertest');

const server = require('../api/server');


describe('GET /api/jokes', function() {

    it('should require authorization before continuing', function() {
        return request(server)

        .get('/api/jokes')
        .then(res => {
            expect(res.status).toBe(401);
        })
    });

    it('should return 200 when authorized with a registered username and password', async () => {
        let auth = await request(server)
        
        .post('/api/auth/login')//login first
        .send({
            username: 'tester',
            password: 'password'
        }) 

        expect(auth.status).toBe(200)

        const jokes = await request(server)
        
        .get('/api/jokes') //then request the jokes api once token is recieved
        .set('authorization', auth.body.token) //token is placed here

        expect(jokes.type).toMatch(/json/i) 
    })
})