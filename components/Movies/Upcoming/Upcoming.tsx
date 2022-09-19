interface UpcomingResults {
    upcoming: any
}

interface Movie {
    id: number;
    poster_path: string
}

const Upcoming:React.FC<UpcomingResults> = ({upcoming: {results}}) => {
    return (
      <div className="text-white p-8">
        <h1 className="text-xl py-4">Upcoming Movies</h1>
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

export default Upcoming