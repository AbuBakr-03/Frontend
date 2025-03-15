import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import WhyUs from "./pages/whyUs/WhyUs";
import Perks from "./pages/perks/Perks";
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/WhyUs" element={<WhyUs></WhyUs>}></Route>
        <Route path="/Perks" element={<Perks></Perks>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
