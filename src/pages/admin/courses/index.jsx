import { Bell, Plus, Eye, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/shared/PrimaryButton";
import {
  useGetCourses,
  useDeleteCourse,
} from "../../../hooks/admin/course.hook";
import SearchButton from "../../../components/shared/SearchInput";
import SelectDropDown from "../../../components/shared/SelectDropDown";
import { useState, useEffect } from "react";
import StatusBadge from "../../../components/shared/StatusBadge";
import RightModal from "../../../components/shared/RightModal";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import RejectionModal from "@/components/shared/RejectionModal";
import { ImageUrl } from "@/api/api";
export default function AdminCourses() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(true);
  const [page] = useState(1);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();
  const {
    data: courses,
    isLoading,
    isError,
    refetch,
  } = useGetCourses({
    filters,
    page,
    search,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log(courses?.data?.courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // const handleApplyFilters = (activeFilters) => {
  //   setFilters(activeFilters);
  // };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      {" "}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Courses</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button> */}
          </div>
        </div>
        <div className="flex justify-end px-6 py-4">
          <PrimaryButton
            className="flex gap-2 cursor-pointer"
            type={"button"}
            onClick={() => {
              navigate("/admin/add-course");
            }}
          >
            <Plus />
            Add Course
          </PrimaryButton>
        </div>
      </header>
      <div className="p-6">
        <div className="bg-white rounded-md shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              Courses ({courses?.data?.courses?.length || 0})
            </h2>
            <div className="flex items-center gap-2 justify-end"></div>
          </div>

          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="text-red-500">
                        Error loading courses. Please try again.
                        <button
                          onClick={() => refetch()}
                          className="ml-2 text-primary hover:underline"
                        >
                          Retry
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : courses?.data?.courses?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No courses found
                    </TableCell>
                  </TableRow>
                ) : (
                  courses?.data?.courses?.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-gray-200 mr-3 overflow-hidden">
                            {course?.image ? (
                              <img
                                src={`${ImageUrl}${course?.image}`}
                                alt={course?.title || "Course image"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-300" />
                            )}
                          </div>
                          <span>
                            {typeof course?.title === "string"
                              ? course.title
                              : "Untitled Course"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {typeof course?.school?.name === "string"
                          ? course.school.name
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {typeof course?.duration === "string"
                          ? course.duration
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {typeof course?.level === "string"
                          ? course.level
                          : "N/A"}
                      </TableCell>
                      <TableCell>{formatPrice(course?.price || 0)}</TableCell>
                      <TableCell>
                        <StatusBadge status={course?.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Edit2
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/admin/add-course/${course?.id}`)
                            }
                          />
                          <Trash2
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setSelectedCourse(course);
                            }}
                          />
                          <Eye
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsViewModalOpen(true);
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {isViewModalOpen && selectedCourse && (
        <RightModal
          toggleModal={() => setIsViewModalOpen(false)}
          isOpen={isViewModalOpen}
        >
          <div className="p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedCourse?.title || "Untitled Course"}
              </h1>
              <StatusBadge status={selectedCourse?.status} />
            </div>

            <div className="space-y-6">
              {/* Course Image */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Cover Image
                </h3>
                <div className="w-full h-40 border rounded-lg overflow-hidden">
                  {selectedCourse?.image ? (
                    <img
                      src={`${ImageUrl}${selectedCourse?.image}`}
                      alt="Course Cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">
                  {selectedCourse?.description || "No description available"}
                </p>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    School
                  </h3>
                  <p className="text-gray-700">
                    {selectedCourse?.school?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Duration
                  </h3>
                  <p className="text-gray-700">
                    {selectedCourse?.duration || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Level
                  </h3>
                  <p className="text-gray-700">
                    {selectedCourse?.level || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Price
                  </h3>
                  <p className="text-gray-700">
                    {formatPrice(selectedCourse?.price || 0)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Students Enrolled
                  </h3>
                  <p className="text-gray-700">
                    {selectedCourse?._count?.enrollments || 0}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Created At
                  </h3>
                  <p className="text-gray-700">
                    {selectedCourse?.createdAt
                      ? new Date(selectedCourse.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Sections */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Sections ({selectedCourse?.sections?.length || 0})
                </h3>
                <div className="border rounded-lg divide-y">
                  {!selectedCourse?.sections ||
                  selectedCourse?.sections?.length === 0 ? (
                    <p className="p-3 text-gray-500">No sections available</p>
                  ) : (
                    selectedCourse?.sections?.map((section) => (
                      <div key={section.id} className="p-3">
                        <p className="font-medium">
                          {section.title || "Untitled Section"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {section._count?.contents || 0}{" "}
                          {(section._count?.contents || 0) === 1
                            ? "content"
                            : "contents"}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </RightModal>
      )}
      {showDeleteModal && selectedCourse && (
        <RejectionModal
          isOpen={showDeleteModal}
          toggleModal={() => setShowDeleteModal(false)}
          handleReject={() =>
            deleteCourse(selectedCourse?.id, {
              onSuccess: () => {
                setShowDeleteModal(false);
              },
            })
          }
          handleCancel={() => setShowDeleteModal(false)}
          title="Confirm Delete"
          message="Are you sure you want to delete this course?"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
