import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@shared/lib/http-client";

interface OpenAIPromptResponse {
  suggestions: string[];
}

interface UseOpenAIPromptProps {
  onSelect: (suggestion: string) => void;
}

export const useOpenAIPrompt = ({ onSelect }: UseOpenAIPromptProps) => {
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePrompt = useMutation({
    mutationFn: async (keywords: string) => {
      const response = await httpClient("/openai/chat", {
        method: "POST",
        body: JSON.stringify({ keywords }),
      });
      return response as OpenAIPromptResponse;
    },
    onSuccess: (data) => {
      setIsGenerating(false);
    },
    onError: (error) => {
      console.error("Error generating prompt:", error);
      setIsGenerating(false);
    },
  });

  const handleGenerate = async () => {
    if (!keywords.trim()) return;
    setIsGenerating(true);
    generatePrompt.mutate(keywords);
  };

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
    setKeywords("");
  };

  return {
    keywords,
    setKeywords,
    isGenerating,
    suggestions: generatePrompt.data?.suggestions || [],
    handleGenerate,
    handleSelect,
  };
}; 