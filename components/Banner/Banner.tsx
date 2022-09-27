import NextImage from "next/image";
import NextLink from "next/link";
import HBO_MAX_BANNER_SMALL_DEVICE from "/public/static/image/HBO_MAX_BANNER_SMALL_DEVICE.jpeg";
import Test_Image from "/public/static/image/Test_Image.jpeg";

const Banner: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <div className="sm:mt-[-2.7rem] sm:h-[320px]  md:h-[390px] lg:h-[530px] relative ">
        <video autoPlay loop muted className="sm:flex hidden">
          <source src="static/video/BANNER_VIDEO.mp4" type="video/mp4" />
        </video>

        <div className="sm:hidden relative mt-[-3rem]">
          <NextImage src={HBO_MAX_BANNER_SMALL_DEVICE} layout="responsive" priority />

          <div className="image-inset"></div>
        </div>
        <div className="sm:absolute sm:top-[15%] md:top-[20%] lg:top-[25%] top-0 left-0 flex flex-col w-full h-full items-start justify-center text-white px-8">
          <p className="font-extralight">HBO Original</p>
          <p className="font-bold text-2xl ">Game of Thrones</p>
          <p className="font-bold text-2xl ">House of the Dragon</p>
          <p className="font-bold pt-3 ">
            All Your Favorite - All In One Place
          </p>
          <p className="font-extralight pb-3">
            Stream must-see movies, series, documentaries, and more.
          </p>
          <button className="hover:bg-none hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
            <NextLink href="/auth/subscribe">SIGN UP</NextLink>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Banner;
