import { Bell, Plus, Eye, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { useAdminStudents } from "@/hooks/admin/student.hook";
import RightModal from "../../components/shared/RightModal";
import StatusBadge from "../../components/shared/StatusBadge";
import SearchButton from "../../components/shared/SearchInput";
import SelectDropDown from "../../components/shared/SelectDropDown";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";

export default function Student() {
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { data, isLoading } = useAdminStudents();

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
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

  return (
    <div>
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
        <div className="bg-white rounded-md shadow">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              Students ({data?.students?.length || 0})
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <SearchButton />
              <SelectDropDown
                className="w-fit"
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Blocked" },
                ]}
              />
            </div>
          </div>

          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Number of Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.students?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.students?.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-gray-200 mr-3 overflow-hidden flex items-center justify-center">
                            {student?.avatar ? (
                              <img
                                src={student.avatar}
                                alt={`${student.firstName} ${student.lastName}`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 text-lg font-medium">
                                {student?.firstName?.charAt(0)?.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span>{`${student.firstName} ${student.lastName}`}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student?.enrollments?.length || 0}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={student?.is_blocked ? "Blocked" : "Active"}
                        />
                      </TableCell>
                      <TableCell>0%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Edit2
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => handleEditStudent(student)}
                          />
                          <Trash2
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => handleDeleteStudent(student)}
                          />
                          <Eye
                            size={18}
                            color="#667085"
                            className="cursor-pointer"
                            onClick={() => handleViewStudent(student)}
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
      {showStudentDetails && selectedStudent && (
        <RightModal
          isOpen={showStudentDetails}
          toggleModal={() => setShowStudentDetails(false)}
          showClose={true}
        >
          <div className="p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {`${selectedStudent.firstName} ${selectedStudent.lastName}`}
              </h1>
              <StatusBadge
                status={selectedStudent?.is_blocked ? "Blocked" : "Active"}
              />
            </div>

            <div className="space-y-6">
              {/* Student Avatar */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Profile Picture
                </h3>
                <div className="w-full h-40 border rounded-lg overflow-hidden">
                  {selectedStudent?.avatar ? (
                    <img
                      src={selectedStudent.avatar}
                      alt="Student Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-4xl font-medium">
                        {selectedStudent?.firstName?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Enrolled Courses
                  </h3>
                  <p className="text-gray-700">
                    {selectedStudent?.enrollments?.length || 0}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Progress
                  </h3>
                  <p className="text-gray-700">0%</p>
                </div>
              </div>
            </div>
          </div>
        </RightModal>
      )}
    </div>
  );
}
