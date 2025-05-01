import { Bell, Plus, Eye, Trash2, Edit2 } from "lucide-react";
import PrimaryButton from "../../../components/shared/PrimaryButton";
import StyledTable from "../../../components/shared/Table";
import SearchButton from "../../../components/shared/SearchInput";
import SelectDropDown from "../../../components/shared/SelectDropDown";
import { Link, useNavigate } from "react-router";
import { useGetSchools } from "../../../hooks/admin/school.hook";
import { useMemo, useState } from "react";
import StatusBadge from "../../../components/shared/StatusBadge";
import RightModal from "../../../components/shared/RightModal";
export default function School() {
  const [filters, setFilters] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { schools, isLoading } = useGetSchools({
    filters,
    page,
    search,
  });
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const tableData = useMemo(() => {
    return schools?.data?.map((school) => ({
      name: school?.name,
      status: (
        <StatusBadge status={school?.is_active ? "Active" : "Inactive"} />
      ),
      noOfCourse: school?.courses?.length,
      noOfCertificates: school?.certificates?.length,
      action: (
        <div className="flex items-center gap-2">
          <Link to={`/admin/add-school/${school?.id}`}>
            <Edit2 size={18} color="#667085" className="cursor-pointer" />
          </Link>

          <Trash2
            size={18}
            color="#667085"
            className="cursor-pointer"
            onClick={() => setSelectedSchool(school)}
          />
          <Eye
            size={18}
            color="#667085"
            className="cursor-pointer"
            onClick={() => {
              setSelectedSchool(school);
              setIsViewModalOpen(true);
            }}
          />
        </div>
      ),
    }));
  }, [schools]);
  const handleApplyFilters = (activeFilters) => {
    console.log(activeFilters);
    setFilters(activeFilters);
  };

  const navigate = useNavigate();

  console.log(schools);
  return (
    <div>
      {" "}
      <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">School</h1>
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
        <div className="flex justify-end px-6 py-4">
          <PrimaryButton
            className="flex gap-2 cursor-pointer"
            type={"button"}
            onClick={() => {
              navigate("/admin/add-school");
            }}
          >
            <Plus />
            Add School
          </PrimaryButton>
        </div>
      </header>
      <div className="p-6">
        <StyledTable
          labels={[
            "Name",
            "Status",
            "No of Course",
            "No of Certificates",
            "Action",
          ]}
          title={`Schools (${schools?.data?.length || 0})`}
          bodyRows={tableData}
          isTableLoading={isLoading}
          rightItem={
            <div className="flex items-center gap-2 justify-end">
              <SearchButton onSearch={setSearch} />
              <SelectDropDown
                className="w-fit"
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "InActive" },
                ]}
                onChange={handleApplyFilters}
              />
            </div>
          }
        />
      </div>
      {isEditModalOpen && (
        <RightModal
          toggleModal={() => setIsEditModalOpen(false)}
          isOpen={isEditModalOpen}
        >
          <div>
            <h1>Edit School</h1>
          </div>
        </RightModal>
      )}
      {isDeleteModalOpen && (
        <RightModal
          toggleModal={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
        >
          <div>
            <h1>Delete School</h1>
          </div>
        </RightModal>
      )}
      {isViewModalOpen && (
        <RightModal
          toggleModal={() => setIsViewModalOpen(false)}
          isOpen={isViewModalOpen}
        >
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedSchool?.name}
              </h1>
              <StatusBadge
                status={selectedSchool?.is_active ? "Active" : "Inactive"}
              />
            </div>

            <div className="space-y-6">
              {/* School Images */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Logo
                  </h3>
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:4000${
                        selectedSchool?.logo?.startsWith("/") ? "" : "/"
                      }${selectedSchool?.logo}`}
                      alt="School Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Cover Image
                  </h3>
                  <div className="w-full h-32 border rounded-lg overflow-hidden">
                    <img
                      src={`http://localhost:4000${
                        selectedSchool?.coverImage?.startsWith("/") ? "" : "/"
                      }${selectedSchool?.coverImage}`}
                      alt="School Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{selectedSchool?.description}</p>
              </div>

              {/* School Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Created At
                  </h3>
                  <p className="text-gray-700">
                    {new Date(selectedSchool?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Updated At
                  </h3>
                  <p className="text-gray-700">
                    {new Date(selectedSchool?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Slug
                  </h3>
                  <p className="text-gray-700">{selectedSchool?.slug}</p>
                </div>
              </div>

              {/* Certificates */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Certificates ({selectedSchool?.certificates?.length || 0})
                </h3>
                {selectedSchool?.certificates?.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="border rounded-lg p-4 mb-2"
                  >
                    <p className="font-medium text-gray-800">
                      {certificate.program_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {certificate.program_type}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {certificate.duration} months
                    </p>
                    <p className="text-sm text-gray-600">
                      Issue Date:{" "}
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Courses */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Courses ({selectedSchool?.courses?.length || 0})
                </h3>
                {selectedSchool?.courses?.length === 0 && (
                  <p className="text-gray-500">No courses available</p>
                )}
              </div>
            </div>
          </div>
        </RightModal>
      )}
    </div>
  );
}
