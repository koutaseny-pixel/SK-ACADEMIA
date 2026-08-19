"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  index?: number; // New prop for staggered animations
}

export default function ScrollReveal({ 
  children, 
  width = "100%", 
  className = "", 
  delay = 0,
  direction = "up",
  index = 0
}: ScrollRevealProps) {
  const ref = useRef(null);
  const effectiveDelay = delay + (index * 0.15); // CinetPay style staggered delay
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } };
    }
  };

  return (
    <div ref={ref} style={{ width }} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20, 
          mass: 1,
          bounce: 0.25,
          delay: effectiveDelay 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
