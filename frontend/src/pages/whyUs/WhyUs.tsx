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
          heading="Why SmartHR? Smarter HR, Stronger Teams"
          text="At SmartHR, we go beyond traditional HR tech. Our AI-driven solutions empower businesses with smarter hiring, seamless workforce management, and data-driven insights—helping you build a workplace that thrives."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          img={contentimg1}
          heading="AI-Powered HR That Works for You"
          text="Our intelligent platform automates recruitment, reduces bias, and enhances employee engagement—so you can focus on what matters most: your people."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content2
          img={contentimg2}
          heading="Scalable, Secure, and Built for Growth"
          text="From startups to enterprises, TalentIQ adapts to your needs. Our secure, scalable solutions integrate seamlessly with your existing tools, ensuring efficiency and compliance at every stage."
        />
      </ScrollAnimationWrapper>
    </main>
  );
};

export default WhyUs;
