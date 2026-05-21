import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../../utils/scroll';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'problem', 'feature-keystone', 'feature-color', 'feature-iot', 'tech-specs'];
      let current = 'hero';
      
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 화면의 상단 1/3 ~ 1/2 지점 내에 섹션이 걸쳐 있으면 해당 섹션으로 간주
          if (rect.top <= 200 && rect.bottom >= 200) {
             current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo('top', 2500); // 2.5초 동안 천천히 스크롤
  };

  const scrollToSection = (id: string) => {
    smoothScrollTo(id, 2500);
  };

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.logo} onClick={scrollToTop}>
        VISIONARY<span className={styles.logoAccent}>.</span>
      </div>
      
      <div className={styles.navLinks}>
        <a href="#hero" className={`${styles.link} ${activeSection === 'hero' ? styles.active : ''}`} onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
        <a href="#problem" className={`${styles.link} ${activeSection === 'problem' ? styles.active : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }}>Problem</a>
        <a href="#features" className={`${styles.link} ${activeSection === 'feature-keystone' ? styles.active : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('feature-keystone'); }}>Features</a>
        <a href="#color" className={`${styles.link} ${activeSection === 'feature-color' ? styles.active : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('feature-color'); }}>Color</a>
        <a href="#smart" className={`${styles.link} ${activeSection === 'feature-iot' ? styles.active : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('feature-iot'); }}>Smart</a>
        <a href="#tech-specs" className={`${styles.link} ${activeSection === 'tech-specs' ? styles.active : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('tech-specs'); }}>Specs</a>
        <button className={styles.reserveBtn}>Pre-Order</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
