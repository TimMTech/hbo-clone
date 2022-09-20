import NextImage from "next/image";
import NextLink from "next/link"
import HBO_MAX_SUBSCRIBE_BACKGROUND from "/public/static/image/HBO_MAX_SUBSCRIBE_BACKGROUND.png";

const SubscribeForm: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <div className="relative w-full h-full">
        <NextImage
          src={HBO_MAX_SUBSCRIBE_BACKGROUND}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute top-[50%] left-[10%]">
          <div className=" text-white flex flex-col items-start justify-center">
            <h1 className="font-semibold text-3xl">Get Ready for More</h1>
            <p className="sm:w-[400px] w-[320px] py-4">
              Enjoy the biggest movies, acclaimed series from HBO, and exclusive
              Max Originals. Plus, stream your favorites from DC, Adult Swim,
              Cartoon Network, and more.
            </p>
            <button className="hover:bg-none hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 px-6 py-3 my-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
              <NextLink href="/auth/subscribe/plan-picker">CHOOSE A PLAN</NextLink>
            </button>
            <button className="font-semibold pt-4 text-sm text-violet-400/80">
              <NextLink href="/auth/signin"> SIGN IN TO YOUR ACCOUNT</NextLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;
