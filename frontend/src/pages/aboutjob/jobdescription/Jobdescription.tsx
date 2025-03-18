import styles from "../../../styles/global.module.css";
const Jobdescription: React.FC = () => {
  return (
    <div
      className={`${styles.description} grid gap-6 rounded-xl border border-slate-300 p-6`}
    >
      <div className="grid gap-1">
        <h1 className={`text-2xl font-bold`}>Job Details</h1>
        <p className="text-sm">
          We're looking for a talented Frontend Developer to join our growing
          team.
        </p>
      </div>
      <div className="grid gap-1">
        <h1 className="text-xl font-bold">About the Role</h1>
        <p>
          As a Senior Frontend Developer at Acme Inc., you'll be responsible for
          building and maintaining high-quality web applications that provide
          exceptional user experiences. You'll work closely with designers,
          product managers, and backend developers to implement new features and
          improve existing ones.
        </p>
      </div>
      <hr />
      <div className="grid gap-1">
        <h1 className="text-xl font-bold">Responsibilities</h1>
        <ul className="list-disc pl-6">
          <li>
            Develop new user-facing features using React.js and modern frontend
            technologies
          </li>
          <li>Build reusable components and libraries for future use</li>
          <li>Translate designs and wireframes into high-quality code</li>
          <li>Optimize applications for maximum speed and scalability</li>
          <li>Collaborate with other team members and stakeholders</li>
          <li>
            Maintain and improve code quality with testing and code reviews
          </li>
        </ul>
      </div>
      <hr />
      <div className="grid gap-1">
        <h1 className="text-xl font-bold">Qualification</h1>
        <ul className="list-disc pl-6">
          <li>
            3+ years of experience with React.js and modern JavaScript (ES6+)
          </li>
          <li>Build reusable components and libraries for future use</li>
          <li>Translate designs and wireframes into high-quality code</li>
          <li>Optimize applications for maximum speed and scalability</li>
          <li>Collaborate with other team members and stakeholders</li>
          <li>
            Maintain and improve code quality with testing and code reviews
          </li>
        </ul>
      </div>
      <hr />
      <div className="grid gap-1">
        <h1 className="text-xl font-bold">Nice to Haves</h1>
        <ul className="list-disc pl-6">
          <li>Experience with TypeScript</li>
          <li>Knowledge of Next.js or similar frameworks</li>
          <li>Experience with UI/UX design principles</li>
        </ul>
      </div>
    </div>
  );
};
export default Jobdescription;
