const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest");
const { db } = require('./db/connection');
const { User, Show } = require('./models/index');
const {app} = require('./src/app');
const seed = require("./seed.js");


describe('./shows endpoint', () => {
    beforeAll(async () => {
        await db.sync({ force: true }); // Sync the database and clear existing data
        await seed(); // Seed the database with data
    });

    test("Testing Shows endpoint", async () => {
        const response = await request(app).get('/show');
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("title");
    });

    test("Test id get request", async()=>{
        const id = 1
        const response = await request(app).get(`/show/${id}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1)
    })

    afterAll(async () => {
        await db.close(); // Close the database connection
    });
});
