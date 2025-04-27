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
          heading="Smarter Hiring Starts Here"
          text="We blend AI, machine learning, and behavioral science to help you hire not just qualified candidates — but the right candidates. Experience a platform that’s designed to match today's fast-moving, competitive world of hiring."
          img={img1}
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content2
          heading="Built for Recruiters and Candidates Alike"
          text="From seamless application experiences for candidates to powerful insights for recruiters, we create a win-win ecosystem where opportunity meets precision. Every feature is crafted to make hiring easier, faster, and more human."
          img={img2}
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          heading="Innovation. Integrity. Impact"
          text="We believe in reshaping the hiring journey with fairness, technology, and human-centered design. Our platform reflects the culture we build: collaborative, future-focused, and relentlessly innovative at every step."
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
