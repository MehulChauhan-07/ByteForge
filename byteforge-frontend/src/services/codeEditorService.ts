import api from "@/lib/api";

export interface CodeExecutionRequest {
  code: string;
  language: string;
  input?: string;
}

export interface CodeExecutionResponse {
  output: string;
  error?: string;
  executionTime: number;
}

export const executeCode = async (
  request: CodeExecutionRequest
): Promise<CodeExecutionResponse> => {
  const response = await api.post("/api/compile", request);
  return response.data;
};

export const saveCode = async (code: string, title: string): Promise<void> => {
  await api.post("/api/code/save", { code, title });
};

export const getSavedCodes = async (): Promise<
  Array<{ id: string; title: string; code: string }>
> => {
  const response = await api.get("/api/code/saved");
  return response.data;
};

export const deleteCode = async (id: string): Promise<void> => {
  await api.delete(`/api/code/${id}`);
};
