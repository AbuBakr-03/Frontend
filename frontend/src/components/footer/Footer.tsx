import styles from "./Footer.module.css";
const Footer: React.FC = () => {
  return (
    <footer className="grid w-full place-items-center">
      <div className={`${styles.container} w-9/12 gap-4 py-8`}>
        <ul className={`grid grid-cols-4 place-items-center lg:grid-cols-8`}>
          <li>Home</li>
          <li>|</li>
          <li>Why Us?</li>
          <li>|</li>
          <li>Perks</li>
          <li>|</li>
          <li>Join Us</li>
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
