import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { convertRuntime } from "../../../../utils/conversions/convert";
import { externalNextImageLoader } from "../../../../utils/loaders/externalLoaders";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

interface SingleTVEpisodesProps {
  singleTVEpisodes: any;
}

interface People {
  name: string;
  character: string;
  profile_path: string;
  credit_id: string;
  id: number;
}

interface Crew {
  id: string;
  name: string;
  job: string;
  department: string;
  credit_id: string;
}

const Single_TV_Episodes: React.FC<SingleTVEpisodesProps> = ({
  singleTVEpisodes: {
    name,
    overview,
    runtime,
    still_path,
    vote_average,
    air_date,
    crew,
    guest_stars,
  },
}) => {
  const [directorDropDown, setDirectorDropDown] = useState(false);
  const [writerDropDown, setWriterDropDown] = useState(false);

  return (
    <div className="w-full h-full">
      <div className=" sm:h-[380px] md:h-[480px] lg:h-[590px] h-[350px] relative filter brightness-50 ">
        <NextImage
          loader={externalNextImageLoader}
          src={still_path}
          alt=""
          layout="fill"
          objectFit="cover"
        />
        <div className="image-inset" />
      </div>

      <div className="px-8">
        <div className=" text-white flex flex-col items-start gap-3 ">
          <h1 className="lg:text-4xl text-3xl font-bold">{name}</h1>
          <div className="text-white/60 w-full flex gap-5">
            <span>{convertRuntime(runtime)}</span>
            <span>{air_date.slice(0, 4)}</span>
            <span>{vote_average.toFixed(1)}</span>
          </div>
          <p className="md:text-xl text-lg font-extralight max-w-[780px]">
            {overview}
          </p>
        </div>
      </div>

      <h1 className="text-xl text-white py-4 px-8">Guest Stars</h1>
      <div className="flex overflow-x-auto gap-1 no-scrollbar px-8">
        {guest_stars
          ?.filter((item: People) => item.profile_path !== null)
          .map((people: People) => {
            const { id, credit_id, name, character, profile_path } = people;
            return (
              <div
                key={credit_id}
                className=" sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0"
              >
                <NextLink href={`/people/${id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                    alt=""
                    className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                  />
                </NextLink>
              </div>
            );
          })}
      </div>
      <div className="text-white sm:grid sm:grid-cols-2 sm:gap-0 lg:text-lg text-sm flex flex-col gap-4 py-4 px-8 ">
        <div className="flex flex-col gap-4">
          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="lg:text-2xl text-lg">Directors</h1>
              {directorDropDown ? (
                <AiOutlineUp
                  size={30}
                  className="sm:hidden cursor-pointer"
                  onClick={() => setDirectorDropDown(!directorDropDown)}
                />
              ) : (
                <AiOutlineDown
                  size={30}
                  className="sm:hidden cursor-pointer"
                  onClick={() => setDirectorDropDown(!directorDropDown)}
                />
              )}
            </div>
            {crew
              .filter((director: Crew) => director.department === "Directing")
              .map((result: Crew) => {
                const { credit_id, name, job } = result;
                return (
                  <div
                    key={credit_id}
                    className={`sm:grid sm:grid-cols-2 ${
                      directorDropDown ? "grid grid-cols-2" : "hidden"
                    }`}
                  >
                    <p>{job}</p>
                    <p>{name}</p>
                  </div>
                );
              })}
          </div>
          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="lg:text-2xl text-lg">Writers</h1>
              {writerDropDown ? (
                <AiOutlineUp
                  size={30}
                  className="sm:hidden cursor-pointer"
                  onClick={() => setWriterDropDown(!writerDropDown)}
                />
              ) : (
                <AiOutlineDown
                  size={30}
                  className="sm:hidden cursor-pointer"
                  onClick={() => setWriterDropDown(!writerDropDown)}
                />
              )}{" "}
            </div>
            {crew
              .filter((writers: Crew) => writers.department === "Writing")
              .sort((a: Crew, b: Crew) => ("" + b.job).localeCompare(a.job))
              .map((result: Crew) => {
                const { credit_id, name, job } = result;
                return (
                  <div
                    key={credit_id}
                    className={`sm:grid sm:grid-cols-2 ${
                      writerDropDown ? "grid grid-cols-2" : "hidden"
                    }`}
                  >
                    <p>{job}</p>
                    <p>{name}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single_TV_Episodes;
