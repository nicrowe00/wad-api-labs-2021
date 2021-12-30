import userModel from '../api/users/userModel';
import moviesGenres from '../api/genres/moviesGenres';
import movieModel from '../api/movies/movieModel';
import movies from './movies.js'; 
import users from './users';
import genres from './genres';
import dotenv from 'dotenv';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
    console.log('load user Data');
    try {
      await userModel.deleteMany();
      await users.forEach(user => userModel.create(user));
      console.info(`${users.length} users were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  }
  
async function loadGenres(){
    console.log('load movie Genres');
    try{
        await moviesGenres.deleteMany();
        await moviesGenres.collection.insertMany(genres);
        console.info(`${genres.length} genres were successfully stored.`);
    }catch (err) {
        console.error(`failed to Load genre Data: ${err}`);
    }
}

export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

if (process.env.SEED_DB) {
  loadUsers();
  loadGenres();
  loadMovies();
}

