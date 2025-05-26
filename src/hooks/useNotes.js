import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNote,
  getNotes,
  getNotesByContent,
  updateNote,
  deleteNote,
} from "@/api/noteService";

export function useNotes(contentId) {
  const queryClient = useQueryClient();

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", contentId ? "content" : "all", contentId],
    queryFn: () => (contentId ? getNotesByContent(contentId) : getNotes()),
    enabled: !contentId || !!contentId,
  });

  const { mutate: createNoteMutation, isPending: isCreating } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const { mutate: updateNoteMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["notes", data.id] });
    },
  });

  const { mutate: deleteNoteMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    notes,
    isLoading,
    createNote: createNoteMutation,
    updateNote: updateNoteMutation,
    deleteNote: deleteNoteMutation,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
