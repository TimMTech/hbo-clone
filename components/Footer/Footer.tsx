
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";


const Footer: React.FC = () => {
  
  return (
    <footer className="md:flex md:flex-row-reverse md:items-center md:justify-between w-screen text-sm h-[200px] flex flex-col justify-end px-8 pb-4 gap-4">
      <p className="md:text-lg">&copy; 2022 TimMTech, LLC. All Rights Reserved.</p>
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
    </footer>
  );
};

export default Footer;
