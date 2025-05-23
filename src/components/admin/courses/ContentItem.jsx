"use client";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Video,
  FileText,
  HelpCircle,
  ListOrdered,
  Pencil,
  Save,
  X,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import ResourceUploader from "./ResourceUploader";
import QuizEditor from "./QuizEditor";
import AssignmentEditor from "./AssignmentEditor";

export default function ContentItem({ content, index, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(content.title);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const handleSave = () => {
    onUpdate({ ...content, title });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(content.title);
    setIsEditing(false);
  };

  const handleContentDataUpdate = (newData) => {
    onUpdate({ ...content, data: newData });
  };

  const handleResourcesUpdate = (resources) => {
    onUpdate({
      ...content,
      resources: resources,
    });
  };

  const getIcon = (contentType) => {
    switch (contentType) {
      case "video":
        return <Video className="w-5 h-5 text-red-600" />;
      case "material":
        return <FileText className="w-5 h-5 text-red-600" />;
      case "quiz":
        return <HelpCircle className="w-5 h-5 text-red-600" />;
      case "assignment":
        return <ListOrdered className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getActionButton = (contentType) => {
    switch (contentType) {
      case "video":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setShowResources(!showResources)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              {showResources ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Hide Resources
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> Manage Resources
                </>
              )}
            </button>
          </div>
        );
      case "material":
        return (
          <button
            onClick={() => setShowResources(!showResources)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            {showResources ? (
              <>
                <ChevronUp className="w-4 h-4" /> Hide Resources
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> Manage Resources
              </>
            )}
          </button>
        );
      case "quiz":
        return (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <Plus className="w-4 h-4" />{" "}
            {isExpanded ? "Hide Questions" : "Edit Questions"}
          </button>
        );
      case "assignment":
        return (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <Plus className="w-4 h-4" />{" "}
            {isExpanded ? "Hide Details" : "Edit Assignment"}
          </button>
        );
      default:
        return null;
    }
  };

  const renderContentEditor = () => {
    if (!isExpanded && !showResources) return null;

    if (showResources) {
      return (
        <div className="mt-4  pt-4">
          <h4 className="font-medium mb-3">
            {content.type === "video" ? "Video Resources" : "Course Materials"}
          </h4>
          <ResourceUploader
            type={content.type}
            initialResources={content.resources || []}
            onChange={handleResourcesUpdate}
          />
        </div>
      );
    }

    switch (content.type) {
      case "quiz":
        return (
          <QuizEditor
            data={content.data || {}}
            onChange={handleContentDataUpdate}
          />
        );
      case "assignment":
        return (
          <AssignmentEditor
            data={content.data || {}}
            onChange={handleContentDataUpdate}
          />
        );
      default:
        return null;
    }
  };

  // Count resources for badge display
  const resourceCount = (content.resources || []).length;

  return (
    <Draggable draggableId={content.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-4 border border-dashed border-gray-200 rounded-lg ${
            snapshot.isDragging ? "bg-white shadow-md" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div
                {...provided.dragHandleProps}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4" />
              </div>

              {getIcon(content.type)}

              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{content.title}</span>
                  {resourceCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {resourceCount}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-1 text-green-600 hover:text-green-800"
                    title="Save"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(content.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                    title="Delete"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            {getActionButton(content.type)}
          </div>

          {renderContentEditor()}
        </div>
      )}
    </Draggable>
  );
}
