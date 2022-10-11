import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";
import { fetchUser } from "../../../../utils/fetchUser/fetchUser";
import Settings from "../../../../components/Dashboard/Settings/Settings";

const UserSettings: NextPage = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Settings user={user} />
    </>
  );
};

export default UserSettings;

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
    const user = await fetchUser(session?.user._id);
    return {
      props: {
        user,
      },
    };
  }
};
