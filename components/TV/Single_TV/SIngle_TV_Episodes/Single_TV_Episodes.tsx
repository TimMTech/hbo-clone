import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { convertRuntime } from "../../../../utils/conversions/convert";
import { externalNextImageLoader } from "../../../../utils/loaders/externalLoaders";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

interface SingleTVEpisodesProps {
  singleTVEpisodes: any;
  singleTVEpisodeCredits: any;
}

interface People {
  name: string;
  character: string;
  profile_path: string;
  credit_id: string;
  id: number;
}

interface CastAndCrew {
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
    guest_stars,
  },
  singleTVEpisodeCredits: { cast, crew },
}) => {
  const [castDropDown, setCastDropDown] = useState<boolean>(false);
  const [directorDropDown, setDirectorDropDown] = useState<boolean>(false);
  const [writerDropDown, setWriterDropDown] = useState<boolean>(false);

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

      <h1 className="text-xl text-white px-8 pt-4">Guest Stars</h1>
      <div className="flex overflow-x-auto gap-1 no-scrollbar px-8 py-4">
        {guest_stars
          ?.filter((item: People) => item.profile_path !== null)
          .map((people: People) => {
            const { id, credit_id, name, character, profile_path } = people;
            return (
              <div
                key={credit_id}
                className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0"
              >
                <div>
                  <NextLink href={`/people/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                      alt=""
                      className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                    />
                  </NextLink>
                </div>
                <div className="flex flex-col text-left ">
                  <p>{name}</p>
                  <p className="text-white text-lg">{character}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className=" md:grid md:grid-cols-2 md:gap-0 lg:text-lg text-sm flex flex-col gap-4 pb-4 px-8 text-white">
        <div className="flex flex-col gap-4">
          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="text-lg">Cast & Crew</h1>
              {castDropDown ? (
                <AiOutlineUp
                  size={30}
                  className="sm:hidden cursor-pointer"
                  onClick={() => setCastDropDown(!castDropDown)}
                />
              ) : (
                <AiOutlineDown
                  size={30}
                  className="sm:hidden cursor-pointer"
                  onClick={() => setCastDropDown(!castDropDown)}
                />
              )}
            </div>

            <div
              className={`sm:grid sm:grid-cols-2 ${
                castDropDown ? "grid grid-cols-2" : "hidden"
              }`}
            >
              {cast.slice(0, 6).map((actors: CastAndCrew) => {
                const { id, name } = actors;
                return <p key={id}>{name}</p>;
              })}
            </div>
          </div>

          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="text-lg">Directors</h1>
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
              )}{" "}
            </div>
            {crew
              .filter(
                (director: CastAndCrew) => director.department === "Directing"
              )
              .map((result: CastAndCrew) => {
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
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="w-full flex items-center justify-between">
              <h1 className="text-lg">Writers</h1>
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
              .filter(
                (writers: CastAndCrew) => writers.department === "Writing"
              )
              .sort((a: CastAndCrew, b: CastAndCrew) =>
                ("" + b.job).localeCompare(a.job)
              )
              .map((result: CastAndCrew) => {
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
