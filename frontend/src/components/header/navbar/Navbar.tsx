import { useEffect, useRef, useState, RefObject } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../components/ui/navigation-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../ui/alert-dialog";

import { useAuth } from "../../../contexts/AuthProvider";
import useLogout from "../../../hooks/useLogout";
import useRecruiters from "../../../hooks/useRecruiters";
const Navbar: React.FC = () => {
  const { auth, logout } = useAuth();
  const { postLogoutQuery } = useLogout();
  const { postRecruiterQuery } = useRecruiters();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();

  const [mobile, setmobile] = useState<boolean>(window.innerWidth < 900);

  const [menu, setmenu] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const handlemenu = () => {
    setmenu(true);
  };

  const handleClickOutside = () => {
    setmenu(false);
  };

  useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

  const checksize = () => {
    if (window.innerWidth < 900) {
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

  const links = [
    { name: "Home", link: "/" },
    { name: "Why us", link: "/why-us" },
    { name: "Perks", link: "/perks" },
    { name: "Join Us", link: "/join-us" },
  ];

  const linkslist2 = links.map((x) => {
    return (
      <li
        className={`border-b-2 border-transparent transition-all duration-300 hover:border-black`}
      >
        <Link to={x.link}>{x.name}</Link>
      </li>
    );
  });

  const linkslist = links.map((x) => {
    return (
      <li className={`pl-2 pr-2 text-sm font-semibold`}>
        <Link
          onClick={() => {
            handleClickOutside();
          }}
          to={x.link}
        >
          {x.name}
        </Link>
      </li>
    );
  });

  return (
    <>
      {mobile ? (
        <>
          <nav className="fixed left-0 top-0 z-50 grid w-full grid-cols-2 items-center bg-white px-4 py-1 shadow-md">
            <div className="grid justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu
                  size={28}
                  className={`cursor-pointer rounded p-1 hover:bg-slate-100`}
                  onClick={() => {
                    handlemenu();
                  }}
                ></Menu>
              </motion.div>
            </div>
            <div className="grid justify-end py-3">
              <h1 className="text-xl font-bold">smartHR</h1>
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
                  className="fixed left-0 top-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-lg md:w-1/2 md:max-w-full"
                >
                  <div className="flex items-center justify-end p-4">
                    <button
                      className="rounded-md border-2 border-slate-300 hover:border-slate-400"
                      onClick={() => handleClickOutside()}
                    >
                      <X size={22} />
                    </button>
                  </div>
                  <ul className="mb-4 grid gap-4 p-4 font-inter">
                    {linkslist}
                  </ul>
                  <div className="grid place-items-center gap-2">
                    <button
                      className={`w-11/12 rounded border border-slate-300 py-2 pl-2 pr-2 text-center text-sm font-semibold`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/sign-up"}
                      >
                        Sign Up
                      </Link>
                    </button>
                    <button
                      className={`w-11/12 rounded bg-black py-2 pl-2 pr-2 text-center text-sm font-semibold text-white`}
                    >
                      <Link
                        onClick={() => {
                          handleClickOutside();
                        }}
                        to={"/log-in"}
                      >
                        Log In
                      </Link>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="mb-16"></div>
        </>
      ) : (
        <>
          <nav
            className={`grid w-11/12 place-items-center font-inter text-sm font-semibold`}
          >
            <div
              className={`${styles.container2} grid w-full place-items-center py-3 font-medium`}
            >
              <div className={`${styles.logo}`}>
                <h1 className="text-xl font-bold">smartHR</h1>
              </div>
              <div
                className={`${styles.links2} grid items-center justify-center gap-16`}
              >
                <ul
                  className={`grid w-full grid-cols-4 place-items-center gap-8 text-sm font-medium`}
                >
                  {linkslist2}
                </ul>
              </div>
              {auth.user?.is_recruiter || auth.user?.is_superuser ? (
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-slate-50 p-4">
                          Hi, {auth.user.email}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[220px] p-2">
                          <Link to={"/dashboard"}>
                            <NavigationMenuLink className="block cursor-pointer rounded-md p-2 text-sm hover:bg-slate-100">
                              My Profile
                            </NavigationMenuLink>
                          </Link>
                          <NavigationMenuLink
                            onClick={() => {
                              setOpen(true);
                            }}
                            className="block cursor-pointer rounded-md p-2 text-sm font-medium text-red-600 hover:bg-slate-100"
                          >
                            Log Out
                          </NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to Log out?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            logout();
                            postLogoutQuery.mutate();
                            setOpen(false);
                            navigate("/sign-up");
                          }}
                        >
                          Log Out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : auth.user ? (
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-slate-50 p-4">
                          Hi, {auth.user.email}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[220px] p-2">
                          <Link to={"/dashboard"}>
                            <NavigationMenuLink className="block cursor-pointer rounded-md p-2 text-sm hover:bg-slate-100">
                              My Profile
                            </NavigationMenuLink>
                          </Link>
                          <NavigationMenuLink
                            onClick={() => {
                              setOpen(true);
                            }}
                            className="block cursor-pointer rounded-md p-2 text-sm font-medium text-red-600 hover:bg-slate-100"
                          >
                            Log Out
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            onClick={() => {
                              setOpen2(true);
                            }}
                            className="mt-1.5 block cursor-pointer rounded-md border-t bg-black p-2 text-sm font-medium text-white hover:bg-slate-900"
                          >
                            Become a Recruiter
                          </NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to Log out?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            logout();
                            postLogoutQuery.mutate();
                            setOpen(false);
                          }}
                        >
                          Log Out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog open={open2} onOpenChange={setOpen2}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Become a Recruiter?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Send a request to the admins to make you a recruiter
                          and you can start reecruiting.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            console.log(postRecruiterQuery.data);
                            postRecruiterQuery.mutate();
                            setOpen2(false);
                          }}
                        >
                          Send Request
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <div
                  className={`${styles.button2} grid w-full grid-cols-2 justify-items-center gap-2 text-sm font-semibold`}
                >
                  <Link to={"/sign-up"}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className={`w-24 rounded-md border border-black px-2 py-2 text-sm text-black hover:bg-slate-100`}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                  <Link to={"/log-in"}>
                    <motion.button
                      whileHover={{ scale: 1.03, backgroundColor: "#333333" }}
                      className={`w-24 rounded-md bg-black px-2 py-2 text-white`}
                    >
                      Log In
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
};
export default Navbar;
