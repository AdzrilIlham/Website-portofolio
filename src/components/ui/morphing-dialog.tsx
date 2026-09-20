"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export type ProjectItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  technologies: string[];
  features: string[];
  screenshots?: {
    title: string;
    badge: string;
    image: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
};

const PROJECTS: ProjectItem[] = [
  {
    id: "cleanwash",
    title: "CleanWash",
    tag: "Laravel & Tailwind",
    image: "/cleanwash.png",
    description:
      "Platform On-Demand Laundry Marketplace yang menghubungkan pelanggan dengan mitra jasa laundry lokal terpercaya secara real-time.",
    technologies: ["Laravel 11", "Tailwind CSS", "MySQL", "Midtrans Payment", "RESTful API"],
    features: [
      "Pemesanan penjemputan & pengantaran pakaian on-demand secara real-time.",
      "Sistem penimbangan digital terintegrasi dan kalkulasi harga otomatis.",
      "Pembayaran digital multi-channel yang aman dan transparan.",
      "Dashboard terpisah untuk pelanggan, mitra laundry, dan administrator.",
    ],
    screenshots: [
      {
        title: "Tampilan Dashboard Mitra Laundry",
        badge: "Mitra",
        image: "/cleanwash2.png",
      },
      {
        title: "Tampilan Dashboard Admin Sistem",
        badge: "Admin",
        image: "/cleanwash3.png",
      },
    ],
    githubUrl: "https://github.com/AdzrilIlham",
    demoUrl: "#",
  },
  {
    id: "smartparking",
    title: "Smart Parking System",
    tag: "OOP Desktop App",
    image: "/parking.png",
    description:
      "Interactive desktop parking management system utilizing core Object-Oriented Programming (OOP) principles for automated vehicle management.",
    technologies: ["Java", "OOP Architecture", "Swing GUI", "Design Patterns"],
    features: [
      "Simulasi pelacakan kapasitas slot parkir dinamis dan visualisasi layout.",
      "Kalkulasi tarif otomatis berbasis durasi menginap dan jenis kendaraan.",
      "Implementasi prinsip OOP murni: Encapsulation, Inheritance, dan Polymorphism.",
      "Pelaporan statistik okupansi harian dan manajemen tiket digital.",
    ],
    githubUrl: "https://github.com/AdzrilIlham",
    demoUrl: "#",
  },
  {
    id: "todoo",
    title: "ToDoo: Task App",
    tag: "Web App",
    image: "/todoo.png",
    description:
      "Aplikasi manajemen tugas produktivitas harian yang terstruktur, cepat, dan efisien dengan antarmuka minimalis dan state terorganisir.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Local Storage", "Framer Motion"],
    features: [
      "Manajemen tugas berbasis prioritas, kategori proyek, dan tenggat waktu.",
      "Filter cerdas dan pencarian instan tanpa lag.",
      "Penyimpanan lokal persisten untuk menjamin privasi data pengguna.",
      "Desain adaptif mobile-first yang sangat responsif dan ringan.",
    ],
    githubUrl: "https://github.com/AdzrilIlham",
    demoUrl: "#",
  },
];

export function MorphingDialog() {
  const [activeItem, setActiveItem] = useState<ProjectItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock & ESC key listener
  useEffect(() => {
    if (!activeItem) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <div className="w-full">
      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {PROJECTS.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveItem(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveItem(item);
              }
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="group relative flex flex-col text-left cursor-pointer bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 transition-all duration-300 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1.5 active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            {/* Image Preview Container */}
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black/20">
              <motion.div
                layoutId={`image-wrap-${item.id}`}
                className="w-full h-full"
              >
                <img
                  alt={item.title}
                  src={item.image}
                  draggable={false}
                  className="h-full w-full object-cover object-center pointer-events-none select-none group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              {/* Badge Tag */}
              <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B] text-[#0F172A] shadow-md border border-[#F59E0B]/40">
                  {item.tag}
                </span>
              </div>
            </div>

            {/* Card Footer Info */}
            <div className="flex flex-1 p-5 sm:p-6 justify-between items-center gap-4 bg-white/10 border-t border-white/15 pointer-events-none">
              <div className="min-w-0 w-full">
                <motion.h3
                  className="text-lg sm:text-xl font-bold text-[#E8E8E8] truncate group-hover:text-white transition-colors"
                  layoutId={`title-${item.id}`}
                >
                  {item.title}
                </motion.h3>
                <p className="text-xs sm:text-sm text-[#E8E8E8]/70 line-clamp-2 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Morphing Modal Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
                {/* Backdrop with smooth fade */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  onClick={() => setActiveItem(null)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
                />

                {/* Expanded Modal Card */}
                <motion.div
                  layoutId={`card-${activeItem.id}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-[#0F172A] border border-white/25 text-[#E8E8E8] shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header Image */}
                  <div className="relative h-60 sm:h-80 w-full shrink-0 overflow-hidden bg-slate-950">
                    <motion.div
                      layoutId={`image-wrap-${activeItem.id}`}
                      className="w-full h-full"
                    >
                      <img
                        alt={activeItem.title}
                        src={activeItem.image}
                        draggable={false}
                        className="h-full w-full object-cover object-center select-none"
                      />
                    </motion.div>

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#F59E0B] text-[#0F172A] shadow-lg border border-[#F59E0B]/40">
                        {activeItem.tag}
                      </span>
                    </div>

                    {/* Close Button (X) */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveItem(null);
                      }}
                      aria-label="Close modal"
                      className="absolute right-4 top-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-90"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </motion.button>
                  </div>

                  {/* Modal Scrollable Content — fades out cleanly during close so no content squishing */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-y-auto p-6 sm:p-8 space-y-6 text-left"
                  >
                    <div>
                      <motion.h2
                        layoutId={`title-${activeItem.id}`}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
                      >
                        {activeItem.title}
                      </motion.h2>
                      <p className="mt-2.5 text-base sm:text-lg text-[#E8E8E8]/80 leading-relaxed">
                        {activeItem.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-2.5">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-white/10 text-white border border-white/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B] mb-3">
                        Key Highlights & Architecture
                      </h4>
                      <div className="grid gap-2.5">
                        {activeItem.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#E8E8E8]/90 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Screenshot Gallery Preview (Khusus CleanWash: Mitra & Admin) */}
                    {activeItem.screenshots && activeItem.screenshots.length > 0 && (
                      <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                          Tampilan Antarmuka
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeItem.screenshots.map((screen, idx) => (
                            <div
                              key={idx}
                              className="group/screen relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/60 flex flex-col shadow-md"
                            >
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                                <img
                                  src={screen.image}
                                  alt={screen.title}
                                  className="w-full h-full object-cover object-center group-hover/screen:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2.5 left-2.5">
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F59E0B] text-[#0F172A] shadow-md border border-[#F59E0B]/40">
                                    {screen.badge}
                                  </span>
                                </div>
                              </div>
                              <div className="p-3 bg-white/5 border-t border-white/10">
                                <p className="text-xs font-semibold text-[#E8E8E8] truncate">
                                  {screen.title}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="pt-4 flex flex-wrap gap-3 border-t border-white/15">
                      {activeItem.githubUrl && (
                        <a
                          href={activeItem.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
                        >
                          <GithubIcon className="w-4 h-4" /> View Source Code
                        </a>
                      )}
                      {activeItem.demoUrl && activeItem.demoUrl !== "#" && (
                        <a
                          href={activeItem.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#1351AA] hover:bg-[#0e3b7c] text-white transition-colors cursor-pointer shadow-md"
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default MorphingDialog;
