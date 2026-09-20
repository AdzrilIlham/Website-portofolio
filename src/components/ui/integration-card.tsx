"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-offwhite hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

interface VisualContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TeamCardProps {
  visual: React.ReactNode;
  title: string;
  url: string;
}

interface IntegrationItem {
  id: string;
  name: string;
  icon: string;
  direction: "top" | "bottom" | "left" | "right";
  x: number;
  y: number;
  path: string;
  delay: number;
}

const tooltipPlacement: Record<
  "top" | "bottom" | "left" | "right",
  { container: string; caret: string }
> = {
  top: {
    container: "bottom-full mb-3 left-1/2 -translate-x-1/2",
    caret: "bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2",
  },
  bottom: {
    container: "top-full mt-3 left-1/2 -translate-x-1/2",
    caret: "top-0 -translate-y-1/2 left-1/2 -translate-x-1/2",
  },
  left: {
    container: "right-full mr-3 top-1/2 -translate-y-1/2",
    caret: "right-0 translate-x-1/2 top-1/2 -translate-y-1/2",
  },
  right: {
    container: "left-full ml-3 top-1/2 -translate-y-1/2",
    caret: "left-0 -translate-x-1/2 top-1/2 -translate-y-1/2",
  },
};

// 16 Real Technologies in full original brand colors (Canvas 1000x520, Center: 500, 260)
const integrations: IntegrationItem[] = [
  // Sisi Kiri (8 nodes)
  {
    id: "figma",
    name: "Figma",
    icon: "/icons/figma.svg",
    direction: "right",
    x: 90,
    y: 75,
    path: "M 450 220 H 440 Q 425 220 425 205 V 90 Q 425 75 410 75 H 90",
    delay: 0.1,
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "/icons/vscode.svg",
    direction: "top",
    x: 230,
    y: 120,
    path: "M 450 230 H 350 Q 335 230 335 215 V 135 Q 335 120 320 120 H 230",
    delay: 0.15,
  },
  {
    id: "react",
    name: "React",
    icon: "/icons/react.svg",
    direction: "top",
    x: 360,
    y: 165,
    path: "M 450 240 H 415 Q 400 240 400 225 V 180 Q 400 165 385 165 H 360",
    delay: 0.2,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "/icons/javascript.svg",
    direction: "top",
    x: 210,
    y: 235,
    path: "M 450 252 H 290 Q 275 252 275 243.5 V 243.5 Q 275 235 260 235 H 210",
    delay: 0.25,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
    direction: "right",
    x: 80,
    y: 275,
    path: "M 450 268 H 160 Q 145 268 145 271.5 V 271.5 Q 145 275 130 275 H 80",
    delay: 0.3,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    direction: "bottom",
    x: 360,
    y: 355,
    path: "M 450 280 H 415 Q 400 280 400 295 V 340 Q 400 355 385 355 H 360",
    delay: 0.35,
  },
  {
    id: "git",
    name: "Git",
    icon: "/icons/git.svg",
    direction: "bottom",
    x: 230,
    y: 400,
    path: "M 450 290 H 350 Q 335 290 335 305 V 385 Q 335 400 320 400 H 230",
    delay: 0.4,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/icons/github.svg",
    direction: "right",
    x: 90,
    y: 445,
    path: "M 450 300 H 440 Q 425 300 425 315 V 430 Q 425 445 410 445 H 90",
    delay: 0.45,
  },

  // Sisi Kanan (8 nodes)
  {
    id: "rstudio",
    name: "RStudio",
    icon: "/icons/rstudio.svg",
    direction: "left",
    x: 910,
    y: 75,
    path: "M 550 220 H 560 Q 575 220 575 205 V 90 Q 575 75 590 75 H 910",
    delay: 0.1,
  },
  {
    id: "python",
    name: "Python",
    icon: "/icons/python.svg",
    direction: "top",
    x: 770,
    y: 120,
    path: "M 550 230 H 650 Q 665 230 665 215 V 135 Q 665 120 680 120 H 770",
    delay: 0.15,
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: "/icons/laravel.svg",
    direction: "top",
    x: 640,
    y: 165,
    path: "M 550 240 H 585 Q 600 240 600 225 V 180 Q 600 165 615 165 H 640",
    delay: 0.2,
  },
  {
    id: "postman",
    name: "Postman",
    icon: "/icons/postman.svg",
    direction: "top",
    x: 790,
    y: 235,
    path: "M 550 252 H 710 Q 725 252 725 243.5 V 243.5 Q 725 235 740 235 H 790",
    delay: 0.25,
  },
  {
    id: "r",
    name: "R Language",
    icon: "/icons/r.svg",
    direction: "left",
    x: 920,
    y: 275,
    path: "M 550 268 H 840 Q 855 268 855 271.5 V 271.5 Q 855 275 870 275 H 920",
    delay: 0.3,
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: "/icons/mysql.svg",
    direction: "bottom",
    x: 640,
    y: 355,
    path: "M 550 280 H 585 Q 600 280 600 295 V 340 Q 600 355 615 355 H 640",
    delay: 0.35,
  },
  {
    id: "java",
    name: "Java",
    icon: "/icons/java.svg",
    direction: "bottom",
    x: 770,
    y: 400,
    path: "M 550 290 H 650 Q 665 290 665 305 V 385 Q 665 400 680 400 H 770",
    delay: 0.4,
  },
  {
    id: "netbeans",
    name: "Apache NetBeans",
    icon: "/icons/netbeans.svg",
    direction: "left",
    x: 910,
    y: 445,
    path: "M 550 300 H 560 Q 575 300 575 315 V 430 Q 575 445 590 445 H 910",
    delay: 0.45,
  },
];

