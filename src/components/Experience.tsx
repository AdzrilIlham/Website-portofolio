import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const education = [
  {
    degree: 'Bachelor of Software Engineering (Rekayasa Perangkat Lunak)',
    institution: 'Universitas Pendidikan Indonesia (UPI)',
    period: 'Nov 2024 - 2028',
    gpa: '3.75 / 4.00',
    coursework: [
      'Object-Oriented Programming',
      'Database Systems',
      'Web Application Development',
      'Data Structures & Algorithms',
    ],
    icon: GraduationCap,
  },
];

const experiences = [
  {
    id: 'hima',
    role: 'Staff of Advocacy Department',
    organization: 'HIMA RPL UPI',
    category: 'Leadership & Org',
    period: 'Feb 2025 - Feb 2026',
    year: '2025 – 2026',
    points: [
      'Facilitated communication between students and faculty leadership to address academic and departmental concerns.',
      'Served as Head of Logistics Division for the 4th Software Engineering Anniversary, managing equipment procurement and venue operations.',
      'Served as Event Coordinator & MC for the Goes To School (GTS) outreach initiative.',
    ],
  },
  {
    id: 'parking',
    role: 'Smart Parking Management System',
    organization: 'Object-Oriented Programming Project',
    category: 'OOP & Java',
    period: '2025',
    year: '2025',
    points: [
      'Developed a Smart Parking Management System as an implementation of Object-Oriented Programming concepts.',
      'Applied object-oriented concepts to organize system components and parking management processes.',
      'Designed the system to manage parking-related data and operations.',
    ],
  },
  {
    id: 'clinic',
    role: 'Clinic Information System',
    organization: 'Database & SQL Project',
    category: 'Database & SQL',
    period: '2025',
    year: '2025',
    points: [
      'Designed and developed a database for a clinic management system using SQL.',
      'Created data structures for doctors, administrators, staff, patients, schedules, polyclinics, visits, medical records, prescriptions, and transactions.',
      'Implemented relationships between entities to support the clinic’s operational processes.',
    ],
  },
  {
    id: 'laravel',
    role: 'Web Development Project',
    organization: 'Laravel',
    category: 'Full-Stack Web',
    period: '2025',
    year: '2025',
    points: [
      'Implemented a web-based application based on a previously designed UI/UX prototype.',
      'Developed the website using Laravel.',
      'Connected the interface with application logic and database functionality.',
    ],
  },
  {
    id: 'cleanwash',
    role: 'CleanWash',
    organization: 'Human-Computer Interaction / UI/UX',
    category: 'HCI & UI/UX',
    period: '2025',
    year: '2025',
    points: [
      'Designed a UI/UX concept for CleanWash by applying Human-Computer Interaction principles.',
      'Focused on creating an intuitive interface and user flow.',
      'Developed the prototype as a representation of the proposed user experience.',
    ],
  },
  {
    id: 'creativeos',
    role: 'Creative.OS',
    organization: 'Operating System Project',
    category: 'Systems & OS',
    period: '2025',
    year: '2025',
    points: [
      'Developed Creative.OS, a customized operating-system distribution designed around video-editing needs.',
      'Explored operating-system concepts through the configuration and development of the distribution.',
    ],
  },
  {
    id: 'foodwaste',
    role: 'Food Waste Management Website',
    organization: 'Design Thinking & UI/UX',
    category: 'Design Thinking',
    period: '2024',
    year: '2024',
    points: [
      'Identified the problem of food waste among students and newly married couples.',
      'Applied the Design Thinking process to explore user problems and develop potential solutions.',
      'Designed a website prototype that provides ideas for processing leftover ingredients into meals.',
      'Included a concept for monitoring the expiration dates of food ingredients.',
    ],
  },
  {
    id: 'journal',
    role: 'Predatory Journal Detection System',
    organization: 'Basic Programming — Python',
    category: 'Python',
    period: '2024',
    year: '2024',
    points: [
      'Developed a basic system related to predatory journal identification using Python.',
      'Applied fundamental programming concepts to process and manage journal-related data.',
      'Implemented the project as part of the Basic Programming course.',
    ],
  },
  {
    id: 'dsa',
    role: 'Data Structures & Algorithms',
    organization: 'Academic Experience',
    category: 'Algorithms',
    period: '2024',
    year: '2024',
    points: [
      'Learned how to store, organize, and manage data efficiently.',
      'Studied fundamental algorithms including searching and sorting.',
      'Applied data structure and algorithm concepts through programming exercises.',
    ],
  },
];

