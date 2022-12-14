import {
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";
import NextImage from "next/image";
import NextLink from "next/link";
import HBO_MAX_FOOTER from "/public/static/image/HBO_MAX_FOOTER.png";
import {useSession} from "next-auth/react"

const Footer: React.FC = () => {

  const {data: session} = useSession()
  return (
    <footer className="w-screen flex flex-col relative">
      <div className="h-[500px]  relative  ">
        <NextImage src={HBO_MAX_FOOTER} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute flex flex-col gap-2 items-start top-[40%] left-[7%] text-white">
        <h1 className="text-2xl">{session ? "Browse Our Entire Collection!" : "Already Have an HBO Max Account?"}</h1>
        <button className="hover:bg-none hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
          <NextLink href="/search">Search</NextLink>
        </button>
      </div>
      <div className=" md:flex md:flex-row-reverse md:justify-between md:items-center p-8 flex flex-col gap-2">
        <p>&copy; 2022 TimMTech, LLC. All Rights Reserved.</p>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href="https://github.com/TimMTech"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub size={30} />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/tim.mukhamedov"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillFacebook size={30} />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/forevertech93/"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillInstagram size={30} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/timur-mukhamedov-50b3b6221/"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillLinkedin size={30} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
