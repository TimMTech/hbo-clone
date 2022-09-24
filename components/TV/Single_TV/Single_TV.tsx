import React, { useState, useEffect } from "react";
import { convertRuntime } from "../../../utils/conversions/convert";
import { AiOutlineDown } from "react-icons/ai";
import NextLink from "next/link";

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
  singleTV: { seasons, name, genres, overview, backdrop_path, id },
  similarTV: { results },
}) => {
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
  }, []);

  return (
    <div className="w-full h-full">
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className=" sm:h-[320px]  md:h-[390px] lg:h-[500px] relative filter brightness-50 "
      />

      <div className="sm:absolute sm:top-[25%] md:top-[35%] lg:top-[50%] text-white p-4 flex flex-col gap-3 ">
        <h1 className="lg:text-4xl text-3xl font-bold">{name}</h1>
        {genres.map((genre: Genre) => {
          const { id, name } = genre;
          return (
            <p key={id} className="text-lg font-semibold">
              {name}
            </p>
          );
        })}
      </div>
      <p className="sm:py-4 md:text-xl text-lg font-extralight px-4 max-w-[780px]">
        {overview}
      </p>
      <div className="md:w-[250px] text-white m-4  bg-[rgba(255,255,255,0.12)] rounded-md">
        <div className="flex items-center justify-between px-4 border p-4 rounded-md ">
          <h2 className="font-bold">
            {season > 0 ? "Season " + season : "Specials"}
          </h2>
          <AiOutlineDown
            onClick={handleSeasonToggle}
            className="cursor-pointer"
          />
        </div>
        {selectSeason && (
          <div className=" flex flex-col flex-grow overflow-y-auto h-full max-h-[100px] items-start justify-start  text-white  rounded-md">
            {seasons.map((season: Season) => {
              const { season_number } = season;
              return (
                <div
                  className="hover:bg-white/50 hover:rounded-md p-4 w-full cursor-pointer"
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

      <div className="md:grid-cols-3 lg:grid-cols-4 grid grid-cols-2 py-2 px-4 gap-4">
        {episodes
          ?.filter((item: Episodes) => item.still_path !== null)
          .map((episode: Episodes) => {
            const { episode_number, name, still_path, runtime } = episode;
            return (
              <div key={episode_number} className="text-white">
                <img
                  src={`https://image.tmdb.org/t/p/original/${still_path}`}
                  alt=""
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

      <h1 className="text-white pl-4 pt-2">More Like This</h1>
      <div className="flex overflow-x-auto gap-3 no-scrollbar w-full   p-4">
        {results.map((tv: TV) => {
          const { id, poster_path } = tv;
          return (
            <div
              key={id}
              className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%]  flex-shrink-0 "
            >
              <NextLink href={`/tv/${id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  alt=""
                  className="hover:border-2 hover:border-indigo-600 cursor-pointer h-full"
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
