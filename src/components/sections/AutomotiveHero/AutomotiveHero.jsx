import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import automotiveHeroImage from '../../../assets/4efe830d-2154-4ae6-83c6-94c53ab2f1c6.png';
import styles from './AutomotiveHero.module.css';

export function AutomotiveHero() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const lead = t.automotiveHero?.description?.trim();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>Nordic RVM</p>
        <h1 className={styles.heroHeading}>{t.automotiveHero.heading}</h1>
        {lead ? (
          <p className={styles.heroLead}>{lead}</p>
        ) : null}
        <div className={styles.heroVisual}>
          <img
            src={automotiveHeroImage}
            alt={t.automotiveHero?.imageAlt || ''}
            className={styles.heroImage}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
