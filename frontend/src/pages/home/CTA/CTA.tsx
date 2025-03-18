import styles from "../../../components/content/Content.module.css";
import { motion } from "framer-motion";
import colors from "../../../styles/global.module.css";
import img from "../../../assets/CTAImage.webp";
import { Link } from "react-router-dom";
const CTA: React.FC = () => {
  return (
    <section
      className={`w-full ${colors.background2} justify-items-center py-8`}
    >
      <div className={`max-sm::w-10/12 grid justify-items-center`}>
        <div className={`w-9/12 ${styles.layout} place-items-center gap-4`}>
          <div
            className={`${colors.color} ${styles.text} grid gap-4 justify-self-start`}
          >
            <h1 className={`font-inter text-4xl font-semibold`}>Join Us</h1>
            <p>
              Be part of the future of AI-driven HR. Explore exciting career
              opportunities and help us shape the next era of intelligent
              workforce solutions.
            </p>
            <Link to={"/JoinUs"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`${colors.background} justify-self-start rounded px-6 py-2 font-semibold text-white`}
              >
                Join Us
              </motion.button>
            </Link>
          </div>
          <img
            className={`${styles.img} aspect-video justify-self-end rounded-md object-cover lg:w-8/12`}
            src={img}
            alt="img"
            width="800"
            height="450"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;
