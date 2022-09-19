import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, fetchTheatresMovies} from "../utils/fetchMovie/fetchMovie"
import Banner from "../components/Banner/Banner";
import Popular from "../components/Movies/Popular/Popular";
import TopRated from "../components/Movies/Top_Rated/Top_Rated";
import Upcoming from "../components/Movies/Upcoming/Upcoming";
import Theatres from "../components/Movies/Theatres/Theatres";


const Home: NextPage = ({
  popular,
  theatres,
  topRated,
  upcoming,
 
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  return (
    <>
      <Banner />
      <Popular popular={popular}/>
      <Theatres theatres={theatres}/>
      <TopRated topRated={topRated}/>
      <Upcoming upcoming={upcoming}/>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const popular = await fetchPopularMovies()
  const theatres = await fetchTheatresMovies()

  const topRated = await fetchTopRatedMovies()
  const upcoming = await fetchUpcomingMovies()
  
  return {
    props: {
      popular,
      theatres,
      topRated,
      upcoming,
      
    },
  };
};
