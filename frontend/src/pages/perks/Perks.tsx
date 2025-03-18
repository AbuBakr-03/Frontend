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
          text="At SmartHR, we invest in our people. From competitive compensation to wellness programs and career growth opportunities, our perks are designed to help you thrive—both professionally and personally."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content1
          img={contentimg1}
          heading="Competitive Pay & Meaningful Benefits"
          text="We offer industry-leading salaries, performance-based bonuses, comprehensive healthcare, and retirement plans—ensuring financial security and peace of mind for you and your family."
        />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <Content2
          img={contentimg2}
          heading="Flexibility, Wellness & Growth"
          text="Enjoy flexible work arrangements, wellness programs, mental health support, and learning opportunities that empower you to grow in your career while maintaining a balanced life."
        />
      </ScrollAnimationWrapper>
    </main>
  );
};

export default Perks;
