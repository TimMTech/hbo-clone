import { useState, useEffect } from "react";
import NextLink from "next/link";

interface SessionProp {
  session: any;
}

interface Movie {
  user_id: string;
  id: string;
  _id: string;
  poster_path: string;
}

const Dashboard: React.FC<SessionProp> = ({ session: { user } }) => {
  const [movies, setMovies] = useState<any>();
  const [option, setOption] = useState<boolean>(false);

  const handleOption = () => {
    setOption(!option);
  };

  useEffect(() => {
    fetch(`/api/users/${user._id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) console.log("Error");
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="flex flex-col items-center justify-center">
          <div className="text-white w-[150px] h-[150px] rounded-full flex items-center justify-center  bg-gradient-to-r from-purple-900/50 to-violet-700/40 border-[3px] border-pink-500">
            <h1 className="text-7xl">{user.firstName.slice(0, 1)}</h1>
          </div>
          <h2 className="text-white py-2">{user.firstName}</h2>
        </div>

        <button className="hover:border-2 hover:border-purple-600 border-2 border-transparent hover:bg-black text-white text-lg font-bold px-6 py-2 bg-gray-400/25 rounded-md my-6">
          SETTINGS
        </button>
        <div className="md:px-12 lg:px-16 w-full px-8">
          <div className="flex gap-10 items-center">
            <h2
              onClick={handleOption}
              className={`lg:text-2xl hover:border-b-2 hover:border-b-white border-b-2 ${
                !option ? "border-b-white" : "border-b-transparent"
              } leading-8 text-white text-lg font-semibold py-2 cursor-pointer`}
            >
              My List
            </h2>
            <h2
              onClick={handleOption}
              className={`lg:text-2xl hover:border-b-2  hover:border-b-white border-b-2 ${
                option ? "border-b-white" : "border-b-transparent"
              } leading-8 text-white text-lg font-semibold py-2 cursor-pointer`}
            >
              Continue Watching
            </h2>
          </div>
          <div className="w-full border border-white/30 " />
        </div>
        <div className="md:px-12 lg:px-16 flex overflow-x-auto gap-1 no-scrollbar px-8 my-4">
          {!option &&
            movies?.map((movie: Movie) => {
              const { _id, id, poster_path } = movie;
              return (
                <div
                  key={_id}
                  className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0"
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
    </div>
  );
};

export default Dashboard;
