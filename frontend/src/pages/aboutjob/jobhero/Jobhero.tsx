import { Users, MapPin } from "lucide-react";
import img from "../../../assets/PerksJumbotron1.webp";
import colors from "../../../styles/global.module.css";

const Jobhero: React.FC = () => {
  return (
    <div className={`${colors.background} justify-items-center py-8`}>
      <div className={`grid w-9/12 place-items-center gap-8 md:grid-cols-2`}>
        <div className={`grid gap-8 md:justify-self-start`}>
          <h1 className={`text-4xl text-white`}>Frontend Developer</h1>
          <div className={`grid items-center gap-4`}>
            <div className={`grid grid-cols-2 place-items-center`}>
              <div className={`rounded-full border-2 border-white p-1`}>
                <Users color="#ffffff"></Users>
              </div>
              <p className={`justify-self-start text-white`}>Development</p>
            </div>
            <div className={`grid grid-cols-2 place-items-center`}>
              <div className={`rounded-full border-2 border-white p-1`}>
                <MapPin color="#ffffff"></MapPin>
              </div>
              <p className={`justify-self-start text-white`}>London</p>
            </div>
          </div>
        </div>
        <img
          className={`rounded-md border object-cover md:aspect-video md:justify-self-end lg:w-8/12`}
          src={img}
          alt=""
        />
      </div>
    </div>
  );
};
export default Jobhero;
