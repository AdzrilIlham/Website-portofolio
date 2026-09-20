import { motion } from 'motion/react';
import IntegrationCardDemo from '@/components/ui/integration-card';

export default function Skills() {
  return (
    <section className="relative py-20 lg:py-24 bg-transparent overflow-hidden flex flex-col justify-center min-h-screen">
      <div className="container relative px-4 sm:px-6 mx-auto md:px-12 flex flex-col items-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-4"
        >
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold tracking-wide rounded-full border border-[#1351AA]/25 bg-[#1351AA]/10 text-[#1351AA]">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1351AA]">
            Tools & Technologies
          </h2>
          <p className="mt-2.5 text-sm sm:text-base md:text-lg text-[#0F172A]/80 leading-relaxed">
            A comprehensive view of the programming languages, frameworks, and modern tools I use to engineer scalable systems.
          </p>
        </motion.div>

        <IntegrationCardDemo />
      </div>
    </section>
  );
}
