import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@shared/components/ui/button";
import { Save, Send, Trash2 } from "lucide-react";
import { ResumeFormValues } from "@resume/schemas/resume.schema";

interface ResumeActionsProps {
  onSave: (data: ResumeFormValues) => Promise<void>;
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
  const form = useFormContext<ResumeFormValues>();

  const handleSave = async () => {
    console.log('Saving');
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }
    const data = form.getValues();
    console.log('Data', data);
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
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSave}
        disabled={isSaving}
      >
        <Save className="w-4 h-4 mr-2" />
        Save
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={handlePublish}
        disabled={isPublishing}
      >
        <Send className="w-4 h-4 mr-2" />
        Publish
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
        disabled={isDeleting}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}
