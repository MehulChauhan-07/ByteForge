import axios from "axios";
import { toast } from "sonner";

export interface CodeExecutionRequest {
  code: string;
  input?: string;
}

export interface CodeExecutionResponse {
  output: string;
  error?: string;
}

export interface SavedCode {
  id: string;
  title: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:8080/api";
const TIMEOUT = 30000; // 30 seconds timeout

class CodeEditorService {
  private static instance: CodeEditorService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.setAuthHeader(this.token);
    }
  }

  public static getInstance(): CodeEditorService {
    if (!CodeEditorService.instance) {
      CodeEditorService.instance = new CodeEditorService();
    }
    return CodeEditorService.instance;
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public async executeCode(
    request: CodeExecutionRequest
  ): Promise<CodeExecutionResponse> {
    try {
      const response = await axios.post<CodeExecutionResponse>(
        `${API_URL}/compile`,
        request,
        {
          timeout: TIMEOUT,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error executing code:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error("Request timed out. Please try again.");
        }
        if (error.response?.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        if (error.response?.data?.error) {
          throw new Error(error.response.data.error);
        }
        throw new Error(
          error.response?.data?.message || "Failed to execute code"
        );
      }
      throw new Error("Failed to execute code");
    }
  }

  public async saveCode(code: string, title: string): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/code/save`,
        { code, title },
        {
          timeout: TIMEOUT,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Code saved successfully");
    } catch (error) {
      console.error("Error saving code:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        throw new Error(error.response?.data?.message || "Failed to save code");
      }
      throw new Error("Failed to save code");
    }
  }

  public async getSavedCodes(): Promise<SavedCode[]> {
    try {
      const response = await axios.get<SavedCode[]>(`${API_URL}/code/saved`, {
        timeout: TIMEOUT,
      });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching saved codes:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        throw new Error(
          error.response?.data?.message || "Failed to fetch saved codes"
        );
      }
      throw new Error("Failed to fetch saved codes");
    }
  }

  public async deleteCode(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/code/${id}`, {
        timeout: TIMEOUT,
      });
      toast.success("Code deleted successfully");
    } catch (error) {
      console.error("Error deleting code:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Unauthorized access. Please log in again.");
        }
        throw new Error(
          error.response?.data?.message || "Failed to delete code"
        );
      }
      throw new Error("Failed to delete code");
    }
  }
}

export default CodeEditorService.getInstance();
