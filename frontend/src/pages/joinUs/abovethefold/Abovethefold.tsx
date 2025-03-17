import { Combobox } from "../../../components/combobox/Combobox";
import colors from "../../../styles/global.module.css";
const abovethefold: React.FC = () => {
  return (
    <section className={`${colors.background} grid place-items-center py-8`}>
      <div className={`grid w-10/12 place-items-center gap-8 md:w-9/12`}>
        <h1 className={`text-center text-4xl font-bold text-white`}>
          Job Results
        </h1>
        <p className={`text-center text-white`}>230 Results</p>
        <Combobox></Combobox>
        <Combobox></Combobox>
      </div>
    </section>
  );
};
export default abovethefold;
