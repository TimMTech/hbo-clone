import {
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";
import NextImage from "next/image";
import NextLink from "next/link";
import test_image from "/public/static/image/test_image.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-screen flex flex-col relative">
      <div className="h-[500px]  relative  ">
        <NextImage src={test_image} layout="fill" objectFit="cover"  />
      </div>
      <div className="absolute top-[40%] left-[7%] text-white">
        <h1 className="text-2xl">Already Have an HBO Max Account?</h1>
        <button className="hover:bg-none hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
          <NextLink href="/auth/subscribe">SIGN UP</NextLink>
        </button>
      </div>
      <div className=" md:flex md:flex-row-reverse md:justify-between md:items-center p-8 flex flex-col gap-2">
        <p>&copy; 2022 TimMTech, LLC. All Rights Reserved.</p>

        <ul className="flex items-center gap-2">
          <li>
            <a>
              <AiFillGithub size={30} />
            </a>
          </li>
          <li>
            <a>
              <AiFillFacebook size={30} />
            </a>
          </li>
          <li>
            <a>
              <AiFillInstagram size={30} />
            </a>
          </li>
          <li>
            <a>
              <AiFillLinkedin size={30} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
