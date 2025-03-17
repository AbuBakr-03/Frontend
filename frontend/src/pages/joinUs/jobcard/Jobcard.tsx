import { Users, MapPin, ArrowRight } from "lucide-react";
type proptypes = {
  heading: string;
  team: string;
  location: string;
};
const Jobcard: React.FC<proptypes> = ({ heading, team, location }) => {
  return (
    <div
      className={`grid w-1/2 place-content-center gap-8 rounded border-2 border-slate-200 px-4 py-6 font-semibold shadow-md md:w-2/3`}
    >
      <h1 className={`text-3xl`}>{heading}</h1>
      <div className="grid gap-4 text-xl">
        <div className={`grid w-1/2 grid-cols-2 place-items-center`}>
          <div
            className={`justify-self-start rounded-full border border-black p-1`}
          >
            <Users></Users>
          </div>
          <p className={`justify-self-start`}>{team}</p>
        </div>
        <div className={`grid w-1/2 grid-cols-2 place-items-center`}>
          <div
            className={`justify-self-start rounded-full border border-black p-1`}
          >
            <MapPin></MapPin>
          </div>
          <p className={`justify-self-start`}>{location}</p>
        </div>
      </div>

      <div
        className={`mr-1 cursor-pointer justify-self-end rounded-full bg-black p-2`}
      >
        <ArrowRight size={27} color="#ffffff"></ArrowRight>
      </div>
    </div>
  );
};
export default Jobcard;
