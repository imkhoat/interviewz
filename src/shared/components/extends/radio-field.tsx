import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@shared/components/ui/radio-group"
import { cn } from "@shared/lib/utils"

export interface RadioFieldProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  options: {
    value: string
    label: string
  }[]
}

const RadioField = React.forwardRef<HTMLDivElement, RadioFieldProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <RadioGroup
        ref={ref}
        className={cn(
          "flex flex-col space-y-2 rounded-md border border-input bg-background px-3 py-2",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <label
              htmlFor={option.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    )
  }
)
RadioField.displayName = "RadioField"

export { RadioField } 