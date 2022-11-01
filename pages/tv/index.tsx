import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchPopularPagination } from "../../utils/fetchTV/fetchTV";
import { fetchTVGenres } from "../../utils/fetchGenres/fetchGenres";
import All_Shows from "../../components/TV/All/All_Shows";

const Shows: NextPage = ({
  popularPaginated,
  tvGenres,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <All_Shows popularPaginated={popularPaginated} tvGenres={tvGenres} />
    </>
  );
};

export default Shows;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page;
  const popularPaginated = await fetchPopularPagination(page);
  const tvGenres = await fetchTVGenres();
  return {
    props: {
      popularPaginated,
      tvGenres,
    },
  };
};
