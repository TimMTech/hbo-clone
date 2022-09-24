import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchSingleTV } from "../../../utils/fetchTV/fetchTV";
import Single_TV from "../../../components/TV/Single_TV/Single_TV";

const Show: NextPage = ({singleTV}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Single_TV singleTV={singleTV} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const singleTV = await fetchSingleTV(id);
 console.log(singleTV)
  return {
    props: {
      singleTV,
      
    },
  };
};

export default Show;
