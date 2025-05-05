import React from "react";

import { DropdownMenuWrapper } from "@shared/components/extends/dropdown-menu-wrapper"
import PageWrapperAuthActions from "@shared/components/extends/page-wrapper-auth-actions"
import { Button } from "@shared/components/ui/button"
import { usePageWrapperStore } from "@shared/stores/page-wrapper.store";
import { LanguageSwitcher } from '../language-switcher';

export default function PageWrapperActions() {
  const config = usePageWrapperStore((state) => state.config);
  const state = usePageWrapperStore((state) => state.state);

  return (
    config.actions ?? (
      <div className="flex-grow flex flex-row justify-end items-center gap-x-2">
        {state.actions?.map((action, index) => (
          Array.isArray(action) ? 
          <DropdownMenuWrapper key={index} label="More" items={action} /> :
          <Button
            key={index}
            className="btn btn-primary"
            variant={action.variant}
            onClick={action.onClick}
          >
            {action.icon && React.createElement(action.icon)}
            {action.label}
          </Button>
        ))}
        <PageWrapperAuthActions />
        <LanguageSwitcher />
      </div>
    )
  );
}
