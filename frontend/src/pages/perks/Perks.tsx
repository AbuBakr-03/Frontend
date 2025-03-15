import Hero from "../../components/hero/Hero";
import Content1 from "../../components/content/Content1";
import Content2 from "../../components/content/Content2";
import heroimg from "../../assets/PerksJumbotron1.webp";
import contentimg1 from "../../assets/PerksContentImage1.webp";
import contentimg2 from "../../assets/PerksContentImage2.webp";
const Perks: React.FC = () => {
  return (
    <main>
      <Hero
        img={heroimg}
        heading="Perks & Benefits: Work Smarter, Live Better"
        text="At SmartHR, we invest in our people. From competitive compensation to wellness programs and career growth opportunities, our perks are designed to help you thrive—both professionally and personally."
      ></Hero>
      <Content1
        img={contentimg1}
        heading="Competitive Pay & Meaningful Benefits"
        text="We offer industry-leading salaries, performance-based bonuses, comprehensive healthcare, and retirement plans—ensuring financial security and peace of mind for you and your family."
      ></Content1>
      <Content2
        img={contentimg2}
        heading="Flexibility, Wellness & Growth"
        text="Enjoy flexible work arrangements, wellness programs, mental health support, and learning opportunities that empower you to grow in your career while maintaining a balanced life."
      ></Content2>
    </main>
  );
};
export default Perks;
