import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './ProjectCTA.module.css';

export function ProjectCTA() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const navigate = useNavigate();
  const location = useLocation();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  const handleContactClick = () => {
    const isOnHomeRoute = location.pathname === '/home' || location.pathname === '/';

    if (isOnHomeRoute) {
      // Already on home page - scroll to contact immediately
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          const headerOffset = 120;
          const elementPosition = contactElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Set flag to scroll after navigation
      sessionStorage.setItem('scrollToContact', 'true');
      navigate('/home');
    }
  };

  return (
    <section ref={ref} className={`${styles.projectCTASection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.projectCTAContainer}>
        <h2 className={styles.projectCTATitle}>{t.projectCTA.title}</h2>
        <p className={styles.projectCTADescription}>{t.projectCTA.description}</p>
        <button className={styles.projectCTAButton} onClick={handleContactClick}>
          {t.projectCTA.buttonText}
        </button>
      </div>
    </section>
  );
}

