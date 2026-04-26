import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import aboutUsImage from '../../../assets/0dba83_33f4b258c4f14dd3a603a2919b88792a~mv2.avif';
import mikalImage from '../../../assets/0dba83_d65f5dce8cf84ccbb3a1f559c2465894~mv2.gif';
import styles from './AboutUsPage.module.css';

export function AboutUsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = getTranslations(language);

  return (
    <div className={styles.aboutUsPage}>
      <section className={styles.heroSection}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label={t.aboutUs.backButton}
        >
          <ArrowLeft size={20} />
          <span>{t.aboutUs.backButton}</span>
        </button>
        <div className={styles.heroContainer}>
          <div className={styles.heroImage}>
            <img 
              src={aboutUsImage} 
              alt="Team collaboration"
              className={styles.image}
            />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeading}>
              {t.aboutUs.title}
            </h1>
            {t.aboutUs.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.heroParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
      
      <section className={styles.warmWelcomeSection}>
        <div className={styles.warmWelcomeContainer}>
          <h2 className={styles.warmWelcomeTitle}>
            {t.aboutUs.warmWelcome.title}
          </h2>
          <p className={styles.warmWelcomeSubtitle}>
            {t.aboutUs.warmWelcome.subtitle}
          </p>
          
          <div className={styles.profileCard}>
            <div className={styles.profileImage}>
              <img 
                src={mikalImage} 
                alt={t.aboutUs.warmWelcome.mikal.name}
                className={styles.profileImg}
              />
            </div>
            <div className={styles.profileContent}>
              <h3 className={styles.profileName}>
                {t.aboutUs.warmWelcome.mikal.name}
              </h3>
              <p className={styles.profileRole}>
                {t.aboutUs.warmWelcome.mikal.role}
              </p>
              <div className={styles.profileBiography}>
                {t.aboutUs.warmWelcome.mikal.biography.map((paragraph, index) => (
                  <p key={index} className={styles.biographyParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

