import NextLink from "next/link";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { convertRuntime } from "../../../utils/conversions/convert";
import React, { useState } from "react";

interface SingleMovieProps {
  singleMovie: any;
  similarMovies: any;
  movieCredits: any;
}

interface SimilarMovies {
  id: string;
  poster_path: string;
}

interface CastAndCrew {
  id: string;
  name: string;
  job: string;
  department: string;
  credit_id: string;
}

const Single_Movie: React.FC<SingleMovieProps> = ({
  singleMovie,
  similarMovies: { results },
  movieCredits: { cast, crew },
}) => {
  const [castDropDown, setCastDropDown] = useState<boolean>(false);
  const [directorDropDown, setDirectorDropDown] = useState<boolean>(false);
  const [producerDropDown, setProducerDropDown] = useState<boolean>(false);
  const [writerDropDown, setWriterDropDown] = useState<boolean>(false);
  const [soundDropDown, setSoundDropDown] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <img
        src={`https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path}`}
        alt=""
        className=" sm:h-[320px]  md:h-[390px] lg:h-[500px] relative filter brightness-50 "
      />

      <div className="sm:absolute sm:top-[25%] md:top-[35%] lg:top-[50%] text-white p-4 flex flex-col gap-3 ">
        <h1 className="lg:text-4xl text-3xl font-bold">
          {singleMovie.original_title}
        </h1>
        <div className="text-white/60 w-full flex gap-5">
          <span>{convertRuntime(singleMovie.runtime)}</span>
          <span>{singleMovie.release_date.slice(0, 4)}</span>
        </div>
      </div>
      <p className="sm:py-4 md:text-xl text-lg font-extralight px-4 max-w-[780px]">
        {singleMovie.overview}
      </p>
      <div className="text-white p-4">
        <h1 className="text-xl pb-4">More Like This</h1>
        <div className="flex overflow-x-auto gap-3 no-scrollbar">
          {results.map((similar: SimilarMovies) => {
            const { id, poster_path } = similar;
            return (
              <div
                key={id}
                className=" sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0"
              >
                <NextLink href={`/movie/${id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    alt=""
                    className="hover:border-2 hover:border-indigo-600 cursor-pointer"
                  />
                </NextLink>
              </div>
            );
          })}
        </div>
        <div className=" md:grid md:grid-cols-2 md:gap-0 lg:text-lg text-sm flex flex-col gap-4 py-4 ">
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
                <h1 className="text-lg">Producers</h1>
                {producerDropDown ? (
                  <AiOutlineUp
                    size={30}
                    className="sm:hidden cursor-pointer"
                    onClick={() => setProducerDropDown(!producerDropDown)}
                  />
                ) : (
                  <AiOutlineDown
                    size={30}
                    className="sm:hidden cursor-pointer"
                    onClick={() => setProducerDropDown(!producerDropDown)}
                  />
                )}{" "}
              </div>
              {crew
                .filter(
                  (producer: CastAndCrew) =>
                    producer.department === "Production"
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
                        producerDropDown ? "grid grid-cols-2" : "hidden"
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
            <div>
              <div className="w-full flex items-center justify-between">
                <h1 className="text-lg">Music</h1>
                {soundDropDown ? (
                  <AiOutlineUp
                    size={30}
                    className="sm:hidden cursor-pointer"
                    onClick={() => setSoundDropDown(!soundDropDown)}
                  />
                ) : (
                  <AiOutlineDown
                    size={30}
                    className="sm:hidden cursor-pointer"
                    onClick={() => setSoundDropDown(!soundDropDown)}
                  />
                )}{" "}
              </div>
              {crew
                .filter((sound: CastAndCrew) => sound.department === "Sound")
                .sort((a: CastAndCrew, b: CastAndCrew) =>
                  ("" + b.job).localeCompare(a.job)
                )
                .map((result: CastAndCrew) => {
                  const { credit_id, name, job } = result;
                  return (
                    <div
                      key={credit_id}
                      className={`sm:grid sm:grid-cols-2 ${
                        soundDropDown ? "grid grid-cols-2" : "hidden"
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
    </div>
  );
};

export default Single_Movie;
