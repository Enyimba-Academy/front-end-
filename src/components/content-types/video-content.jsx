"use client";

import { useState, useRef } from "react";
import { useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Plus, X, FileText, ExternalLink } from "lucide-react";
import { useUploadVideo } from "@/hooks/image";
import { Progress } from "@/components/ui/progress";
import { ImageUrl } from "@/api/api";
export function VideoContent({ sectionIndex, contentIndex, content }) {
  const { setFieldValue } = useFormikContext();
  const [videoPreview, setVideoPreview] = useState(
    content.videoPreview || null
  );

  const fileInputRef = useRef(null);

  const {
    mutate: uploadVideo,
    progress: videoProgress,
    isPending,
  } = useUploadVideo();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file");
      return;
    }

    uploadVideo(
      { video: file, folder: "videos" },
      {
        onSuccess: (data) => {
          console.log(data.file);
          setFieldValue(
            `sections[${sectionIndex}].contents[${contentIndex}].videoFile`,
            data.file
          );
          setFieldValue(
            `sections[${sectionIndex}].contents[${contentIndex}].videoPreview`,
            data.file.path
          );
          setFieldValue(
            `sections[${sectionIndex}].contents[${contentIndex}].videoName`,
            data.file.name
          );
          setVideoPreview(data.file.path);
        },
        onError: (error) => {
          console.log({ error });
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Upload Video</Label>
        <div className="mt-2">
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current.click()}
            className="w-full h-24 flex flex-col items-center justify-center border-dashed disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!videoPreview || isPending}
          >
            <Upload className="h-6 w-6 mb-2" />
            <span>
              {content.videoName || isPending
                ? "Uploading..."
                : "Click to upload video"}
            </span>
          </Button>
          {videoProgress > 0 && videoProgress < 100 && isPending && (
            <div className="mt-2">
              <Progress value={videoProgress} className="h-2" />
              <p className="text-sm text-gray-500 mt-1 text-center">
                {Math.round(videoProgress)}%
              </p>
            </div>
          )}
        </div>
      </div>

      {videoPreview && (
        <div className="mt-4">
          <Label>Video Preview</Label>
          <div className="mt-2 border rounded-md overflow-hidden">
            <video
              src={`${ImageUrl}${videoPreview}`}
              controls
              className="w-full h-auto"
              style={{ maxHeight: "200px" }}
            />
          </div>
        </div>
      )}

      {/* <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <Label>Video Resources</Label>
          <div className="flex gap-2">
            <input
              type="file"
              ref={resourceFileRef}
              onChange={handleResourceFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => resourceFileRef.current.click()}
              className="flex items-center gap-1 h-8"
            >
              <Upload className="h-3 w-3" />
              <span className="text-xs">Upload File</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddingResource(true)}
              className="flex items-center gap-1 h-8"
            >
              <Plus className="h-3 w-3" />
              <span className="text-xs">Add Link</span>
            </Button>
          </div>
        </div>

        {isAddingResource && (
          <div className="p-4 border rounded-md bg-gray-50 mb-4">
            <div className="mb-3">
              <Label className="text-sm">Resource Name</Label>
              <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="e.g. Lecture Notes"
                className="w-full px-3 py-2 border rounded-md mt-1"
              />
            </div>
            <div className="mb-3">
              <Label className="text-sm">URL</Label>
              <input
                type="url"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border rounded-md mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddingResource(false)}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={handleAddResource}>
                Add
              </Button>
            </div>
          </div>
        )}

        {resources.length > 0 ? (
          <div className="border rounded-md divide-y">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>{resource.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {resource.url && (
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
      </div> */}
    </div>
  );
}
