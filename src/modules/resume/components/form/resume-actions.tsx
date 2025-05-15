import { Button } from "@shared/components/ui/button";
import { Save, Trash2, Upload } from "lucide-react";
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
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onSave}
        disabled={isSaving}
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onPublish}
        disabled={isPublishing}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isPublishing ? "Publishing..." : "Publish"}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
