import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import styles from './FeatureColor.module.css';

const FeatureColor: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress across the 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (10% to 90% of the section) to 0-100% width
  const rawProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);
  
  // Apply a spring for a buttery-smooth following effect
  const smoothProgress = useSpring(rawProgress, { stiffness: 100, damping: 20 });
  
  // Create dynamic CSS values based on the progress
  const clipPath = useTransform(smoothProgress, val => `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`);
  const thumbLeft = useTransform(smoothProgress, val => `${val}%`);

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
            <h2 className={styles.title}>어떤 벽면이든<br/>완벽한 스크린으로.</h2>
            <p className={styles.desc}>벽면의 색상과 재질을 실시간으로 분석하여 투사되는 영상의 화이트 밸런스를 자동으로 교정합니다.</p>
          </div>
          
          <div className={styles.sliderMockup}>
            {/* Base Image: Uncorrected (Yellowish Wall) */}
            <div className={styles.imageBase}>
              <img src="/images/projection.png" alt="Uncorrected Projection" />
              <div className={styles.labelRight}>
                <span className="mono">보정 끄기</span>
              </div>
            </div>

            {/* Overlay Image: Corrected (True Colors) */}
            <motion.div 
              className={styles.imageOverlay} 
              style={{ clipPath }}
            >
              <img src="/images/projection.png" alt="Corrected Projection" />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureColor;
