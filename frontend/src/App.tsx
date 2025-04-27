import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import WhyUs from "./pages/whyUs/WhyUs";
import Perks from "./pages/perks/Perks";
// import JoinUs from "./pages/joinUs/JoinUs";
import JoinUs2 from "./pages/joinUs2/JoinUs2";
import Signup from "./pages/signUp/Signup";
import Login from "./pages/logIn/Login";
import AboutJob from "./pages/aboutjob/Aboutjob";
import Dashboard from "./pages/dashboard/Dashboard";
import Forgotpassword from "./pages/forgotPassword/Forgotpassword";
import Personalinformation from "./pages/dashboard/personalInformation/Personalinformation";
import Jobopening from "./pages/dashboard/createJob/Createjob";
import Allcompanies from "./pages/dashboard/allCompanies/Allcompanies";
import Alldepartments from "./pages/dashboard/allDepartments/Alldepartments";
import Alljobs from "./pages/dashboard/allJobs/Alljobs";
import Allapplications from "./pages/dashboard/allApplications/Allapplications";
import Allrecruitrequests from "./pages/dashboard/allRecruitRequests/Allrecruitrequests";
import Userdashboard from "./pages/userDashboard/Userdashboard";
import Createcompany from "./pages/dashboard/createCompany/Createcompany";
import Createdepartment from "./pages/dashboard/createDepartment/Createdepartment";
import Createapplication from "./pages/dashboard/createApplication/Createapplication";
import { Toaster } from "sonner";
import Scrolltotop from "./components/scrollToTop/Scrolltotop";
function App() {
  return (
    <>
      <Scrolltotop />
      <Routes>
        <Route path="/" element={<Header></Header>}>
          <Route index={true} element={<Home></Home>}></Route>
          <Route path="/why-us" element={<WhyUs></WhyUs>}></Route>
          <Route path="/perks" element={<Perks></Perks>}></Route>
          <Route path="/join-us" element={<JoinUs2></JoinUs2>}></Route>
          <Route path="/sign-up" element={<Signup></Signup>}></Route>
          <Route path="/log-in" element={<Login></Login>}></Route>
          <Route
            path="/forgot-password"
            element={<Forgotpassword></Forgotpassword>}
          ></Route>
          <Route path="/about-job" element={<AboutJob></AboutJob>}></Route>
          <Route path="/about-job/:id" element={<AboutJob></AboutJob>}></Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route
            path="personal-information"
            element={<Personalinformation></Personalinformation>}
          ></Route>
          <Route
            path="company"
            element={<Createcompany></Createcompany>}
          ></Route>
          <Route path="company/:id" element={<Createcompany />} />

          <Route
            path="department"
            element={<Createdepartment></Createdepartment>}
          ></Route>
          <Route path="department/:id" element={<Createdepartment />} />
          <Route path="application/:id" element={<Createapplication />} />
          <Route path="job" element={<Jobopening></Jobopening>}></Route>
          <Route path="job/:id" element={<Jobopening></Jobopening>}></Route>
          <Route
            path="all-companies"
            element={<Allcompanies></Allcompanies>}
          ></Route>
          <Route
            path="all-departments"
            element={<Alldepartments></Alldepartments>}
          ></Route>
          <Route path="all-jobs" element={<Alljobs></Alljobs>}></Route>
          <Route
            path="all-applications"
            element={<Allapplications></Allapplications>}
          ></Route>
          <Route
            path="all-interview-sessions"
            element={<Allcompanies></Allcompanies>}
          ></Route>
          <Route
            path="all-interview-reports"
            element={<Allcompanies></Allcompanies>}
          ></Route>
          <Route
            path="all-predicted-candidates"
            element={<Allcompanies></Allcompanies>}
          ></Route>
          <Route
            path="all-recruit-requests"
            element={<Allrecruitrequests></Allrecruitrequests>}
          ></Route>
        </Route>
        <Route path="/UserDashboard" element={<Userdashboard></Userdashboard>}>
          <Route
            path="PI"
            element={<Personalinformation></Personalinformation>}
          ></Route>
          <Route path="SA" element={<Allcompanies></Allcompanies>}></Route>
          <Route path="IR" element={<Allcompanies></Allcompanies>}></Route>
        </Route>
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;
