import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { scrollToSection } from "@/lib/scroll"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const isClickScrolling = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      // 1. If reached bottom of page (Footer / Contact)
      const scrollHeight = document.documentElement.scrollHeight
      const currentScroll = window.innerHeight + window.scrollY
      if (scrollHeight - currentScroll <= 140) {
        setActiveTab(items[items.length - 1].name)
        ticking = false
        return
      }

      // 2. Reading focal line: 40% from top of screen
      const focalY = window.innerHeight * 0.40

      let currentActive = items[0].name

      for (const item of items) {
        const id = item.url.replace("#", "")
        const el = document.getElementById(id)
        if (!el) continue

        const rect = el.getBoundingClientRect()
        if (rect.top <= focalY) {
          currentActive = item.name
        }
      }

      setActiveTab(currentActive)
      ticking = false
    }

    const onScroll = () => {
      if (isClickScrolling.current) return
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    updateActiveSection()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [items])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, name: string) => {
    e.preventDefault();
    setActiveTab(name);
    isClickScrolling.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const id = url.replace("#", "");

    scrollToSection(id, () => {
      setActiveTab(name);
      isClickScrolling.current = false;
    });

    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1400);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "fixed bottom-0 sm:top-0 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 mb-4 sm:mb-0 sm:pt-4 pb-[env(safe-area-inset-bottom,0px)] max-w-[calc(100vw-0.75rem)] pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-white/95 sm:bg-white/85 backdrop-blur-2xl backdrop-saturate-150 border border-slate-200/90 p-1.5 sm:p-1.5 md:py-1.5 md:px-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleNavClick(e, item.url, item.name)}
              className={cn(
                "relative flex items-center justify-center cursor-pointer text-xs sm:text-sm font-semibold p-3 sm:px-3 sm:py-2 md:px-5 md:py-2 rounded-full transition-colors duration-200 select-none touch-manipulation min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0",
                "text-slate-600 hover:text-[#1351AA] active:scale-95",
                isActive && "text-[#1351AA] font-bold",
              )}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={23} strokeWidth={2.3} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-slate-100 rounded-full -z-10 shadow-xs border border-slate-200/60"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                >
                  {/* Lamp glow beam: On mobile top of icon, on desktop bottom of pill */}
                  <div className="absolute -top-1.5 sm:-bottom-1.5 sm:top-auto left-1/2 -translate-x-1/2 w-8 sm:w-7 h-1 bg-[#1351AA] rounded-full">
                    <div className="absolute w-10 h-4 bg-[#1351AA]/25 rounded-full blur-sm -top-1 -left-1" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
