import api from "./api";

export const createNote = async ({ content, contentId }) => {
  const response = await api.post("/notes", { content, contentId });
  return response.data.data;
};

export const getNotes = async () => {
  const response = await api.get("/notes");
  return response.data.data;
};

export const getNotesByContent = async (contentId) => {
  const response = await api.get(`/notes/content/${contentId}`);
  return response.data.data;
};

export const getNoteById = async (noteId) => {
  const response = await api.get(`/notes/${noteId}`);
  return response.data.data;
};

export const updateNote = async ({ noteId, content }) => {
  const response = await api.patch(`/notes/${noteId}`, { content });
  return response.data.data;
};

export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};
