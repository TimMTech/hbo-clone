import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import {
  fetchSingleTVEpisodes,
  fetchSingleTVEpisodeCredits,
} from "../../../../../../../utils/fetchTV/fetchTV";

import Single_TV_Episodes from "../../../../../../../components/TV/Single_TV/SIngle_TV_Episodes/Single_TV_Episodes";

const Episode: NextPage = ({
  singleTVEpisodes,
  singleTVEpisodeCredits,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Single_TV_Episodes
        singleTVEpisodes={singleTVEpisodes}
        singleTVEpisodeCredits={singleTVEpisodeCredits}
      />
    </>
  );
};

export default Episode;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params.id;
  const season_number = context?.params.season_number;
  const episode_number = context?.params.episode_number;

  const [singleTVEpisodesRes, singleTVEpisodeCreditsRes] = await Promise.all([
    await fetchSingleTVEpisodes(id, season_number, episode_number),
    await fetchSingleTVEpisodeCredits(id, season_number, episode_number),
  ]);
  const [singleTVEpisodes, singleTVEpisodeCredits] = await Promise.all([
    singleTVEpisodesRes,
    singleTVEpisodeCreditsRes,
  ]);
  return {
    props: {
      singleTVEpisodes,
      singleTVEpisodeCredits,
    },
  };
};
