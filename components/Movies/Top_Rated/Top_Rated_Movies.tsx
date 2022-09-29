import NextLink from "next/link"

interface TopRatedResults {
  topRated: any;
}

interface Movie {
  id: number;
  poster_path: string;
}

const TopRated_Movies: React.FC<TopRatedResults> = ({ topRated: { results } }) => {
  return (
    <div className="text-white">
      <h1 className="text-xl py-4 px-8">Top Rated Movies</h1>
      <div className="flex overflow-x-auto gap-1 no-scrollbar px-8">
        {results.map((movie: Movie) => {
          const { id, poster_path } = movie;
          return (
            <div
              key={id}
              className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0 "
            >
              <NextLink href={`/movie/${id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  alt=""
                  className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                />
              </NextLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRated_Movies;
