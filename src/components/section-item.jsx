"use client";

import { useState } from "react";
import { useFormikContext, FieldArray } from "formik";

import { Input } from "@/components/ui/input";
import {
  Trash,
  Edit,
  Check,
  Plus,
  ChevronDown,
  ChevronUp,
  GripVertical,
  AlertCircle,
} from "lucide-react";
import { ContentList } from "@/components/content-list";
import { AddContentDialog } from "@/components/add-content-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
// Create a random ID
const createId = () => `id-${Math.random().toString(36).substring(2, 15)}`;

export function SectionItem({
  section,
  sectionIndex,
  dragHandleProps,
  onRemove,
  isDragging,
  error,
  touched,
  showErrors,
}) {
  const { values, setFieldValue } = useFormikContext();
  const [isEditing, setIsEditing] = useState(false);
  const [sectionName, setSectionName] = useState(section.title);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleEditName = () => {
    if (isEditing) {
      setFieldValue(`sections[${sectionIndex}].title`, sectionName);
    }
    setIsEditing(!isEditing);
  };

  const handleContentsReorder = (reorderedContents) => {
    setFieldValue(`sections[${sectionIndex}].contents`, reorderedContents);
  };

  const hasContentType = (type) => {
    return section.contents.some((content) => content.type === type);
  };

  const hasQuiz = hasContentType("quiz");
  const hasAssignment = hasContentType("assignment");

  // Check if there are content errors
  const hasContentErrors =
    error &&
    error.contents &&
    (typeof error.contents === "string" ||
      (Array.isArray(error.contents) &&
        error.contents.some((contentError) => contentError)));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <button
            className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            {...dragHandleProps}
          >
            <GripVertical className="h-5 w-5" />
          </button>

          {isEditing ? (
            <Input
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className={`max-w-md ${
                error && error.title && showErrors ? "border-red-500" : ""
              }`}
              autoFocus
            />
          ) : (
            <h3 className="text-xl font-semibold">{section.title}</h3>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleEditName}
            className="h-8 w-8"
          >
            {isEditing ? (
              <Check className="h-4 w-4" />
            ) : (
              <Edit className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && error.title && showErrors && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.title}</AlertDescription>
        </Alert>
      )}

      {!isCollapsed && (
        <FieldArray name={`sections[${sectionIndex}].contents`}>
          {({ push, remove }) => (
            <div className="space-y-4">
              {hasContentErrors && showErrors && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {typeof error.contents === "string"
                      ? error.contents
                      : "There are errors in your content items"}
                  </AlertDescription>
                </Alert>
              )}

              {section.contents.length > 0 ? (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                  <ContentList
                    contents={section.contents}
                    sectionIndex={sectionIndex}
                    onContentsReorder={handleContentsReorder}
                    onRemoveContent={(contentId) => {
                      const index = section.contents.findIndex(
                        (content) => content.id === contentId
                      );
                      if (index !== -1) {
                        remove(index);
                      }
                    }}
                    errors={error && error.contents}
                    touched={touched && touched.contents}
                    showErrors={showErrors}
                  />
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">
                    No content added to this section yet
                  </p>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddContentOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Content
              </Button>

              <AddContentDialog
                open={isAddContentOpen}
                onOpenChange={setIsAddContentOpen}
                onAdd={(contentType) => {
                  // Check if quiz or assignment already exists
                  if (
                    (contentType === "quiz" && hasQuiz) ||
                    (contentType === "assignment" && hasAssignment)
                  ) {
                    alert(`You can only add one ${contentType} per section`);
                    return;
                  }

                  const newContent = {
                    id: createId(),
                    type: contentType,
                    title: `New ${
                      contentType.charAt(0).toUpperCase() + contentType.slice(1)
                    }`,
                    description: "",
                    ...(contentType === "quiz" && {
                      quizType: "multiChoice",
                      questions: [
                        {
                          id: createId(),
                          question: "New Question",
                          options: ["Option A", "Option B", "Option C"],
                          correctAnswer: 0,
                        },
                      ],
                    }),
                    ...(contentType === "assignment" && {
                      assignmentDetails: {
                        question: "Assignment Question",
                        passMark: 70,
                      },
                    }),
                  };

                  push(newContent);
                  setIsAddContentOpen(false);
                }}
                disabledTypes={{
                  quiz: hasQuiz,
                  assignment: hasAssignment,
                }}
              />
            </div>
          )}
        </FieldArray>
      )}
    </div>
  );
}
