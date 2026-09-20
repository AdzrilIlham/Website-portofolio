import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSectionScrollPosition } from "@/components/ui/story-scroll"

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
      // 1. Jika sudah mendekati dasar halaman (footer/contact)
      const scrollHeight = document.documentElement.scrollHeight
      const currentScroll = window.innerHeight + window.scrollY
      if (scrollHeight - currentScroll <= 120) {
        setActiveTab(items[items.length - 1].name)
        ticking = false
        return
      }

      // 2. Garis fokus: 35% dari atas layar (nyaman di mobile maupun desktop)
      const focalY = window.innerHeight * 0.35

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
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 600);

    const id = url.replace("#", "");

    const pos = getSectionScrollPosition(id);
    if (pos !== undefined) {
      window.scrollTo({ top: pos, behavior: "auto" });
    } else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "auto" });
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 mb-4 sm:mb-6 sm:pt-6 pb-[env(safe-area-inset-bottom,0px)] max-w-[calc(100vw-1rem)] pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 md:gap-3 bg-white/50 sm:bg-white/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60 p-1 sm:p-1.5 md:py-1.5 md:px-2.5 rounded-full shadow-[0_8px_32px_0_rgba(19,81,170,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.8)]">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleNavClick(e, item.url, item.name)}
              className={cn(
                "relative flex items-center justify-center cursor-pointer text-sm font-semibold px-2.5 py-2 sm:px-3.5 sm:py-2.5 md:px-6 md:py-2 rounded-full transition-colors duration-200 select-none touch-manipulation",
                "text-primary/75 hover:text-primary active:scale-95",
                isActive && "text-primary",
              )}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/70 rounded-full -z-10 shadow-xs border border-white/60"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
