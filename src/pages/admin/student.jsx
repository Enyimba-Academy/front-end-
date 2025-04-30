import { Bell } from "lucide-react";
import StyledTable from "../../components/shared/Table";
import { useState, useMemo } from "react";
import { useAdminStudents } from "@/hooks/admin/student.hook";
import RightModal from "../../components/shared/RightModal";
import StatusBadge from "../../components/shared/StatusBadge";
import SearchButton from "../../components/shared/SearchInput";
import FilterComponent from "../../components/shared/Filter";
import SelectDropDown from "../../components/shared/SelectDropDown";

export default function Student() {
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const { data, isLoading } = useAdminStudents();

  const handleViewStudent = (student) => {
    console.log("View student:", student);
    // Add your view student logic here
    setShowStudentDetails(true);
  };

  const handleEditStudent = (student) => {
    console.log("Edit student:", student);
    // Add your edit student logic here
  };

  const handleDeleteStudent = (student) => {
    console.log("Delete student:", student);
    // Add your delete student logic here
  };

  const handleApplyFilters = (activeFilters) => {
    console.log("Applied filters:", activeFilters);
    // In a real application, you would use these filters to query your data
    alert("Filters applied: " + JSON.stringify(activeFilters, null, 2));
  };

  const bodyRows = useMemo(() => {
    return data?.students?.map((student) => {
      return {
        student: `${student?.firstName} ${student?.lastName}`,
        courses: student?.enrollments?.length || 0,
        status: (
          <StatusBadge status={student?.is_blocked ? "Blocked" : "Active"} />
        ),
        progress: "0%",
        // onRowClickData: student, // Add this to pass the full student data
      };
    });
  }, [data]);

  return (
    <div>
      {" "}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Students</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="p-6">
        <StyledTable
          title={`Students (${data?.students?.length})`}
          labels={["Student", "Number of Courses", "Status", "Progress"]}
          bodyRows={bodyRows}
          isTableLoading={isLoading}
          onView={handleViewStudent}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          actionLabel={"Action"}
          rightItem={
            <div className="flex items-center gap-2">
              <SearchButton />
              <SelectDropDown
                className="w-fit"
                options={[
                  { value: "Electronics", label: "Electronics" },
                  { value: "Clothing", label: "Clothing" },
                  { value: "Home & Garden", label: "Home & Garden" },
                  { value: "Books", label: "Books" },
                  { value: "Sports", label: "Sports" },
                ]}
                onChange={handleApplyFilters}
              />
            </div>
          }
        />
      </div>
      {showStudentDetails && (
        <RightModal
          isOpen={showStudentDetails}
          toggleModal={() => setShowStudentDetails(!showStudentDetails)}
          showClose={true}
        ></RightModal>
      )}
    </div>
  );
}
