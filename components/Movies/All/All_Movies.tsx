import NextLink from "next/link";
import { useRouter } from "next/router";
import { limitPages } from "../../../utils/limitAPI/limit";
import ReactPaginate from "react-paginate";
import { useState } from "react";

//FIND A WAY TO FILTER ALL MOVIES

interface AllMoviesProps {
  popularPaginated: any;
  movieGenres: any;
}

interface Movie {
  id: string;
  poster_path: string;
  page: string;
  genre_ids: [number];
}

interface Genres {
  id: string;
  name: string;
}

const All_Movies: React.FC<AllMoviesProps> = ({
  popularPaginated: { results, total_pages, page },
  movieGenres: { genres },
}) => {
  const router = useRouter();

  const [selectedGenreId, setSelectedGenreId] = useState<string>("");
  const [selectedGenreTitle, setSelectedGenreTitle] =
    useState<string>("default");

  const handleNextPage = (page: any) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const handleGenreChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      dataset: { set },
      id,
    } = e.currentTarget;

    setSelectedGenreId(id);
    setSelectedGenreTitle(set);
  };

  return (
    <div className="w-full h-full">
      <div className="mt-20 min-h-screen">
        <h1 className="text-white p-8 font-bold text-2xl">All Movies</h1>

        <div className="flex items-center overflow-x-auto gap-4 w-full no-scrollbar px-8 ">
          <div
            data-set="default"
            onClick={(e) => handleGenreChange(e)}
            className={`${
              selectedGenreTitle === "default" && "bg-white text-black"
            } hover:border-purple-600 text-white font-semibold border border-white rounded-3xl px-3 py-1 whitespace-nowrap cursor-pointer`}
          >
            All
          </div>
          {genres.map((genre: Genres) => {
            const { id, name } = genre;
            return (
              <div
                id={id}
                onClick={(e) => handleGenreChange(e)}
                data-set={name}
                key={id}
                className={`${
                  selectedGenreTitle === name && "bg-white text-black"
                } hover:border-purple-600 text-white font-semibold border border-white rounded-3xl px-3 py-1 whitespace-nowrap cursor-pointer`}
              >
                {name}
              </div>
            );
          })}
        </div>

        {selectedGenreTitle === "default" ? (
          <div className="md:grid-cols-4 grid grid-cols-3 p-8 gap-1 h-full">
            {results.map((movie: Movie) => {
              const { id, poster_path } = movie;
              return (
                <div key={id} className="w-full h-full">
                  <NextLink href={`/movies/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${poster_path}`}
                      alt=""
                      className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                    />
                  </NextLink>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="md:grid-cols-4 grid grid-cols-3 p-8 gap-1 h-full">
            {results
              ?.filter((item: Movie) =>
                item.genre_ids.includes(parseInt(selectedGenreId))
              )
              .map((movie: Movie) => {
                const { id, poster_path } = movie;
                return (
                  <div key={id} className="w-full h-full">
                    <NextLink href={`/movies/${id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt=""
                        className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                      />
                    </NextLink>
                  </div>
                );
              })}
          </div>
        )}
        {results
          ?.filter((item: Movie) =>
            item.genre_ids.includes(parseInt(selectedGenreId))
          )
          .every((val:boolean) => val === true) &&
          selectedGenreTitle !== "default" && (
            <div className="text-white px-8 text-xl">Please See Next Page.  TheMovieDB API Does Not Allow No-Limit Fetching.</div>
          )}
      </div>

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        nextClassName=""
        previousClassName=""
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"text-purple-500"}
        containerClassName="w-full  flex justify-between p-4 bg-indigo-800"
        pageCount={limitPages(total_pages)}
        forcePage={page - 1}
        onPageChange={handleNextPage}
      />
    </div>
  );
};

export default All_Movies;
