import { Link } from "react-router-dom";
import { ImageUrl } from "@/api/api";
import { Play } from "lucide-react";

export default function CourseIntroduction({ course, enrollmentId }) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Course Header */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={course?.image ? `${ImageUrl}${course.image}` : "/pick4.png"}
          alt={course?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {course?.title}
          </h1>
          <p className="text-white/90 text-lg">{course?.school?.name}</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Course Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Course
          </h2>
          <p className="text-gray-600">{course?.description}</p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Level</h3>
            <p className="text-lg font-semibold text-gray-900">
              {course?.level}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
            <p className="text-lg font-semibold text-gray-900">
              {course?.duration || "Self-paced"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Sections</h3>
            <p className="text-lg font-semibold text-gray-900">
              {course?.sections?.length || 0}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Price</h3>
            <p className="text-lg font-semibold text-gray-900">
              ₦{course?.price?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Course Curriculum Preview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Curriculum
          </h2>
          <div className="space-y-4">
            {course?.sections?.map((section, index) => (
              <div key={section.id} className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {index + 1}. {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.contents?.map((content) => (
                    <li
                      key={content.id}
                      className="flex items-center text-gray-600"
                    >
                      <span className="mr-2">
                        {content.type === "VIDEO"
                          ? "🎬"
                          : content.type === "QUIZ"
                          ? "📝"
                          : content.type === "ASSIGNMENT"
                          ? "📋"
                          : "📄"}
                      </span>
                      {content.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Start Course Button */}
        <div className="text-center">
          <Link
            to={`/lesson/${enrollmentId}/content/${course?.sections?.[0]?.contents?.[0]?.id}`}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
