interface Person {
  id: string;
}

export const fetchPopularPeople: Function = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/person/popular?api_key=b802b4a83ff17e57417a263b981797fb&page=1"
    );
    const popular = await res.json();
    return popular;
}

export const fetchSinglePerson: Function = async (id:Person) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
  );
  const singlePerson = await res.json()
  return singlePerson
}