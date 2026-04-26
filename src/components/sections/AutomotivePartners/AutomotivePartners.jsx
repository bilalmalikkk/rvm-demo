import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import partnersImage from '../../../assets/partners.avif';
import styles from './AutomotivePartners.module.css';

export function AutomotivePartners() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.partnersSection}>
      <div className={styles.partnersContainer}>
        <div className={styles.partnersImage}>
          <img 
            src={partnersImage} 
            alt={t.automotivePartners.imageAlt}
            className={styles.image}
          />
        </div>
        <div className={styles.partnersCard}>
          <h2 className={styles.partnersHeading}>
            {t.automotivePartners.heading}
          </h2>
          <h3 className={styles.partnersSubheading}>
            {t.automotivePartners.subheading}
          </h3>
          <div className={styles.partnersDescription}>
            {Array.isArray(t.automotivePartners.description) ? (
              t.automotivePartners.description.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {paragraph.map((part, partIndex) => 
                    part.bold ? <strong key={partIndex}>{part.text}</strong> : part.text
                  )}
                </p>
              ))
            ) : (
              <p>{t.automotivePartners.description}</p>
            )}
          </div>
          <a 
            href="#contact" 
            onClick={handleContactClick}
            className={styles.contactLink}
          >
            {t.automotivePartners.contactLink}
          </a>
        </div>
      </div>
    </section>
  );
}
