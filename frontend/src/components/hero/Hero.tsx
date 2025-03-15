import colors from "../../styles/global.module.css";

type proptypes = {
  img: string;
  heading: string;
  text: string;
};
const Hero: React.FC<proptypes> = ({ img, heading, text }) => {
  return (
    <section
      className={`${colors.background} w-full justify-items-center py-8`}
    >
      <div className={`max-sm::w-10/12 grid justify-items-center`}>
        <div className={`grid w-9/12 place-items-center gap-4 md:grid-cols-2`}>
          <div className={`grid gap-4 justify-self-start`}>
            <h1 className={`font-inter text-4xl font-semibold text-white`}>
              {heading}
            </h1>
            <p className={`text-white`}>{text}</p>
          </div>
          <img
            className={`aspect-video justify-self-end rounded-md object-cover lg:w-8/12`}
            src={img}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
