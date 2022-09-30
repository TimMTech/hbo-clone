import { useState, useEffect } from "react";


interface SessionProp {
  session: any;
}

const Dashboard: React.FC<SessionProp> = ({ session: { user } }) => {

  const [movies, setMovies] = useState<any>()
  
  useEffect(() => {
    fetch(`/api/users/${user._id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) console.log("Error");
        return response.json();
      })
      .then((data) => {
        setMovies(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center mt-20 gap-14">
        <div className="flex flex-col items-center justify-center">
          <div className="text-white w-[150px] h-[150px] rounded-full flex items-center justify-center  bg-gradient-to-r from-purple-900/50 to-violet-700/40 border-[3px] border-pink-500">
            <h1 className="text-7xl">{user.firstName.slice(0, 1)}</h1>
          </div>
          <h2 className="text-white py-2">{user.firstName}</h2>
        </div>

        <button className="hover:border-2 hover:border-purple-600 border-2 border-transparent hover:bg-black text-white text-lg font-bold px-6 py-2 bg-gray-400/25 rounded-md">
          SETTINGS
        </button>
        <div className="md:px-12 lg:px-16 w-full px-8">
          <div className="flex gap-10 items-center">
            <h2 className="lg:text-2xl hover:border-b-2 hover:border-b-white border-b-2 border-b-transparent leading-8 text-white text-lg font-semibold py-2 cursor-pointer">
              My List
            </h2>
            <h2 className="lg:text-2xl hover:border-b-2  hover:border-b-white border-b-2 border-b-transparent leading-8 text-white text-lg font-semibold py-2 cursor-pointer">
              Continue Watching
            </h2>
          </div>
          <div className="w-full border border-white/30 " />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
