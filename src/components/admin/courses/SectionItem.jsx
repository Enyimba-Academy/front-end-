import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  Pencil,
  Save,
  X,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ContentItem from "./ContentItem";
import ContentTypeSelector from "./ContentTypeSelector";

export default function SectionItem({ section, index, onUpdate, onDelete }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSaveTitle = () => {
    onUpdate({ ...section, title });
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setTitle(section.title);
    setIsEditingTitle(false);
  };

  const handleAddContent = (contentType) => {
    // Check if trying to add quiz or assignment when one already exists
    if (contentType === "quiz") {
      const existingQuiz = section.contents?.find(
        (content) => content.type === "quiz"
      );
      if (existingQuiz) {
        alert(
          "A quiz already exists in this section. Only one quiz is allowed per section."
        );
        return;
      }
    }

    if (contentType === "assignment") {
      const existingAssignment = section.contents?.find(
        (content) => content.type === "assignment"
      );
      if (existingAssignment) {
        alert(
          "An assignment already exists in this section. Only one assignment is allowed per section."
        );
        return;
      }
    }

    const newContent = {
      id: `content-${Date.now()}`,
      type: contentType,
      title: getDefaultTitle(contentType),
      // Add default data based on content type
      data: getDefaultData(contentType),
      resources: [],
    };

    onUpdate({
      ...section,
      contents: [...(section.contents || []), newContent],
    });
  };

  const handleUpdateContent = (updatedContent) => {
    onUpdate({
      ...section,
      contents: section.contents.map((content) =>
        content.id === updatedContent.id ? updatedContent : content
      ),
    });
  };

  const handleDeleteContent = (contentId) => {
    onUpdate({
      ...section,
      contents: section.contents.filter((content) => content.id !== contentId),
    });
  };

  const getDefaultTitle = (contentType) => {
    switch (contentType) {
      case "video":
        return "Video Lecture";
      case "material":
        return "Course Materials";
      case "quiz":
        return "Quiz";
      case "assignment":
        return "Assignment";
      default:
        return "New Content";
    }
  };

  const getDefaultData = (contentType) => {
    switch (contentType) {
      case "quiz":
        return {
          questions: [
            {
              id: `question-${Date.now()}`,
              text: "New Question",
              type: "multiple-choice",
              options: [
                {
                  id: `option-${Date.now()}-1`,
                  text: "Option 1",
                  isCorrect: true,
                },
                {
                  id: `option-${Date.now()}-2`,
                  text: "Option 2",
                  isCorrect: false,
                },
              ],
            },
          ],
          timeLimit: 30, // minutes
          passingScore: 70, // percentage
        };
      case "assignment":
        return {
          description: "Assignment description goes here...",
          dueDate: null,
          totalPoints: 100,
          submissionType: "file", // file, text, link
          allowedFileTypes: ["pdf", "doc", "docx"],
          maxFileSize: 10, // MB
        };
      default:
        return {};
    }
  };

  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`border border-gray-200 rounded-lg bg-white ${
            snapshot.isDragging ? "shadow-lg" : ""
          }`}
        >
          <div className="flex items-center justify-between p-4 ">
            <div className="flex items-center gap-2 flex-1">
              <div
                {...provided.dragHandleProps}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-5 h-5" />
              </div>

              {isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                  autoFocus
                />
              ) : (
                <h3 className="font-medium">{section.title}</h3>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 text-gray-500 hover:text-gray-700"
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>

              {isEditingTitle ? (
                <>
                  <button
                    onClick={handleSaveTitle}
                    className="p-1 text-green-600 hover:text-green-800"
                    title="Save"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelTitle}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(section.id)}
                    className="text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {!isCollapsed && (
            <div className="p-4">
              <Droppable droppableId={section.id} type="content">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-4 ${
                      snapshot.isDraggingOver ? "bg-gray-50 rounded-md p-2" : ""
                    }`}
                  >
                    {section.contents &&
                      section.contents.map((content, index) => (
                        <ContentItem
                          key={content.id}
                          content={content}
                          index={index}
                          onUpdate={handleUpdateContent}
                          onDelete={handleDeleteContent}
                        />
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="mt-4">
                <ContentTypeSelector
                  onSelect={handleAddContent}
                  section={section}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
