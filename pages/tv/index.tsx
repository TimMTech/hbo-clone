import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { fetchPopularPagination } from "../../utils/fetchTV/fetchTV";
import All_Shows from "../../components/TV/All/All_Shows";

const Shows:NextPage = ({popularPaginated}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <>
        <All_Shows popularPaginated={popularPaginated}/>
    </>
}

export default Shows

export const getServerSideProps:GetServerSideProps = async (context) => {
    const page = context.query.page
    const popularPaginated = await fetchPopularPagination(page)
    return {
        props: {
            popularPaginated
        }
    }
}