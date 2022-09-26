import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {
  fetchSingleMovie,
  fetchSingleMovieSimilar,
  fetchSingleMovieCredits,
} from "../../../utils/fetchMovie/fetchMovie";
import Single_Movie from "../../../components/Movies/Single_Movie/Single_Movie";

const Movie: NextPage = ({
  singleMovie,
  similarMovies,
  movieCredits,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Single_Movie
        singleMovie={singleMovie}
        similarMovies={similarMovies}
        movieCredits={movieCredits}
      />
    </>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const singleMovie = await fetchSingleMovie(id);
  const similarMovies = await fetchSingleMovieSimilar(id);
  const movieCredits = await fetchSingleMovieCredits(id);

  return {
    props: {
      singleMovie,
      similarMovies,
      movieCredits,
    },
  };
};