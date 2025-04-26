import { Routes, Route } from "react-router";
import Home from "@/pages/Index";
import Layout from "@/components/Layout";
import AboutUs from "@/pages/about-us";
import EditProfile from "@/pages/edit-profile";
import StudentProfile from "@/pages/student-profile";
import CertificatePage from "@/pages/certficate-page";
import Course from "@/pages/course";
import VideoLessonPage from "@/pages/video-lesson";
import PhotographySchool from "@/pages/photograph";
import Schools from "@/pages/schools";
import ContactUs from "@/pages/contact-us";
import Login from "@/pages/login";
import Register from "@/pages/register";
import OnboardingFlow from "@/pages/onboarding";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/course" element={<Course />} />

        <Route path="/photography" element={<PhotographySchool />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/video-lesson" element={<VideoLessonPage />} />
      <Route path="/onboarding" element={<OnboardingFlow />} />
    </Routes>
  );
}

export default App;
