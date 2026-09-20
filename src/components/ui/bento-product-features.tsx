"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Animation variants for each grid item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    },
  },
};

/**
 * Props for the BentoGridShowcase component.
 * Each prop represents a "slot" in the grid.
 */
export interface BentoGridShowcaseProps {
  /** Slot for the tall card (Spans 3 rows on md) */
  integration: React.ReactNode;
  /** Slot for top-middle card */
  trackers: React.ReactNode;
  /** Slot for top-right card */
  statistic: React.ReactNode;
  /** Slot for middle-middle card */
  focus: React.ReactNode;
  /** Slot for middle-right card */
  productivity: React.ReactNode;
  /** Slot for the wide bottom card (Spans 2 cols on md) */
  shortcuts: React.ReactNode;
  /** Optional class names for the grid container */
  className?: string;
}

/**
 * A responsive, animated bento grid layout component.
 * It arranges six content slots in the specific layout.
 */
export const BentoGridShowcase = ({
  integration,
  trackers,
  statistic,
  focus,
  productivity,
  shortcuts,
  className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(
        // Core grid layout: 1 col on mobile, 3 on desktop
        "grid w-full grid-cols-1 gap-5 md:grid-cols-3",
        // Defines 3 explicit rows on medium screens and up
        "md:grid-rows-3",
        // Minimum height for slots
        "auto-rows-[minmax(180px,auto)]",
        className
      )}
    >
      {/* Slot 1: Tall Card (Spans 3 rows on desktop) */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3 h-full">
        {integration}
      </motion.div>

      {/* Slot 2: Top-middle Card */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 h-full">
        {trackers}
      </motion.div>

      {/* Slot 3: Top-right Card */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 h-full">
        {statistic}
      </motion.div>

      {/* Slot 4: Middle-middle Card */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 h-full">
        {focus}
      </motion.div>

      {/* Slot 5: Middle-right Card */}
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 h-full">
        {productivity}
      </motion.div>

      {/* Slot 6: Wide Bottom Card (Spans 2 cols on desktop) */}
      <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 h-full">
        {shortcuts}
      </motion.div>
    </motion.section>
  );
};

export default BentoGridShowcase;
