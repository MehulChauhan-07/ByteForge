import api from "@/lib/api";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const createNote = async (
  title: string,
  content: string
): Promise<Note> => {
  const response = await api.post("/api/notes", { title, content });
  return response.data;
};

export const updateNote = async (
  id: string,
  title: string,
  content: string
): Promise<Note> => {
  const response = await api.put(`/api/notes/update/${id}`, { title, content });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/api/notes/delete/${id}`);
};

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get("/api/notes");
  return response.data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/api/notes/${id}`);
  return response.data;
};
