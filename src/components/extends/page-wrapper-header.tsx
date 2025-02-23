import React from "react";
import {CupSoda} from 'lucide-react'
import { usePageWrapper } from "@/hooks/use-page-wrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageWrapperActions from "@/components/extends/page-wrapper-actions";

export default function PageWrapperHeader() {
  const { state, config } = usePageWrapper();

  return config?.header ? (
    <header className=" bg-white container mx-auto py-4 flex flex-row flex-wrap gap-4 justify-between items-stretch">
      <div className="flex-grow flex flex-row justify-start items-center gap-2">
        {config?.logo ?? (
          <CupSoda className="w-14 h-14 text-primary" />
        )}
        {config?.icon ?? (
          <Avatar className="w-16 h-16 bg-white">
            <AvatarFallback className="bg-white ring-1 ring-inset ring-primary/5">
              <Avatar className="w-12 h-12 bg-white">
                <AvatarFallback className="bg-white ring-1 ring-inset ring-primary/10">
                  <Avatar className="w-8 h-8 bg-white">
                    <AvatarFallback className="bg-white ring-1 ring-inset ring-primary/15">
                      {state?.icon
                        ? React.createElement(state?.icon, {
                            className: "w-5 h-5 text-primary",
                          })
                        : null}
                    </AvatarFallback>
                  </Avatar>
                </AvatarFallback>
              </Avatar>
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col justify-start items-stretch gap-1">
          {config?.title ?? (
            <h2 className="text-xl font-semibold leading-none whitespace-nowrap truncate">
              {state?.title}
            </h2>
          )}
          {config?.description ?? (
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
