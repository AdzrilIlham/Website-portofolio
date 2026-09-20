import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Network, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent text-[#E8E8E8] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>

      <div className="container px-6 pt-24 pb-12 mx-auto md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-[#E8E8E8]">Let's Connect</h2>
            <p className="text-[#E8E8E8]/75 mb-8 max-w-sm leading-relaxed">
              I am currently seeking an internship opportunity to deliver impactful, scalable technical solutions. Feel free to reach out.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8E8E8] hover:text-[#1351AA] transition-colors text-[#E8E8E8]">
                <Network size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E8E8E8] hover:text-[#1351AA] transition-colors text-[#E8E8E8]">
                <Code size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col sm:flex-row gap-8 lg:justify-end"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-[#E8E8E8]">Contact Info</h3>
              <a href="mailto:adzril774@gmail.com" className="flex items-center gap-4 text-[#E8E8E8]/80 hover:text-white transition-colors group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E8E8E8] group-hover:text-[#1351AA] transition-colors">
                  <Mail size={20} />
                </div>
                adzril774@gmail.com
              </a>
              <a href="tel:+6282114327524" className="flex items-center gap-4 text-[#E8E8E8]/80 hover:text-white transition-colors group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E8E8E8] group-hover:text-[#1351AA] transition-colors">
                  <Phone size={20} />
                </div>
                +62 821-1432-7524
              </a>
              <div className="flex items-center gap-4 text-[#E8E8E8]/80 group">
                <div className="p-3 bg-white/10 rounded-xl">
                  <MapPin size={20} />
                </div>
                Bekasi, West Java, 17610
              </div>
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
