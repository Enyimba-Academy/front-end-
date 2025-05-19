import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import { useUploadImage } from "../../hooks/image";
import { toast } from "react-toastify";
import { useFormikContext } from "formik";

export default function ImageUpload({ label }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { mutate: uploadImage, progress } = useUploadImage();
  const { setFieldValue, values } = useFormikContext();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadImage(
        { file: e.dataTransfer.files[0], folder: "school" },
        {
          onSuccess: (data) => {
            setFieldValue("image", data.file.path);
            console.log(data.file);
          },
          onError: () => {
            toast.error("Failed to upload image");
          },
        }
      );
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImage(
        { file: e.target.files[0], folder: "school" },
        {
          onSuccess: (data) => {
            setFieldValue("image", data.file.path);
            console.log(data.file);
          },
          onError: () => {
            toast.error("Failed to upload image");
          },
        }
      );
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFieldValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full mx-auto mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          isDragging ? "border-red-500 bg-red-50" : "border-red-300"
        } transition-colors duration-200 flex flex-col items-center justify-center min-h-[200px]`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {values.image ? (
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {values.image}
              </span>
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <img
                src={`http://localhost:4000${values.image}`}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="text-gray-400 mb-4">
              <Upload className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-center text-gray-600 mb-1">
              Drag and drop your thumbnail here
            </p>
            <p className="text-center text-gray-500 text-sm mb-4">
              16:9 ratio, 1280×720px recommended
            </p>
            <PrimaryButton
              onClick={handleClick}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
            >
              Choose File
            </PrimaryButton>
          </>
        )}
        {progress > 0 && progress < 100 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-3/4 bg-white rounded-lg p-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-gray-700 mt-2">
                {Math.round(progress)}% Uploaded
              </p>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
