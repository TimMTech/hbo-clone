import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchPopularPagination } from "../../utils/fetchMovie/fetchMovie";
import { fetchMovieGenres } from "../../utils/fetchGenres/fetchGenres";
import All_Movies from "../../components/Movies/All/All_Movies";

const Movies: NextPage = ({
  popularPaginated,
  movieGenres,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <All_Movies
        popularPaginated={popularPaginated}
        movieGenres={movieGenres}
      />
    </>
  );
};

export default Movies;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page;

  const popularPaginated = await fetchPopularPagination(page);
  const movieGenres = await fetchMovieGenres();

  return {
    props: {
      popularPaginated,
      movieGenres,
    },
  };
};
