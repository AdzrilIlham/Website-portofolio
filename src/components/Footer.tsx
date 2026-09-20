import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Network, Code, Send } from 'lucide-react';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:adzril774@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
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
                  <Code size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/adzril-ilham/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#E8E8E8] hover:text-[#1351AA] transition-all text-[#E8E8E8] hover:scale-105"
                >
                  <Network size={18} />
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
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-sm"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[#E8E8E8] placeholder-white/40 focus:outline-hidden focus:border-white focus:ring-1 focus:ring-white transition-all text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E8E8E8] text-[#1351AA] font-bold text-sm hover:bg-white hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send size={16} />
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
