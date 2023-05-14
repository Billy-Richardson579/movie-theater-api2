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
        const userId = 1; // thhis id and line below need to be in db
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
    describe("./shows endpoint", () => {
    beforeAll(async () => {
        await db.sync({ force: true }); // Sync the database and clear existing data
        await seed(); // Seed the database with data
    });
    
    // Test for getting all shows
    test("GET /shows get all shows", async () => {
        const response = await request(app).get("/shows");
        expect(response.status).toBe(200);
    });
    
    // Test for getting a show by ID
    test("GET /shows/:id get a show by ID", async () => {
        const response = await request(app).get("/shows/1"); // Assuming there's a show with ID 1
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);

    });
    
    // Test for getting shows of a specific genre
    test("GET /shows/genres/:genre get shows of a specific genre", async () => {
        const response = await request(app).get("/shows/genres/Drama"); // Assuming there are shows with the genre "Drama"
        expect(response.status).toBe(200);

    });
    
    // Test for updating the rating of a show
    test("PUT /shows/:id/:rating update the rating of a show", async () => {
        const response = await request(app).put("/shows/1/4"); //show with ID 1
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Update Complete");
        // Verifys the updated rating in the database
        const updatedShow = await Show.findByPk(1); // show with ID 1
        expect(updatedShow.rating).toBe(4);
    });
    
    // Test for updating the status of a show
    test("PUT /shows/:id/status/:status update the status of a show", async () => {
        const response = await request(app).put("/shows/1/status/on-going"); 
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Change Complete");
        // Verify the updated status in the database
        const updatedShow = await Show.findByPk(1); 
        expect(updatedShow.status).toBe("on-going");
    });
    });
      
     


    afterAll(async () => {
        await db.close(); // Close the database connection
    });
});
