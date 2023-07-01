const request = require('supertest');
const app = require('./app');

describe("GET /",()=>{
    it('Should Welcome me with text express', async ()=>{
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Welcome to Express/);
    });
});
