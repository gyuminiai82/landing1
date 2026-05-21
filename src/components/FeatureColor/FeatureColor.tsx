import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import styles from './FeatureColor.module.css';
import projectionImg from '../../assets/images/projection.png';

const FeatureColor: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress across the 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Master progress motion value (0 to 100)
  const progress = useMotionValue(50); // Start at 50% on mobile

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      // Map 0.1 - 0.9 to 0 - 100
      const mapped = Math.max(0, Math.min(100, (latest - 0.1) * (100 / 0.8)));
      progress.set(mapped);
    }
  });
  
  // Apply a spring for a buttery-smooth following effect
  const smoothProgress = useSpring(progress, { stiffness: 100, damping: 20 });
  
  // Create dynamic CSS values based on the progress
  const clipPath = useTransform(smoothProgress, val => `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`);
  const thumbLeft = useTransform(smoothProgress, val => `${val}%`);

  const handleMobileSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMobile) {
      progress.set(Number(e.target.value));
    }
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
        <motion.div 
          className={styles.container}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.header}>
            <p className={styles.desc}>벽면의 색상과 재질을 실시간으로 분석하여<br/>투사되는 영상의 화이트 밸런스를 자동으로 교정합니다.</p>
          </div>
          
          <div className={styles.sliderMockup}>
            {/* Base Image: Uncorrected (Yellowish Wall) */}
            <div className={styles.imageBase}>
              <img src={projectionImg} alt="Uncorrected Projection" />
              <div className={styles.labelRight}>
                <span className="mono">보정 끄기</span>
              </div>
            </div>

            {/* Overlay Image: Corrected (True Colors) */}
            <motion.div 
              className={styles.imageOverlay} 
              style={{ clipPath }}
            >
              <img src={projectionImg} alt="Corrected Projection" />
              <div className={styles.labelLeft}>
                <span className="mono">AI 자동 보정 켬</span>
              </div>
            </motion.div>

            {/* Scroll-driven Slider Thumb */}
            <div className={styles.sliderControlWrapper}>
              <motion.div 
                className={styles.sliderThumbLine}
                style={{ left: thumbLeft }}
              >
                <div className={styles.sliderHandle}>
                  <ChevronsLeftRight size={16} color="#000" />
                </div>
              </motion.div>
            </div>

            {/* Invisible native range input for mobile interaction */}
            {isMobile && (
              <input 
                type="range" 
                min="0" max="100" 
                defaultValue="50"
                onChange={handleMobileSlider}
                className={styles.nativeRange}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureColor;
