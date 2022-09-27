import ReactPaginate from "react-paginate";
import NextLink from "next/link";
import { limitPages } from "../../../utils/limitAPI/limit";
import { useRouter } from "next/router";
import { useState } from "react";

interface AllShowsProps {
  popularPaginated: any;
}

interface TV {
  id: string;
  poster_path: string;
  page: string;
}

const All_Shows: React.FC<AllShowsProps> = ({
  popularPaginated: { results, total_pages, page },
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleNextPage = (page: any) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  return (
    <div className="w-full h-full">
      {!loading && (
        <div className="mt-20 ">
          <h1 className="text-white pl-6 font-bold text-2xl">All Shows</h1>
          <div className="md:grid-cols-4 grid grid-cols-3 p-6 gap-3 ">
            {results.map((tv: TV) => {
              const { id, poster_path } = tv;
              return (
                <div key={id} className="w-full h-full">
                  <NextLink href={`/tv/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${poster_path}`}
                      alt=""
                      className="hover:border-2 hover:border-indigo-600 cursor-pointer h-full"
                    />
                  </NextLink>
                </div>
              );
            })}
          </div>

          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            nextClassName=""
            previousClassName=""
            breakLabel={"..."}
            breakClassName={"break-me"}
            activeClassName={"text-purple-500"}
            containerClassName="w-full flex justify-between p-4 bg-indigo-800"
            pageCount={limitPages(total_pages)}
            initialPage={page - 1}
            onPageChange={handleNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default All_Shows;
