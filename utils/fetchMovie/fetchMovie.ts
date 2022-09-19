interface Movie {
  id: number;
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
