import React, { useState, useEffect } from "react";

interface SingleTVProps {
  singleTV: any;
}

interface Season {
  season_number: number;
}

interface Episodes {
  episode_number: number;
  name: string;
  still_path: string;
}

const Single_TV: React.FC<SingleTVProps> = ({
  singleTV: { seasons, name, overview, backdrop_path, id },
}) => {
  const [episodes, setEpisodes] = useState<any>();

  const handleSeasonChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${e.target.value}?api_key=b802b4a83ff17e57417a263b981797fb&page=1`
    )
      .then((response) => {
        if (!response.ok) console.log("error");
        return response.json();
      })
      .then((data) => {
        setEpisodes(data.episodes);
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
      </div>
      <p className="sm:py-4 md:text-xl text-lg font-extralight px-4 max-w-[780px]">
        {overview}
      </p>
      <select onChange={(e) => handleSeasonChange(e)}>
        {seasons.map((season: Season) => {
          let { season_number } = season;

          return (
            <option key={season_number} value={season_number}>
              {season_number > 0 ? "Season " + season_number : "Specials"}
            </option>
          );
        })}
      </select>
      {episodes?.map((episode: Episodes) => {
        const { episode_number, name, still_path } = episode;
        return (
          <div key={episode_number}>
            <span>{episode_number}</span>
            <span>{name}</span>
            <img
              src={`https://image.tmdb.org/t/p/original/${still_path}`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default Single_TV;
