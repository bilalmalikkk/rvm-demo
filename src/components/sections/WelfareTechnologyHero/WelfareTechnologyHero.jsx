import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import styles from './WelfareTechnologyHero.module.css';

export function WelfareTechnologyHero() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroOverlay} aria-hidden="true"></div>
        <div className={styles.heroTextBlock}>
          <h1 className={styles.heroHeading}>{t.welfareTechnologyHero.heading}</h1>
          <p className={styles.heroDescription}>{t.welfareTechnologyHero.description}</p>
        </div>
        <article className={styles.heroInfoCard}>
          <h2 className={styles.infoCardTitle}>{t.welfareTechnologyHero.cardTitle}</h2>
          <p className={styles.infoCardDescription}>{t.welfareTechnologyHero.cardDescription}</p>
        </article>
      </div>
    </section>
  );
}
