interface TheatresResults {
    theatres: any
}

interface Movie {
    id: number;
    poster_path: string
}

const Theatres:React.FC<TheatresResults> = ({theatres : {results}}) => {
    return (
      <div className="text-white p-8 flex">
        <h1 className="text-xl py-4">Popular Movies</h1>
        <div className="flex overflow-x-auto gap-5">
          {results.map((movie: Movie) => {
            const { id, poster_path } = movie;
            return (
              <div
                key={id}
                className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0 "
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
}

export default Theatres;