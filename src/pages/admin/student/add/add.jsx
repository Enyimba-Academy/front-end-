import { useState } from "react";
import { Calendar, Clock, DollarSign, ImageIcon, X } from "lucide-react";

export default function AdminCourseForm() {
  const [courseImage, setCourseImage] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSchool, setCourseSchool] = useState("");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseStartDate, setCourseStartDate] = useState("");
  const [courseStatus, setCourseStatus] = useState("draft");
  const [courseModules, setCourseModules] = useState([
    { title: "", description: "" },
  ]);

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...courseModules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setCourseModules(updatedModules);
  };

  const addModule = () => {
    setCourseModules([...courseModules, { title: "", description: "" }]);
  };

  const removeModule = (index) => {
    const updatedModules = courseModules.filter((_, i) => i !== index);
    setCourseModules(updatedModules);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const courseData = {
      title: courseTitle,
      description: courseDescription,
      school: courseSchool,
      instructor: courseInstructor,
      duration: courseDuration,
      level: courseLevel,
      price: coursePrice,
      startDate: courseStartDate,
      status: courseStatus,
      modules: courseModules,
      image: courseImage,
    };
    console.log("Course Data:", courseData);
    // Here you would typically send this data to your API
    alert("Course added successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Course Cover Image
          </label>
          <div className="flex items-center justify-center w-full">
            {courseImage ? (
              <div className="relative w-full h-48">
                <img
                  src={courseImage || "/placeholder.svg"}
                  alt="Course preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setCourseImage(null)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or WEBP (MAX. 2MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="course-image-upload"
                />
              </label>
            )}
          </div>
        </div>

        {/* Course Title */}
        <div>
          <label
            htmlFor="course-title"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </label>
          <input
            type="text"
            id="course-title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="e.g. Professional Certificate in Photography"
            required
          />
        </div>

        {/* Course Description */}
        <div>
          <label
            htmlFor="course-description"
            className="block text-sm font-medium text-gray-700"
          >
            Course Description
          </label>
          <textarea
            id="course-description"
            rows={4}
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="Provide a detailed description of the course..."
            required
          ></textarea>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* School Selection */}
          <div>
            <label
              htmlFor="course-school"
              className="block text-sm font-medium text-gray-700"
            >
              School
            </label>
            <select
              id="course-school"
              value={courseSchool}
              onChange={(e) => setCourseSchool(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select a school</option>
              <option value="photography">School of Photography</option>
              <option value="design">School of Design</option>
              <option value="film">School of Film & Animation</option>
              <option value="sound">School of Sound Engineering</option>
            </select>
          </div>

          {/* Instructor Selection */}
          <div>
            <label
              htmlFor="course-instructor"
              className="block text-sm font-medium text-gray-700"
            >
              Instructor
            </label>
            <select
              id="course-instructor"
              value={courseInstructor}
              onChange={(e) => setCourseInstructor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select an instructor</option>
              <option value="1">Jane Doe</option>
              <option value="2">John Smith</option>
              <option value="3">Amina Adeyemi</option>
              <option value="4">David Anderson</option>
            </select>
          </div>

          {/* Course Duration */}
          <div>
            <label
              htmlFor="course-duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="course-duration"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="e.g. 3 months"
                required
              />
            </div>
          </div>

          {/* Course Level */}
          <div>
            <label
              htmlFor="course-level"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </label>
            <select
              id="course-level"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="">Select a level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all-levels">All Levels</option>
            </select>
          </div>

          {/* Course Price */}
          <div>
            <label
              htmlFor="course-price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="course-price"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="e.g. 399.99"
                required
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="course-start-date"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="course-start-date"
                value={courseStartDate}
                onChange={(e) => setCourseStartDate(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>

          {/* Course Status */}
          <div>
            <label
              htmlFor="course-status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="course-status"
              value={courseStatus}
              onChange={(e) => setCourseStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Course Modules */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Course Modules
            </h3>
            <button
              type="button"
              onClick={addModule}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
            >
              Add Module
            </button>
          </div>

          <div className="space-y-4">
            {courseModules.map((module, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Module {index + 1}
                  </h4>
                  {courseModules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor={`module-title-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`module-title-${index}`}
                      value={module.title}
                      onChange={(e) =>
                        handleModuleChange(index, "title", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      placeholder="e.g. Introduction to Photography"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`module-description-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`module-description-${index}`}
                      rows={2}
                      value={module.description}
                      onChange={(e) =>
                        handleModuleChange(index, "description", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      placeholder="Brief description of this module..."
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}
