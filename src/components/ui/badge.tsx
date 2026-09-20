import { cn } from "@/lib/utils"

interface BadgeProps {
  className?: string
  children: React.ReactNode
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  )
}
