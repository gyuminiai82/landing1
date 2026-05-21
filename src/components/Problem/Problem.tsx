import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import styles from './Problem.module.css';
import movieScene from '../../assets/images/movie_scene.png';
import { useIsMobile } from '../../hooks/useIsMobile';

const Problem: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  // Track scroll progress within this 300vh section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Background color transitions from dark to a deep warning red tint and back
  const bgColor = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.8, 1], 
    ['#030303', '#1a0505', '#1a0505', '#030303']
  );
  
  // Scroll-tied text color reveals - 더 화려하고 다이나믹한 색상 변화
  // 제목: 어두움 -> 붉은 에러 경고색 -> 밝은 흰색
  const titleColor = useTransform(scrollYProgress, [0, 0.2, 0.4], ['#111111', '#ff4444', '#ffffff']);
  
  // 첫째 줄: 어두움 -> 강렬한 오렌지 -> 밝은 회색
  const text1Color = useTransform(scrollYProgress, [0.1, 0.3, 0.5], ['#111111', '#ff8800', '#cccccc']);
  // 둘째 줄: 어두움 -> 강렬한 오렌지 -> 밝은 회색
  const text2Color = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ['#111111', '#ff8800', '#cccccc']);
  
  // 셋째 줄(해결책 강조): 어두움 -> 네온 민트 글로우 -> 밝은 민트
  const text3Color = useTransform(scrollYProgress, [0.5, 0.7, 0.9], ['#111111', '#00ff9d', '#b3ffdf']); 
  const text3Scale = useTransform(scrollYProgress, [0.6, 0.9], [0.9, 1.05]);
  const text3Shadow = useTransform(scrollYProgress, [0.7, 0.9], ['0px 0px 0px rgba(0,255,157,0)', '0px 0px 25px rgba(0,255,157,0.9)']);

  // Scroll-tied extreme distortion for the bad screen
  const skewX = useTransform(scrollYProgress, [0, 0.8], [2, 15]);
  const rotate = useTransform(scrollYProgress, [0, 0.8], [-2, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.3]);
  const filterContrast = useTransform(scrollYProgress, [0, 0.8], [1.5, 2.5]);

  return (
    <motion.section ref={sectionRef} className={styles.section} style={{ backgroundColor: bgColor }}>
      <div className={styles.stickyContainer}>
        <div className={styles.neonBackground}></div>
        
        <div className={styles.contentGrid}>
          <div className={styles.textContent}>
            <div className={styles.warningLabel}>
              <TriangleAlert size={16} />
              <span className="mono">MANUAL_SETUP_DETECTED</span>
            </div>
            <motion.h2 className={styles.title} style={{ color: isMobile ? '#ffffff' : titleColor }}>
              완벽한 스크린을 위한<br/>
              소모적인 시간들.
            </motion.h2>
            <div className={styles.desc}>
              <motion.p style={{ color: isMobile ? '#cccccc' : text1Color, transition: 'color 0.2s ease' }}>
                수평을 맞추기 위해 책을 괴고,
              </motion.p>
              <motion.p style={{ color: isMobile ? '#cccccc' : text2Color, transition: 'color 0.2s ease' }}>
                초점을 맞추기 위해 리모컨을 수십 번 누르던 경험.
              </motion.p>
              <motion.p style={{ 
                color: isMobile ? '#b3ffdf' : text3Color, 
                fontWeight: 'bold',
                scale: isMobile ? 1.05 : text3Scale,
                textShadow: isMobile ? '0px 0px 25px rgba(0,255,157,0.9)' : text3Shadow,
                transformOrigin: 'left center'
              }}>
                이제 그 피로감에서 벗어나세요.
              </motion.p>
            </div>
          </div>

          <div className={styles.visualContent}>
            {/* The projector screen box gets more skewed as you scroll */}
            <motion.div 
              className={`${styles.box} ${styles.box1}`}
              style={{ 
                skewX: isMobile ? 15 : skewX, 
                rotate: isMobile ? -10 : rotate, 
                scale: isMobile ? 1.3 : scale 
              }}
              // Base wobble that runs continuously
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <motion.img 
                src={movieScene} 
                className={styles.badProjectionImg} 
                alt="Bad Projection" 
                style={{ filter: isMobile ? "contrast(2.5) brightness(0.7)" : useTransform(filterContrast, c => `contrast(${c}) brightness(0.7)`) }}
              />
              <div className={styles.tvStatic}></div>
            </motion.div>
            
            <motion.div 
              className={`${styles.box} ${styles.box2}`}
              style={{ skewX: isMobile ? -15 : useTransform(scrollYProgress, [0, 0.8], [-2, -15]) }}
              animate={{ rotate: [3, -1, 1], y: [-5, 5, -2] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            />
            <div className={styles.noiseOverlay}></div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Problem;
