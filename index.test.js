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
        const response = await request(app).get('/shows');
        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("title");
    });

    test("Test id get request", async()=>{
        const id = 1
        const response = await request(app).get(`/shows/${id}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1)
    })
    test("Test put id works", async()=>{
        const id = 1
        const response = await request(app).get(`/shows/${id}`)
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1)

    })
    describe("GET /users/:id/shows", () => {
        it("should return all shows watched by a user", async () => {
          const userId = 1; //   an existing user ID in  database
          const response = await request(app).get(`/users/${userId}/shows`);
    
          expect(response.status).toBe(200);
          expect(response.body).toBeDefined();
        });
    
        it("should return 404 if user not found", async () => {
          const userId = 999; // non-existing user ID
          const response = await request(app).get(`/users/${userId}/shows`);
    
          expect(response.status).toBe(404);
          expect(response.body.error).toBe("User not found");
        });
      });
    
      describe("PUT /users/:id/shows/:showId", () => {
        it("should add a show to the user's watched shows", async () => {
          const userId = 1;
          const showId = 3;
          const response = await request(app).put(`/users/${userId}/shows/${showId}`);
    
          expect(response.status).toBe(200);
          expect(response.text).toBe("Show updated successfully");
        });
    
        it("should return 404 if user or show not found", async () => {
          const userId = 999; // non-existing user ID
          const showId = 999; // non-existing show ID
          const response = await request(app).put(`/users/${userId}/shows/${showId}`);
    
          expect(response.status).toBe(404);
          expect(response.body.error).toBe("User or Show not found");
        });
      });

    afterAll(async () => {
        await db.close(); // Close the database connection
    });
});
