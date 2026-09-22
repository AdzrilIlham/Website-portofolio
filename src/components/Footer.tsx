import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-dismiss success notification after 7 seconds
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (status === 'error') {
      setStatus('idle');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Immediately blur active input to dismiss virtual keyboard and prevent mobile zoom shifts
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setStatus('loading');
    setErrorMessage('');

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '3e2eda37-04a4-4e51-98f7-95d64efb3b0a';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Pesan Baru dari Website Portofolio',
          message: formData.message,
          from_name: formData.name,
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(
          result.message || 'Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.'
        );
      }
    } catch (error) {
      console.error('Web3Forms submit error:', error);
      setStatus('error');
      setErrorMessage(
        'Terjadi kendala jaringan saat mengirim pesan. Silakan periksa koneksi Anda atau hubungi via adzril774@gmail.com.'
      );
    }
  };

  return (
    <footer id="footer" className="bg-transparent text-[#E8E8E8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>

      <div className="container px-6 pt-24 pb-12 mx-auto md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 items-start">
          {/* Left Column: Let's Connect Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#E8E8E8]">Let's Connect</h2>
              <p className="text-[#E8E8E8]/75 max-w-md leading-relaxed">
                I am currently seeking an internship opportunity to deliver impactful, scalable technical solutions. Feel free to reach out.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E8E8E8]/70">Contact Info</h3>
              <a 
                href="mailto:adzril774@gmail.com" 
                className="flex items-center gap-4 text-[#E8E8E8]/85 hover:text-white transition-colors group w-fit"
              >
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E8E8E8] group-hover:text-[#1351AA] transition-colors">
                  <Mail size={20} />
                </div>
                adzril774@gmail.com
              </a>
              <div className="flex items-center gap-4 text-[#E8E8E8]/85 group">
                <div className="p-3 bg-white/10 rounded-xl">
                  <MapPin size={20} />
                </div>
                Bekasi, West Java, 17610
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E8E8E8]/70 mb-3">Social Profiles</h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/AdzrilIlham"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#E8E8E8] hover:text-[#1351AA] transition-all text-[#E8E8E8] hover:scale-105"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adzril-ilham/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#E8E8E8] hover:text-[#0A66C2] transition-all text-[#E8E8E8] hover:scale-105"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/adzlhrn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#E8E8E8] hover:text-[#E4405F] transition-all text-[#E8E8E8] hover:scale-105"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xs shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-[#E8E8E8]">Send a Message</h3>

              {/* Simple Neutral Blur Notification Banner (No Color, Single Banner) */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success-banner"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-[#E8E8E8] flex items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 size={20} className="text-white shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Pesan Berhasil Terkirim
                        </p>
                        <p className="text-xs text-[#E8E8E8]/80 mt-0.5">
                          Terima kasih sudah menghubungi saya, pesan Anda akan segera saya balas.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="p-1.5 text-[#E8E8E8]/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                      aria-label="Tutup notifikasi"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error-banner"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mb-6 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-[#E8E8E8] flex items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <AlertCircle size={20} className="text-white shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Gagal Mengirim Pesan
                        </p>
                        <p className="text-xs text-[#E8E8E8]/80 mt-0.5">
                          {errorMessage || 'Silakan coba lagi beberapa saat lagi.'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="p-1.5 text-[#E8E8E8]/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                      aria-label="Tutup notifikasi"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Spam Protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#E8E8E8]/80 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-base sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#E8E8E8]/80 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-base sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-[#E8E8E8]/80 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#E8E8E8]/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-base sm:text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 rounded-xl bg-[#E8E8E8] text-[#1351AA] font-bold text-sm sm:text-base hover:bg-white hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#E8E8E8]"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#E8E8E8]/60"
        >
          <p>© {new Date().getFullYear()} Adzril Ilham Ramadhan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed & Built with React & Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
