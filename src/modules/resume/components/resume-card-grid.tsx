"use client";

import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface Resume {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
}

interface ResumeCardGridProps {
  resumes: Resume[];
  onDelete?: (id: string) => void;
}

const statusColors = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

export default function ResumeCardGrid({ resumes, onDelete }: ResumeCardGridProps) {
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/resume/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/resume/${id}/edit`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumes.map((resume) => (
        <div
          key={resume.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {resume.title}
                </h3>
                <Badge
                  variant="secondary"
                  className={`${statusColors[resume.status]} capitalize mb-4`}
                >
                  {resume.status}
                </Badge>
                <p className="text-sm text-gray-500">
                  Last updated: {format(new Date(resume.updatedAt), "MMM d, yyyy")}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleView(resume.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(resume.id)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete?.(resume.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 