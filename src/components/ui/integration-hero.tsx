// Simplified icons reflecting a web dev stack for better visual fit
const ICONS_ROW1 = [
  "https://cdn.simpleicons.org/react/61DAFB",
  "https://cdn.simpleicons.org/laravel/FF2D20",
  "https://cdn.simpleicons.org/supabase/3ECF8E",
  "https://cdn.simpleicons.org/mysql/4479A1",
  "https://cdn.simpleicons.org/tailwindcss/06B6D4",
];

const ICONS_ROW2 = [
  "https://cdn.simpleicons.org/python/3776AB",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.simpleicons.org/cplusplus/00599C",
  "https://cdn.simpleicons.org/git/F05032",
  "https://cdn.simpleicons.org/github/181717",
];

// Utility to repeat icons enough times
const repeatedIcons = (icons: string[], repeat = 4) => Array.from({ length: repeat }).flatMap(() => icons);

export default function IntegrationHero() {
  return (
    <div className="relative py-16 overflow-hidden bg-offwhite w-full rounded-3xl border border-primary/10 shadow-sm mt-8">
      {/* Light grid background matching the project theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_1px,transparent_1px)] opacity-[0.05] [background-size:24px_24px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wide rounded-full border border-primary/20 bg-primary/5 text-primary">
          Tech Stack
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
          Tools & Technologies
        </h2>
        <p className="mt-4 text-lg text-primary/70 max-w-2xl mx-auto">
          A collection of languages, frameworks, and tools I use to build scalable and robust applications.
        </p>

        {/* Carousel */}
        <div className="mt-12 overflow-hidden relative pb-2 w-full max-w-5xl mx-auto">
          {/* Row 1 */}
          <div className="flex gap-6 md:gap-10 whitespace-nowrap animate-scroll-left">
            {repeatedIcons(ICONS_ROW1, 4).map((src, i) => (
              <div key={i} className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-2xl bg-white border border-primary/10 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-3 md:p-4">
                <img src={src} alt="icon" className="h-full w-full object-contain" />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-6 md:gap-10 whitespace-nowrap mt-6 md:mt-8 animate-scroll-right">
            {repeatedIcons(ICONS_ROW2, 4).map((src, i) => (
              <div key={i} className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-2xl bg-white border border-primary/10 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-3 md:p-4">
                <img src={src} alt="icon" className="h-full w-full object-contain" />
              </div>
            ))}
          </div>

          {/* Fade overlays */}
          <div className="absolute left-0 top-0 h-full w-16 md:w-32 bg-gradient-to-r from-[var(--color-offwhite)] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 md:w-32 bg-gradient-to-l from-[var(--color-offwhite)] to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 12s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 12s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-scroll-left {
            animation: scroll-left 25s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 25s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}