import { ChevronDown } from "lucide-react";
import { cn } from "@shared/lib/utils";
import { Button } from "@shared/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@shared/components/ui/collapsible";
import { useState } from "react";

interface SectionWrapperProps {
  header: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function SectionWrapper({ header, icon, children, defaultOpen = true }: SectionWrapperProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold">{header}</h3>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "transform rotate-180" : ""
            )} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="px-4 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
