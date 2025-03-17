import Jobcard from "./jobcard/Jobcard";
import Abovethefold from "./abovethefold/Abovethefold";
const JoinUs: React.FC = () => {
  return (
    <main>
      <Abovethefold></Abovethefold>
      <div className="my-8 grid place-items-center">
        <div className="w-10/12">
          <div className="grid place-items-center gap-12 lg:grid-cols-3">
            <Jobcard
              heading="Senior Product Manager"
              team="Product"
              location="London"
            ></Jobcard>
            <Jobcard
              heading="Senior Product Manager"
              team="Product"
              location="London"
            ></Jobcard>
            <Jobcard
              heading="Senior Product Manager"
              team="Product"
              location="London"
            ></Jobcard>
            <Jobcard
              heading="Senior Product Manager"
              team="Product"
              location="London"
            ></Jobcard>
            <Jobcard
              heading="Senior Product Manager"
              team="Product"
              location="London"
            ></Jobcard>
            <Jobcard
              heading="Senior Product Manager"
              team="Product"
              location="London"
            ></Jobcard>
          </div>
        </div>
      </div>
    </main>
  );
};
export default JoinUs;
