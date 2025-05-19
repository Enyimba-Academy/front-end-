"use client";

import { useState, useRef } from "react";
import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, ExternalLink, Plus } from "lucide-react";
import { useUploadFile } from "@/hooks/image";
import { Progress } from "@/components/ui/progress";

export function ResourceContent({ sectionIndex, contentIndex, content }) {
  const { setFieldValue } = useFormikContext();
  const [resources, setResources] = useState(content.resources || []);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef(null);

  const { mutate: uploadFile, progress: fileProgress } = useUploadFile();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    files.map((file) => {
      uploadFile(
        { file, folder: "resources" },
        {
          onSuccess: (data) => {
            console.log(data.file);
            const newResources = {
              id: `resource-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`,
              type: "file",
              name: data.file.filename,
              file: data.file,
              fileType: data.file.mimetype,
              fileSize: data.file.size,
              status: "uploaded",
            };
            setResources([...resources, newResources]);
            setFieldValue(
              `sections[${sectionIndex}].contents[${contentIndex}].resources`,
              [...resources, newResources]
            );
          },
        }
      );
    });
  };

  const handleAddLink = () => {
    if (!linkName.trim() || !linkUrl.trim()) return;

    const newResource = {
      id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "link",
      name: linkName,
      url: linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`,
      status: "completed",
    };

    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    setFieldValue(
      `sections[${sectionIndex}].contents[${contentIndex}].resources`,
      updatedResources
    );

    // Reset form
    setLinkName("");
    setLinkUrl("");
    setIsAddingLink(false);
  };

  const handleRemoveResource = (id) => {
    const updatedResources = resources.filter((r) => r.id !== id);
    setResources(updatedResources);
    setFieldValue(
      `sections[${sectionIndex}].contents[${contentIndex}].resources`,
      updatedResources
    );
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith("application/pdf"))
      return <FileText className="h-5 w-5 text-red-500" />;
    if (fileType?.startsWith("application/"))
      return <FileText className="h-5 w-5 text-orange-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
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
          <span>Upload Files</span>
          <input
            type="file"
            className="hidden"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
          />
        </label>
        {fileProgress > 0 && fileProgress < 100 && (
          <div className="w-full mt-2">
            <Progress value={fileProgress} className="h-2" />
            <p className="text-sm text-gray-500 mt-1 text-center">
              {Math.round(fileProgress)}%
            </p>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAddingLink(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Link</span>
        </Button>
      </div>

      {isAddingLink && (
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="mb-3">
            <Label className="text-sm">Resource Name</Label>
            <input
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="e.g. Course Syllabus"
              className="w-full px-3 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="mb-3">
            <Label className="text-sm">URL</Label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddingLink(false)}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleAddLink}>
              Add Link
            </Button>
          </div>
        </div>
      )}

      {resources.length > 0 ? (
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
                  <FileText className="w-5 h-5 text-blue-500" />
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
                {resource.type === "link" && (
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveResource(resource.id)}
                  className="h-7 w-7 text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-md">
          <p className="text-gray-500 text-sm">No resources added yet</p>
        </div>
      )}
    </div>
  );
}
