import * as React from "react"
import { cn } from "../../utils/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border-0 bg-card px-4 py-2 text-sm text-primary shadow-sm ring-1 ring-inset ring-border/20 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent hover:ring-border/40 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
