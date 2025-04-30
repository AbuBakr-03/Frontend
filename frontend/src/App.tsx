// frontend/src/App.tsx

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import WhyUs from "./pages/whyUs/WhyUs";
import Perks from "./pages/perks/Perks";
import JoinUs2 from "./pages/joinUs2/JoinUs2";
import Signup from "./pages/signUp/Signup";
import Login from "./pages/logIn/Login";
import AboutJob from "./pages/aboutjob/Aboutjob";
import Dashboard from "./pages/dashboard/Dashboard";
import Forgotpassword from "./pages/forgotPassword/Forgotpassword";
import Jobopening from "./pages/dashboard/createJob/Createjob";
import Allcompanies from "./pages/dashboard/allCompanies/Allcompanies";
import Alldepartments from "./pages/dashboard/allDepartments/Alldepartments";
import Alljobs from "./pages/dashboard/allJobs/Alljobs";
import Allapplications from "./pages/dashboard/allApplications/Allapplications";
import Allrecruitrequests from "./pages/dashboard/allRecruitRequests/Allrecruitrequests";
import Allinterviews from "./pages/dashboard/allInterviews/Allinterviews";
import Createcompany from "./pages/dashboard/createCompany/Createcompany";
import Createdepartment from "./pages/dashboard/createDepartment/Createdepartment";
import Createapplication from "./pages/dashboard/createApplication/Createapplication";
import Createinterview from "./pages/dashboard/createInterview/Createinterview";
import InterviewQuestions from "./components/interview_questions";
import { Toaster } from "sonner";
import Scrolltotop from "./components/scrollToTop/Scrolltotop";
import Resetpassword from "./pages/resetPassword/Resetpassword";
import DashboardHome from "./pages/dashboard/Dashboardhome";
import Allpredictedcandidates from "./pages/dashboard/allPredictedCandidates/Allpredictedcandidates";
import CandidateEvaluation from "./pages/dashboard/candidateEvaluation/Candidateevaluation";

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
            path="/reset-password"
            element={<Resetpassword></Resetpassword>}
          ></Route>
          <Route
            path="/reset-password/:uid/:token"
            element={<Resetpassword></Resetpassword>}
          ></Route>
          <Route
            path="/forgot-password"
            element={<Forgotpassword></Forgotpassword>}
          ></Route>
          <Route path="/about-job" element={<AboutJob></AboutJob>}></Route>
          <Route path="/about-job/:id" element={<AboutJob></AboutJob>}></Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<DashboardHome />} />

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
            path="interview"
            element={<Createinterview></Createinterview>}
          ></Route>
          <Route
            path="interview/:id"
            element={<Createinterview></Createinterview>}
          ></Route>
          <Route
            path="interview-questions/:id"
            element={<InterviewQuestions />}
          ></Route>

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
            element={<Allinterviews></Allinterviews>}
          ></Route>
          <Route
            path="all-interview-reports"
            element={<Allcompanies></Allcompanies>}
          ></Route>

          <Route
            path="all-recruit-requests"
            element={<Allrecruitrequests></Allrecruitrequests>}
          ></Route>
          <Route
            path="all-predicted-candidates"
            element={<Allpredictedcandidates />}
          />
          <Route
            path="candidate-evaluation/:id"
            element={<CandidateEvaluation />}
          />
          <Route
            path="candidate-evaluation/:id/view"
            element={<CandidateEvaluation />}
          />
        </Route>
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;
