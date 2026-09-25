"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { scrollToSection } from "@/lib/scroll";

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

// 19 Real Technologies in full original brand colors (Canvas 1000x520, Center: 500, 260)
const integrations: IntegrationItem[] = [
  // Sisi Kiri (9 nodes - Wide Spacing, Zero Overlap)
  {
    id: "figma",
    name: "Figma",
    icon: "/icons/figma.svg",
    direction: "right",
    x: 70,
    y: 65,
    path: "M 450 205 H 85 Q 70 205 70 190 V 65",
    delay: 0.1,
  },
  {
    id: "cpp",
    name: "C++",
    icon: "/icons/cpp.svg",
    direction: "right",
    x: 70,
    y: 195,
    path: "M 450 235 H 200 Q 185 235 185 220 V 210 Q 185 195 170 195 H 70",
    delay: 0.12,
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "/icons/vscode.svg",
    direction: "top",
    x: 250,
    y: 110,
    path: "M 450 215 H 265 Q 250 215 250 200 V 110",
    delay: 0.15,
  },
  {
    id: "react",
    name: "React",
    icon: "/icons/react.svg",
    direction: "top",
    x: 370,
    y: 155,
    path: "M 450 225 H 385 Q 370 225 370 210 V 155",
    delay: 0.2,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "/icons/javascript.svg",
    direction: "top",
    x: 230,
    y: 260,
    path: "M 450 260 H 230",
    delay: 0.25,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
    direction: "right",
    x: 70,
    y: 325,
    path: "M 450 285 H 200 Q 185 285 185 300 V 310 Q 185 325 170 325 H 70",
    delay: 0.3,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/icons/typescript.svg",
    direction: "bottom",
    x: 370,
    y: 365,
    path: "M 450 295 H 385 Q 370 295 370 310 V 365",
    delay: 0.35,
  },
  {
    id: "git",
    name: "Git",
    icon: "/icons/git.svg",
    direction: "bottom",
    x: 250,
    y: 410,
    path: "M 450 305 H 265 Q 250 305 250 320 V 410",
    delay: 0.4,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "/icons/github.svg",
    direction: "right",
    x: 70,
    y: 455,
    path: "M 450 315 H 85 Q 70 315 70 330 V 455",
    delay: 0.45,
  },

  // Sisi Kanan (10 nodes - Wide Spacing, Zero Overlap)
  {
    id: "rstudio",
    name: "RStudio",
    icon: "/icons/rstudio.svg",
    direction: "left",
    x: 930,
    y: 65,
    path: "M 550 205 H 915 Q 930 205 930 190 V 65",
    delay: 0.1,
  },
  {
    id: "streamlit",
    name: "Streamlit",
    icon: "/icons/streamlit.svg",
    direction: "bottom",
    x: 710,
    y: 65,
    path: "M 550 225 H 695 Q 710 225 710 210 V 65",
    delay: 0.12,
  },
  {
    id: "python",
    name: "Python",
    icon: "/icons/python.svg",
    direction: "top",
    x: 830,
    y: 155,
    path: "M 550 215 H 815 Q 830 215 830 200 V 155",
    delay: 0.15,
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: "/icons/laravel.svg",
    direction: "top",
    x: 630,
    y: 155,
    path: "M 550 235 H 615 Q 630 235 630 220 V 155",
    delay: 0.2,
  },
  {
    id: "postman",
    name: "Postman",
    icon: "/icons/postman.svg",
    direction: "top",
    x: 730,
    y: 260,
    path: "M 550 260 H 730",
    delay: 0.25,
  },
  {
    id: "r",
    name: "R Language",
    icon: "/icons/r.svg",
    direction: "left",
    x: 930,
    y: 205,
    path: "M 550 245 H 870 Q 885 245 885 230 V 220 Q 885 205 900 205 H 930",
    delay: 0.3,
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: "/icons/mysql.svg",
    direction: "bottom",
    x: 630,
    y: 365,
    path: "M 550 285 H 615 Q 630 285 630 300 V 365",
    delay: 0.35,
  },
  {
    id: "php",
    name: "PHP",
    icon: "/icons/php.svg",
    direction: "left",
    x: 930,
    y: 340,
    path: "M 550 275 H 870 Q 885 275 885 290 V 325 Q 885 340 900 340 H 930",
    delay: 0.38,
  },
  {
    id: "java",
    name: "Java",
    icon: "/icons/java.svg",
    direction: "bottom",
    x: 760,
    y: 415,
    path: "M 550 295 H 745 Q 760 295 760 310 V 415",
    delay: 0.4,
  },
  {
    id: "netbeans",
    name: "Apache NetBeans",
    icon: "/icons/netbeans.svg",
    direction: "left",
    x: 930,
    y: 455,
    path: "M 550 315 H 915 Q 930 315 930 330 V 455",
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
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-primary/25 bg-white p-1 sm:p-1.5 md:p-2.5 shadow-md sm:shadow-xl md:shadow-2xl pointer-events-none">
        <div className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-primary/10 bg-offwhite">
          <img
            src="/fotoAdzril.jpeg"
            alt="Adzril Ilham Ramadhan"
            width={72}
            height={72}
            className="size-9 sm:size-13 md:size-18 lg:size-22 object-cover object-center"
          />
        </div>
        <motion.div
          className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-primary/35"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      </div>

      {/* 19 Peripheral Technology Nodes (1-Tap Mobile + Instant Desktop Hover + Directional Tooltip) */}
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
                "group relative flex w-[30px] h-[30px] sm:size-10 md:size-12 lg:size-16 items-center justify-center rounded-xl sm:rounded-xl md:rounded-2xl border bg-white/95 shadow-xs sm:shadow-sm transition-all duration-150 p-1 sm:p-2 md:p-2.5 lg:p-3 cursor-pointer outline-none touch-manipulation",
                isActive
                  ? "scale-115 shadow-xl border-primary ring-2 sm:ring-3 ring-primary/40 bg-white z-30"
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
                loading="eager"
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
          className="h-12 sm:h-12 w-full sm:w-fit rounded-full px-8 py-3.5 sm:py-2.5 bg-primary text-offwhite hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer font-bold text-base shrink-0"
          render={
            <a
              href={url}
              onClick={(e) => {
                if (url.startsWith('#')) {
                  e.preventDefault();
                  const targetId = url.replace('#', '');
                  scrollToSection(targetId);
                }
              }}
            />
          }
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
