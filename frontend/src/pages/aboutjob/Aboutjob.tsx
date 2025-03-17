import img from "../../assets/PerksJumbotron1.webp";
import { Users, MapPin } from "lucide-react";
import colors from "../../styles/global.module.css";
const AboutJob: React.FC = () => {
  return (
    <main>
      <div className={`${colors.background} justify-items-center py-8`}>
        <div className={`grid w-9/12 place-items-center gap-8 md:grid-cols-2`}>
          <div className={`grid gap-8 md:justify-self-start`}>
            <h1 className={`text-4xl text-white`}>Senior Product Manager</h1>
            <div
              className={`grid grid-cols-2 place-items-center gap-4 md:justify-items-start`}
            >
              <div className={`grid grid-cols-2 place-items-center`}>
                <div
                  className={`justify-self-start rounded-full border-2 border-white p-1`}
                >
                  <Users color="#ffffff"></Users>
                </div>
                <p className={`justify-self-start text-white`}>Product</p>
              </div>
              <div className={`grid grid-cols-2 place-items-center`}>
                <div
                  className={`justify-self-start rounded-full border-2 border-white p-1`}
                >
                  <MapPin color="#ffffff"></MapPin>
                </div>
                <p className={`justify-self-start text-white`}>London</p>
              </div>
            </div>
            <button
              className={`justify-self-center rounded bg-white px-6 py-1 font-semibold md:justify-self-start`}
            >
              Apply
            </button>
          </div>
          <img
            className={`rounded-md border object-cover md:aspect-video md:justify-self-end lg:w-8/12`}
            src={img}
            alt=""
          />
        </div>
      </div>
      <div className={`justify-items-center py-8`}>
        <div className={`grid w-9/12 place-items-center gap-8 md:grid-cols-3`}>
          <div className="grid h-96 gap-4 rounded-md border-2 border-slate-200 p-6 shadow">
            <h1 className={`text-center text-2xl font-bold`}>
              Job Description
            </h1>
            <p>
              We are shaping the future of AI-driven HR solutions. As a Senior
              Product Manager, you will drive the strategy, roadmap, and
              execution of our cutting-edge products. You’ll work
              cross-functionally with engineering, design, marketing, and sales
              teams to build innovative HR technology that enhances hiring,
              workforce management, and employee experience.
            </p>
          </div>
          <div className="grid h-96 gap-4 rounded-md border-2 border-slate-200 p-6 shadow">
            <h1 className={`text-center text-2xl font-bold`}>Qualification </h1>
            <p>
              Experience: 5+ years in product management, preferably in SaaS, HR
              Tech, or AI-driven platforms. <br /> Education: Bachelor’s or
              Master’s degree in Business, Computer Science, or a related field.
            </p>
          </div>
          <div className="grid h-96 gap-4 rounded-md border-2 border-slate-200 p-6 shadow">
            <h1 className={`text-center text-2xl font-bold`}>
              Additional Information{" "}
            </h1>
            <p>
              Location: Remote or Hybrid (Offices in [Location, if applicable])
              Compensation: Competitive salary, performance-based bonuses, and
              stock options.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default AboutJob;
