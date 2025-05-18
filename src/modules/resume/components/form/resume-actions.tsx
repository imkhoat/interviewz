import { Button } from "@shared/components/ui/button";
import { Save, Trash2, Upload, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

interface ResumeActionsProps {
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
  onDelete: () => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
  isDeleting: boolean;
}

export default function ResumeActions({
  onSave,
  onPublish,
  onDelete,
  isSaving,
  isPublishing,
  isDeleting,
}: ResumeActionsProps) {
  const t = useTranslations("resume");

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={onSave}
        disabled={isSaving || isPublishing || isDeleting}
      >
        {isSaving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {isSaving ? t("builder.actions.save.loading") : t("builder.actions.save.label")}
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={onPublish}
        disabled={isSaving || isPublishing || isDeleting}
      >
        {isPublishing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {isPublishing ? t("builder.actions.publish.loading") : t("builder.actions.publish.label")}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={isSaving || isPublishing || isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isDeleting ? t("builder.actions.delete.loading") : t("builder.actions.delete.label")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("builder.actions.delete.confirm.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("builder.actions.delete.confirm.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("builder.actions.delete.confirm.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>{t("builder.actions.delete.confirm.confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
