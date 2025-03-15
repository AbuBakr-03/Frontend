import colors from "../../styles/global.module.css";

type proptypes = {
  heading: string;
  text: string;
  img: string;
};
const Content1: React.FC<proptypes> = ({ heading, text, img }) => {
  return (
    <section className="w-full justify-items-center py-8">
      <div className={`max-sm::w-10/12 grid justify-items-center`}>
        <div className={`grid w-9/12 place-items-center gap-4 md:grid-cols-2`}>
          <img
            className={`aspect-video justify-self-start rounded-md object-cover lg:w-8/12`}
            src={img}
            alt="img"
            width="800"
            height="450"
            loading="lazy"
          />
          <div className={`${colors.color} grid gap-4 justify-self-end`}>
            <h1 className={`font-inter text-4xl font-semibold`}>{heading}</h1>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Content1;
