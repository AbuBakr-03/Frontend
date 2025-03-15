import colors from "../../styles/global.module.css";
import styles from "./Content.module.css";
type proptypes = {
  heading: string;
  text: string;
  img: string;
};
const Content2: React.FC<proptypes> = ({ heading, text, img }) => {
  return (
    <section
      className={`w-full ${colors.background2} justify-items-center py-8`}
    >
      <div className={`max-sm::w-10/12 grid justify-items-center`}>
        <div className={`w-9/12 ${styles.layout} place-items-center gap-4`}>
          <div
            className={`${colors.color} ${styles.text} grid gap-4 justify-self-start`}
          >
            <h1 className={`font-inter text-4xl font-semibold`}>{heading}</h1>
            <p>{text}</p>
          </div>
          <img
            className={`${styles.img} aspect-video justify-self-end rounded-md object-cover lg:w-8/12`}
            src={img}
            alt="img"
            width="800"
            height="450"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
export default Content2;