// Circuit Cable Bridge physically connecting Card A to Card B with GPU-accelerated pulse
const CircuitBridge = ({ index }: { index: number }) => {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-8 sm:w-12 self-center relative pointer-events-none -mx-1">
      <svg className="w-full h-8 overflow-visible" viewBox="0 0 48 24">
        {/* Physical Copper Circuit Wire */}
        <path
          d="M 0 12 H 48"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/25"
          fill="none"
        />

        {/* Animated Light Flash Pulse (GPU-accelerated CSS keyframe animation) */}
        <path
          d="M 0 12 H 48"
          stroke="url(#experience-wire-pulse)"
          strokeWidth="3.5"
          fill="none"
          className="circuit-pulse-beam"
          style={{ animationDelay: `${(index % 4) * 0.35}s` }}
        />

        {/* Left connector pin */}
        <circle cx="2" cy="12" r="3" fill="var(--color-primary)" />
        {/* Right connector pin */}
        <circle cx="46" cy="12" r="3" fill="var(--color-primary)" />
      </svg>
    </div>
  );
};

export default function Experience() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const halfWidthRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startXRef = useRef(0);
  const initialScrollLeftRef = useRef(0);

  // Duplicate for continuous seamless infinite loop
  const loopExperiences = [...experiences, ...experiences];

  // Measure and cache halfWidth without layout thrashing
  const updateMetrics = useCallback(() => {
    if (scrollRef.current) {
      halfWidthRef.current = scrollRef.current.scrollWidth / 2;
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    // Re-check after images/fonts settle
    const timer = setTimeout(updateMetrics, 400);
    window.addEventListener('resize', updateMetrics);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateMetrics);
    };
  }, [updateMetrics]);

  // Pause temporary when user manually scrolls or touches, then resume
  const markUserInteraction = useCallback(() => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      if (scrollRef.current) {
        scrollPosRef.current = scrollRef.current.scrollLeft;
      }
    }, 1200);
  }, []);

  // Continuous Auto-Scroll Engine (Buttery smooth 60/120fps with delta-time, ZERO layout thrashing)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const pixelsPerSecond = 45; // Silky smooth, gentle reading speed

    const step = (currentTime: number) => {
      const deltaSeconds = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (
        scrollRef.current &&
        !isHoveredRef.current &&
        !isInteractingRef.current &&
        halfWidthRef.current > 50
      ) {
        scrollPosRef.current += pixelsPerSecond * deltaSeconds;
        if (scrollPosRef.current >= halfWidthRef.current) {
          scrollPosRef.current -= halfWidthRef.current;
        }
        scrollRef.current.scrollLeft = scrollPosRef.current;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  // Handle native scroll (Trackpad two-finger, mouse wheel, or touch swipe)
  const handleScroll = () => {
    if (!scrollRef.current || halfWidthRef.current <= 50) return;
    const el = scrollRef.current;

    // Wrap around seamlessly
    if (el.scrollLeft >= halfWidthRef.current) {
      el.scrollLeft -= halfWidthRef.current;
      scrollPosRef.current = el.scrollLeft;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += halfWidthRef.current;
      scrollPosRef.current = el.scrollLeft;
    } else {
      scrollPosRef.current = el.scrollLeft;
    }
  };

  // Button navigation
  const scrollManual = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    markUserInteraction();
    const delta = scrollRef.current.clientWidth < 640 ? 320 : 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -delta : delta,
      behavior: 'smooth',
    });
  };

  // Pointer drag handling (Desktop mouse drag + touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    isInteractingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    initialScrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const el = scrollRef.current;
    const halfWidth = el.scrollWidth / 2;

    let target = initialScrollLeftRef.current - deltaX;
    if (target >= halfWidth) {
      target -= halfWidth;
      initialScrollLeftRef.current -= halfWidth;
    } else if (target < 0) {
      target += halfWidth;
      initialScrollLeftRef.current += halfWidth;
    }

    el.scrollLeft = target;
    scrollPosRef.current = target;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    if (scrollRef.current.hasPointerCapture(e.pointerId)) {
      scrollRef.current.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
    markUserInteraction();
  };

  return (
    <section className="py-20 sm:py-24 bg-transparent relative overflow-hidden">
      <div className="container px-4 sm:px-6 mx-auto md:px-12 max-w-6xl relative z-10 space-y-16 sm:space-y-20">
        
        {/* ================= 1. EDUCATION (FOUNDATION ROOT) ================= */}
        <div id="education" className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-3.5"
          >
            <div className="p-2.5 bg-[#1351AA]/10 text-[#1351AA] rounded-xl border border-[#1351AA]/20 shadow-xs">
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Education</h2>
              <p className="text-[#0F172A]/70 text-xs sm:text-sm">
                Academic foundation and core curriculum in Software Engineering
              </p>
            </div>
          </motion.div>

          <div className="relative">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-[#0F172A]/15 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Top Row: Logo UPI + Badges */}
                <div className="flex items-start gap-4 mb-3">
                  {/* UPI Rounded Logo */}
                  <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-[#0F172A]/15 bg-white shadow-sm flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src="/icons/upi.png"
                      alt="Universitas Pendidikan Indonesia"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#0F172A]/70 font-medium px-3 py-0.5 bg-[#0F172A]/5 rounded-full border border-[#0F172A]/10 w-fit">
                        <Calendar size={13} />
                        {edu.period}
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#F59E0B] text-[#0F172A] border border-[#F59E0B] rounded-full text-xs font-bold shadow-xs w-fit">
                        <Award size={14} />
                        GPA: {edu.gpa}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-0.5">
                      {edu.degree}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-primary/80">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-2.5">
                    <BookOpen size={14} />
                    <span>Relevant Coursework</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {edu.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium rounded-lg border border-primary/15 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Circuit cable dropping down from Education into timeline */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="w-[2px] h-10 bg-linear-to-b from-primary/30 to-primary relative overflow-hidden">
                <motion.div
                  className="w-full h-5 bg-white"
                  animate={{ y: [-8, 40] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-xs">
                <Layers size={12} />
                <span>Interconnected Pipeline</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. INTERCONNECTED EXPERIENCE PIPELINE ================= */}
        <div>
          {/* Header with Navigation Buttons */}
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex p-2.5 bg-[#1351AA]/10 text-[#1351AA] rounded-xl border border-[#1351AA]/20 shadow-xs mb-2">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Experience & Projects</h2>
              <p className="text-[#0F172A]/70 text-xs sm:text-sm mt-0.5">
                Automatically running pipeline — hover to pause, or drag / scroll to explore freely
              </p>
            </div>

            {/* Manual Navigation Controls (Left / Right Buttons) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollManual('left')}
                aria-label="Scroll left"
                className="p-2 sm:p-2.5 rounded-full border border-[#0F172A]/20 bg-white text-[#0F172A] hover:bg-[#1351AA] hover:text-white shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollManual('right')}
                aria-label="Scroll right"
                className="p-2 sm:p-2.5 rounded-full border border-[#0F172A]/20 bg-white text-[#0F172A] hover:bg-[#1351AA] hover:text-white shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Connected Pipeline Track with Edge Fade Gradients */}
          <div className="relative overflow-hidden w-full rounded-3xl py-2">
            {/* Shared SVG Defs for all circuit bridges (Zero CPU overhead, single GPU gradient) */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient
                  id="experience-wire-pulse"
                  x1="0"
                  y1="12"
                  x2="48"
                  y2="12"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="var(--color-primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>

            {/* Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#E8E8E8] to-transparent pointer-events-none z-30" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#E8E8E8] to-transparent pointer-events-none z-30" />

            {/* Continuous Running & Fully Draggable Track */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onWheel={markUserInteraction}
              onMouseEnter={() => {
                isHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                setActiveCardId(null);
              }}
              style={{ scrollBehavior: 'auto' }}
              className={cn(
                "relative w-full py-6 overflow-x-auto overflow-y-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
            >
              {/* Linked Card Train with Interconnecting Circuit Cables */}
              <div className="flex items-center whitespace-normal px-4" style={{ width: 'max-content' }}>
                {loopExperiences.map((exp, index) => {
                  const uniqueKey = `${exp.id}-${index}`;
                  const isActive = activeCardId === uniqueKey;

                  return (
                    <div key={uniqueKey} className="flex items-center">
                      {/* Experience Card */}
                      <div
                        onMouseEnter={() => setActiveCardId(uniqueKey)}
                        className="relative flex-shrink-0 w-[84vw] sm:w-[350px] md:w-[380px] flex flex-col group select-none"
                      >
                        {/* Left Cable Input Port */}
                        <div
                          className={cn(
                            "absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center z-20 shadow-xs transition-all duration-200 pointer-events-none",
                            isActive ? "border-primary ring-2 ring-primary/30 scale-110" : "border-primary/40"
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-primary" : "bg-primary/50")} />
                        </div>

                        {/* Right Cable Output Port */}
                        <div
                          className={cn(
                            "absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center z-20 shadow-xs transition-all duration-200 pointer-events-none",
                            isActive ? "border-primary ring-2 ring-primary/30 scale-110" : "border-primary/40"
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-primary" : "bg-primary/50")} />
                        </div>

                        {/* Card Content (Crisp GPU-friendly background, zero layout thrashing) */}
                        <div
                          className={cn(
                            "h-full min-h-[250px] bg-white rounded-2xl border p-5 shadow-xs transition-all duration-200 flex flex-col justify-between",
                            isActive
                              ? "border-[#1351AA]/50 ring-2 ring-[#1351AA]/20 shadow-lg shadow-[#1351AA]/5 -translate-y-1"
                              : "border-[#0F172A]/15 hover:border-[#1351AA]/30"
                          )}
                        >
                          <div>
                            {/* Header Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0F172A]/75 px-2.5 py-0.5 bg-[#0F172A]/5 rounded-full border border-[#0F172A]/15">
                                <Calendar size={12} />
                                {exp.period}
                              </span>
                              <span className="inline-block px-2.5 py-0.5 bg-[#1351AA]/10 text-[#1351AA] border border-[#1351AA]/20 rounded-full text-[11px] font-bold">
                                {exp.category}
                              </span>
                            </div>

                            {/* Title & Organization — with HIMA RPL Logo if applicable */}
                            <div className="flex items-start gap-3 mb-3">
                              {exp.id === 'hima' && (
                                <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[#0F172A]/15 bg-white shadow-xs flex items-center justify-center p-1 overflow-hidden">
                                  <img
                                    src="/icons/himarpl.png"
                                    alt="HIMA RPL UPI"
                                    className="w-full h-full object-contain pointer-events-none"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-bold text-primary mb-0.5 leading-snug">
                                  {exp.role}
                                </h3>
                                <p className="text-xs font-semibold text-primary/70">
                                  {exp.organization}
                                </p>
                              </div>
                            </div>

                            {/* Bullet Points */}
                            <ul className="space-y-1.5">
                              {exp.points.map((point, i) => (
                                <li
                                  key={i}
                                  className="text-primary/80 text-xs sm:text-[13px] leading-relaxed flex items-start gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Physical Circuit Cable Bridge with glowing pulse connecting this card to next card */}
                      <CircuitBridge index={index} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes circuit-pulse-flow {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: -48;
          }
        }
        .circuit-pulse-beam {
          stroke-dasharray: 14 34;
          animation: circuit-pulse-flow 1.5s linear infinite;
          will-change: stroke-dashoffset;
        }
      `}</style>
    </section>
  );
}
