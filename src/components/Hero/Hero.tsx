import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../../utils/scroll';
import TextReveal from '../TextReveal/TextReveal';
import Hyperspeed from '../Hyperspeed/Hyperspeed';
import ReservationModal from '../ReservationModal/ReservationModal';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mouse position values for interactive typography parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Absolute mouse coordinates for the spotlight effect
  const mouseXAbs = useMotionValue(0);
  const mouseYAbs = useMotionValue(0);

  // Smooth springs for natural movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const smoothX = useSpring(mouseXAbs, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseYAbs, { stiffness: 40, damping: 20 });

  // Map mouse movement to 3D rotation and translation
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const textX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const textY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Projector Beam Cone interactive angles (top center pivot)
  const beamRotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const beamRotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const beamScale = useTransform(springY, [-0.5, 0.5], [0.95, 1.05]);

  // 마우스 이동 방향의 반대쪽으로 네온 빛 번짐이 생기도록 오프셋(offset) 생성
  const shadowX = useTransform(springX, [-0.5, 0.5], [-45, 45]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [-45, 45]);

  // 기본 헤드라인용 반응형 그림자
  const headlineShadow = useMotionTemplate`${shadowX}px ${shadowY}px 25px rgba(255, 255, 255, 0.2), 0 10px 30px rgba(0,0,0,0.8)`;
  
  // 포인트 옥색 네온 텍스트용 반응형 그림자
  const neonShadow = useMotionTemplate`${shadowX}px ${shadowY}px 35px rgba(0, 255, 157, 0.95), 0 4px 15px rgba(0, 0, 0, 0.9)`;

  // Interactive Spotlight mapping using useMotionTemplate
  const spotlightStyle = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(0, 255, 157, 0.25), transparent 70%)`;

  const hyperspeedOptions = useMemo(() => ({
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x00FF9D,
      brokenLines: 0x00FF9D,
      leftCars: [0x00FF9D, 0x0A96FF, 0x00FF9D],
      rightCars: [0x00FF9D, 0x0A96FF, 0x00FF9D],
      sticks: 0x00FF9D,
    }
  }), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize values between -0.5 and 0.5 for parallax
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);

      // Absolute values for the spotlight position
      mouseXAbs.set(e.clientX);
      mouseYAbs.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, mouseXAbs, mouseYAbs]);

  const scrollToSpecs = () => {
    smoothScrollTo('tech-specs', 3500); // 제일 하단까지 3.5초 동안 서서히 이동하며 핀스크롤을 감상할 수 있게 함
  };

  return (
    <section className={styles.heroSection}>
      {/* Dynamic Background Image */}
      <div className={styles.bgWrapper}>
        <div className={styles.bgImage} />
        
        {/* WebGL Hyperspeed Background */}
        <div className={styles.hyperspeedContainer}>
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>
        
        {/* Dynamic Glowing Nebula (Aurora) */}
        <div className={styles.ambientNebula}>
          <div className={styles.nebulaSpot1} />
          <div className={styles.nebulaSpot2} />
          <div className={styles.nebulaSpot3} />
        </div>
        
        {/* Technical Calibration Cyber Grid & Scanline */}
        <div className={styles.techGrid}>
          <div className={styles.scanLine} />
        </div>

        {/* Technical Calibration Target Circles */}
        <div className={styles.calibrationTarget}>
          <div className={styles.calibrationPulse} style={{ animationDelay: '0s' }} />
          <div className={styles.calibrationPulse} style={{ animationDelay: '2s' }} />
          <div className={styles.targetRingOuter} />
          <div className={styles.targetRingInner} />
          <div className={styles.targetCross} />
        </div>

        <div className={styles.bgOverlay} />
      </div>

      {/* Ambient Cinema Bokeh Particles */}
      <div className={styles.particleContainer}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* Cinematic Projector Beam Cone */}
      <motion.div 
        className={styles.beamCone} 
        style={{ 
          rotateX: beamRotateX, 
          rotateY: beamRotateY, 
          scale: beamScale,
          transformOrigin: 'top center'
        }} 
      />

      {/* Interactive Spotlight following the mouse */}
      <motion.div className={styles.spotlight} style={{ background: spotlightStyle }} />

      <motion.div 
        className={styles.container}
        style={{ 
          rotateX, 
          rotateY, 
          x: textX, 
          y: textY,
          transformPerspective: 1000 
        }}
      >
        <motion.div 
          className={styles.indicator}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={styles.statusDot}></span>
          <span className="mono">SYSTEM.ONLINE</span>
        </motion.div>

        <motion.h1 
          className={styles.headline}
          style={{ textShadow: headlineShadow }}
        >
          <TextReveal text="세팅은 기술에게," delay={0.3} /> <br />
          <motion.span 
            className={styles.highlight}
            style={{ textShadow: neonShadow }}
          >
            <TextReveal text="감동은 당신에게." delay={0.6} />
          </motion.span>
        </motion.h1>

        <motion.p 
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          궁극의 하이엔드 프로젝터 Visionary. <br />
          복잡한 설정 없이 완벽한 시네마 경험을 선사합니다.
        </motion.p>

        <motion.div 
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
            사전 예약하기
            <ArrowRight size={18} className={styles.btnIcon} />
          </button>
          <button className={styles.secondaryBtn} onClick={scrollToSpecs}>
            <span className="mono">기술 사양 보기</span>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Decorative Light Glow */}
      <div className={styles.glowBottom}></div>

      {/* Reservation Modal */}
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
