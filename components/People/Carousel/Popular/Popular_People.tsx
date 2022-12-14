import HBO_MAX_EMMY_LOGO from "/public/static/image/HBO_MAX_EMMY_LOGO.png";
import NextLink from "next/link";
import NextImage from "next/image";
interface PopularPeopleResults {
  popular_people: any;
}

interface People {
  id: number;
  profile_path: string;
}

const Popular_People: React.FC<PopularPeopleResults> = ({
  popular_people: { results },
}) => {
  return (
    <div className=" text-white flex flex-col items-center ">
      <div className="flex items-center rounded-lg shadow-lg shadow-gray-300/70 mx-8 mb-8 ">
        <NextImage src={HBO_MAX_EMMY_LOGO} width={275} height={200} />

        <div className="px-8">
          <h1 className="md:text-3xl md:text-center text-left text-2xl w-full font-semibold py-4  ">
            Our Most Popular Actors/Actresses
          </h1>
          <p className="md:text-center text-left w-full pb-4">
            Find out more about our most talented entertainers in the industry!
          </p>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-1 no-scrollbar w-full px-8">
        {results.map((people: People) => {
          const { id, profile_path } = people;
          return (
            <div
              key={id}
              className="sm:w-[30%] md:w-[24%] lg:w-[17%] w-[33%] flex-shrink-0 h-full"
            >
              <NextLink href={`/people/${id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${profile_path}`}
                  alt=""
                  className="hover:border-2 hover:border-indigo-600 border-2 border-transparent cursor-pointer h-full"
                />
              </NextLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular_People;
