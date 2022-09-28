import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/Dashboard/Dashboard";

const User: NextPage = ({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Dashboard session={session}/>
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/auth/subscribe",
        permanent: false,
      },
    };
  else {
    return {
      props: {
        session,
      },
    };
  }
};
