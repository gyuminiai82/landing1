import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './TechSpecs.module.css';
import { useIsMobile } from '../../hooks/useIsMobile';

// JSON Data Mock as requested by PRD
const SPECS_DATA = [
  { id: 'res', category: 'DISPLAY', title: 'Native 4K UHD', desc: '3840 x 2160 해상도', detail: '8.3M Pixels' },
  { id: 'lum', category: 'BRIGHTNESS', title: 'Dual Laser', desc: '3,500 ANSI Lumens', detail: 'HDR10+ / HLG 지원' },
  { id: 'con', category: 'CONTRAST', title: 'Dynamic Black', desc: '2,500,000:1 명암비', detail: '완벽한 리얼 블랙 구현' },
  { id: 'ai', category: 'INTELLIGENCE', title: 'Vision AI', desc: 'Auto-fit & Obstacle Avoidance', detail: '장애물 회피 기술 탑재' },
  { id: 'snd', category: 'AUDIO', title: 'Dolby Atmos', desc: '2.1ch 하만카돈 사운드', detail: '40W 출력' },
  { id: 'con2', category: 'CONNECTIVITY', title: 'Wi-Fi 6 / BT 5.3', desc: '초고속 무선 스트리밍', detail: 'HDMI 2.1 x 3' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    rotateX: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 }
  }
};

// 개별 카드 컴포넌트로 분리하여 마우스 좌표를 각각 독립적으로 계산
const SpecCard = ({ spec }: { spec: typeof SPECS_DATA[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      ref={cardRef}
      className={styles.specCard} 
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })} // 마우스가 벗어나면 숨김
      style={{ 
        '--mouse-x': `${mousePos.x}px`, 
        '--mouse-y': `${mousePos.y}px` 
      } as React.CSSProperties}
    >
      {/* 내부 글로우 이펙트 */}
      <div className={styles.spotlight}></div>
      
      <div className={styles.cardContent}>
        <div className={styles.category}>
          <span className="mono">{spec.category}</span>
        </div>
        <h3 className={styles.specTitle}>{spec.title}</h3>
        <p className={styles.specDesc}>{spec.desc}</p>
        <div className={styles.specDetail}>
          <span className="mono">{spec.detail}</span>
        </div>
      </div>
    </motion.div>
  );
};

const TechSpecs: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section key={isMobile ? 'mobile' : 'desktop'} id="tech-specs" className={styles.section}>
      {/* Decorative Background Elements */}
      <div className={styles.bgGrid}></div>
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>

      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>타협 없는 정밀함.</h2>
          <p className={styles.desc}>프리미엄 시네마 경험을 완성하는 하드웨어 스펙</p>
        </motion.div>
        
        <motion.div 
          className={styles.specsGrid}
          variants={containerVariants}
          initial={isMobile ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SPECS_DATA.map((spec) => (
            <SpecCard key={spec.id} spec={spec} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechSpecs;
