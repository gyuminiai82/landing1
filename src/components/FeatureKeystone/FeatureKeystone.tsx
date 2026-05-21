import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Focus, Mouse } from 'lucide-react';
import styles from './FeatureKeystone.module.css';
import movieScene from '../../assets/images/movie_scene.png';

const FeatureKeystone: React.FC = () => {
  const [status, setStatus] = useState<'distorted' | 'scanning' | 'corrected'>('distorted');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // SVG Paths (viewBox: 0 0 800 500)
  const distortedPath = "M 150 120 L 750 50 L 680 480 L 50 380 Z";
  const correctedPath = "M 100 76 L 700 76 L 700 424 L 100 424 Z"; // 16:9 ratio

  const pathValue = useTransform(scrollYProgress, [0.2, 0.8], [distortedPath, correctedPath]);
  const strokeColor = useTransform(scrollYProgress, [0.7, 0.8], ["rgba(255, 255, 255, 0.5)", "#00FF9D"]);
  const tintColor = useTransform(scrollYProgress, [0.7, 0.8], ["rgba(10, 10, 10, 0.5)", "rgba(0, 255, 157, 0.1)"]);
  const laserX = useTransform(scrollYProgress, [0.2, 0.8], [0, 800]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) {
      if (status !== 'distorted') setStatus('distorted');
    } else if (latest < 0.8) {
      if (status !== 'scanning') setStatus('scanning');
    } else {
      if (status !== 'corrected') setStatus('corrected');
    }
  });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.stickyContainer}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Auto Keystone Intelligence</h2>
          <p className={styles.desc}>단 2초. AI가 공간을 스캔하여 왜곡된 화면을 완벽한 직사각형으로 교정합니다.</p>
        </div>
        
        <div className={styles.simulatorWrap}>
          <div className={styles.simulator}>
            <svg viewBox="0 0 800 500" className={styles.svgCanvas}>
              {/* Background Grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
                
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Clip Path for the Image */}
                <clipPath id="screenClip">
                  <motion.path d={pathValue} />
                </clipPath>
              </defs>
              <rect width="800" height="500" fill="url(#grid)" />

              {/* The Projected Image */}
              <g clipPath="url(#screenClip)">
                <image 
                  href={movieScene} 
                  x="0" y="0" 
                  width="800" height="500" 
                  preserveAspectRatio="xMidYMid slice" 
                />
                {/* Tint Overlay */}
                <motion.rect
                  width="800" height="500"
                  style={{ fill: tintColor }}
                />
              </g>

              {/* The Projection Area Border */}
              <motion.path
                d={pathValue}
                fill="none"
                style={{ stroke: strokeColor }}
                strokeWidth="2"
                strokeDasharray={status === 'corrected' ? "0" : "10,5"}
                filter={status === 'corrected' ? "url(#glow)" : "none"}
              />

              {/* Scanning Laser Line */}
              {status === 'scanning' && (
                <motion.line
                  style={{ x: laserX }}
                  y1="0" y2="500"
                  stroke="#00FF9D"
                  strokeWidth="4"
                  filter="url(#glow)"
                />
              )}
            </svg>

            {/* UI Overlay */}
            <div className={styles.uiOverlay}>
              <div className={styles.statusBadge}>
                <span className={status === 'scanning' ? styles.blinkDot : styles.dot} 
                      style={{ backgroundColor: status === 'corrected' ? 'var(--accent-color)' : (status === 'scanning' ? '#FFD700' : '#FF4444') }}
                />
                <span className="mono">
                  {status === 'distorted' ? 'CALIBRATION_REQUIRED' : (status === 'scanning' ? 'SCANNING_ENVIRONMENT...' : 'PERFECT_ALIGNMENT')}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actionWrap}>
            {status === 'distorted' && (
              <motion.div 
                className={styles.tooltip}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                👇 마우스 스크롤을 천천히 내려보세요!
              </motion.div>
            )}
            <button 
              className={`${styles.actionBtn} ${status === 'scanning' ? styles.disabled : ''} ${status === 'distorted' ? styles.pulseBtn : ''}`} 
            >
              {status === 'distorted' ? (
                <><Mouse size={20} /> 스크롤을 내려 오토 키스톤 실행</>
              ) : status === 'corrected' ? (
                <><Focus size={20} /> 키스톤 보정 완료</>
              ) : (
                <span className="mono">SCANNING...</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default FeatureKeystone;
