import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto md:auto-rows-[19rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href?: string;
  cta?: string;
  tag?: string;
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href = "#projects",
  cta = "Explore Related Projects",
  tag,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-white border border-white/20 text-[#0F172A] shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[17rem]",
      className
    )}
  >
    {/* Visual background area */}
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {background}
    </div>

    {/* Optional Top Tag */}
    {tag && (
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F59E0B] text-[#0F172A] shadow-sm border border-[#F59E0B]/40">
          {tag}
        </span>
      </div>
    )}

    {/* Main Content Area */}
    <div className="pointer-events-none z-10 flex flex-col gap-2 p-6 sm:p-7 md:transition-transform md:duration-300 md:ease-out md:group-hover:-translate-y-8">
      <div className="w-12 h-12 rounded-2xl bg-[#1351AA]/10 text-[#1351AA] flex items-center justify-center border border-[#1351AA]/15 md:transition-transform md:duration-300 md:ease-out md:group-hover:scale-90 origin-left shrink-0 mb-1">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-[#0F172A]">
        {name}
      </h3>
      <p className="max-w-lg text-sm text-[#0F172A]/70 leading-relaxed">
        {description}
      </p>
    </div>

    {/* Bottom CTA Button: Accessible on mobile, clean hover reveal on desktop */}
    <div
      className={cn(
        "z-20 flex w-full flex-row items-center p-6 pt-0 md:pt-6",
        "relative md:absolute md:bottom-0 md:left-0 md:right-0 md:pointer-events-none",
        "opacity-100 md:opacity-0 md:translate-y-10 md:transform-gpu md:transition-all md:duration-300 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100"
      )}
    >
      <Button
        asChild
        size="sm"
        className="pointer-events-auto rounded-full bg-[#1351AA] hover:bg-[#0e3b7c] text-white px-5 py-2 text-xs font-semibold shadow-md transition-colors cursor-pointer"
      >
        <a href={href}>
          {cta}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </Button>
    </div>

    {/* Subtle hover overlay */}
    <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-[#1351AA]/[0.03]" />
  </div>
);

export default BentoGrid;
