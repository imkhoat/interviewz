"use client";

import { Search, Filter, Plus, LayoutGrid, Table } from "lucide-react";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Checkbox } from "@shared/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export type ViewMode = "card" | "table";

interface ResumeActionBarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ResumeActionBar({ viewMode, onViewModeChange }: ResumeActionBarProps) {
  const router = useRouter();
  const t = useTranslations("resume");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    draft: false,
    published: false,
    archived: false,
  });

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const toggleViewMode = () => {
    onViewModeChange(viewMode === "card" ? "table" : "card");
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("action-bar.search-placeholder")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">{t("action-bar.filters.title")}</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="draft"
                      checked={filters.draft}
                      onCheckedChange={() => handleFilterChange("draft")}
                    />
                    <label
                      htmlFor="draft"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("action-bar.filters.draft")}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="published"
                      checked={filters.published}
                      onCheckedChange={() => handleFilterChange("published")}
                    />
                    <label
                      htmlFor="published"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("action-bar.filters.published")}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="archived"
                      checked={filters.archived}
                      onCheckedChange={() => handleFilterChange("archived")}
                    />
                    <label
                      htmlFor="archived"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("action-bar.filters.archived")}
                    </label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleViewMode}
            title={viewMode === "card" ? t("action-bar.view-mode.card") : t("action-bar.view-mode.table")}
          >
            {viewMode === "card" ? (
              <Table className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <Button onClick={() => router.push("/resume/create")}>
        <Plus className="h-4 w-4 mr-2" />
        {t("action-bar.create")}
      </Button>
    </div>
  );
} 