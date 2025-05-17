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
import { useTranslations } from "next-intl";

interface Resume {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  updatedAt: string;
}

interface ResumeTableProps {
  resumes: Resume[];
  onDelete?: (id: string) => void;
}

const statusColors = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

export default function ResumeTable({ resumes, onDelete }: ResumeTableProps) {
  const router = useRouter();
  const t = useTranslations("resume");

  const handleView = (id: string) => {
    router.push(`/resume/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/resume/${id}/edit`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("table.columns.title")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("table.columns.status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("table.columns.last-updated")}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("table.columns.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {resumes.map((resume) => (
            <tr key={resume.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{resume.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant="secondary"
                  className={`${statusColors[resume.status]} capitalize`}
                >
                  {t(`table.status.${resume.status}`)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {format(new Date(resume.updatedAt), "MMM d, yyyy")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleView(resume.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      {t("table.actions.view")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(resume.id)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      {t("table.actions.edit")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete?.(resume.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("table.actions.delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 