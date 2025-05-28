"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Save,
  Play,
  FileText,
  HelpCircle,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUrl } from "@/api/api";
export default function CoursePreview({
  values,
  onSubmit,
  onBack,
  isSubmitting,
}) {
  // Helper function to get visibility badge
  const getVisibilityBadge = () => {
    switch (values.visibility) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "private":
        return <Badge variant="secondary">Private</Badge>;
      case "public":
        return <Badge variant="default">Public</Badge>;
      default:
        return null;
    }
  };

  // Count total content items
  const countContentItems = (type) => {
    return values.sections.reduce((total, section) => {
      return (
        total +
        section.contents.filter((content) => content.type === type).length
      );
    }, 0);
  };

  const videoCount = countContentItems("video");
  const resourceCount = countContentItems("resource");
  const quizCount = countContentItems("quiz");
  const assignmentCount = countContentItems("assignment");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Course Preview</h2>
        <p className="text-gray-500 mb-6">
          Review your course before publishing.
        </p>
      </div>

      {/* Course Header */}
      <div className="relative rounded-lg overflow-hidden">
        {values.image ? (
          <img
            src={`${ImageUrl}${values.image}`}
            alt={values.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No course image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            {getVisibilityBadge()}
            {values.isPaid && <Badge variant="success">₦{values.price}</Badge>}
          </div>
          <h1 className="text-3xl font-bold text-white">{values.name}</h1>
        </div>
      </div>

      {/* Course Description */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">About this course</h3>
        <p className="text-gray-700">{values.description}</p>
        {/* <p className="text-gray-700">
          <span className="font-semibold">School:</span> {values.school}
        </p> */}
        <p className="text-gray-700">
          <span className="font-semibold">Level:</span> {values.level}
        </p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <Play className="h-8 w-8 text-red-600 mb-2" />
          <span className="text-2xl font-bold">{videoCount}</span>
          <span className="text-gray-500 text-sm">Videos</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <FileText className="h-8 w-8 text-blue-600 mb-2" />
          <span className="text-2xl font-bold">{resourceCount}</span>
          <span className="text-gray-500 text-sm">Resources</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <HelpCircle className="h-8 w-8 text-green-600 mb-2" />
          <span className="text-2xl font-bold">{quizCount}</span>
          <span className="text-gray-500 text-sm">Quizzes</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
          <FileSpreadsheet className="h-8 w-8 text-orange-600 mb-2" />
          <span className="text-2xl font-bold">{assignmentCount}</span>
          <span className="text-gray-500 text-sm">Assignments</span>
        </div>
      </div>

      {/* Course Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Course Content</h3>
        <div className="space-y-4">
          {values.sections.map((section, index) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-50 p-4 font-medium">
                {index + 1}. {section.title}
              </div>
              <div className="divide-y divide-gray-200">
                {section.contents.map((content) => (
                  <div key={content.id} className="p-4 flex items-center gap-3">
                    {content.type === "video" && (
                      <Play className="h-5 w-5 text-red-600" />
                    )}
                    {content.type === "resource" && (
                      <FileText className="h-5 w-5 text-blue-600" />
                    )}
                    {content.type === "quiz" && (
                      <HelpCircle className="h-5 w-5 text-green-600" />
                    )}
                    {content.type === "assignment" && (
                      <FileSpreadsheet className="h-5 w-5 text-orange-600" />
                    )}
                    <span>{content.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Course
        </Button>
      </div>
    </div>
  );
}
