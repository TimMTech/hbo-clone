import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { GoDashboard } from "react-icons/go";
import { signOut } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import HBO_MAX_WHITE_LOGO from "public/static/image/HBO_MAX_WHITE_LOGO.png";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const menu = {
  visible: { x: "0" },
  hidden: { x: "-100%" },
};

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenProfileMenu = () => {
    setOpenProfileMenu(!openProfileMenu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    const changeNavBackground = () => {
      if (
        document.body.scrollTop >= 100 ||
        document.documentElement.scrollTop >= 100
      ) {
        setBackgroundColor(true);
      } else {
        setBackgroundColor(false);
      }
    };
    window.addEventListener("scroll", changeNavBackground);
    return () => {
      window.removeEventListener("scroll", changeNavBackground);
    };
  }, [backgroundColor]);

  return (
    <nav className="relative z-[99]">
      <div
        className={
          backgroundColor
            ? "fixed text-white top-0 w-screen bg-matte-black transition-colors duration-500 "
            : "fixed text-white top-0 w-screen bg-transparent transition-colors duration-500 "
        }
      >
        <div className="flex justify-between items-center w-full px-8 py-6">
          <ul className="flex gap-6">
            <li className="hover:text-white cursor-pointer">
              <AiOutlineMenu size={25} onClick={handleOpenMenu} />
            </li>
            <li className="hover:text-white  md:flex hidden">
              <NextLink href={"/movie"}>Movies</NextLink>
            </li>
            <li className="hover:text-white  md:flex hidden">
              <NextLink href={"/tv"}>Series</NextLink>
            </li>
          </ul>
          <NextLink href="/">
            <div
              className={`md:ml-[5.6rem] ml-[4.4rem] mt-2 ${
                session && "md:ml-[-4.8rem]"
              }`}
            >
              <NextImage
                src={HBO_MAX_WHITE_LOGO}
                className="cursor-pointer "
                height={20}
                width={120}
              />
            </div>
          </NextLink>
          <ul className=" flex items-center justify-center gap-6">
            <li className="hover:text-white ">
              <AiOutlineSearch size={30} />
            </li>

            {session ? (
              <ul>
                <li className="hover:text-white ">
                  <GoDashboard size={30} onClick={handleOpenProfileMenu} />
                </li>
                {openProfileMenu && (
                  <ul className="absolute flex flex-col justify-evenly items-start bg-matte-black right-[3%] mt-2 rounded-md p-1 w-[150px]">
                    <li className="hover:bg-white/20 hover:rounded-sm w-full py-3 pl-5">
                      My Stuff
                    </li>
                    <li className="hover:bg-white/20 hover:rounded-sm w-full py-3 pl-5">
                      Settings
                    </li>
                    <li className=" border-white/20 border w-full my-1 "></li>
                    <li
                      className="hover:bg-white/20 hover:rounded-sm w-full py-3 pl-5"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </li>
                  </ul>
                )}
              </ul>
            ) : (
              <ul className="flex items-center justify-center gap-6">
                <li className="hover:bg-white hover:text-black md:hidden rounded-full bg-white/[0.12] p-[0.4rem]">
                  <NextLink href="/auth/subscribe">
                    <a>
                      <BsFillPersonFill size={25} />
                    </a>
                  </NextLink>
                </li>
                <li className="hover:text-white md:flex hidden">
                  <NextLink href="/auth/signin">SIGN IN</NextLink>
                </li>
                <li className="hover:bg-white hover:text-black md:flex hidden bg-white/10 rounded-md px-4 py-2">
                  <NextLink href="/auth/subscribe">SUBSCRIBE</NextLink>
                </li>
              </ul>
            )}
          </ul>
        </div>

        <AnimatePresence>
          {openMenu && (
            <>
              <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="md:hidden fixed left-0 top-0 w-screen h-screen bg-black/70"
              />

              <motion.div
                variants={menu}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="md:hidden fixed left-0 top-0 w-[40%] h-screen bg-[rgb(15,15,15)] "
              >
                <ul className=" text-white/50 font-semibold flex flex-col items-start gap-4 w-full h-full  px-4 pt-4">
                  <AiOutlineClose
                    size={25}
                    className="cursor-pointer my-4"
                    onClick={handleCloseMenu}
                  />
                  <li className="hover:text-white">
                    <NextLink href={"/"}>Home</NextLink>
                  </li>

                  <li className="hover:text-white">
                    <NextLink href={"/movie"}>Movies</NextLink>
                  </li>
                  <li className="hover:text-white">
                    <NextLink href={"/tv"}>Series</NextLink>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
