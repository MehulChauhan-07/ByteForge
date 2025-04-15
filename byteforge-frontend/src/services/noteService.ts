import axios from "axios";
import { User } from "@/types/user";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

class NoteService {
  private static instance: NoteService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.setAuthHeader(this.token);
    }
  }

  public static getInstance(): NoteService {
    if (!NoteService.instance) {
      NoteService.instance = new NoteService();
    }
    return NoteService.instance;
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public async getAllNotes(): Promise<Note[]> {
    try {
      const response = await axios.get<Note[]>(`${API_URL}/notes`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        throw new Error(
          error.response?.data?.message || "Failed to fetch notes"
        );
      }
      throw new Error("Failed to fetch notes");
    }
  }

  public async getNoteById(id: number): Promise<Note | null> {
    try {
      const response = await axios.get<Note>(`${API_URL}/notes/${id}`);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching note ${id}:`, error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Note not found");
        }
        throw new Error(
          error.response?.data?.message || "Failed to fetch note"
        );
      }
      throw new Error("Failed to fetch note");
    }
  }

  public async createNote(
    title: string,
    content: string
  ): Promise<Note | null> {
    try {
      const response = await axios.post<Note>(`${API_URL}/notes`, {
        title,
        content,
      });
      return response.data || null;
    } catch (error) {
      console.error("Error creating note:", error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create note"
        );
      }
      throw new Error("Failed to create note");
    }
  }

  public async updateNote(
    id: number,
    title: string,
    content: string
  ): Promise<Note | null> {
    try {
      const response = await axios.put<Note>(`${API_URL}/notes/update/${id}`, {
        title,
        content,
      });
      return response.data || null;
    } catch (error) {
      console.error(`Error updating note ${id}:`, error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Note not found");
        }
        throw new Error(
          error.response?.data?.message || "Failed to update note"
        );
      }
      throw new Error("Failed to update note");
    }
  }

  public async deleteNote(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/notes/delete/${id}`);
    } catch (error) {
      console.error(`Error deleting note ${id}:`, error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Note not found");
        }
        throw new Error(
          error.response?.data?.message || "Failed to delete note"
        );
      }
      throw new Error("Failed to delete note");
    }
  }
}

export default NoteService.getInstance();
