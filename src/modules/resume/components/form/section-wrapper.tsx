interface SectionWrapperProps {
  header: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function SectionWrapper({ header, icon, children }: SectionWrapperProps) {
  return (
    <div className="flex flex-col justify-start items-stretch gap-4 p-4 border rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold">{header}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-start items-stretch gap-4">
        {children}
      </div>
    </div>
  );
}
