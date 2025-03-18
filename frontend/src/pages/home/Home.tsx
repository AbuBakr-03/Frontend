import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Jumbotron from "./Jumbotron/Jumbotron";
import Content1 from "../../components/content/Content1";
import Content2 from "../../components/content/Content2";
import CTA from "./CTA/CTA";
import img1 from "../../assets/HomeContentImage1.webp";
import img2 from "../../assets/HomeContentImage2.webp";
import img3 from "../../assets/HomeContentImage3.webp";

const containerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const ScrollAnimationWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

const Home: React.FC = () => {
  return (
    <main className="grid">
      <ScrollAnimationWrapper>
        <Jumbotron />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          heading="Why Choose SmartHR?"
          text="Empower your HR team with AI-driven precision. SmartHR streamlines hiring, enhances employee engagement, and automates workforce management—helping you make data-backed decisions, reduce bias, and build a thriving workplace. Smarter HR starts here."
          img={img1}
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content2
          heading="Perks & Benefits"
          text="Designed for your success—competitive salaries, flexible work options, wellness programs, and continuous learning opportunities to help you grow."
          img={img2}
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          heading="Our Culture"
          text="Innovation meets collaboration. We foster a dynamic, inclusive, and forward-thinking environment where creativity and impact thrive."
          img={img3}
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <CTA />
      </ScrollAnimationWrapper>
    </main>
  );
};

export default Home;
