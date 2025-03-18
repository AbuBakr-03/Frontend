import { useEffect, useRef, useState, RefObject } from "react";
import Logo from "../../../assets/Logo2.png";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar: React.FC = () => {
  const [mobile, setmobile] = useState<boolean>(window.innerWidth < 768);
  const [menu, setmenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handlemenu = () => {
    setmenu(true);
  };
  const handleClickOutside = () => {
    setmenu(false);
  };
  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  const checksize = () => {
    if (window.innerWidth < 768) {
      setmobile(true);
    } else {
      setmobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      checksize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        checksize();
      });
    };
  }, []);

  return (
    <>
      {mobile ? (
        <>
          <nav className="fixed left-0 top-0 z-50 grid w-full grid-cols-3 items-center bg-white px-4 py-1 shadow-md">
            <div className="grid justify-start">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Menu
                  className={`cursor-pointer`}
                  onClick={() => {
                    handlemenu();
                  }}
                ></Menu>
              </motion.div>
            </div>
            <div className="grid justify-center">
              <img
                onClick={() => {
                  navigate("/");
                }}
                className={`aspect-video h-14 cursor-pointer object-cover`}
                src={Logo}
                alt="Smart HR"
              />
            </div>
          </nav>
          <AnimatePresence initial={false} onExitComplete={() => null}>
            {menu && (
              <>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", duration: 0.5 }}
                  ref={ref}
                  className="fixed left-0 top-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-lg"
                >
                  <div className="flex items-center justify-between border-b p-4">
                    <p className="pl-2 font-inter text-xl font-medium">Menu</p>
                    <button onClick={() => handleClickOutside()}>
                      <X size={24} />
                    </button>
                  </div>
                  <ul className="grid gap-6 p-4 font-inter">
                    <li
                      className={`rounded border-b-2 pl-2 transition-all duration-300 hover:bg-slate-200`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/"}
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className={`rounded border-b-2 pl-2 transition-all duration-300 hover:bg-slate-200`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/WhyUs"}
                      >
                        Why Us?
                      </Link>
                    </li>
                    <li
                      className={`rounded border-b-2 pl-2 transition-all duration-300 hover:bg-slate-200`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/Perks"}
                      >
                        Perks
                      </Link>
                    </li>
                    <li
                      className={`rounded border-b-2 pl-2 transition-all duration-300 hover:bg-slate-200`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/JoinUs"}
                      >
                        Join Us
                      </Link>
                    </li>
                    <li
                      className={`rounded border-b-2 pl-2 transition-all duration-300 hover:bg-slate-200`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/SignUp"}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li
                      className={`rounded border-b-2 pl-2 transition-all duration-300 hover:bg-slate-200`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/LogIn"}
                      >
                        Log In
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="mb-16"></div>
        </>
      ) : (
        <>
          <nav className={`w-10/12 font-inter text-sm font-semibold`}>
            <div className={`${styles.container} py-4 font-medium`}>
              {/* <img
                onClick={() => {
                  navigate("/");
                }}
                className={`${styles.logo} aspect-video w-1/2 justify-self-start object-cover`}
                src={Logo}
                alt="LittleLemon"
              /> */}

              <div
                className={`${styles.links} grid grid-cols-6 place-items-center gap-16`}
              >
                <ul
                  className={`${styles.normal} grid w-full grid-cols-4 place-items-center`}
                >
                  <li
                    className={`border-b-2 border-transparent transition-all duration-300 hover:border-black`}
                  >
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li
                    className={`border-b-2 border-transparent transition-all duration-300 hover:border-black`}
                  >
                    <Link to={"/WhyUs"}>Why Us?</Link>
                  </li>
                  <li
                    className={`border-b-2 border-transparent transition-all duration-300 hover:border-black`}
                  >
                    <Link to={"/Perks"}>Perks</Link>
                  </li>
                  <li
                    className={`border-b-2 border-transparent transition-all duration-300 hover:border-black`}
                  >
                    <Link to={"/JoinUs"}>Join Us</Link>
                  </li>
                </ul>

                <div
                  className={`${styles.buttonlink} grid w-full grid-cols-2 justify-items-center`}
                >
                  <Link to={"/SignUp"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`${styles.button} w-24 rounded-md px-3 py-2 text-white hover:bg-black`}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                  <Link to={"/LogIn"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`${styles.button} w-24 rounded-md px-3 py-2 text-white hover:bg-black`}
                    >
                      Log In
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
export default Navbar;
