import Hero from "../../components/hero/Hero";
import heroimg1 from "../../assets/WhyUsJumbotron1.webp";
import contentimg1 from "../../assets/WhyUsContentImage1.webp";
import contentimg2 from "../../assets/WhyUsContentImage2.webp";
import Content1 from "../../components/content/Content1";
import Content2 from "../../components/content/Content2";
const WhyUs: React.FC = () => {
  return (
    <main>
      <Hero
        img={heroimg1}
        heading={"Why SmartHR? Smarter HR, Stronger Teams"}
        text={
          "At SmartHR, we go beyond traditional HR tech. Our AI-driven solutions empower businesses with smarter hiring, seamless workforce management, and data-driven insights—helping you build a workplace that thrives."
        }
      ></Hero>
      <Content1
        img={contentimg1}
        heading="AI-Powered HR That Works for You"
        text="Our intelligent platform automates recruitment, reduces bias, and enhances employee engagement—so you can focus on what matters most: your people."
      ></Content1>
      <Content2
        img={contentimg2}
        heading="Scalable, Secure, and Built for Growth"
        text="From startups to enterprises, TalentIQ adapts to your needs. Our secure, scalable solutions integrate seamlessly with your existing tools, ensuring efficiency and compliance at every stage."
      ></Content2>
    </main>
  );
};
export default WhyUs;
