interface TV {
  id: string;
  season_number: string;
}

export const fetchTopRatedTV: Function = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
  );
  const topRated = await res.json();
  return topRated;
};

export const fetchSingleTV: Function = async (id: TV) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
  const singleTV = await res.json();
  return singleTV;
};

export const fetchSingleTVSeasons: Function = async (id: TV, season_number:TV) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
  const singleTVSeasons = await res.json()
  return singleTVSeasons
};

export const fetchSimilarTV: Function = async (id: TV) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
    const similarTV = await res.json()
    return similarTV
}
