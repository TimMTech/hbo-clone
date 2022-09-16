import NextImage from "next/image"
import HBO_MAX_BANNER_SMALL_DEVICE from "/public/static/image/HBO_MAX_BANNER_SMALL_DEVICE.png";

const Banner: React.FC = () => {
  return (
    <div className=" mt-[-2.5rem] ">
      <div className="sm:relative">
        <video autoPlay loop muted playsInline  className="sm:flex hidden">
          <source src="static/video/BANNER_VIDEO.mp4" type="video/mp4" />
        </video>
        <div className="sm:hidden">
          <NextImage src={HBO_MAX_BANNER_SMALL_DEVICE}  layout="responsive" />
        </div>
        <div className="sm:absolute  text-white left-0 bottom-[15%] p-4">
          <p className="font-thin">HBO Original</p>
          <p className="font-bold text-2xl ">Game of Thrones</p>
          <p className="font-bold text-2xl ">House of the Dragon</p>
          <p className="font-bold pt-4 ">
            All Your Favorite - All In One Place
          </p>
          <p className="font-thin">
            Stream must-see movies, series, documentaries, and more.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Banner;
