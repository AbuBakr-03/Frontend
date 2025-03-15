import Jumbotron from "./Jumbotron/Jumbotron";
import Content1 from "../../components/content/Content1";
import Content2 from "../../components/content/Content2";
import CTA from "./CTA/CTA";
import img1 from "../../assets/HomeContentImage1.webp";
import img2 from "../../assets/HomeContentImage2.webp";
import img3 from "../../assets/HomeContentImage3.webp";
const Home: React.FC = () => {
  return (
    <main className={`grid`}>
      <Jumbotron></Jumbotron>
      <Content1
        heading="Why Choose SmartHR?"
        text="Empower your HR team with AI-driven precision. SmartHR streamlines hiring, enhances employee engagement, and automates workforce management—helping you make data-backed decisions, reduce bias, and build a thriving workplace. Smarter HR starts here."
        img={img1}
      ></Content1>
      <Content2
        heading="Perks & Benefits"
        text="Designed for your success—competitive salaries, flexible work options, wellness programs, and continuous learning opportunities to help you grow."
        img={img2}
      ></Content2>
      <Content1
        heading="Our Culture"
        text="Innovation meets collaboration. We foster a dynamic, inclusive, and forward-thinking environment where creativity and impact thrive."
        img={img3}
      ></Content1>
      <CTA></CTA>
    </main>
  );
};
export default Home;
