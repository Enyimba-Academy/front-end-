import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Loader,
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";
import { useGetEnrollmentMaterials } from "@/hooks/useEnrollment.hook";
import { useMarkComplete } from "@/hooks/useMarkComplete";
import { useNotes } from "@/hooks/useNotes";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Quiz } from "@/components/Quiz";
import { Assignment } from "@/components/Assignment";
import { toast } from "react-toastify";

export default function VideoLessonPage() {
  const { handleNext, isLast } = useOutletContext();
  const { contentId, id } = useParams();
  const { data, isLoading } = useGetEnrollmentMaterials(contentId);
  const navigate = useNavigate();
  const enrollment = data;

  const markComplete = useMarkComplete();
  const {
    notes,
    isLoading: isLoadingNotes,
    createNote,
    updateNote,
    deleteNote,
    isCreating,
    isUpdating,
    isDeleting,
  } = useNotes(contentId);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const course = enrollment?.course || {};
  const sections = course?.sections || [];

  const courseImage =
    course?.image ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=600";

  const [, setExpandedSections] = useState({});
  const [activeContent, setActiveContent] = useState(null);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (data && data.lessonProgresses && data.lessonProgresses.length > 0) {
      const progress = data.lessonProgresses[0];
      setIsCompleted(progress.completed);
    } else {
      setIsCompleted(false);
    }
  }, [data]);

  useEffect(() => {
    if (sections.length > 0) {
      const initialExpandedState = sections.reduce((acc, section, index) => {
        acc[section.id] = index === 0; // Only expand first section by default
        return acc;
      }, {});

      setExpandedSections(initialExpandedState);

      if (sections[0]?.contents?.length > 0) {
        setActiveContent(sections[0].contents[0]);
      }
      setIsContentLoading(false);
    }
  }, [sections]);

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      // Map the new flat data structure to the expected format
      let mappedContent = {
        id: data.id,
        title: data.title || "Lesson",
        type: data.type || "VIDEO",
      };
      if (data.type === "VIDEO") {
        mappedContent.video = [
          {
            url: data.videoUrl,
            description: data.videoDescription || "",
            duration: data.videoDuration,
          },
        ];
      } else if (data.type === "QUIZ") {
        mappedContent.quiz = [
          {
            id: data.id || "quiz-1",
            instructions:
              data.instructions ||
              data.materialDescription ||
              "Complete this quiz to test your knowledge.",
            questions: data.questions || [],
            timeLimit: data.timeLimit,
            passingScore: data.passingScore,
          },
        ];
      } else if (data.type === "ASSIGNMENT") {
        mappedContent.assignment = [
          {
            instructions:
              data.assignmentDescription ||
              data.materialDescription ||
              "Complete this assignment to apply what you've learned.",
            dueDate: data.dueDate,
            totalPoints: data.totalPoints,
            submissionType: data.submissionType,
            allowedFileTypes: data.allowedFileTypes,
            maxFileSize: data.maxFileSize,
            gradingCriteria: data.gradingCriteria,
          },
        ];
      }
      setActiveContent(mappedContent);
      setIsContentLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && data) {
      setIsContentLoading(false);
    }
  }, [isLoading, data]);

  const handleMarkComplete = () => {
    if (activeContent && enrollment) {
      markComplete.mutate(
        {
          contentId: activeContent.id,
          enrollmentId: id,
        },
        {
          onError: (error) => {
            toast.error(error.response.data.message);
            console.error(
              "Error marking content as complete:",
              error.response.data.message
            );
          },
          onSuccess: () => {
            toast.success("Content marked as complete!");
            setIsCompleted(true);
          },
        }
      );
    }
  };

  const handleCreateNote = () => {
    if (!newNoteContent.trim()) {
      toast.error("Note content cannot be empty");
      return;
    }

    createNote(
      { content: newNoteContent, contentId },
      {
        onSuccess: () => {
          setNewNoteContent("");
          setIsAddingNote(false);
          toast.success("Note created successfully");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to create note");
        },
      }
    );
  };

  const handleUpdateNote = (noteId) => {
    if (!editingContent.trim()) {
      toast.error("Note content cannot be empty");
      return;
    }

    updateNote(
      { noteId, content: editingContent },
      {
        onSuccess: () => {
          setEditingNoteId(null);
          setEditingContent("");
          toast.success("Note updated successfully");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to update note");
        },
      }
    );
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId, {
      onSuccess: () => {
        toast.success("Note deleted successfully");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to delete note");
      },
    });
  };

  const renderLoading = () => (
    <div className="flex-1 flex items-center justify-center p-10">
      <div className="text-center">
        <Loader size={48} className="animate-spin text-red-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading content...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    if (isLoading || isContentLoading) {
      return renderLoading();
    }

    const contentType = activeContent?.type || "";
    const currentVideoUrl = activeContent?.video?.[0]?.url || "";
    const currentQuiz = activeContent?.quiz?.[0];
    const currentAssignment = activeContent?.assignment?.[0];

    switch (contentType) {
      case "VIDEO":
        return (
          <VideoPlayer
            contentId={activeContent?.id}
            videoUrl={currentVideoUrl}
            poster={courseImage}
          />
        );

      case "QUIZ":
        return <Quiz quiz={currentQuiz} />;

      case "ASSIGNMENT":
        return <Assignment assignment={currentAssignment} />;

      default:
        return (
          <div className="w-full bg-gray-50 rounded-md p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <HelpCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Content Unavailable
            </h3>
            <p className="text-gray-500">
              Please select a valid lesson from the menu
            </p>
          </div>
        );
    }
  };

  const renderNotes = () => (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Notes</h2>
        {!isAddingNote && (
          <button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center text-red-600 hover:text-red-700"
            disabled={isCreating}
          >
            <Plus size={16} className="mr-1" />
            Add Note
          </button>
        )}
      </div>

      {isAddingNote && (
        <div className="mb-4">
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={3}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setIsAddingNote(false);
                setNewNoteContent("");
              }}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateNote}
              disabled={isCreating}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
            >
              {isCreating ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      )}

      {isLoadingNotes ? (
        <div className="text-center py-4">
          <Loader size={24} className="animate-spin text-red-600 mx-auto" />
        </div>
      ) : notes?.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="bg-gray-50 p-4 rounded-md">
              {editingNoteId === note.id ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingNoteId(null);
                        setEditingContent("");
                      }}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpdateNote(note.id)}
                      disabled={isUpdating}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingNoteId(note.id);
                        setEditingContent(note.content);
                      }}
                      className="p-1 text-gray-600 hover:text-gray-800"
                      disabled={isUpdating}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 text-gray-600 hover:text-red-600"
                      disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No notes yet. Add your first note!
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 sm:p-6 lg:p-2">
        {renderContent()}
        {renderNotes()}
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mt-6 sm:mt-8">
          <button className="flex items-center text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-center">
            <ArrowLeft size={16} className="mr-1" />
            <span>Previous Lesson</span>
          </button>
          {!isCompleted && (
            <button
              onClick={handleMarkComplete}
              disabled={markComplete.isPending}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center disabled:bg-red-400"
            >
              {markComplete.isPending ? (
                <span>Updating...</span>
              ) : (
                <>
                  <CheckCircle size={16} className="mr-1" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          )}
          {!isLast && (
            <button
              className="flex items-center text-gray-600 hover:text-gray-900 w-full sm:w-auto justify-center"
              onClick={() => handleNext(navigate)}
            >
              <span>Next Lesson</span>
              <ArrowLeft size={16} className="ml-1 transform rotate-180" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
