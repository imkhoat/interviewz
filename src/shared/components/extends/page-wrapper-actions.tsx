import { usePageWrapper } from "@shared/hooks/use-page-wrapper";
import { Button } from "@shared/components/ui/button"
import { DropdownMenuWrapper } from "@shared/components/extends/dropdown-menu-wrapper"
import React from "react";

export default function PageWrapperActions() {
  const { state, config } = usePageWrapper();

  return (
    config?.actions ?? (
      <>
        <div className="flex-grow flex flex-row justify-end items-center gap-x-2">
          {state?.actions?.map((action, index) => (
            Array.isArray(action) ? 
            <DropdownMenuWrapper key={index} label="More" items={action} /> :
            <Button
              key={index}
              className="btn btn-primary"
              variant={action.variant}
              onClick={action.onClick}
            >
              {action?.icon && React.createElement(action.icon)}
              {action.label}
            </Button>
          ))}
        </div>
      </>
    )
  );
}