const AnimatedPath = ({
  d,
  id,
  delay = 0,
  isHighlighted,
}: {
  d: string;
  id: string;
  delay?: number;
  isHighlighted?: boolean;
}) => {
  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={isHighlighted ? 2.5 : 1.5}
        fill="none"
        className={isHighlighted ? "text-primary/70 transition-colors duration-150" : "text-primary/20 transition-colors duration-150"}
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth={isHighlighted ? 4.5 : 2.8}
        fill="none"
        strokeDasharray={isHighlighted ? "90 180" : "60 220"}
        initial={{ strokeDashoffset: 280 }}
        animate={{ strokeDashoffset: -280 }}
        transition={{
          duration: isHighlighted ? 1.8 : 3.2,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop
            offset="50%"
            stopColor="var(--color-primary)"
            stopOpacity={isHighlighted ? 1 : 0.9}
          />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
};

export function Integration() {
  const containerId = useId();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <div 
      className="relative h-full w-full select-none"
      onClick={() => setActiveNodeId(null)}
      onTouchEnd={() => setActiveNodeId(null)}
    >
      {/* SVG Connecting Cables */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {integrations.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
            delay={integration.delay}
            isHighlighted={activeNodeId === integration.id}
          />
        ))}
      </svg>

      {/* Center Profile Node (Larger, High Resolution) */}
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl sm:rounded-3xl border-2 border-primary/25 bg-white p-1.5 shadow-xl sm:p-2.5 sm:shadow-2xl pointer-events-none">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-primary/10 bg-offwhite">
          <img
            src="/fotoAdzril.jpeg"
            alt="Adzril Ilham Ramadhan"
            width={72}
            height={72}
            className="size-11 sm:size-16 md:size-20 lg:size-22 object-cover object-center"
          />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-primary/35"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      </div>

      {/* 16 Peripheral Technology Nodes (1-Tap Mobile + Instant Desktop Hover + Directional Tooltip) */}
      {integrations.map((integration) => {
        const isActive = activeNodeId === integration.id;
        const placement = tooltipPlacement[integration.direction];

        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay, duration: 0.4 }}
            style={{
              left: `${(integration.x / 1000) * 100}%`,
              top: `${(integration.y / 520) * 100}%`,
            }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 transition-[z-index]",
              isActive ? "z-50" : "z-20"
            )}
          >
            <button
              type="button"
              aria-label={integration.name}
              onMouseEnter={() => setActiveNodeId(integration.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveNodeId((prev) => (prev === integration.id ? null : integration.id));
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNodeId((prev) => (prev === integration.id ? null : integration.id));
              }}
              className={cn(
                "group relative flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl sm:rounded-2xl border bg-white/95 shadow-sm transition-all duration-150 p-2 sm:p-2.5 md:p-3 cursor-pointer outline-none touch-manipulation",
                isActive
                  ? "scale-115 shadow-xl border-primary ring-3 ring-primary/40 bg-white"
                  : "border-primary/15 hover:scale-110 hover:shadow-lg hover:border-primary/40"
              )}
            >
              {/* Directional Smart Tooltip with Caret */}
              <div
                className={cn(
                  "absolute px-3 py-1.5 bg-primary text-white text-xs sm:text-sm font-semibold rounded-lg pointer-events-none whitespace-nowrap shadow-2xl z-50 transition-all duration-100 ease-out",
                  placement.container,
                  isActive
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                )}
              >
                {integration.name}
                {/* Arrow caret pointing cleanly towards the icon border */}
                <div
                  className={cn(
                    "absolute w-2.5 h-2.5 bg-primary rotate-45 pointer-events-none",
                    placement.caret
                  )}
                />
              </div>

              {/* Icon Image (No pointer events to prevent any mouseleave flickering) */}
              <img
                src={integration.icon}
                alt={integration.name}
                className="h-full w-full object-contain pointer-events-none select-none"
                loading="lazy"
                draggable={false}
              />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

export function VisualContainer({ children, className }: VisualContainerProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[1000/640] sm:aspect-[1000/560] md:aspect-[1000/520] min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] w-full items-center justify-center overflow-hidden rounded-none bg-primary/3 p-2 sm:p-6 md:p-8",
        className,
      )}
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1.2px, transparent 1.2px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export const IntegrationCard = ({
  visual,
  title,
  url,
}: TeamCardProps) => {
  return (
    <Card className="mx-auto flex w-full max-w-6xl lg:max-w-7xl flex-col rounded-3xl overflow-hidden p-0 ring-0 border border-primary/15 bg-white shadow-xl hover:shadow-2xl gap-0 transition-all duration-300">
      <VisualContainer>{visual}</VisualContainer>

      <CardContent className="p-5 sm:p-7 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-primary/10 bg-white">
        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-primary text-center sm:text-left">
          {title}
        </h3>
        <Button
          nativeButton={false}
          className="h-11 sm:h-12 w-full sm:w-fit rounded-full px-7 bg-primary text-offwhite hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer font-semibold text-sm sm:text-base shrink-0"
          render={<a href={url} />}
        >
          Explore Projects
        </Button>
      </CardContent>
    </Card>
  );
};

export function IntegrationCardDemo() {
  return (
    <div className="flex items-center justify-center w-full p-2 sm:p-4">
      <IntegrationCard
        visual={<Integration />}
        title="Core Tech Stack & Development Workflow"
        url="#projects"
      />
    </div>
  );
}

export default IntegrationCardDemo;
