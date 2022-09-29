import { useSession } from "next-auth/react";
import NextLink from "next/link"
import NextImage from "next/image";
import HBO_MAX_FOOTER_BACKGROUND from "/public/static/image/HBO_MAX_SUBSCRIBE_BACKGROUND.png"

const Footer: React.FC = () => {
  const { data: session } = useSession();
  return (
    <footer className="w-screen text-sm relative ">
      <div className="h-[500px] ">
        <NextImage
          src={HBO_MAX_FOOTER_BACKGROUND}
          layout="fill"
          objectFit="cover"
        />
        <div></div>
      </div>
      <div className="footer-inset" />
      <div className=" absolute top-[40%]  flex flex-col items-center justify-center gap-3 text-center w-full text-white">
        <h1 className="md:text-2xl text-lg font-bold">
          Already Have An HBO Max Account?
        </h1>
        <button className="hover:bg-none hover:bg-black hover:shadow-[inset_0_0_0_2px] hover:shadow-indigo-600 md:px-10 md:py-3 md:text-lg  px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md ">
          <NextLink href="/auth/signin">SIGN IN</NextLink>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
