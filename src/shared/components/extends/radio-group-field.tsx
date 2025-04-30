import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@shared/components/ui/radio-group"
import { cn } from "@shared/lib/utils"

export interface RadioGroupFieldProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  options: {
    value: string
    label: string
    description?: string
  }[]
}

const RadioGroupField = React.forwardRef<HTMLDivElement, RadioGroupFieldProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <RadioGroup
        ref={ref}
        className={cn(
          "flex flex-row gap-2",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              "flex items-start space-x-2 rounded-md border border-input bg-background px-3 py-2",
              "hover:bg-accent hover:text-accent-foreground",
              "data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
            )}
          >
            <RadioGroupItem value={option.value} id={option.value} className="mt-1 peer" />
            <div className="flex flex-col">
              <label
                htmlFor={option.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
              {option.description && (
                <span className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    )
  }
)
RadioGroupField.displayName = "RadioGroupField"

export { RadioGroupField } 