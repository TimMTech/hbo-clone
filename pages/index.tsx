import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import {
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchTheatresMovies,
} from "../utils/fetchMovie/fetchMovie";
import { fetchTopRatedTV } from "../utils/fetchTV/fetchTV";
import { fetchPopularPeople } from "../utils/fetchPeople/fetchPeople";
import Banner from "../components/Banner/Banner";
import TopRated_Movies from "../components/Movies/Carousel/Top_Rated/Top_Rated_Movies";
import Upcoming_Movies from "../components/Movies/Carousel/Upcoming/Upcoming_Movies";
import Theatres_Movies from "../components/Movies/Carousel/Theatres/Theatres_Movies";
import TopRated_TV from "../components/TV/Carousel/Top_Rated/Top_Rated_TV";
import Popular_People from "../components/People/Carousel/Popular/Popular_People";
import Footer from "../components/Footer/Footer";

const Home: NextPage = ({
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
  const [
    theatresRes,
    topRatedRes,
    upcomingRes,
    topRated_TVRes,
    popular_peopleRes,
  ] = await Promise.all([
    await fetchTheatresMovies(),
    await fetchTopRatedMovies(),
    await fetchUpcomingMovies(),
    await fetchTopRatedTV(),
    await fetchPopularPeople(),
  ]);
  const [theatres, topRated, upcoming, topRated_TV, popular_people] =
    await Promise.all([
      theatresRes,
      topRatedRes,
      upcomingRes,
      topRated_TVRes,
      popular_peopleRes,
    ]);

  return {
    props: {
      theatres,
      topRated,
      upcoming,
      topRated_TV,
      popular_people,
    },
  };
};
