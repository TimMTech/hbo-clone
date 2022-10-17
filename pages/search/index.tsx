import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchPopularMovies } from "../../utils/fetchMovie/fetchMovie";
import { fetchSearch } from "../../utils/fetchSearch/fetchSearch";
import SearchBar from "../../components/Search/SearchBar";
import SearchResults from "../../components/Search/SearchResults";
const Search: NextPage = ({
  searchResults,
  popularResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <SearchBar />
      <SearchResults
        searchResults={searchResults}
        popularResults={popularResults}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const value = context.query.value;

  const [searchResultsRes, popularResultsRes] = await Promise.all([
    await fetchSearch(value),
    await fetchPopularMovies(),
  ]);

  const [searchResults, popularResults] = await Promise.all([
    searchResultsRes,
    popularResultsRes,
  ]);

  return {
    props: {
      searchResults,
      popularResults,
    },
  };
};

export default Search;
