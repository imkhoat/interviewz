import React from "react";
import { usePageWrapper } from "@/hooks/use-page-wrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageWrapperActions from "@/components/extends/page-wrapper-actions";

export default function PageWrapperHeader() {
  const { state, config } = usePageWrapper();

  return config?.header ? (
    <header className="page-wrapper-header bg-slate-50 container mx-auto py-4 flex flex-row flex-wrap gap-4 justify-between items-stretch">
      <div className="flex flex-row justify-start items-center gap-2">
        {config?.icon ? (
          <Avatar className="w-12 h-12 bg-primary/0">
            <AvatarFallback className="bg-transparent ring-1 ring-inset ring-primary/5">
              <Avatar className="w-8 h-8 bg-primary/0">
                <AvatarFallback className="bg-primary/0 ring-1 ring-inset ring-primary/10">
                  {React.createElement(state?.icon, { className: "w-5 h-5 text-primary" })}
                </AvatarFallback>
              </Avatar>
            </AvatarFallback>
          </Avatar>
        ) : null}
        <div className="flex flex-col justify-start items-stretch gap-1">
          {config?.title ? (
            <h2 className="text-xl font-semibold leading-none whitespace-nowrap truncate">
              {state?.title}
            </h2>
          ) : null}
          {config?.description ? (
            <p className="text-sm opacity-50 leading-none whitespace-nowrap truncate">
              {state?.description}
            </p>
          ) : null}
        </div>
      </div>
      <PageWrapperActions />
    </header>
  ) : null;
}
