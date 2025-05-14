import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@shared/components/ui/button";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

interface ResumeActionsProps {
  onSave: (data: ResumeFormValues) => void;
  onPublish: () => void;
  onDelete: () => void;
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
  const form = useFormContext<ResumeFormValues>();

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }
    const data = form.getValues();
    onSave(data);
  };

  const handlePublish = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }
    onPublish();
  };

  return (
    <div className="border-t bg-background">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            form="resume-form"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            type="submit"
            form="resume-form"
            onClick={handlePublish}
            disabled={isPublishing}
            variant="secondary"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
        <Button
          onClick={onDelete}
          disabled={isDeleting}
          variant="destructive"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
} 