import { motion } from "framer-motion";
import colors from "../../../styles/global.module.css";
import { Link } from "react-router-dom";
import jumbotronimg from "../../../assets/HomeJumbotron1.webp";
const Jumbotron: React.FC = () => {
  return (
    <section
      className={`${colors.background} w-full justify-items-center py-8`}
    >
      <div className={`max-sm::w-10/12 grid justify-items-center`}>
        <div className={`grid w-9/12 place-items-center gap-4 md:grid-cols-2`}>
          <div className={`grid gap-4 justify-self-start`}>
            <h1 className={`font-inter text-4xl font-semibold text-white`}>
              Revolutionize Hiring with AI-Powered Recruitment
            </h1>
            <p className={`text-white`}>
              Find top talent faster with intelligent resume screening,
              real-time interview analysis, and predictive hiring insights.
              Build a smarter, more efficient hiring process from day one.
            </p>
            <Link to={"/join-us"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`justify-self-start rounded-md bg-white px-6 py-2 font-semibold ${colors.color}`}
              >
                {" "}
                Join Us
              </motion.button>
            </Link>
          </div>
          <img
            className={`aspect-video justify-self-end rounded-md object-cover lg:w-8/12`}
            src={jumbotronimg}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
export default Jumbotron;
