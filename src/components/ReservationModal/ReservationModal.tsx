import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import styles from './ReservationModal.module.css';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={24} />
            </button>

            {isSubmitted ? (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 size={64} color="#00FF9D" />
                <h3>예약이 완료되었습니다!</h3>
                <p>가장 먼저 출시 소식을 안내해 드리겠습니다.</p>
              </motion.div>
            ) : (
              <>
                <div className={styles.header}>
                  <span className="mono" style={{ color: 'var(--accent-color)', fontSize: '0.875rem' }}>LIMITED EDITION</span>
                  <h2>사전 예약 신청</h2>
                  <p>Visionary 프로젝터의 첫 번째 주인공이 되어보세요.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputGroup}>
                    <label>이름</label>
                    <input type="text" placeholder="홍길동" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>연락처</label>
                    <input type="tel" placeholder="010-0000-0000" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>이메일</label>
                    <input type="email" placeholder="example@email.com" required />
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>
                    예약 완료하기
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
