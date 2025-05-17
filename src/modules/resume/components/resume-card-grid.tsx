"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Button } from "@shared/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface Resume {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

interface ResumeCardGridProps {
  resumes: Resume[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function ResumeCardGrid({ resumes, onView, onEdit }: ResumeCardGridProps) {
  const t = useTranslations("resume");

  const statusColors = {
    draft: "bg-yellow-100 text-yellow-800",
    published: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return format(date, "PP");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume) => (
        <Card key={resume.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">{resume.title}</CardTitle>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[resume.status]}`}>
                {t(`status.${resume.status}`)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{t("card.created-at")}: {formatDate(resume.createdAt)}</p>
              <p>{t("card.updated-at")}: {formatDate(resume.updatedAt)}</p>
              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(resume.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t("view")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(resume.id)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  {t("edit")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 