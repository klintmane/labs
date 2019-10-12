import { get, post, put, del } from "./base";

export const getMovies = page =>
  get(`http://localhost:4000/movies?page=${page}`);

export const getTopMovies = page =>
  get(`http://localhost:4000/movies/top?page=${page}`);

export const getGenres = () => get(`http://localhost:4000/genres`);

const Cache = name => ({
  get: key => JSON.parse(localStorage.getItem(name) || "{}")[key],
  set: (key, val) =>
    localStorage.setItem(
      "movie_cache",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem(name) || "{}"),
        [key]: val
      })
    )
});

const movieDetailsCache = Cache("movie_cache");

export const getMovieDetails = id => {
  const cached = movieDetailsCache.get(id);

  return cached
    ? new Promise(res => res(cached))
    : get(
        `//api.themoviedb.org/3/movie/tt${id}?external_source=imdb_id&api_key=d6ddc6932500487892b921c57c941690`
      ).then(res => {
        Object.keys(res).length > 0 && movieDetailsCache.set(id, res);
        return res;
      });
};
