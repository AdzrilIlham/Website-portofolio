import { motion } from 'motion/react';
import { MorphingDialog } from './ui/morphing-dialog';

export default function Projects() {
  return (
    <section className="py-24 relative bg-transparent">
      <div className="container px-6 mx-auto md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-[#E8E8E8] mb-4">Featured Projects</h2>
          <p className="text-lg text-[#E8E8E8]/75 max-w-2xl leading-relaxed">
            A selection of my recent academic and personal projects that showcase my technical abilities and problem-solving approach. Click any card to explore the full case study.
          </p>
        </motion.div>

        <MorphingDialog />
      </div>
    </section>
  );
}
