import { motion } from 'motion/react';
import { Database, Code2, Layers, Cpu, Layout, Users } from 'lucide-react';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

const features = [
  {
    Icon: Code2,
    name: "Full-Stack Web Development",
    description:
      "Building responsive, data-driven web applications from dynamic UI components to secure backend APIs and relational databases.",
    href: "#projects",
    cta: "Lihat Proyek Terkait",
    tag: "Flagship",
    className: "lg:col-span-1 lg:row-span-2",
  },
  {
    Icon: Database,
    name: "Database & Data Modeling",
    description:
      "Designing normalized relational schemas, query indexation, and real-time data flows using MySQL and Supabase.",
    href: "#projects",
    cta: "Lihat Proyek Terkait",
    tag: "Relational",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Cpu,
    name: "Object-Oriented Programming",
    description:
      "Developing structured, modular software adhering to SOLID principles, design patterns, and clean code standards.",
    href: "#projects",
    cta: "Lihat Proyek Terkait",
    tag: "SOLID",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Layers,
    name: "Data Analytics & Processing",
    description:
      "Extracting actionable insights, exploratory data processing, and statistical pipeline automation using Python & Pandas.",
    href: "#projects",
    cta: "Lihat Proyek Terkait",
    tag: "Analytics",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Layout,
    name: "UI/UX Design & Prototyping",
    description:
      "Crafting intuitive user interfaces, cohesive design systems, and rapid high-fidelity interactive wireframes in Figma.",
    href: "#projects",
    cta: "Lihat Proyek Terkait",
    tag: "Design",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: Users,
    name: "Cross-Functional Collaboration & Git Workflow",
    description:
      "Working effectively across agile sprint teams, code reviews, Git branching strategies, and continuous integration pipelines.",
    href: "#projects",
    cta: "Lihat Proyek Terkait",
    tag: "Team & DevOps",
    className: "lg:col-span-3 lg:row-span-1",
  },
];

export default function Expertise() {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      <div className="container relative px-4 sm:px-6 mx-auto md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 mb-3 text-xs sm:text-sm font-semibold tracking-wide rounded-full border border-white/25 bg-white/10 text-white">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E8E8E8] tracking-tight mb-3">
            Area of Expertise
          </h2>
          <p className="text-base sm:text-lg text-[#E8E8E8]/80 max-w-2xl mx-auto leading-relaxed">
            Combining engineering principles with modern frameworks to architect robust, scalable, and user-centric systems.
          </p>
        </motion.div>

        {/* Magic UI Bento Grid Showcase */}
        <BentoGrid className="lg:grid-rows-3">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
