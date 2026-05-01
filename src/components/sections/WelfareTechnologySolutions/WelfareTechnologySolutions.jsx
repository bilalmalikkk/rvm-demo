import React from 'react';
import { Heart, Wifi, Shield, Smartphone } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import styles from './WelfareTechnologySolutions.module.css';

const iconMap = {
  Heart,
  Wifi,
  Shield,
  Smartphone,
};

export function WelfareTechnologySolutions() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const data = t.welfareTechnologySolutions;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.introText}>{data.intro}</p>
          <p className={styles.introSubtext}>{data.introSecondary}</p>
        </div>

        <div className={styles.highlightGrid}>
          {data.highlights.map((item, index) => {
            const Icon = iconMap[item.icon] || Heart;
            return (
              <article key={index} className={styles.highlightCard}>
                <div className={styles.highlightIcon}><Icon size={20} /></div>
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <p className={styles.highlightDescription}>{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className={styles.segmentGrid}>
          {data.segments.map((segment, index) => (
            <article key={index} className={styles.segmentCard}>
              <h3 className={styles.segmentTitle}>{segment.title}</h3>
              <p className={styles.segmentDescription}>{segment.description}</p>
              <button type="button" className={styles.segmentButton}>{segment.cta}</button>
            </article>
          ))}
        </div>

        <div className={styles.reasonsSection}>
          <h2 className={styles.reasonsTitle}>{data.reasonsTitle}</h2>
          <div className={styles.reasonsGrid}>
            {data.reasons.map((reason, index) => (
              <article key={index} className={styles.reasonCard}>
                <h3 className={styles.reasonHeading}>{reason.title}</h3>
                <p className={styles.reasonDescription}>{reason.description}</p>
                <div className={styles.reasonLinks}>
                  {reason.links.map((link, linkIndex) => (
                    <a key={linkIndex} href="#" className={styles.reasonLink}>{link}</a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.faqTitle}>{data.faqTitle}</h2>
          <div className={styles.faqGrid}>
            {data.faqCards.map((card, index) => (
              <article key={index} className={styles.faqCard}>
                <h3 className={styles.faqCardTitle}>{card.title}</h3>
                <p className={styles.faqCardDescription}>{card.description}</p>
                <button type="button" className={styles.faqCardButton}>
                  {card.cta}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
