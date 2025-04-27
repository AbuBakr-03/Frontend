import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Hero from "../../components/hero/Hero";
import Content1 from "../../components/content/Content1";
import Content2 from "../../components/content/Content2";
import heroimg1 from "../../assets/WhyUsJumbotron1.webp";
import contentimg1 from "../../assets/WhyUsContentImage1.webp";
import contentimg2 from "../../assets/WhyUsContentImage2.webp";

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

const WhyUs: React.FC = () => {
  return (
    <main>
      <ScrollAnimationWrapper>
        <Hero
          img={heroimg1}
          heading="Why Choose Us?"
          text="Smart, fair, and future-ready recruitment — designed for real-world hiring challenges.We empower organizations to make better, faster, and more confident hiring decisions through technology."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          img={contentimg1}
          heading="Screen Smarter, Not Harder"
          text="Our AI analyzes resumes for skills, experience, and relevance — ensuring only qualified candidates move forward. Say goodbye to endless resume piles and hello to instant, insightful shortlists."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content2
          img={contentimg2}
          heading="Beyond the Resume"
          text="During interviews, our system captures vocal tone, facial cues, and confidence levels to provide a holistic view of each candidate. No more relying on gut feelings alone — make every decision backed by behavioral science and real data."
        />
      </ScrollAnimationWrapper>
    </main>
  );
};

export default WhyUs;
