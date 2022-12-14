import NextLink from "next/link"

interface TopRatedResults_TV {
  topRated_TV: any;
}

interface TV {
  id: number;
  poster_path: string;
}

const TopRated_TV: React.FC<TopRatedResults_TV> = ({topRated_TV : {results}}) => {
  return (
    <div className="md:flex md:flex-row text-white py-8 flex flex-col items-center ">
      <h1 className="md:text-left text-center text-3xl py-4 w-[450px] px-8">
        Must-Watch Best Rated Series 2022
      </h1>
      <div className="flex overflow-x-auto gap-1 no-scrollbar w-full px-8">
        {results.map((tv: TV) => {
          const { id, poster_path } = tv;
          return (
            <div
              key={id}
              className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0 "
            >
              <NextLink href={`/tv/${id}`}>
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

export default TopRated_TV;
