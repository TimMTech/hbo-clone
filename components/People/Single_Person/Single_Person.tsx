import NextImage from "next/image";
import { convertAge, convertDOB} from "../../../utils/conversions/convert";
import { externalNextImageLoader } from "../../../utils/loaders/externalLoaders";

interface SinglePersonProps {
  singlePerson: any;
}

const Single_Person: React.FC<SinglePersonProps> = ({
  singlePerson: { biography, birthday, name, profile_path, gender },

}) => {
  
  return (
    <div className="sm:flex sm:flex-row sm:h-screen w-screen h-[1000px] flex flex-col">
      <div className="sm:w-[50%] w-full h-full relative">
        <NextImage
          loader={externalNextImageLoader}
          src={profile_path}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="sm:w-[50%] sm:mt-16 max-h-full overflow-y-auto  text-white flex flex-col gap-4 p-4 ">
        <h1 className="text-3xl">{name}</h1>
        <div className="flex flex-col">
          <span>{gender > 1 ? "Male" : "Woman"}</span>
          <span>{convertAge(birthday)} years old</span>
          <span>{convertDOB(birthday)}</span>
        </div>
        <p className="md:text-xl">{biography}</p>
      </div>
    </div>
  );
};

export default Single_Person;
