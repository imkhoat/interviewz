import { useState } from "react";
import { useGeneratePrompt } from "@shared/queries/openai.queries";

interface UseOpenAIPromptProps {
  onSelect: (suggestion: string) => void;
}

export const useOpenAIPrompt = ({ onSelect }: UseOpenAIPromptProps) => {
  const [keywords, setKeywords] = useState("");
  const generatePrompt = useGeneratePrompt();

  const handleGenerate = async () => {
    if (!keywords.trim()) return;
    generatePrompt.mutate(keywords);
  };

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
    setKeywords("");
  };

  return {
    keywords,
    setKeywords,
    isGenerating: generatePrompt.isPending,
    suggestions: generatePrompt.data?.suggestions || [],
    handleGenerate,
    handleSelect,
  };
}; 