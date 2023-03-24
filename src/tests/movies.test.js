const request = require('supertest');
const app = require("../app");
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const Movie = require('../models/Movie');
require('../models');

let movieId;

test("POST /movies should create a student", async() => {
    const newMovie = {
        name: "Movie ",
        image: "",
        synopsis: "Synopsis",
        releaseYear: 2021
    }
    const res = await request(app)
        .post("/movies").send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
})

test("GET /movies should return all movies", async() => {
    const res = await request(app)
        .get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

})

test("PUT /movies/:id should update a movie", async() => {
    const body = {
        name: "New Movie"
    }
    const res = await request(app)
        .put(`/movies/${movieId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);    
})

test("POST /movies/:id/actors should set the movies actors", async () => {
    const actor = await Actor.create({
        firstName: "Alex ",
        lastName: "Cedeño ",
        nationality: "Chile",
        image: "",
        birthday: "1981-11-14"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("POST /movies/:id/directors should set movies directors", async() => {
    const director = await Director.create({
        firstName: "Marco",
        lastName: "Cedeño",
        nationality: "Chile ",
        image: "",
        birthday: "1995-11-14"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("POST /movies/:id/genres should set movies genres", async() => {
    const genre = await Genre.create({
        name: "Genres Movie"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("DELETE /movies/:id should delete a movie", async() => {
    const res = await request(app)
        .delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
})

