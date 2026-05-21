import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Lightbulb, Blinds, Speaker, MousePointer2 } from 'lucide-react';
import styles from './FeatureIot.module.css';

// Mock Data representing IoT integration (Portfolio JSON data point)
const IOT_DEVICES = [
  { id: 'proj', name: 'Visionary Projector', icon: Power, status: 'off', activeStatus: 'on' },
  { id: 'light', name: 'Living Room Lights', icon: Lightbulb, status: '100%', activeStatus: '15%' },
  { id: 'curtain', name: 'Smart Curtains', icon: Blinds, status: 'Open', activeStatus: 'Closed' },
  { id: 'audio', name: 'Soundbar System', icon: Speaker, status: 'Standby', activeStatus: 'Cinema Mode' },
];

const FeatureIot: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    if (activeStep > 0 || isSyncing) return;
    setIsSyncing(true);
    
    let currentStep = 1;
    setActiveStep(currentStep);
    
    const interval = setInterval(() => {
      currentStep += 1;
      setActiveStep(currentStep);
      
      if (currentStep >= 4) {
        clearInterval(interval);
        setIsSyncing(false);
      }
    }, 600); // 600ms per step
  };

  const isAllOn = activeStep >= 4;

  return (
    <section className={styles.section}>
      <div className={styles.stickyContainer}>
      {/* Cinematic Ambient Glow that turns on when everything is active */}
      <motion.div 
        className={styles.ambientGlow}
        animate={{ opacity: isAllOn ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.textWrap}>
          <h2 className={styles.title}>스마트홈 동기화</h2>
          <p className={styles.desc}>
            영화가 시작되는 순간, 공간이 스스로 반응합니다.<br/>
            복잡한 설정 없이 원터치로 완벽한 시네마 환경을 구축하세요.
          </p>
          <div className={styles.actionWrap}>
            <button 
              onClick={handleSync}
              className={`${styles.cinemaBtn} ${isAllOn ? styles.active : ''} ${activeStep === 0 ? styles.pulseBtn : ''}`}
            >
              {isAllOn ? (
                <><Power size={20} /> 시네마 모드 활성화됨</>
              ) : isSyncing ? (
                <span className="mono">SYNCING...</span>
              ) : (
                <><MousePointer2 size={20} /> 버튼을 눌러 동기화</>
              )}
            </button>
          </div>
        </div>
        
        <div className={`${styles.dashboard} ${isAllOn ? styles.dashActive : ''} ${isSyncing ? styles.dashBooting : ''}`}>
          <div className={styles.dashHeader}>
            <span className="mono">IOT_SYNC_DASHBOARD</span>
            <span className={`${styles.statusDot} ${isAllOn ? styles.activeDot : ''} ${isSyncing ? styles.bootingDot : ''}`}></span>
          </div>
          
          <div className={styles.deviceList}>
            {IOT_DEVICES.map((device, index) => {
              const Icon = device.icon;
              const isDeviceOn = activeStep > index;
              
              return (
                <motion.div 
                  key={device.id} 
                  className={`${styles.deviceCard} ${isDeviceOn ? styles.cardActive : ''}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.deviceIcon}>
                    <Icon size={24} />
                  </div>
                  <div className={styles.deviceInfo}>
                    <h4 className={styles.deviceName}>{device.name}</h4>
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={isDeviceOn ? 'on' : 'off'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className={styles.deviceStatus}
                      >
                        {isDeviceOn ? device.activeStatus : device.status}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  
                  {/* Left edge glowing line when active */}
                  <motion.div 
                    className={styles.activeLine}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isDeviceOn ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default FeatureIot;
