import { useGetEnrollmentById } from "@/hooks/useEnrollment.hook";
import {
  ArrowLeft,
  Download,
  Edit,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  DoorOpen,
} from "lucide-react";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useCourseContentNavigation } from "@/hooks/nextVideoHook";
import CourseIntroduction from "./CourseIntroduction";

export default function VideoLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Use staleTime and cacheTime to prevent unnecessary refetching
  const { data, isLoading } = useGetEnrollmentById(id);

  const enrollment = data;
  const [activeContent, setActiveContent] = useState(null);
  const sections = useMemo(
    () => enrollment?.course?.sections || [],
    [enrollment]
  );
  const currentContentId = useMemo(() => {
    const parts = location.pathname.split("/");
    const idx = parts.indexOf("content");
    return idx !== -1 ? parts[idx + 1] : null;
  }, [location.pathname]);

  const nav = useCourseContentNavigation(sections, currentContentId, id);
  // Define courseTitle from enrollment data
  const courseTitle = enrollment?.course?.title || "Course";

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Function to get icon based on content type
  const getContentTypeIcon = (content) => {
    const type = content.type ? content.type.toLowerCase() : "";
    if (type === "video") return <span className="mr-2">🎬</span>;
    if (type === "quiz") return <span className="mr-2">📝</span>;
    if (type === "material" || type === "document")
      return <span className="mr-2">📄</span>;
    if (type === "assignment") return <span className="mr-2">📋</span>;
    return <span className="mr-2"></span>;
  };

  // Add new function to check if content is completed
  const isContentCompleted = (content) => {
    return (
      content.lessonProgresses?.some((progress) => progress.completed) || false
    );
  };

  // Function to check if content has valid media
  const hasValidMedia = (content) => {
    if (content.type === "VIDEO") {
      return content.videoUrl && content.videoUrl.trim() !== "";
    }
    if (content.type === "QUIZ") {
      return content.instructions && content.instructions.trim() !== "";
    }
    if (content.type === "ASSIGNMENT") {
      return (
        content.assignmentDescription &&
        content.assignmentDescription.trim() !== ""
      );
    }
    if (content.type === "MATERIAL" || content.type === "DOCUMENT") {
      return content.fileUrl && content.fileUrl.trim() !== "";
    }
    return false;
  };

  // Skeleton loader component for sections
  const SectionSkeleton = () => (
    <div className="border-t border-gray-200 animate-pulse">
      <div className="flex items-center justify-between w-full px-4 py-3">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-gray-200 mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Skeleton loader for content items
  const ContentItemSkeleton = () => (
    <div className="pl-11 pr-4 pb-2">
      <ul className="space-y-2">
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex items-center animate-pulse">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </li>
        ))}
      </ul>
    </div>
  );

  // Update expanded sections and active content when data changes
  useEffect(() => {
    if (sections.length > 0) {
      // Set first content as active if it exists and no active content is set
      if (!activeContent && sections[0]?.contents?.length > 0) {
        setActiveContent(sections[0].contents[0]);
      }
    }
  }, [sections, activeContent]);

  // Extract content ID from URL to highlight active content
  useEffect(() => {
    if (location.pathname.includes("/content/") && sections.length > 0) {
      const urlParts = location.pathname.split("/");
      const contentIdIndex =
        urlParts.findIndex((part) => part === "content") + 1;

      if (contentIdIndex > 0 && urlParts[contentIdIndex]) {
        const contentId = urlParts[contentIdIndex];

        // Find the content in sections
        let foundContent = null;
        let foundSectionId = null;

        for (const section of sections) {
          const content = section.contents?.find((c) => c.id === contentId);
          if (content) {
            foundContent = content;
            foundSectionId = section.id;
            break;
          }
        }

        if (foundContent) {
          setActiveContent(foundContent);

          // Expand the section containing this content
          if (foundSectionId) {
            setActiveContent(foundContent);
          }
        }
      }
    }
  }, [location.pathname, sections]);

  // Check if we should show the introduction page
  const showIntroduction = !currentContentId;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="mr-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm md:text-base font-medium text-gray-900 truncate">
            {courseTitle}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar - Course Navigation */}
        <div className="hidden lg:block w-64 border-r border-gray-200 overflow-y-auto bg-white">
          {/* Course Sections (Modules) */}
          {isLoading ? (
            // Show skeleton loaders when loading
            <>
              <SectionSkeleton />
              <ContentItemSkeleton />
              <SectionSkeleton />
            </>
          ) : (
            // Show actual content when loaded
            sections
              .filter((section) =>
                section.contents.some((content) => hasValidMedia(content))
              )
              .map((section, sectionIndex) => (
                <div key={section.id} className="border-t border-gray-200">
                  <div
                    className={`flex items-center justify-between w-full px-4 py-3 text-left ${
                      activeContent &&
                      section.contents.some((c) => c.id === activeContent.id)
                        ? "bg-red-50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full ${
                          sectionIndex === 0
                            ? "bg-green-500"
                            : activeContent &&
                              section.contents.some(
                                (content) => content.id === activeContent.id
                              )
                            ? "bg-red-500"
                            : "bg-gray-300"
                        } flex items-center justify-center mr-2`}
                      >
                        <span className="text-white text-xs font-bold">
                          {sectionIndex + 1}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          activeContent &&
                          section.contents.some(
                            (c) => c.id === activeContent.id
                          )
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {section.title}
                      </span>
                    </div>
                  </div>

                  {/* Section Contents - Always show when section has valid content */}
                  <div className="pl-11 pr-4 pb-2">
                    <ul className="space-y-2">
                      {section.contents
                        .filter((content) => hasValidMedia(content))
                        .map((content) => (
                          <NavLink
                            key={content.id}
                            to={`/lesson/${id}/content/${content.id}`}
                            className={({ isActive }) =>
                              `flex items-center text-sm cursor-pointer ${
                                isActive
                                  ? "text-red-600 font-medium"
                                  : "text-gray-600"
                              }`
                            }
                            onClick={() => {
                              document
                                .querySelectorAll("video")
                                .forEach((video) => {
                                  video.pause();
                                });
                            }}
                          >
                            {getContentTypeIcon(content)}
                            <span className="flex-1">{content.title}</span>
                            {isContentCompleted(content) && (
                              <span className="ml-2 text-green-500">✓</span>
                            )}
                          </NavLink>
                        ))}
                    </ul>
                  </div>
                </div>
              ))
          )}

          {/* Fallback if no sections and not loading */}
          {!isLoading && sections.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No content available
            </div>
          )}
        </div>

        {/* Back to Dashboard Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 w-64 p-4 border-t border-gray-200 bg-white">
          <Link
            to="/student-profile"
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            <DoorOpen size={16} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Center - Content Display */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Show introduction or course content based on state */}
          {showIntroduction ? (
            <CourseIntroduction course={enrollment?.course} enrollmentId={id} />
          ) : (
            <Outlet context={nav} />
          )}
        </div>

        {/* Right Sidebar - Notes and Resources */}
        <div className="hidden xl:block w-72 border-l border-gray-200 overflow-y-auto bg-gray-50">
          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <Download size={14} className="mr-2" />
                  <span>Course Materials</span>
                </a>
              </li>
              {activeContent?.material?.map((material) => (
                <li key={material.id}>
                  <a
                    href={material.url}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={14} className="mr-2" />
                    <span>{material.title || "Download Material"}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Pro Tips</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-md">
              <div className="flex">
                <Lightbulb
                  size={16}
                  className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-gray-700">
                  Click on different lessons in the sidebar to switch between
                  course content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
