import NextLink from "next/link"


interface PopularResults {
  popular: any;
}

interface Movie {
  id: number;
  poster_path: string;
}

const Popular_Movies: React.FC<PopularResults> = ({ popular: {results} }) => {

  return (
    <div className="text-white p-8">
      <h1 className="text-xl py-4">Popular Movies</h1>
      <div className="flex overflow-x-auto gap-3 no-scrollbar">
        {results.map((movie: Movie) => {
          const { id, poster_path } = movie;
          return (
            <div
              key={id}
              className=" sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0"
            >
              <NextLink href={`/movie/${id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  alt=""
                  className="hover:border-2 hover:border-indigo-600 cursor-pointer h-full"
                />
              </NextLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular_Movies;
