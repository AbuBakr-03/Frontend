import Navbar from "./navbar/Navbar";
const Header: React.FC = () => {
  return (
    <header className={`grid justify-items-center shadow-md`}>
      <Navbar></Navbar>
    </header>
  );
};
export default Header;
