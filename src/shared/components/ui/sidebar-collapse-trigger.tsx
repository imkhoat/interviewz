"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

import { cn } from "@shared/lib/utils"
import { useSidebar } from "@shared/components/ui/sidebar"

export const SidebarCollapseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar()

  return (
    <button
      ref={ref}
      onClick={toggleSidebar}
      className={cn(
        "absolute -right-3 top-[3.25rem] z-40 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm transition-all hover:bg-accent",
        className
      )}
      {...props}
    >
      {state === "collapsed" ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </button>
  )
})
SidebarCollapseTrigger.displayName = "SidebarCollapseTrigger" 