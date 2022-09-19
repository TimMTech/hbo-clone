interface TheatresResults {
  theatres: any;
}

interface Movie {
  id: number;
  poster_path: string;
}

const Theatres_Movies: React.FC<TheatresResults> = ({ theatres: { results } }) => {
  return (
    <div className="md:flex md:flex-row flex flex-col justify-center text-white p-4  items-center gap-10 w-full">
      <div className="md:w-[400px] md:text-left text-center">
        <h1 className="text-xl md:text-3xl py-1 whitespace-nowrap ">
          Movies Currently In Theatres
        </h1>
        <p>Check out dates to catch award winning flicks in theatres.</p>
      </div>
      <div className="flex overflow-x-auto gap-3 w-full no-scrollbar">
        {results.map((movie: Movie) => {
          const { id, poster_path } = movie;
          return (
            <div
              key={id}
              className="sm:w-[25%] md:w-[40%] lg:w-[22%] w-[25%] flex-shrink-0 "
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Theatres_Movies;
