"use client"

import React from "react"
import { motion, type MotionProps } from "motion/react"
import { cn } from "@/lib/utils"

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 } as any,
  animate: { "--x": "-100%", scale: 1 } as any,
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
}

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
}

export const ShinyButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, href, target, rel, ...props }, ref) => {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer rounded-lg border border-primary/20 bg-primary/5 px-6 py-3 font-semibold transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1",
        className
      )}
      {...animationProps}
      {...props as any}
    >
      <span
        className="relative flex items-center justify-center w-full h-full text-sm tracking-wide text-primary uppercase"
        style={{
          maskImage:
            "linear-gradient(-75deg,var(--color-primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--color-primary) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg,var(--color-primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--color-primary) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)",
          WebkitMask: "linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)",
          backgroundImage:
            "linear-gradient(-75deg, rgba(19,81,170,0.1) calc(var(--x)+20%), rgba(19,81,170,0.5) calc(var(--x)+25%), rgba(19,81,170,0.1) calc(var(--x)+100%))",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px pointer-events-none"
      />
    </Component>
  )
})

ShinyButton.displayName = "ShinyButton"
