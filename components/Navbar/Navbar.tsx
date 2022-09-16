import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
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

console.log(menu)

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="relative z-[99]">
      <div className="fixed text-white top-0 w-screen">
        <div className="flex justify-between items-center w-full px-8 pt-8">
          <ul className="flex gap-6">
            <li className="cursor-pointer">
              <AiOutlineMenu size={25} onClick={handleOpenMenu} />
            </li>
            <li className=" md:flex hidden">Movies</li>
            <li className=" md:flex hidden">Series</li>
          </ul>
          <NextLink href="/">
            <div className="md:ml-[5.5rem] ml-16">
              <NextImage
                src={HBO_MAX_WHITE_LOGO}
                className="cursor-pointer"
                height={20}
                width={120}
              />
            </div>
          </NextLink>
          <ul className="flex items-center justify-center gap-6">
            <li>
              <AiOutlineSearch size={30} />
            </li>
            <li className="md:flex hidden">
              <NextLink href={"/auth/signin"}>SIGN IN</NextLink>
            </li>
            <li className="md:flex hidden  bg-white/10 rounded-md px-4 py-2">
              <NextLink href={"/auth/signin"}>SUBSCRIBE</NextLink>
            </li>
            <li className="md:hidden">
              <BsFillPersonFill size={30} />
            </li>
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
                className="fixed left-0 top-0 w-screen h-screen bg-black/70"
              />

              <motion.div
                variants={menu}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="fixed left-0 top-0 w-[40%] h-screen bg-[rgb(15,15,15)] "
              >
                <ul className=" text-white/50 font-semibold flex flex-col items-start gap-4 w-full h-full  px-4 pt-4">
                  <AiOutlineClose
                    size={25}
                    className="cursor-pointer my-4"
                    onClick={handleCloseMenu}
                  />
                  <li className="pl-1">
                    <NextLink href={"/"}>Home</NextLink>
                  </li>

                  <li className="pl-1">Movies</li>
                  <li className="pl-1">Series</li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
