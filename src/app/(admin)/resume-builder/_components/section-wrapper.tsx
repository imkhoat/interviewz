import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowUp, Eye, Trash } from "lucide-react";
import { ReactElement } from "react";

export default function SectionWrapper({
  children,
  icon,
  header,
}: {
  children: React.ReactNode;
  icon?: ReactElement<React.ReactNode>;
  header?: string;
}) {
  return (
    <section className="flex flex-col justify-start items-stretch gap-4">
      <Collapsible className="gap-8 flex flex-col justify-start items-stretch">
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <CollapsibleTrigger className="relative grow flex flex-row justify-start items-center gap-2 before:absolute before:h-full before:bg-primary/25 before:w-2 before:top-0 before:left-0 before:rounded-r-[0.20rem]">
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
              <Trash className="text-primary/50" />
            </Button>
          </div>
        </div>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </section>
  );
}
