import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import WhyUs from "./pages/whyUs/WhyUs";
import Perks from "./pages/perks/Perks";
import JoinUs from "./pages/joinUs/JoinUs";
import Signup from "./pages/signUp/Signup";
import Login from "./pages/logIn/Login";
import AboutJob from "./pages/aboutjob/Aboutjob";
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/WhyUs" element={<WhyUs></WhyUs>}></Route>
        <Route path="/Perks" element={<Perks></Perks>}></Route>
        <Route path="/JoinUs" element={<JoinUs></JoinUs>}></Route>
        <Route path="/SignUp" element={<Signup></Signup>}></Route>
        <Route path="/Login" element={<Login></Login>}></Route>
        <Route path="/AboutJob" element={<AboutJob></AboutJob>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
