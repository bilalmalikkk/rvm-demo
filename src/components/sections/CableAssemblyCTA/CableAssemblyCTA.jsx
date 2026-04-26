import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import styles from './CableAssemblyCTA.module.css';

export function CableAssemblyCTA() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const navigate = useNavigate();
  const location = useLocation();

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
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaTitle}>{t.cableAssemblyCTA.title}</h2>
        <p className={styles.ctaDescription}>{t.cableAssemblyCTA.description}</p>
        <button className={styles.ctaButton} onClick={handleContactClick}>
          {t.cableAssemblyCTA.buttonText}
        </button>
      </div>
    </section>
  );
}

