import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import {fetchSingleTVEpisodes} from "../../../../../../../utils/fetchTV/fetchTV"

import Single_TV_Episodes from "../../../../../../../components/TV/Single_TV/SIngle_TV_Episodes/Single_TV_Episodes";

const Episode: NextPage = ({singleTVEpisodes}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <>
        <Single_TV_Episodes singleTVEpisodes={singleTVEpisodes} />
    </>
}

export default Episode

export const getServerSideProps:GetServerSideProps = async (context) => {
    const id = context?.params.id;
    const season_number = context?.params.season_number;
    const episode_number = context?.params.episode_number

    const singleTVEpisodes = await fetchSingleTVEpisodes(id, season_number, episode_number)
    return {
        props: {
            singleTVEpisodes
        }
    }

}