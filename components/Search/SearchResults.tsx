import NextLink from "next/link";
import {useRouter} from "next/router"

interface SearchResultsProps {
  searchResults: any;
  popularResults: any;
}

interface Movie {
  id: string;
  poster_path: string;
  media_type: string;
  profile_path: string;
  backdrop_path: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults: { results, errors },
  popularResults,
}) => {
  const router = useRouter()
  
  const popular = popularResults.results.map((movies: Movie) => movies);
  return (
    <div className="w-full h-full min-h-screen p-8 ">
      <h1 className="text-white text-2xl font-semibold mb-2">
        {router.query.value === undefined || errors ? "Our Popular Collection" : "Search Results"}
      </h1>
      {router.query.value === undefined || errors  ? (
        <div className="sm:grid-cols-3 md:grid-cols-4 grid grid-cols-2 gap-1 ">
          {popular
            ?.filter((item: Movie) => item.poster_path !== null)
            .map((movie: Movie) => {
              const { id, poster_path } = movie;
              return (
                <div key={id}>
                  <NextLink href={`/movies/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${poster_path}`}
                      alt=""
                      className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                    />
                  </NextLink>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="sm:grid-cols-3 md:grid-cols-4 grid grid-cols-2 gap-1 ">
          {results
            ?.filter(
              (item: Movie) =>
                item.poster_path !== null && item.profile_path !== null
            )
            .map((movie: Movie) => {
              const { id, poster_path, profile_path, media_type } = movie;
              return (
                <div key={id} className="w-full h-full">
                  {media_type === "movie" && (
                    <NextLink href={`/movies/${id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt=""
                        className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                      />
                    </NextLink>
                  )}
                  {media_type === "tv" && (
                    <NextLink href={`/tv/${id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt=""
                        className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                      />
                    </NextLink>
                  )}
                  {media_type === "person" && (
                    <NextLink href={`/people/${id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${profile_path}`}
                        alt=""
                        className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                      />
                    </NextLink>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
