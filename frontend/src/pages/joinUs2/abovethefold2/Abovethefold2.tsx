import colors from "../../../styles/global.module.css";
type propTypes = {
  results: number;
};
const Abovethefold2: React.FC<propTypes> = ({ results }) => {
  return (
    <section className={`${colors.background} grid place-items-center py-8`}>
      <div className={`grid w-10/12 place-items-center gap-8 md:w-9/12`}>
        <h1 className={`text-center text-4xl font-bold text-white`}>
          Job Results
        </h1>
        <p className={`text-center text-white`}>{results} Results</p>
      </div>
    </section>
  );
};
export default Abovethefold2;
