"use client";

import { Sparkles, PlusCircle, WandSparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@shared/components/ui/toggle-group";
import { useOpenAIPrompt } from "@shared/hooks/use-openai-prompt";

export default function OpenAIPrompt({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [selectedMode, setSelectedMode] = useState("a");
  const { 
    keywords, 
    setKeywords, 
    isGenerating, 
    suggestions, 
    handleGenerate, 
    handleSelect 
  } = useOpenAIPrompt({
    onSelect: (suggestion) => {
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.value = suggestion;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
      setShow(false);
    },
  });

  function handleAIGenerate() {
    setShow((show) => !show);
  }

  const handleModeChange = (value: string) => {
    setSelectedMode(value);
  };

  const handleAddSuggestion = () => {
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div className="flex flex-col justify-start items-stretch gap-2">
      <div className="w-full flex flex-row justify-end items-end gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="h-7"
          onClick={handleAIGenerate}
          type="button"
        >
          <WandSparkles className="text-sm" />
          AI Generate
        </Button>
      </div>
      {children}
      {show && (
        <div className="flex flex-col justify-start items-stretch gap-4 border border-primary rounded-md min-h-10 p-4">
          <div className="relative">
            <Input 
              placeholder="Please let AI know your keywords..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGenerate();
                }
              }}
            />
            <Button
              size="sm"
              variant="secondary"
              className="absolute right-1 top-1 h-8 rounded-sm"
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !keywords.trim()}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
          <div className="flex flex-row justify-start items-center gap-1">
            <ToggleGroup type="single" size="sm" value={selectedMode} onValueChange={handleModeChange}>
              <ToggleGroupItem value="a">
                <Sparkles />
                Suggestion
              </ToggleGroupItem>
              <ToggleGroupItem value="b">
                <Sparkles />
                Condensed
              </ToggleGroupItem>
              <ToggleGroupItem value="c" variant="outline">
                <Sparkles />
                Extended
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-row justify-start items-center gap-4">
            <Button size="sm" variant="ghost" onClick={handleAddSuggestion}>
              <PlusCircle />
            </Button>
            <div className="h-fit max-h-48 min-h-8 text-sm shrink grow">
              {suggestions.length > 0 ? (
                suggestions[0]
              ) : (
                "Accomplished Senior Java Engineer with over 10 years of extensive experience in designing, developing, and deploying dynamic backend architectures. Aiming to utilize my advanced expertise in Java-based frameworks, microservices, and cloud technologies to contribute to innovative software solutions that align with business objectives and optimize performance. I am dedicated to fostering a culture of excellence through mentoring junior engineers, advocating for clean code principles, and continual..."
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
