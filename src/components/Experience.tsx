import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  Award,
  Eye,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  period: string;
  category: string;
  image: string;
  skills: string[];
  credentialId?: string;
}

const certificates: Certificate[] = [
  {
    id: 'uiux-unissula',
    title: 'Finalis Perlombaan UI/UX',
    issuer: 'HIMA Teknik Informatika UNISSULA',
    period: 'Juli 2025',
    category: 'Competition',
    image: '/certificates/cert-uiux-unissula.webp',
    skills: ['UI/UX Design', 'Design Thinking', 'User Research', 'Figma Prototyping'],
    credentialId: '59/PESERTA/INFORMATICS EVENT/HM-TIF/FTI/SA/VII/2025',
  },
  {
    id: 'java-oop',
    title: 'Java for Object Oriented Programming',
    issuer: 'Wajar.id & Universitas Pendidikan Indonesia (UPI)',
    period: 'Desember 2024',
    category: 'OOP & Java',
    image: '/certificates/cert-java-oop.webp',
    skills: ['Java', 'OOP Architecture', 'SOLID Principles', 'Design Patterns'],
  },
  {
    id: 'backend-myskill',
    title: 'Backend Development Fundamental',
    issuer: 'MySkill Short Class',
    period: 'September 2024',
    category: 'Backend',
    image: '/certificates/cert-backend-myskill.webp',
    skills: ['Backend Architecture', 'RESTful API', 'Server Logic', 'Database Design'],
    credentialId: '186940/WEB/LM/09/2024',
  },
  {
    id: 'algo-ruangkoding',
    title: 'Algoritma Pemrograman Course',
    issuer: 'Ruang Koding',
    period: '2024',
    category: 'Algorithms',
    image: '/certificates/cert-algo-ruangkoding.webp',
    skills: ['Algorithms', 'Logic & Flow', 'Data Structures', 'Problem Solving'],
  },
];

