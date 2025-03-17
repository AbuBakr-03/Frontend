import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer className="grid w-full place-items-center">
      <div className={`${styles.container} w-9/12 gap-4 py-8`}>
        <ul className={`grid grid-cols-4 place-items-center lg:grid-cols-8`}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>|</li>
          <li>
            <Link to={"/WhyUs"}>Why Us?</Link>
          </li>
          <li>|</li>
          <li>
            <Link to={"/Perks"}>Perks</Link>
          </li>
          <li>|</li>
          <li>
            <Link to={"/JoinUs"}>Join Us</Link>
          </li>
          <li>|</li>
        </ul>
        <p className={`justify-self-center`}>
          © 2025 SmartHR. All rights reserved
        </p>
      </div>
    </footer>
  );
};
export default Footer;
