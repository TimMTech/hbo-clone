export const fetchTopRatedTV = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
    );
    const topRated = await res.json()
    return topRated
}