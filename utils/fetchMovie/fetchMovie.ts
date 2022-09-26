interface Movie {
  id: string;
  page: number;
}

export const fetchPopularMovies: Function = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
  );
  const popular = await res.json();
  return popular;
};

export const fetchTopRatedMovies: Function = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
  );
  const topRated = await res.json();
  return topRated;
};

export const fetchUpcomingMovies: Function = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
  );
  const upcoming = await res.json();
  return upcoming;
};

export const fetchTheatresMovies: Function = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
  );
  const nowPlaying = await res.json()
  return nowPlaying
};

export const fetchSingleMovie: Function = async (id:Movie) => {

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
  const singleMovie = await res.json()
  return singleMovie
}

export const fetchSingleMovieSimilar: Function = async (id: Movie) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}}/similar?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
  const similarMovies = await res.json()
  return similarMovies
}

export const fetchSingleMovieCredits: Function = async (id: Movie) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}}/credits?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
  const movieCredits = await res.json()
  return movieCredits
}

export const fetchPopularPagination: Function = async(page: Movie) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=b802b4a83ff17e57417a263b981797fb&page=${page}`
  );
  const popularPaginated = await res.json()
  return popularPaginated
}

