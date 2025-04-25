import { Hop } from "lucide-react";
import React from "react";

import PageWrapperActions from "@shared/components/extends/page-wrapper-actions";
import PageWrapperBreadcrumb from "@shared/components/extends/page-wrapper-breadcrumb";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";
import { SidebarTrigger } from "@shared/components/ui/sidebar";
import { usePageWrapperStore } from "@shared/stores/page-wrapper.store";

export default function PageWrapperHeader() {
  const config = usePageWrapperStore((state) => state.config);
  const state = usePageWrapperStore((state) => state.state);

  return config?.header ? (
    <header className=" bg-white px-4 w-full flex flex-row gap-4 justify-between items-center h-header">
      {config.sidebar && <SidebarTrigger />}
      {config.breadcrumbs && <PageWrapperBreadcrumb />}
      <div className="flex-grow flex flex-row justify-start items-center gap-2">
        {config?.logo && <Hop className="w-10 h-10 text-primary" />}
        {config?.icon && (
          <Avatar className="w-16 h-16 bg-white">
            <AvatarFallback className="bg-white ring-1 ring-inset ring-primary/5">
              <Avatar className="w-12 h-12 bg-white">
                <AvatarFallback className="bg-white ring-1 ring-inset ring-primary/10">
                  <Avatar className="w-8 h-8 bg-white">
                    <AvatarFallback className="bg-white ring-1 ring-inset ring-primary/15">
                      {state?.icon && React.createElement(state.icon)}
                    </AvatarFallback>
                  </Avatar>
                </AvatarFallback>
              </Avatar>
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col justify-start items-stretch gap-1">
          {config?.title && (
            <h2 className="text-xl font-semibold leading-none whitespace-nowrap truncate">
              {state?.title}
            </h2>
          )}
          {config?.description && (
            <p className="text-sm opacity-50 leading-none whitespace-nowrap truncate">
              {state?.description}
            </p>
          )}
        </div>
      </div>
      <PageWrapperActions />
    </header>
  ) : null;
}
