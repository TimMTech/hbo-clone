import NextLink from "next/link"

interface TheatresResults {
  theatres: any;
}

interface Movie {
  id: number;
  poster_path: string;
}

const Theatres_Movies: React.FC<TheatresResults> = ({ theatres: { results } }) => {
  return (
    <div className="md:flex md:flex-row flex flex-col justify-center text-white pt-8 items-center gap-10 w-full">
      <div className="md:w-[400px] md:text-left text-center px-8">
        <h1 className="text-xl md:text-3xl py-1 whitespace-nowrap">
          Movies Currently In Theatres
        </h1>
        
        <p>Check out dates to catch award winning flicks in theatres.</p>
      </div>
      <div className="flex overflow-x-auto gap-1 w-full no-scrollbar px-8">
        {results.map((movie: Movie) => {
          const { id, poster_path } = movie;
          return (
            <div
              key={id}
              className="sm:w-[25%] md:w-[40%] lg:w-[22%] w-[25%] flex-shrink-0 "
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

export default Theatres_Movies;
