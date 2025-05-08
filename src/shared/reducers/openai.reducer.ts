import { create } from "zustand";

interface OpenAIState {
  isLoading: boolean;
  error: string | null;
  response: any | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setResponse: (response: any | null) => void;
  reset: () => void;
}

export const useOpenAIReducer = create<OpenAIState>((set) => ({
  isLoading: false,
  error: null,
  response: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setResponse: (response) => set({ response }),
  reset: () => set({ isLoading: false, error: null, response: null }),
})); 