import { Button } from "@shared/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shared/components/ui/collapsible";
import { ArrowUp, Eye, Trash2 } from "lucide-react";
import { ReactElement } from "react";

export default function SectionWrapper({
  open,
  children,
  icon,
  header,
}: {
  open?: boolean,
  children: React.ReactNode;
  icon?: ReactElement<React.ReactNode>;
  header?: string;
}) {
  return (
    <section className="flex flex-col justify-start items-stretch gap-4 bg-white border border-primary-foreground rounded-md p-4">
      <Collapsible open={open} className="gap-8 flex flex-col justify-start items-stretch">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <CollapsibleTrigger className="relative grow flex flex-row justify-start items-center gap-2 before:absolute before:h-full before:bg-primary/5 before:w-2 before:top-0 before:left-0 before:rounded-r-[0.20rem]">
            {icon}
            <h2 className="text-lg font-bold grow text-left">
              {header}
            </h2>
          </CollapsibleTrigger>
          <div className="flex flex-row justify-end items-center gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <ArrowUp className="text-primary/50" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Eye className="text-primary/50" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Trash2 className="text-primary/50" />
            </Button>
          </div>
        </div>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </section>
  );
}
