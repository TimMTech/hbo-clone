import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {
  fetchSingleMovie,
  fetchSingleMovieSimilar,
  fetchSingleMovieCredits,
  fetchSingleMovieTrailer
} from "../../../utils/fetchMovie/fetchMovie";
import Single_Movie from "../../../components/Movies/Single_Movie/Single_Movie";

const Movie: NextPage = ({
  singleMovie,
  singleMovieTrailer,
  similarMovies,
  movieCredits,
  
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <>
      <Single_Movie
        singleMovie={singleMovie}
        singleMovieTrailer={singleMovieTrailer}
        similarMovies={similarMovies}
        movieCredits={movieCredits}
      />
    </>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const [singleMovieRes, similarMoviesRes, movieCreditsRes, singleMovieTrailerRes] = await Promise.all(
    [
      await fetchSingleMovie(id),
      await fetchSingleMovieSimilar(id),
      await fetchSingleMovieCredits(id),
      await fetchSingleMovieTrailer(id)
    ]
  );

  const [singleMovie, similarMovies, movieCredits, singleMovieTrailer] = await Promise.all([
    singleMovieRes,
    similarMoviesRes,
    movieCreditsRes,
    singleMovieTrailerRes
  ]);

  return {
    props: {
      singleMovie,
      similarMovies,
      movieCredits,
      singleMovieTrailer
    },
  };
};
