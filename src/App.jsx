import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Index";
import Layout from "@/components/Layout";
import AboutUs from "@/pages/about-us";
import EditProfile from "@/pages/edit-profile";
import StudentProfile from "@/pages/student-profile";
import CertificatePage from "@/pages/certficate-page";
import Course from "@/pages/course";
import VideoLessonPage from "@/pages/video-lesson";
import Courses from "@/pages/courses";
import Schools from "@/pages/schools";
import ContactUs from "@/pages/contact-us";
import Login from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPassword from "@/pages/forgot-password";
import ResetPassword from "@/pages/reset-password";
import OnboardingFlow from "@/pages/onboarding";
import RequireAuth from "@/components/RequireAuth";
import Dashboard from "@/components/admin/SideBar";
import Admin from "@/pages/admin";
import Student from "@/pages/admin/student";
import Instructor from "@/pages/admin/instructor";
import ContentLibrary from "@/pages/admin/content-library";
import EnrollmentPayments from "@/pages/admin/enrollment-payments";
import Settings from "@/pages/admin/settings";
import AdminCourses from "@/pages/admin/courses";
import AdminSchoolForm from "@/pages/admin/school/add";
import School from "@/pages/admin/school";
import AdminCoursesForm from "@/pages/admin/courses/add";
import Certificates from "@/pages/admin/certificates";
import AddCertificate from "@/pages/admin/certificates/add";
import StudentNavBar from "./components/StudentNavBar";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

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
          path="/certificate"
          element={
            //<RequireAuth>
            <CertificatePage />
            // </RequireAuth>
          }
        />
        <Route
          path="/course/:id"
          element={
            //<RequireAuth>
            <Course />
            // </RequireAuth>
          }
        />
        <Route
          path="/courses/:id"
          element={
            //<RequireAuth>
            <Courses />
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
      <Route
        path="/student-profile"
        element={
          <RequireAuth>
            <StudentNavBar />
            <StudentProfile />
          </RequireAuth>
        }
      />
      <Route path="/admin" element={<Dashboard />}>
        <Route path="dashboard" element={<Admin />} />
        <Route path="students" element={<Student />} />
        <Route path="instructors" element={<Instructor />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="content-library" element={<ContentLibrary />} />
        <Route path="enrollment-payments" element={<EnrollmentPayments />} />
        <Route path="settings" element={<Settings />} />
        <Route path="add-school" element={<AdminSchoolForm />} />
        <Route path="my-school" element={<School />} />
        <Route path="add-school/:id" element={<AdminSchoolForm />} />
        <Route path="add-course" element={<AdminCoursesForm />} />
        <Route path="add-course/:id" element={<AdminCoursesForm />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="certificates/add" element={<AddCertificate />} />
        <Route path="certificates/edit/:id" element={<AddCertificate />} />
      </Route>
    </Routes>
  );
}

export default App;