const education = [
  {
    degree: 'Undergraduate in Software Engineering (Rekayasa Perangkat Lunak)',
    institution: 'Universitas Pendidikan Indonesia (UPI)',
    period: 'Nov 2024 - 2028',
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
    role: 'LaporJurnal — Scientific Journal Integrity Platform',
    organization: 'Python & Service-Oriented Architecture (SOA)',
    category: 'Python & SOA',
    period: '2025',
    year: '2025',
    points: [
      'Developed LaporJurnal to detect and report predatory and hijacked academic journals with dual interface (Streamlit GUI & CLI).',
      'Engineered resilient data layer with atomic writes and cross-process file locking for concurrent CSV data integrity.',
      'Implemented Service-Oriented Architecture (SOA) and robust security with PBKDF2-HMAC-SHA256 password hashing.',
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

// Pushpin SVG Icon (How-It-Works visual style)
const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

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
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Body scroll lock & ESC key listener for certificate modal
  useEffect(() => {
    if (!selectedCert) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedCert]);

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

            {/* ================= LICENSES & CERTIFICATIONS ================= */}
            <div className="mt-12">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-[#1351AA]/10 text-[#1351AA] rounded-xl border border-[#1351AA]/20 shadow-xs">
                    <Award size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Licenses & Certifications</h2>
                    <p className="text-[#0F172A]/70 text-xs sm:text-sm">
                      Verified credentials, achievements, and technical specializations
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#1351AA]/10 text-[#1351AA] text-xs font-bold rounded-full border border-[#1351AA]/20">
                  <Sparkles size={13} />
                  {certificates.length} Verified Credentials
                </span>
              </motion.div>

              {/* 2-Column Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedCert(cert)}
                    className="group bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-[#1351AA]/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Certificate Thumbnail Preview Container */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100/90 border border-slate-200/90 mb-4 flex items-center justify-center p-2.5">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 pointer-events-none select-none"
                          loading="lazy"
                        />
                        {/* Hover Overlay with Eye Icon */}
                        <div className="absolute inset-0 bg-[#0F172A]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1351AA] text-xs font-bold shadow-lg">
                            <Eye size={15} />
                            Preview Certificate
                          </span>
                        </div>
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1351AA] text-white shadow-xs">
                            {cert.category}
                          </span>
                        </div>
                      </div>

                      {/* Header: Issuer + Period */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-xs font-semibold text-[#1351AA] uppercase tracking-wider truncate">
                          {cert.issuer}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium shrink-0">
                          <Calendar size={13} />
                          {cert.period}
                        </span>
                      </div>

                      {/* Certificate Title */}
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1351AA] transition-colors leading-snug mb-3">
                        {cert.title}
                      </h3>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200/80"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Action button */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-500 truncate font-medium">
                        {cert.credentialId ? `ID: ${cert.credentialId}` : 'Verified Credential'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#1351AA] group-hover:translate-x-0.5 transition-transform shrink-0">
                        View Certificate
                        <Eye size={14} />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

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
                className="p-2.5 sm:p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full border border-[#0F172A]/20 bg-white text-[#0F172A] hover:bg-[#1351AA] hover:text-white shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollManual('right')}
                aria-label="Scroll right"
                className="p-2.5 sm:p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full border border-[#0F172A]/20 bg-white text-[#0F172A] hover:bg-[#1351AA] hover:text-white shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight size={18} />
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
                      {/* Experience Card with Pinned How-It-Works Visual Style */}
                      <div
                        onMouseEnter={() => setActiveCardId(uniqueKey)}
                        className={cn(
                          "relative flex-shrink-0 w-[84vw] sm:w-[350px] md:w-[380px] flex flex-col group select-none transition-transform duration-300",
                          "rotate-0",
                          "hover:scale-[1.02]"
                        )}
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

                        {/* Outer White Card Frame with Pushpin */}
                        <div
                          className={cn(
                            "p-2.5 rounded-[26px] bg-white border shadow-md transition-all duration-300",
                            isActive
                              ? "border-[#1351AA]/50 shadow-xl shadow-[#1351AA]/10"
                              : "border-slate-200/90 hover:border-[#1351AA]/30"
                          )}
                        >
                          {/* Centered Pushpin */}
                          <Pin
                            className={cn(
                              "w-6 h-6 mx-auto mb-2 transition-colors duration-200",
                              isActive ? "text-[#F59E0B]" : "text-[#1351AA]"
                            )}
                          />

                          {/* Inner Container Card */}
                          <div className="bg-slate-50/90 rounded-[18px] p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between min-h-[260px]">
                            <div>
                              {/* Header: Milestone Number + Badges */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1351AA]">
                                  {String((index % experiences.length) + 1).padStart(2, '0')}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F172A]/75 px-2.5 py-0.5 bg-white rounded-full border border-slate-200 shadow-xs">
                                    <Calendar size={11} />
                                    {exp.period}
                                  </span>
                                  <span className="inline-block px-2.5 py-0.5 bg-[#1351AA]/10 text-[#1351AA] border border-[#1351AA]/20 rounded-full text-[11px] font-bold">
                                    {exp.category}
                                  </span>
                                </div>
                              </div>

                              {/* Title & Organization with Logo */}
                              <div className="flex items-start gap-3 mb-3">
                                {exp.id === 'hima' && (
                                  <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white shadow-xs flex items-center justify-center p-1 overflow-hidden">
                                    <img
                                      src="/icons/himarpl.png"
                                      alt="HIMA RPL UPI"
                                      className="w-full h-full object-contain pointer-events-none"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-0.5 leading-snug">
                                    {exp.role}
                                  </h3>
                                  <p className="text-xs font-semibold text-[#1351AA]">
                                    {exp.organization}
                                  </p>
                                </div>
                              </div>

                              {/* Bullet Points */}
                              <ul className="space-y-1.5 pt-2 border-t border-slate-200/60">
                                {exp.points.map((point, i) => (
                                  <li
                                    key={i}
                                    className="text-[#0F172A]/80 text-xs sm:text-[13px] leading-relaxed flex items-start gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
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

      {/* Certificate Lightbox / Fullscreen Modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedCert && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedCert(null)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="relative z-10 w-full max-w-4xl max-h-[94vh] flex flex-col rounded-3xl bg-white border border-slate-200 text-[#0F172A] shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="shrink-0 flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-white">
                    <div className="min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#1351AA]/10 text-[#1351AA] border border-[#1351AA]/20">
                          {selectedCert.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar size={13} />
                          {selectedCert.period}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-xl font-bold text-[#0F172A] truncate">
                        {selectedCert.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={selectedCert.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                        title="Buka gambar sertifikat resolusi penuh di tab baru"
                      >
                        <ExternalLink size={14} />
                        <span className="hidden sm:inline">Buka Full</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedCert(null)}
                        aria-label="Tutup modal sertifikat"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Modal Image Body (Full View, Non-Cropped Guaranteed) */}
                  <div className="flex-1 w-full min-h-0 overflow-y-auto bg-slate-900/95 p-3 sm:p-6 flex items-center justify-center">
                    <div className="relative max-w-full flex items-center justify-center">
                      <img
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        className="max-w-full max-h-[66vh] sm:max-h-[72vh] w-auto h-auto object-contain rounded-xl shadow-2xl select-none mx-auto block"
                        style={{
                          maxHeight: 'min(72vh, 760px)',
                          maxWidth: '100%',
                          width: 'auto',
                          height: 'auto',
                        }}
                      />
                    </div>
                  </div>

                  {/* Modal Footer Info */}
                  <div className="shrink-0 px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="font-bold text-[#1351AA]">{selectedCert.issuer}</p>
                      {selectedCert.credentialId && (
                        <p className="text-slate-500 text-xs mt-0.5">
                          Nomor Sertifikat: {selectedCert.credentialId}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

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
