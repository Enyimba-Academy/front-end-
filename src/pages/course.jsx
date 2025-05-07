import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../constant/role";
import PrimaryButton from "../components/shared/PrimaryButton";
import PrimaryLink from "../components/shared/PrimaryLink";
import { useCourseById } from "../hooks/usePublic.hook";
import { useCreateEnrollment } from "../hooks/useEnrollment.hook";
import { toast } from "react-toastify";

export default function Course() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, isLoading } = useCourseById(id);
  const course = data?.course;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="bg-white">
      {/* Course Header Section */}
      <section className="lg:px-[150px] mx-auto px-4 py-12 md:py-16 lg:py-20 bg-primary-light/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Course Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {course.title}
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  {course.duration} • {course.level}
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{course.level}</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Online + Practical Workshops
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-red-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-gray-700">
                  Taught by Industry Experts
                  <br />
                  Experienced Broadcast Professionals
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {user && user?.role === ROLES.STUDENT ? (
                <LinkToShow enrollments={user?.enrollments} course={course} />
              ) : (
                <PrimaryLink to={`/register?courseId=${course.id}`}>
                  Apply Now
                </PrimaryLink>
              )}
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download Syllabus
              </button>
            </div>
          </div>

          {/* Right Column - Course Image */}
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={course.image || "/pick4.png"}
                alt={course.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2"></h2>
                <h3 className="text-2xl md:text-3xl font-bold"></h3>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center text-red-600 hover:text-red-700 mt-4"
            >
              Watch Intro Lesson
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Course Overview
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto">
          {course.description}
        </p>
      </section>

      {/* Course Curriculum Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            Course Curriculum
          </h2>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {course.sections.map((section, sectionIndex) => (
              <details key={section.id} className="border-b border-gray-100">
                <summary className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">
                        {sectionIndex + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500 transform transition-transform duration-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </summary>
                <div className="p-4 bg-gray-50">
                  <ul className="space-y-2">
                    {section.contents.map((content) => (
                      <li key={content.id} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-red-600 mr-2 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{content.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-[670px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              N{course.price.toLocaleString()}
            </h3>
            <p className="text-gray-600 mb-6">
              {course.duration} Access • Certificate • Studio Access
            </p>

            <p className="text-sm text-gray-600">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="border-t border-gray-200">
          <details className="py-4 border-b border-gray-200">
            <summary className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">
                Do I need any prior experience?
              </span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <p className="mt-2 text-gray-600 pl-4">
              This course is designed for beginners with no prior experience in
              broadcasting. We'll teach you everything from the ground up.
            </p>
          </details>

          <details className="py-4 border-b border-gray-200">
            <summary className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">What equipment do I need?</span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <p className="mt-2 text-gray-600 pl-4">
              You'll need a computer with internet access. For practical
              exercises, a smartphone with a camera and microphone will be
              sufficient. We'll provide access to professional equipment during
              studio sessions.
            </p>
          </details>

          <details className="py-4 border-b border-gray-200">
            <summary className="flex justify-between items-center cursor-pointer">
              <span className="font-medium">Will I get a certificate?</span>
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </summary>
            <p className="mt-2 text-gray-600 pl-4">
              Yes, upon successful completion of the course and all assessments,
              you'll receive a {course.title} certificate.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 flex justify-center flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Start Your Broadcasting Journey Today
          </h2>
          {user && user?.role === ROLES.STUDENT ? (
            <LinkToShow enrollments={user?.enrollments} course={course} />
          ) : (
            <PrimaryLink to={`/register?courseId=${course.id}`}>
              Apply Now
            </PrimaryLink>
          )}
        </div>
      </section>
    </div>
  );
}

function LinkToShow({ enrollments, course }) {
  const { mutate: enroll, isPending } = useCreateEnrollment();
  const { user } = useAuth();
  const navigate = useNavigate();
  const existingEnrollment = enrollments?.find(
    (enrollment) => enrollment.courseId === course.id
  );

  if (existingEnrollment) {
    return <PrimaryLink to="/student-profile">View Course</PrimaryLink>;
  }
  return (
    <PrimaryButton
      onClick={() =>
        enroll(
          { courseId: course.id },
          {
            onSuccess: () => {
              toast.success("Enrolled successfully");
              navigate("/student-profile");
            },
          }
        )
      }
    >
      {isPending ? "Enrolling..." : "Enroll"}
    </PrimaryButton>
  );
}
