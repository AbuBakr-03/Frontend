import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import WhyUs from "./pages/whyUs/WhyUs";
import Perks from "./pages/perks/Perks";
import JoinUs from "./pages/joinUs/JoinUs";
import Signup from "./pages/signUp/Signup";
import Login from "./pages/logIn/Login";
import AboutJob from "./pages/aboutjob/Aboutjob";
import Dashboard from "./pages/dashboard/Dashboard";
import Forgotpassword from "./pages/forgotPassword/Forgotpassword";
import Personalinformation from "./pages/dashboard/personalInformation/Personalinformation";
import Jobopening from "./pages/dashboard/jobOpening/Jobopening";
import Alljobs from "./pages/dashboard/allJobs/Alljobs";
import Userdashboard from "./pages/userDashboard/Userdashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header></Header>}>
          <Route index={true} element={<Home></Home>}></Route>
          <Route path="/WhyUs" element={<WhyUs></WhyUs>}></Route>
          <Route path="/Perks" element={<Perks></Perks>}></Route>
          <Route path="/JoinUs" element={<JoinUs></JoinUs>}></Route>
          <Route path="/SignUp" element={<Signup></Signup>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route
            path="/ForgotPassword"
            element={<Forgotpassword></Forgotpassword>}
          ></Route>
          <Route path="/AboutJob" element={<AboutJob></AboutJob>}></Route>
        </Route>
        <Route path="/Dashboard" element={<Dashboard></Dashboard>}>
          <Route
            path="PI"
            element={<Personalinformation></Personalinformation>}
          ></Route>
          <Route path="CJO" element={<Jobopening></Jobopening>}></Route>
          <Route path="AJO" element={<Alljobs></Alljobs>}></Route>
          <Route path="IS" element={<Alljobs></Alljobs>}></Route>
          <Route path="IR" element={<Alljobs></Alljobs>}></Route>
          <Route path="PC" element={<Alljobs></Alljobs>}></Route>
        </Route>
        <Route path="/UserDashboard" element={<Userdashboard></Userdashboard>}>
          <Route
            path="PI"
            element={<Personalinformation></Personalinformation>}
          ></Route>
          <Route path="SA" element={<Alljobs></Alljobs>}></Route>
          <Route path="IR" element={<Alljobs></Alljobs>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
