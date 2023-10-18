import { Movie, Rating, User, db } from '../src/model.js'
import movieData from './data/movies.json' assert { type: 'json' }
import lodash from 'lodash'

console.log('Syncing database...')

await db.sync({ force: true })

console.log('Seeding database...')

const moviesInDB = await Promise.all(
    movieData.map((movie) => {
    const releaseDate = new Date(Date.parse(movie.releaseDate))
    const {overview, posterPath, title} = movie

    const newMovie = Movie.create({
        title,
        overview,
        posterPath,
        releaseDate
    })

    return newMovie
})
)

let usersToCreate = []
for (let i = 0; i < 10; i++) {
    const newUser = User.create({
        email: `user${i}@test.com`,
        password: 'test'
    })
    usersToCreate.push(newUser)
}

const usersInDB = await Promise.all(usersToCreate)

const ratingsInDB = await Promise.all(
    usersInDB.flatMap((user) => {
      const randomMovies = lodash.sampleSize(moviesInDB, 10)
      const movieRatings = randomMovies.map((movie) => {
        return Rating.create({
          score: lodash.random(1, 5),
          userId: user.userId,
          movieId: movie.movieId,
        })
      })
  
      return movieRatings;
    }),
  );
  
console.log(ratingsInDB);

await db.close()
// console.log(usersInDB)
console.log('Finished seeding the database!')