import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  
} from "next";
import {
  fetchSinglePerson,
} from "../../../utils/fetchPeople/fetchPeople";
import Single_Person from "../../../components/People/Single_Person/Single_Person";

const People: NextPage = ({singlePerson} : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(singlePerson)
    return (
        <>
        <Single_Person singlePerson={singlePerson} />
        </>
    )
}


export default People

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const singlePerson = await fetchSinglePerson(id)


  return {
    props: {
      singlePerson
    }
  }
}