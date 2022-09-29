import React, { useState, useEffect } from "react";
import { convertRuntime } from "../../../utils/conversions/convert";
import { externalNextImageLoader } from "../../../utils/loaders/externalLoaders";
import { AiOutlineDown } from "react-icons/ai";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import NextImage from "next/image";

interface SingleTVProps {
  singleTV: any;
  similarTV: any;
}

interface Season {
  season_number: number;
}

interface Genre {
  id: number;
  name: string;
}

interface Episodes {
  episode_number: number;
  name: string;
  still_path: string;
  runtime: number;
}

interface TV {
  id: string;
  poster_path: string;
}

const Single_TV: React.FC<SingleTVProps> = ({
  singleTV: { seasons, name, genres, overview, backdrop_path, poster_path, id },
  similarTV: { results },
}) => {
  const { data: session } = useSession();

  const [episodes, setEpisodes] = useState<any>();
  const [selectSeason, setSelectSeason] = useState<boolean>(false);

  const [season, setSeason] = useState<any>();

  const handleSeasonToggle = () => {
    setSelectSeason(!selectSeason);
  };

  const handleSeasonChange = async (e: React.MouseEvent<HTMLDivElement>) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${e.currentTarget.dataset.set}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
    )
      .then((response) => {
        if (!response.ok) console.log("error");
        return response.json();
      })
      .then((data) => {
        setEpisodes(data.episodes);
        setSeason(data.season_number);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const getFirstSeason = async () => {
      const first_season = seasons
        .map((season: Season) => season.season_number)
        .slice(0, 1);

      fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${first_season}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
      )
        .then((response) => {
          if (!response.ok) console.log("error");
          return response.json();
        })
        .then((data) => {
          setEpisodes(data.episodes);
          setSeason(data.season_number);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getFirstSeason();
  }, [id, seasons]);

  return (
    <div className="w-full h-full">
      <div className=" sm:h-[380px] md:h-[480px] lg:h-[580px] h-[570px] relative filter brightness-50 ">
        <NextImage
          loader={externalNextImageLoader}
          src={backdrop_path || poster_path}
          alt=""
          layout="fill"
          objectFit="cover"
        />
        <div className="image-inset"></div>
      </div>
      <div className="px-8">
        <div className=" text-white flex flex-col items-start gap-3 ">
          <h1 className="lg:text-4xl text-3xl font-bold">{name}</h1>
          {session ? (
            <button className="hover:bg-none hover:bg-white hover:text-black hover:shadow-[inset_0_0_0_2px] hover:shadow-black bg-matte-black px-6 py-2 rounded-md ">
              Add To Favourite
            </button>
          ) : (
            <button className="hover:bg-none  hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
              <NextLink href="/auth/subscribe">SIGN UP</NextLink>
            </button>
          )}
          <div className="flex items-center gap-4">
            {genres.map((genre: Genre) => {
              const { id, name } = genre;
              return (
                <p key={id} className="text-sm font-semibold">
                  {name}
                </p>
              );
            })}
          </div>
        </div>
        <p className="md:text-xl text-lg font-extralight max-w-[780px] py-4 ">
          {overview}
        </p>
        <div className="md:w-[250px] text-white  bg-[rgba(255,255,255,0.12)] rounded-md cursor-pointer">
          <div
            onClick={handleSeasonToggle}
            className="flex items-center justify-between p-4 border rounded-md "
          >
            <h2 className="font-bold">
              {season > 0 ? "Season " + season : "Specials"}
            </h2>
            <AiOutlineDown />
          </div>
          {selectSeason && (
            <div className=" flex flex-col flex-grow overflow-y-auto h-full max-h-[100px] items-start justify-start  text-white  rounded-md">
              {seasons.map((season: Season) => {
                const { season_number } = season;
                return (
                  <div
                    tabIndex={season_number}
                    className="focus:bg-white/50 focus:rounded-md  hover:bg-white/50   hover:rounded-md my-[0.1rem] pl-6 p-4 w-full cursor-pointer"
                    key={season_number}
                    data-set={season_number}
                    onClick={(e) => handleSeasonChange(e)}
                  >
                    {season_number > 0 ? "Season " + season_number : "Specials"}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="md:grid-cols-3 lg:grid-cols-4 grid grid-cols-2 py-4 gap-4">
          {episodes
            ?.filter((item: Episodes) => item.still_path !== null)
            .map((episode: Episodes) => {
              const { episode_number, name, still_path, runtime } = episode;
              return (
                <div key={episode_number} className="text-white">
                  <img
                    src={`https://image.tmdb.org/t/p/original${still_path}`}
                    alt=""
                    className=""
                  />
                  <div className="pt-2 pb-4">
                    <h2 className="font-bold">
                      {still_path && episode_number + ". " + name}{" "}
                    </h2>

                    <p className="text-sm">
                      {still_path && convertRuntime(runtime)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <h1 className="text-white pt-2 px-8">More Like This</h1>
      <div className="flex overflow-x-auto gap-1 no-scrollbar w-full py-4 px-8 ">
        {results.map((tv: TV) => {
          const { id, poster_path } = tv;
          return (
            <div
              key={id}
              className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[38%]  flex-shrink-0 "
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

export default Single_TV;
