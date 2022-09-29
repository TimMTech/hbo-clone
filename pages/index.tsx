import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchTheatresMovies,
} from "../utils/fetchMovie/fetchMovie";
import { fetchTopRatedTV } from "../utils/fetchTV/fetchTV";
import { fetchPopularPeople } from "../utils/fetchPeople/fetchPeople";
import Banner from "../components/Banner/Banner";
import TopRated_Movies from "../components/Movies/Top_Rated/Top_Rated_Movies";
import Upcoming_Movies from "../components/Movies/Upcoming/Upcoming_Movies";
import Theatres_Movies from "../components/Movies/Theatres/Theatres_Movies";
import TopRated_TV from "../components/TV/Top_Rated/Top_Rated_TV";
import Popular_People from "../components/People/Popular/Popular_People";
import Footer from "../components/Footer/Footer"

const Home: NextPage = ({
  popular,
  theatres,
  topRated,
  upcoming,
  topRated_TV,
  popular_people,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Banner />
      <TopRated_Movies topRated={topRated} />
      <Theatres_Movies theatres={theatres} />
      <Upcoming_Movies upcoming={upcoming} />
      <TopRated_TV topRated_TV={topRated_TV} />
      <Popular_People popular_people={popular_people} />
      <Footer />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const popular = await fetchPopularMovies();
  const theatres = await fetchTheatresMovies();

  const topRated = await fetchTopRatedMovies();
  const upcoming = await fetchUpcomingMovies();

  const topRated_TV = await fetchTopRatedTV();

  const popular_people = await fetchPopularPeople();

  return {
    props: {
      popular,
      theatres,
      topRated,
      upcoming,
      topRated_TV,
      popular_people,
    },
  };
};
