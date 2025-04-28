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
import RequireAuth from "@/components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/edit-profile"
          element={
            //<RequireAuth>
            <EditProfile />
            // </RequireAuth>
          }
        />
        <Route
          path="/student-profile"
          element={
            //<RequireAuth>
            <StudentProfile />
            // </RequireAuth>
          }
        />
        <Route
          path="/certificate"
          element={
            //<RequireAuth>
            <CertificatePage />
            // </RequireAuth>
          }
        />
        <Route
          path="/course"
          element={
            //<RequireAuth>
            <Course />
            // </RequireAuth>
          }
        />
        <Route
          path="/photography"
          element={
            //<RequireAuth>
            <PhotographySchool />
            // </RequireAuth>
          }
        />
        <Route
          path="/schools"
          element={
            //<RequireAuth>
            <Schools />
            // </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/video-lesson"
        element={
          // <RequireAuth>
          <VideoLessonPage />
          //  </RequireAuth>
        }
      />
      <Route
        path="/onboarding"
        element={
          // <RequireAuth>
          <OnboardingFlow />
          //  </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
