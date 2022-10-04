interface Search {
    name: string;
}

export const fetchSearch : Function = async (value:Search) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=b802b4a83ff17e57417a263b981797fb&query=${value}`
    );
    const searchResults = await res.json()
    return searchResults
}