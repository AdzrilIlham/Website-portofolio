import { motion } from 'motion/react';
import { MorphingDialog } from './ui/morphing-dialog';

export default function Projects() {
  return (
    <section className="py-24 relative bg-transparent">
      <div className="container px-6 mx-auto md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-[#E8E8E8] mb-4">Featured Projects</h2>
          <p className="text-lg text-[#E8E8E8]/75 max-w-2xl">
            A selection of my recent academic and personal projects that showcase my technical abilities and problem-solving approach. Click any card to explore the full case study.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MorphingDialog />
        </motion.div>
      </div>
    </section>
  );
}
