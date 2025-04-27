import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="grid w-full place-items-center border-t-2 shadow">
      <div className={`grid w-11/12 gap-4`}>
        <div
          className={`grid items-center pb-4 pt-8 max-sm:justify-center max-sm:gap-6 sm:grid-cols-2`}
        >
          <h1 className={`grid text-center text-xl font-bold sm:text-start`}>
            smartHR
          </h1>
          <div
            className={`grid grid-cols-4 justify-items-center gap-8 sm:justify-self-end`}
          >
            <div className="cursor-pointer rounded-md p-2 hover:bg-slate-200">
              <Facebook size={18}></Facebook>
            </div>
            <div className="cursor-pointer rounded-md p-2 hover:bg-slate-200">
              <Instagram size={18}></Instagram>
            </div>
            <div className="cursor-pointer rounded-md p-2 hover:bg-slate-200">
              <Linkedin size={18}></Linkedin>
            </div>
            <div className="cursor-pointer rounded-md p-2 hover:bg-slate-200">
              <Twitter size={18}></Twitter>
            </div>
          </div>
        </div>
        <div
          className={`${styles.secondsection} justify-items-center gap-8 border-y border-slate-300 py-8 max-md:justify-items-start`}
        >
          <div className={`${styles.about} grid h-fit gap-4`}>
            <h1 className="text-lg font-bold">About Us</h1>
            <p className="text-slate-600">
              We provide innovative solutions for modern businesses. Our team is
              dedicated to delivering excellence in every project we undertake.
            </p>
          </div>
          <div className={`${styles.links} grid gap-4 max-sm:w-full`}>
            <h1 className="text-lg font-bold">Quick Links</h1>
            <ul className="grid gap-2 max-sm:grid-cols-2">
              <li>
                <Link className="text-slate-600 hover:text-black" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 hover:text-black"
                  to={"/why-us"}
                >
                  Why Us
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-black" to={"/perks"}>
                  Perks
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 hover:text-black"
                  to={"/join-us"}
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.contacts} grid h-fit gap-4`}>
            <h1 className="text-lg font-bold">Contact Us</h1>
            <div className="flex gap-3">
              <MapPin size={22} color="#475569" />
              <p className="text-slate-600">
                123 Business Avenue, Silicon Valley, CA 94043
              </p>
            </div>
            <div className="flex gap-3">
              <Phone size={22} color="#475569"></Phone>
              <p className="text-slate-600">(123) 456-7890</p>
            </div>
            <div className="flex gap-3">
              <Mail size={22} color="#475569"></Mail>
              <p className="text-slate-600">info@smarthr.com</p>
            </div>
          </div>
        </div>
        <div
          className={`grid items-center pb-4 pt-2 max-sm:justify-center max-sm:gap-6 sm:grid-cols-2`}
        >
          <p className="text-sm text-slate-600 max-sm:text-center">
            © 2025 Acme Inc. All rights reserved.
          </p>
          <ul className="grid grid-cols-3 justify-items-center gap-8 max-lg:gap-0 sm:justify-self-end">
            <li>
              <Link className="text-sm text-slate-600 hover:text-black" to={""}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-sm text-slate-600 hover:text-black" to={""}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="text-sm text-slate-600 hover:text-black" to={""}>
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
