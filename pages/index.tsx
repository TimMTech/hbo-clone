import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, fetchTheatresMovies} from "../utils/fetchMovie/fetchMovie"
import {fetchTopRatedTV} from "../utils/fetchTV/fetchTV"
import Banner from "../components/Banner/Banner";
import Popular_Movies from "../components/Movies/Popular/Popular_Movies";
import TopRated_Movies from "../components/Movies/Top_Rated/Top_Rated_Movies";
import Upcoming_Movies from "../components/Movies/Upcoming/Upcoming_Movies";
import Theatres_Movies from "../components/Movies/Theatres/Theatres_Movies";

import TopRated_TV from "../components/TV/Top_Rated/Top_Rated_TV";


const Home: NextPage = ({
  popular,
  theatres,
  topRated,
  upcoming,
  topRated_TV
 
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <>
      <Banner />
      <Popular_Movies popular={popular}/>
      <Theatres_Movies theatres={theatres}/>
      <TopRated_Movies topRated={topRated}/>
      <Upcoming_Movies upcoming={upcoming}/>
      <TopRated_TV topRated_TV={topRated_TV}/>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const popular = await fetchPopularMovies()
  const theatres = await fetchTheatresMovies()

  const topRated = await fetchTopRatedMovies()
  const upcoming = await fetchUpcomingMovies()

  const topRated_TV = await fetchTopRatedTV()
  
  return {
    props: {
      popular,
      theatres,
      topRated,
      upcoming,
      topRated_TV
    },
  };
};
