export const fetchMovieGenres:Function = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
    );
    const movieGenres = await res.json();
    return movieGenres;
}

export const fetchTVGenres: Function = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
  );
  const tvGenres = await res.json()
  return tvGenres
}