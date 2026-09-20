import { motion } from "motion/react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ExpertiseCardProps {
  title: string
  description: string
  icon: LucideIcon
  tags: string[]
  index: number
  accentColor: string
  className?: string
}

export function ExpertiseCard({
  title,
  description,
  icon: Icon,
  tags,
  index,
  accentColor,
  className,
}: ExpertiseCardProps) {
  return (
    <div className={cn("w-full h-full expertise-card rounded-2xl overflow-hidden border border-white/40 shadow-sm", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full flex flex-col"
      >
        {/* Top icon area */}
        <div
          className="relative flex items-center justify-center py-10 overflow-hidden"
          style={{ backgroundColor: accentColor }}
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />

          <div className="expertise-card__icon relative z-10 w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-lg">
            <Icon size={40} strokeWidth={1.5} />
          </div>

          <div className="expertise-card__overlay absolute inset-0 pointer-events-none" />
        </div>

        {/* Bottom content */}
        <div className="relative flex flex-col flex-1 gap-4 p-6 bg-white border-t border-white/40">
          <div
            className="expertise-card__line absolute top-0 left-6 right-6 h-0.5 pointer-events-none opacity-80"
            style={{ backgroundColor: accentColor }}
          />

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#0F172A] leading-tight tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-[#0F172A]/70 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#0F172A]/10 mt-auto">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
