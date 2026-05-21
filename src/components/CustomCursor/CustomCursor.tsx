import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import styles from './CustomCursor.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  color: string;
}

const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = (x: number, y: number, isHover: boolean) => {
      // Cyber Mint (157deg) with slight variations
      const hue = 157 + (Math.random() * 30 - 15);
      const color = `hsla(${hue}, 100%, 50%, `; // Alpha will be appended during drawing
      
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (isHover ? 8 : 2), // More explosion on hover
        vy: (Math.random() - 0.5) * (isHover ? 8 : 2),
        size: Math.random() * (isHover ? 5 : 2.5) + 1,
        life: 1,
        color
      });
    };

    const updateAndDraw = () => {
      // Clear canvas with a slight trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; // Fade out speed
        p.size *= 0.96; // Shrink speed

        if (p.life > 0 && p.size > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.life + ')';
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color + '1)';
          ctx.fill();
        }
      }

      // Remove dead particles
      particles = particles.filter(p => p.life > 0 && p.size > 0.1);
      
      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isOverInteractive = !!(target.closest('button') || target.closest('a'));
      
      // Spawn particles
      const count = isOverInteractive ? 4 : 2;
      for(let i = 0; i < count; i++) {
        createParticle(e.clientX, e.clientY, isOverInteractive);
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Spawn a burst of particles on click
    const handleMouseClick = (e: MouseEvent) => {
      for(let i = 0; i < 15; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleMouseClick);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Canvas for Particle Trail */}
      <canvas 
        ref={canvasRef} 
        className={styles.particleCanvas} 
      />
      
      {/* The Core Dot */}
      <motion.div
        className={styles.cursorDot}
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovering ? 3 : 1,
          backgroundColor: isHovering ? 'rgba(0, 255, 157, 0.1)' : 'rgba(0, 255, 157, 1)',
          border: isHovering ? '1px solid rgba(0, 255, 157, 0.8)' : '0px solid transparent'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
