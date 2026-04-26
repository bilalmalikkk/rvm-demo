import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import handAndPcbImage from '../../../assets/Hand_and_PCB.png';
import styles from './About.module.css';

export function About() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className={`${styles.aboutSection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutHeading}>{t.about.title}</h2>
          {t.about.paragraphs.map((paragraph, index) => {
            const isLast = index === t.about.paragraphs.length - 1;
            return (
              <p key={index} className={styles.aboutText}>
                {isLast ? <strong>{paragraph}</strong> : paragraph}
              </p>
            );
          })}
        </div>
        <div className={styles.aboutCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{t.about.cardTitle}</span>
          </div>
          <div className={styles.cardImageContainer}>
            <img 
              src={handAndPcbImage} 
              alt="Nordic Medtek team" 
              className={styles.cardImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

