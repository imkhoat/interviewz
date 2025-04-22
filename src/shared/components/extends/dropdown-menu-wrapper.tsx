import * as React from "react";
import { Button } from "@shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";

export interface MenuItem {
  icon?: React.ReactNode | React.ElementType;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  description?: string;
  action?: () => void;
  items?: MenuItem[];
}

export interface DropdownMenuProps {
  items: (MenuItem | MenuItem[])[];
  label: string;
  classMenuContent?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function DropdownMenuWrapper({
  items,
  label,
  classMenuContent,
  side = "bottom",
  align = "start",
}: DropdownMenuProps) {
  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <DropdownMenuSub key={item.label}>
          <DropdownMenuSubTrigger>
            {item.icon && (
              <span className="mr-2">{React.createElement(item.icon)}</span>
            )}
            {item.label}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {item.items.map(renderMenuItem)}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem
        key={item.label}
        disabled={item.disabled}
        onClick={item.action}
      >
        {item.icon && <span className="mr-2">{React.createElement(item.icon)}</span>}
        <span>{item.label}</span>
        {item.description && (
          <span className="ml-auto text-xs text-muted-foreground">
            {item.description}
          </span>
        )}
        {item.shortcut && (
          <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={classMenuContent}
        side={side}
        align={align}
      >
        {items.map((item, index) => {
          if (Array.isArray(item)) {
            return (
              <React.Fragment key={index}>
                {index > 0 && <DropdownMenuSeparator />}
                {item.map(renderMenuItem)}
              </React.Fragment>
            );
          }
          return renderMenuItem(item);
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
