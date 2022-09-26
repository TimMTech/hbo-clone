import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchPopularPagination } from "../../utils/fetchMovie/fetchMovie";
import All_Movies from "../../components/Movies/All/All_Movies";

const Movies: NextPage = ({
  popularPaginated,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <All_Movies popularPaginated={popularPaginated} />
    </>
  );
};

export default Movies;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page;

  const popularPaginated = await fetchPopularPagination(page);
  return {
    props: {
      popularPaginated,
    },
  };
};
