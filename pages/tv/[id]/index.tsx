import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchSingleTV, fetchSimilarTV } from "../../../utils/fetchTV/fetchTV";
import Single_TV from "../../../components/TV/Single_TV/Single_TV";

const Show: NextPage = ({singleTV, similarTV}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(similarTV)
  return (
    <>
      <Single_TV singleTV={singleTV} similarTV={similarTV}/>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const singleTV = await fetchSingleTV(id);
  const similarTV = await fetchSimilarTV(id)
 
  return {
    props: {
      singleTV,
      similarTV
      
    },
  };
};

export default Show;
