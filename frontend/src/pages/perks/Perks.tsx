import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Hero from "../../components/hero/Hero";
import Content1 from "../../components/content/Content1";
import Content2 from "../../components/content/Content2";
import heroimg from "../../assets/PerksJumbotron1.webp";
import contentimg1 from "../../assets/PerksContentImage1.webp";
import contentimg2 from "../../assets/PerksContentImage2.webp";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
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

const Perks: React.FC = () => {
  return (
    <main>
      <ScrollAnimationWrapper>
        <Hero
          img={heroimg}
          heading="Perks & Benefits: Work Smarter, Live Better"
          text="Recruit smarter. Apply easier. Grow faster. Unlock a platform that’s designed to support your journey, whether you're hiring or getting hired."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          img={contentimg1}
          heading="All-in-One Hiring Dashboard"
          text="Post jobs, screen resumes, interview candidates, and predict hiring outcomes — all from one intuitive platform. Track candidate journeys effortlessly and make hiring a strategic advantage, not a burden."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content2
          img={contentimg2}
          heading="Your Skills. Your Story. Your Opportunity"
          text="Apply easily, get fair evaluations, and shine with interview feedback powered by real-world insights — not just gut feelings. Stand out for your potential, not just for what's written on your resume."
        />
      </ScrollAnimationWrapper>
    </main>
  );
};

export default Perks;
