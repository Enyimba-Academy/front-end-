import { useGetEnrollmentById } from "@/hooks/useEnrollment.hook";
import {
  ArrowLeft,
  Download,
  Edit,
  ChevronUp,
  ChevronDown,
  Lightbulb,
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

export default function VideoLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Use staleTime and cacheTime to prevent unnecessary refetching
  const { data, isLoading } = useGetEnrollmentById(id, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const enrollment = data;
  const [activeContent, setActiveContent] = useState(null);
  const sections = useMemo(
    () => enrollment?.course?.sections || [],
    [enrollment]
  );
  const [expandedSections, setExpandedSections] = useState({});
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

  // Function to toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Function to get icon based on content type
  const getContentTypeIcon = (content) => {
    // Determine content type based on non-empty arrays
    if (content.video && content.video.length > 0) {
      return <span className="mr-2">🎬</span>;
    } else if (content.quiz && content.quiz.length > 0) {
      return <span className="mr-2">📝</span>;
    } else if (content.material && content.material.length > 0) {
      return <span className="mr-2">📄</span>;
    } else if (content.assignment && content.assignment.length > 0) {
      return <span className="mr-2">📋</span>;
    } else {
      // Fallback based on type string if available
      const typeString = content.type ? content.type.toLowerCase() : "";
      if (typeString.includes("video")) {
        return <span className="mr-2">🎬</span>;
      } else if (typeString.includes("quiz")) {
        return <span className="mr-2">📝</span>;
      } else if (
        typeString.includes("document") ||
        typeString.includes("material")
      ) {
        return <span className="mr-2">📄</span>;
      } else if (typeString.includes("assignment")) {
        return <span className="mr-2">📋</span>;
      }

      // Default fallback
      return <span className="mr-2">📚</span>;
    }
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
      // Initialize all sections as expanded by default
      const initialExpandedState = sections.reduce((acc, section, index) => {
        acc[section.id] = index === 0; // Only expand first section by default
        return acc;
      }, {});

      setExpandedSections(initialExpandedState);

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
            setExpandedSections((prev) => ({
              ...prev,
              [foundSectionId]: true,
            }));
          }
        }
      }
    }
  }, [location.pathname, sections]);

  // Add this function near your other utility functions
  const getContentMediaId = (content) => {
    // Get lowercase type
    const type = content.type ? content.type.toLowerCase() : "";

    // Check if array exists and has items
    const mediaArray = content[type];
    if (mediaArray && Array.isArray(mediaArray) && mediaArray.length > 0) {
      return mediaArray[0].id;
    }

    // Fallback to content ID if no media items found
    return content.id;
  };

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
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-red-600 text-sm font-medium">
            <Download size={16} className="mr-1" />
            <span className="hidden sm:inline">Resources</span>
          </button>
          <button className="flex items-center text-gray-600 text-sm font-medium">
            <span className="hidden sm:inline">Help</span>
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-600 text-sm font-medium">
              <Edit size={16} className="mr-1" />
              <span className="hidden sm:inline">Notes</span>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-white text-xs flex items-center justify-center">
                2
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar - Course Navigation */}
        <div className="hidden lg:block w-64 border-r border-gray-200 overflow-y-auto bg-white">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

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
            sections.map((section, sectionIndex) => (
              <div key={section.id} className="border-t border-gray-200">
                <div
                  className={`flex items-center justify-between w-full px-4 py-3 text-left cursor-pointer ${
                    activeContent &&
                    section.contents.some((c) => c.id === activeContent.id)
                      ? "bg-red-50"
                      : ""
                  }`}
                  onClick={() => toggleSection(section.id)}
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
                        section.contents.some((c) => c.id === activeContent.id)
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      {section.title}
                    </span>
                  </div>
                  {expandedSections[section.id] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>

                {/* Section Contents */}
                {expandedSections[section.id] && (
                  <div className="pl-11 pr-4 pb-2">
                    <ul className="space-y-2">
                      {section.contents.map((content) => (
                        <NavLink
                          key={content.id}
                          to={`/lesson/${id}/content/${content.id}/${
                            content.type
                          }/${getContentMediaId(content)}`}
                          className={({ isActive }) =>
                            `flex  items-center text-sm cursor-pointer ${
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

                          <span>{content.title}</span>
                        </NavLink>
                      ))}
                    </ul>
                  </div>
                )}
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

        {/* Center - Content Display */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Dynamic Content based on Type */}
          <Outlet context={nav} />
        </div>

        {/* Right Sidebar - Notes and Resources */}
        <div className="hidden xl:block w-72 border-l border-gray-200 overflow-y-auto bg-gray-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Lesson Notes</h3>
            <textarea
              //value={noteText}
              //onChange={(e) => setNoteText(e.target.value)}
              placeholder="Take notes..."
              className="w-full h-40 p-3 border border-gray-300 rounded-md text-sm resize-none"
            ></textarea>
            <button className="mt-2 flex items-center text-red-600 text-sm font-medium">
              <Download size={14} className="mr-1" />
              <span>Export Notes</span>
            </button>
          </div>

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
