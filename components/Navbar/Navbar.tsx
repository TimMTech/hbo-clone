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

  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(false)
  }

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
        <div className="flex justify-between items-center w-full h-[75px] px-8">
          <ul className="flex items-center justify-start gap-4 flex-1 ">
            <li className="hover:text-white cursor-pointer">
              <AiOutlineMenu size={25} onClick={handleOpenMenu} />
            </li>
            <li className="hover:text-white  md:flex hidden">
              <NextLink href={"/movies"}>Movies</NextLink>
            </li>
            <li className="hover:text-white  md:flex hidden">
              <NextLink href={"/tv"}>Series</NextLink>
            </li>
          </ul>
          <NextLink href="/">
            <div className="flex flex-1 justify-center">
              <NextImage
                src={HBO_MAX_WHITE_LOGO}
                className="cursor-pointer text-center"
                height={20}
                width={120}
              />
            </div>
          </NextLink>
          <ul className=" flex items-center justify-end gap-4 flex-1 ">
            <li className="hover:text-white ">
              <NextLink href="/search">
                <a>
                  <AiOutlineSearch size={30} />
                </a>
              </NextLink>
            </li>

            {session ? (
              <ul>
                <li className="hover:text-white ">
                  <GoDashboard size={27} onClick={handleOpenProfileMenu} />
                </li>
                {openProfileMenu && (
                  <ul className="absolute flex flex-col justify-evenly items-start bg-[rgb(25,25,25)] right-[3%] mt-2 rounded-md p-1 w-[150px]">
                    <NextLink href={`/user/${session?.user._id}`}>
                      <li
                        onClick={handleCloseProfileMenu}
                        className="hover:bg-white/20 hover:rounded-sm w-full py-3 pl-5"
                      >
                        My Stuff
                      </li>
                    </NextLink>
                    <NextLink href={`/user/${session?.user._id}/settings`}>
                      <li
                        onClick={handleCloseProfileMenu}
                        className="hover:bg-white/20 hover:rounded-sm w-full py-3 pl-5"
                      >
                        Settings
                      </li>
                    </NextLink>
                    <li className=" border-white/20 border w-full my-1 "></li>
                    <li
                      className="hover:bg-white/20 hover:rounded-sm w-full py-3 pl-5"
                      onClick={() =>
                        signOut({ callbackUrl: `/user/${session?.user._id}` })
                      }
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
                className=" fixed left-0 top-0 w-screen h-screen bg-black/70"
              />

              <motion.div
                variants={menu}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="md:w-[240px] lg:w-[310px] w-[225px] fixed left-0 top-0  h-screen bg-[rgb(15,15,15)] "
              >
                <ul className="md:pl-10 lg:pl-14 text-white/50 font-semibold flex flex-col items-start gap-4 w-full h-full pl-6 mt-10">
                  <AiOutlineClose
                    size={25}
                    className="hover:text-white cursor-pointer"
                    onClick={handleCloseMenu}
                  />
                  <ul className="lg:text-2xl text-xl pl-1 flex flex-col gap-5">
                    <li onClick={handleCloseMenu} className="hover:text-white">
                      <NextLink href={"/"}>Home</NextLink>
                    </li>

                    <li onClick={handleCloseMenu} className="hover:text-white">
                      <NextLink href={"/movies"}>Movies</NextLink>
                    </li>
                    <li onClick={handleCloseMenu} className="hover:text-white">
                      <NextLink href={"/tv"}>Series</NextLink>
                    </li>
                  </ul>
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
