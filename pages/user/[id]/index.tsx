import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";
import {fetchUser} from "../../../utils/fetchUser/fetchUser"
import Dashboard from "../../../components/Dashboard/Dashboard";

const User: NextPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Dashboard user={user}/>
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
    const user = await fetchUser(session?.user._id)
    return {
      props: {
        user
      },
    };
  }
};
