
const Movies = require("./Movie");
const Actors = require("./Actor");
const Director = require("./Director")
const Genres = require("./Genre")

Actors.belongsToMany(Movies, {through: "MoviesActors"});
Movies.belongsToMany(Actors, {through: "MoviesActors"});

Movies.belongsToMany(Director, {through: "MoviesDirector"});
Director.belongsToMany(Movies, {through: "MoviesDirector"});

Movies.belongsToMany(Genres, {through: "MoviesGenres"});
Genres.belongsToMany(Movies, {through: "MoviesGenres"});

