import Navbar from "./navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <>
      <header className={`grid justify-items-center shadow-md`}>
        <Navbar></Navbar>
      </header>
      <Outlet />
      <Footer></Footer>
    </>
  );
};
export default Header;
