import NextLink from "next/link";
import NextImage from "next/image";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { convertRuntime } from "../../../utils/conversions/convert";
import { externalNextImageLoader } from "../../../utils/loaders/externalLoaders";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BiMoviePlay } from "react-icons/bi";

interface SingleMovieProps {
  singleMovie: any;
  singleMovieTrailer: any;
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
  singleMovie: {
    id,
    backdrop_path,
    poster_path,
    original_title,
    runtime,
    release_date,
    vote_average,
    overview,
  },

  singleMovieTrailer,
  similarMovies: { results },
  movieCredits: { cast, crew },
}) => {
  const trailer = singleMovieTrailer.results
    .filter((item: any) => item.type === "Trailer")
    .map((trailer: any) => trailer.key);

  const { data: session } = useSession();

  const [castDropDown, setCastDropDown] = useState<boolean>(false);
  const [directorDropDown, setDirectorDropDown] = useState<boolean>(false);
  const [producerDropDown, setProducerDropDown] = useState<boolean>(false);
  const [writerDropDown, setWriterDropDown] = useState<boolean>(false);
  const [soundDropDown, setSoundDropDown] = useState<boolean>(false);

  const [addedMovie, setAddedMovie] = useState<boolean>(false);

  const handleAddMovie = async () => {
    await fetch(`/api/movies/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: session?.user._id,
        id,
        poster_path,
      }),
    })
      .then((response) => {
        if (!response.ok) console.log("ERROR");
        return response.json();
      })
      .then(() => {
        setAddedMovie(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveMovie = async () => {
    await fetch(`/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        if (!response.ok) console.log("Error");
        return response.json();
      })
      .then(() => {
        setAddedMovie(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (session) {
      setAddedMovie(false)
      fetch(`/api/users/${session?.user._id}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) console.log("Error");
          return response.json();
        })
        .then((data) => {
          const alreadyAdded = data
            .map((movies: any) => parseInt(movies.id))
            .includes(id);
          if (alreadyAdded) setAddedMovie(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, session]);

  return (
    <div className="w-full h-full">
      <div className=" sm:h-[380px] md:h-[480px] lg:h-[600px] h-[350px] relative  filter brightness-50 ">
        <NextImage
          loader={externalNextImageLoader}
          src={backdrop_path || poster_path}
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="image-inset"></div>
      </div>
      <div className="px-8">
        <div className=" text-white  flex flex-col items-start gap-3">
          <h1 className="lg:text-4xl text-3xl font-bold">{original_title}</h1>
          <div className="text-white/60 w-full flex gap-5">
            <span>{convertRuntime(runtime)}</span>
            <span>{release_date.slice(0, 4)}</span>
            <span>{vote_average.toFixed(1)}</span>
          </div>

          <a
            className="text-white/70 text-sm flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/watch?v=${trailer.slice(0, 1)}`}
          >
            <BiMoviePlay />
            TRAILER
          </a>

          {session ? (
            <button
              onClick={addedMovie ? handleRemoveMovie : handleAddMovie}
              className="hover:bg-black hover:border hover:border-white border border-transparent  bg-button-gray px-6 py-2 rounded-md "
            >
              {addedMovie ? "Remove From Favourite" : "Add To Favourite"}
            </button>
          ) : (
            <button className="hover:bg-none  hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
              <NextLink href="/auth/subscribe">SIGN UP</NextLink>
            </button>
          )}
        </div>
        <p className=" md:text-xl text-lg font-extralight  max-w-[780px] py-4">
          {overview}
        </p>
      </div>
      <div className="text-white">
        <h1 className="text-xl pb-4 px-8">More Like This</h1>
        <div className="flex overflow-x-auto gap-1 no-scrollbar px-8">
          {results.map((similar: SimilarMovies) => {
            const { id, poster_path } = similar;
            return (
              <div
                key={id}
                className=" sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0"
              >
                <NextLink href={`/movies/${id}`}>
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
        <div className=" md:grid md:grid-cols-2 md:gap-0 lg:text-lg text-sm flex flex-col gap-4 py-4 px-8 ">
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
