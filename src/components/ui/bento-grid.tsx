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
        "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[19rem]",
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
  cta = "Lihat Proyek Terkait",
  tag,
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-white border border-white/20 text-[#0F172A] shadow-xl hover:shadow-2xl transition-all duration-300",
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

    {/* Main Content Area: Shifts up on hover to reveal CTA */}
    <div className="pointer-events-none z-10 flex flex-col gap-2 p-6 sm:p-7 transition-transform duration-300 ease-out group-hover:-translate-y-8">
      <div className="w-12 h-12 rounded-2xl bg-[#1351AA]/10 text-[#1351AA] flex items-center justify-center border border-[#1351AA]/15 transition-transform duration-300 ease-out group-hover:scale-90 origin-left shrink-0 mb-1">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-[#0F172A]">
        {name}
      </h3>
      <p className="max-w-lg text-sm text-[#0F172A]/70 leading-relaxed">
        {description}
      </p>
    </div>

    {/* Bottom CTA Button: Slides up on hover */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex w-full translate-y-10 transform-gpu flex-row items-center p-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
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
