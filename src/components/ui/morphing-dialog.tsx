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
    id: "laporjurnal",
    title: "LaporJurnal",
    tag: "Python & Streamlit",
    image: "/LP1.png",
    description:
      "Platform sistem informasi berbasis Python untuk mengidentifikasi, melaporkan, serta menelaah indikasi praktik jurnal ilmiah predator dan jurnal kloning (hijacked journal) melalui Web GUI Modern dan Interactive CLI.",
    technologies: [
      "Python 3.12",
      "Streamlit",
      "Interactive CLI",
      "SOA Architecture",
      "PBKDF2-HMAC-SHA256",
      "Atomic CSV Storage",
      "Unit Testing",
    ],
    features: [
      "Dual Interface Terpadu: Web GUI Modern (Streamlit) responsif dengan Dark/Light Mode dan Interactive CLI berbasis shell cepat.",
      "Multi-Role Ecosystem: Akses komprehensif bagi Publik/Tamu, Pengguna (User), Validator/Kurator Akademik, dan Administrator.",
      "Pencarian Cerdas & Verifikasi: Normalisasi URL otomatis (protokol, domain, trailing slash) dan pencarian instan nama jurnal.",
      "Service-Oriented Architecture (SOA): JournalService terpusat sebagai single source of truth antara GUI dan CLI.",
      "Data Concurrency & Resilience: Atomic write (tempfile + os.replace) dan cross-process file locking (fcntl) guna mencegah kerusakan data.",
      "Keamanan Kredensial Standar Industri: PBKDF2-HMAC-SHA256 (100.000 iterasi) dengan random salt 16-byte dan auto-upgrade hash.",
    ],
    screenshots: [
      {
        title: "Dasbor Administrator: Ringkasan Analitik & Metrik Sistem",
        badge: "Admin",
        image: "/LP2.png",
      },
      {
        title: "Dasbor Administrator: Manajemen Seluruh Berkas Laporan Jurnal",
        badge: "Admin",
        image: "/LP3.png",
      },
      {
        title: "Dasbor Validator: Antrean Klaim Berkas Laporan Jurnal Masuk",
        badge: "Validator",
        image: "/LP4.png",
      },
      {
        title: "Dasbor Validator: Antarmuka Evaluasi & Kurasi Integritas Ilmiah",
        badge: "Validator",
        image: "/LP5.png",
      },
      {
        title: "Dasbor Pengguna: Pelacakan Status Riwayat Laporan Saya",
        badge: "User",
        image: "/LP6.png",
      },
      {
        title: "Dasbor Pengguna: Formulir Pengajuan Laporan Jurnal (Opsi Anonim)",
        badge: "User",
        image: "/LP7.png",
      },
    ],
    githubUrl: "https://github.com/AdzrilIlham/LaporJurnal",
    demoUrl: "#",
  },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
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
            className="group relative flex flex-col text-left cursor-pointer bg-white border border-slate-200/80 hover:border-white transition-all duration-300 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1.5 active:scale-[0.98] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            {/* Image Preview Container (No Crop - Object Contain with Clean Backdrop) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center p-2 sm:p-2.5">
              <motion.div
                layoutId={`image-wrap-${item.id}`}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  alt={item.title}
                  src={item.image}
                  draggable={false}
                  className="h-full w-full object-contain object-center pointer-events-none select-none group-hover:scale-[1.02] transition-transform duration-500"
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
            <div className="flex flex-1 p-5 sm:p-6 justify-between items-center gap-4 bg-white border-t border-slate-100 pointer-events-none">
              <div className="min-w-0 w-full">
                <motion.h3
                  className="text-lg sm:text-xl font-bold text-[#0F172A] truncate group-hover:text-[#1351AA] transition-colors"
                  layoutId={`title-${item.id}`}
                >
                  {item.title}
                </motion.h3>
                <p className="text-xs sm:text-sm text-[#0F172A]/70 line-clamp-2 mt-1.5 leading-relaxed">
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
                  className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-white border border-slate-200 text-[#0F172A] shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header Image (Full View - Never Cropped) */}
                  <div className="relative w-full aspect-[16/10] max-h-[460px] shrink-0 overflow-hidden bg-slate-950 flex items-center justify-center p-3 sm:p-4">
                    <motion.div
                      layoutId={`image-wrap-${activeItem.id}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        alt={activeItem.title}
                        src={activeItem.image}
                        draggable={false}
                        className="h-full w-full object-contain object-center select-none"
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
                      className="absolute right-4 top-4 z-20 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-90"
                    >
                      <X size={20} strokeWidth={2.5} />
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
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight"
                      >
                        {activeItem.title}
                      </motion.h2>
                      <p className="mt-2.5 text-base sm:text-lg text-[#0F172A]/80 leading-relaxed">
                        {activeItem.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1351AA] mb-2.5">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-[#0F172A] border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1351AA] mb-3">
                        Key Highlights & Architecture
                      </h4>
                      <div className="grid gap-2.5">
                        {activeItem.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#0F172A]/90 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 mt-2" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Screenshot Gallery Preview */}
                    {activeItem.screenshots && activeItem.screenshots.length > 0 && (
                      <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1351AA]">
                          Tampilan Antarmuka
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeItem.screenshots.map((screen, idx) => (
                            <div
                              key={idx}
                              className="group/screen relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col shadow-sm"
                            >
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 flex items-center justify-center p-1.5 sm:p-2">
                                <img
                                  src={screen.image}
                                  alt={screen.title}
                                  className="w-full h-full object-contain object-center group-hover/screen:scale-[1.02] transition-transform duration-500"
                                />
                                <div className="absolute top-2.5 left-2.5">
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F59E0B] text-[#0F172A] shadow-md border border-[#F59E0B]/40">
                                    {screen.badge}
                                  </span>
                                </div>
                              </div>
                              <div className="p-3 bg-white border-t border-slate-100">
                                <p className="text-xs font-semibold text-[#0F172A] truncate">
                                  {screen.title}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-200">
                      {activeItem.githubUrl && (
                        <a
                          href={activeItem.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold bg-slate-100 hover:bg-slate-200 text-[#0F172A] border border-slate-300 transition-colors cursor-pointer"
                        >
                          <GithubIcon className="w-4 h-4" /> View Source Code
                        </a>
                      )}
                      {activeItem.demoUrl && activeItem.demoUrl !== "#" && (
                        <a
                          href={activeItem.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold bg-[#1351AA] hover:bg-[#0e3b7c] text-white transition-colors cursor-pointer shadow-md"
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
