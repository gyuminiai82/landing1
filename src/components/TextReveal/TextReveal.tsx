import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  delay = 0
}) => {
  // Split by space, keeping words intact
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.12, 
        delayChildren: delay 
      }
    }
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(12px)',
      rotateX: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 100,
      }
    }
  };

  return (
    <motion.span
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em', perspective: 1000 }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
