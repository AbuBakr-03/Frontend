import colors from "../../../styles/global.module.css";

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
              Revolutionizing HR with Smarter AI Solutions
            </h1>
            <p className={`text-white`}>
              At SmartHR, we create AI-driven HR systems to simplify hiring,
              optimize employee management, and transform workforce experiences.
              Our technology helps you build a smarter, more agile organization.
            </p>
            <button
              className={`justify-self-start rounded-md bg-white px-6 py-2 font-semibold ${colors.color}`}
            >
              Join Us
            </button>
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
