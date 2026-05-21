import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Visionary</h2>
          <p className="mono">Ready to experience?</p>
          <button className={styles.contactBtn}>Contact Sales</button>
        </div>
        <div className={styles.copyright}>
          <span className="mono">© 2026 Visionary Project. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
