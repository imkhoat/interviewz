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
        variant="outline"
        size="sm"
        onClick={onSave}
        disabled={isSaving || isPublishing || isDeleting}
      >
        {isSaving ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        {isSaving ? t("form.submit-loading") : t("form.submit")}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onPublish}
        disabled={isSaving || isPublishing || isDeleting}
      >
        {isPublishing ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Upload className="w-4 h-4 mr-2" />
        )}
        {isPublishing ? t("form.submit-loading") : t("form.publish")}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSaving || isPublishing || isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            {isDeleting ? t("form.delete-loading") : t("form.delete")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("form.delete-confirm-title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("form.delete-confirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("form.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>{t("form.delete")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
