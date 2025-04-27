import { Users, MapPin } from "lucide-react";
import img from "../../../assets/PerksJumbotron1.webp";
import colors from "../../../styles/global.module.css";
import { useParams } from "react-router-dom";
import useGetJob from "../../../hooks/useGetJob";
import Loader from "../../../components/loader/Loader";

const Jobhero: React.FC = () => {
  const { id } = useParams();
  const { getQueryJob } = useGetJob(Number(id));
  const { data, isLoading } = getQueryJob;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={`${colors.background} justify-items-center py-8`}>
      <div className={`grid w-9/12 place-items-center gap-8 md:grid-cols-2`}>
        <div className={`grid gap-8 md:justify-self-start`}>
          <h1 className={`text-4xl text-white`}>{data?.title}</h1>
          <div className={`grid items-center gap-4`}>
            <div className={`grid grid-cols-2 place-items-center`}>
              <div className={`rounded-full border-2 border-white p-1`}>
                <Users color="#ffffff"></Users>
              </div>
              <p className={`justify-self-start text-white`}>
                {data?.department.title}
              </p>
            </div>
            <div className={`grid grid-cols-2 place-items-center`}>
              <div className={`rounded-full border-2 border-white p-1`}>
                <MapPin color="#ffffff"></MapPin>
              </div>
              <p className={`justify-self-start text-white`}>
                {data?.location}
              </p>
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
