const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
require('../models'); 

let actorId;

test("POST /actors should create a actors", async() => {
    const newActor = {
        firstName: "Alex",
        lastName: "Cedeño",
        nationality: "Chile",
        image: "",
        birthday: "1981-11-10"
    }
    const res = await request(app)
        .post('/actors').send(newActor);
        actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
})

test(" GET /actors should return all actors", async() => {
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    
})

test("PUT /actors/:id should update a actor", async() => {
    const body = {
        firstName: "Alexander Cedeño"
    }
    const res = await request(app).put(`/actors/${actorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
})

test("DELETE /actors/:id should delete a actor", async() => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
})
