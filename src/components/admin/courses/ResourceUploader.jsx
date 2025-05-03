import { useState } from "react";
import {
  Upload,
  X,
  FileText,
  Video,
  LinkIcon,
  ExternalLink,
} from "lucide-react";

export default function ResourceUploader({
  type = "material",
  initialResources = [],
  onChange,
}) {
  const [resources, setResources] = useState(initialResources);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create new resources from files
    const newResources = files.map((file) => ({
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "file",
      title: file.name,
      file: file,
      // Create a temporary URL for preview
      url: URL.createObjectURL(file),
      fileType: file.type,
      fileSize: file.size,
      uploadProgress: 0,
      status: "uploading",
    }));

    // Simulate upload progress
    const updatedResources = [...resources, ...newResources];
    setResources(updatedResources);
    onChange(updatedResources);

    // Simulate upload completion after a delay
    newResources.forEach((resource) => {
      simulateUpload(resource.id);
    });
  };

  const simulateUpload = (resourceId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setResources((current) =>
          current.map((r) =>
            r.id === resourceId ? { ...r, uploadProgress: progress } : r
          )
        );
      } else {
        clearInterval(interval);
        setResources((current) =>
          current.map((r) =>
            r.id === resourceId
              ? { ...r, status: "completed", uploadProgress: 100 }
              : r
          )
        );
        // Update parent component
        setResources((current) => {
          onChange(current);
          return current;
        });
      }
    }, 300);
  };

  const handleAddLink = () => {
    if (!linkUrl.trim()) return;

    const newResource = {
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "link",
      title: linkTitle || linkUrl,
      url: linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`,
      status: "completed",
    };

    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    onChange(updatedResources);
    setLinkUrl("");
    setLinkTitle("");
    setIsAddingLink(false);
  };

  const handleRemoveResource = (id) => {
    const updatedResources = resources.filter((r) => r.id !== id);
    setResources(updatedResources);
    onChange(updatedResources);
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith("video/"))
      return <Video className="w-5 h-5 text-blue-500" />;
    if (fileType?.startsWith("application/pdf"))
      return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType?.startsWith("application/"))
      return <FileText className="w-5 h-5 text-orange-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{type === "video" ? "Upload Video" : "Upload File"}</span>
          <input
            type="file"
            className="hidden"
            accept={
              type === "video"
                ? "video/*"
                : "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
            }
            onChange={handleFileChange}
            multiple
          />
        </label>

        <button
          type="button"
          onClick={() => setIsAddingLink(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Add Link</span>
        </button>
      </div>

      {isAddingLink && (
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Link Title (optional)
            </label>
            <input
              type="text"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              placeholder="e.g. Course Syllabus"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingLink(false)}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddLink}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Add Link
            </button>
          </div>
        </div>
      )}

      {resources.length > 0 && (
        <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {resource.type === "file" ? (
                  getFileIcon(resource.fileType)
                ) : (
                  <LinkIcon className="w-5 h-5 text-blue-500" />
                )}

                <div className="flex-1">
                  <div className="font-medium">{resource.title}</div>
                  {resource.type === "file" && resource.fileSize && (
                    <div className="text-xs text-gray-500">
                      {formatFileSize(resource.fileSize)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {resource.status === "uploading" && (
                  <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${resource.uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                {resource.type === "link" && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-gray-500 hover:text-blue-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {resource.type === "file" &&
                  resource.status === "completed" && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-500 hover:text-blue-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                <button
                  onClick={() => handleRemoveResource(resource.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
