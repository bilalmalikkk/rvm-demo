import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import heroProductImage from '../../../assets/VibrationMonitor.jpeg';
import styles from './Hero.module.css';

export function Hero() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroTextBlock}>
          <p className={styles.eyebrow}>Nordic RVM</p>
          <h1 className={styles.heroHeading}>
            {t.hero.tagline}
          </h1>
          <p className={styles.heroSubheading}>
            {t.hero.description}
          </p>
          <div className={styles.heroActions}>
            <Link to="/project" className={styles.primaryAction}>
              {t.hero.button1}
            </Link>
            <a href="#contact" className={styles.secondaryAction}>
              {t.hero.button2}
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualPanel}>
            <img
              className={styles.visualImage}
              src={heroProductImage}
              alt="Nordic RVM velferdsteknologi sensor"
              loading="lazy"
            />
            <div className={styles.visualOverlay}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

