import { Save, Trash2, Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@shared/components/ui/button";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

interface ResumeActionsProps {
  onSave?: (data: ResumeFormValues) => void;
  onPublish?: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
  isDeleting?: boolean;
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
    onSave?.(data);
  };

  const handlePublish = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }
    onPublish?.();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center p-4 bg-background/80 backdrop-blur-sm border-t">
      <div className="flex gap-4">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          type="submit"
          form="resume-form"
          variant="default"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button
          type="submit"
          form="resume-form"
          variant="default"
          onClick={handlePublish}
          disabled={isPublishing}
        >
          <Upload className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
} 