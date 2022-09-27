import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import Dashboard from "../../../components/Dashboard/Dashboard";

const User:NextPage = () => {
    return (
        <>
        <Dashboard />
        </>
    )
}

export default User;