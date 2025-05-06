import { useState, useEffect } from "react";
import {
  Upload,
  X,
  FileText,
  Video,
  LinkIcon,
  ExternalLink,
} from "lucide-react";
import { useUploadVideo, useUploadImage } from "../../../hooks/image";

export default function ResourceUploader({
  type = "material",
  initialResources = [],
  onChange,
}) {
  const [resources, setResources] = useState(initialResources);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const { mutate: uploadVideo, progress: videoProgress } = useUploadVideo();
  const { mutate: uploadFile, progress: fileProgress } = useUploadImage();

  const handleFileChange = (e) => {
    console.log("called onChnage");
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create new resources from files
    const newResources = files.map((file) => ({
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "file",
      name: file.name,
      file: file,
      fileType: file.type,
      fileSize: file.size,
      uploadProgress: 0,
      status: "uploading",
    }));

    // Add new resources to the list immediately
    const updatedResources = [...resources, ...newResources];
    setResources(updatedResources);
    onChange(updatedResources);

    // Upload each file
    files.forEach((file, index) => {
      const resourceId = newResources[index].id;

      if (type === "video") {
        uploadVideo(
          { video: file, folder: "videos" },
          {
            onSuccess: (data) => {
              setResources((current) => {
                const updated = current.map((r) =>
                  r.id === resourceId
                    ? {
                        ...r,
                        status: "completed",
                        uploadProgress: 100,
                        url: data.file.path,
                      }
                    : r
                );
                onChange(updated);
                return updated;
              });
            },
            onError: (error) => {
              console.error("Video upload error:", error);
              setResources((current) => {
                const updated = current.map((r) =>
                  r.id === resourceId ? { ...r, status: "error" } : r
                );
                onChange(updated);
                return updated;
              });
            },
          }
        );
      } else {
        uploadFile(
          { file: file, folder: "files" },
          {
            onSuccess: (data) => {
              setResources((current) => {
                const updated = current.map((r) =>
                  r.id === resourceId
                    ? {
                        ...r,
                        status: "completed",
                        uploadProgress: 100,
                        url: data.file.path,
                      }
                    : r
                );
                onChange(updated);
                return updated;
              });
            },
            onError: (error) => {
              console.error("File upload error:", error);
              setResources((current) => {
                const updated = current.map((r) =>
                  r.id === resourceId ? { ...r, status: "error" } : r
                );
                onChange(updated);
                return updated;
              });
            },
          }
        );
      }
    });
  };

  // Update progress for all uploading resources
  useEffect(() => {
    const progress = type === "video" ? videoProgress : fileProgress;
    if (progress) {
      setResources((current) => {
        const updated = current.map((r) =>
          r.status === "uploading" ? { ...r, uploadProgress: progress } : r
        );
        onChange(updated);
        return updated;
      });
    }
  }, [videoProgress, fileProgress, type, onChange]);

  const handleAddLink = () => {
    if (!linkUrl.trim()) return;

    const newResource = {
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "link",
      name: linkTitle || linkUrl,
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
              Link Title (required)
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
                  <div className="font-medium">{resource.name}</div>
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

                {resource.status === "error" && (
                  <span className="text-red-500 text-sm">Upload failed</span>
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
