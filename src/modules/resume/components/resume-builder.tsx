import ResumeForm from "@resume/components/form/resume-form";

export default function ResumeBuilder() {
  return (
    <div className="h-full grid grid-cols-12 gap-8">
      <div className="h-full order-2 lg:order-1 col-span-12 lg:col-span-6 flex flex-col justify-start items-stretch gap-4 overflow-y-scroll pr-4 -mr-4 rounded-md">
        <h1 className="text-2xl font-bold mb-8">Create New Resume</h1>
        <ResumeForm />
      </div>
      <div className="h-full order-1 lg:order-2 col-span-12 lg:col-span-6 border border-primary-foreground rounded-md p-4 bg-white flex justify-center items-center">
        <div className="w-full h-full">
          {/* TODO: Add ResumePreview component */}
          <div className="text-center text-muted-foreground">
            Preview will be available here
          </div>
        </div>
      </div>
    </div>
  );
}
