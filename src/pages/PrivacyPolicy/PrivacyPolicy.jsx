import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './PrivacyPolicy.module.css';

export function PrivacyPolicy() {
  const { language } = useLanguage();
  
  const pdfUrl = '/privacy-statement.pdf';
  const title = language === 'no' ? 'Personvernerklæring' : 'Privacy Policy';
  const description = language === 'no' 
    ? 'Personvernerklæring for Nordic RVM Group AS'
    : 'Privacy Policy for Nordic RVM Group AS';
  const instructionText = language === 'no' 
    ? 'PDF-en åpnes i et nytt vindu. Hvis den ikke åpnes automatisk, klikk på lenken nedenfor.'
    : 'The PDF will open in a new window. If it doesn\'t open automatically, please click the link below.';
  const buttonText = language === 'no' ? 'Åpne personvernerklæring' : 'Open Privacy Policy';

  useEffect(() => {
    // Open PDF in new tab when component mounts
    window.open(pdfUrl, '_blank');
  }, []);

  return (
    <div className={styles.privacyPolicyContainer}>
      <div className={styles.privacyPolicyContent}>
        <h1 className={styles.privacyPolicyTitle}>
          {title}
        </h1>
        <p className={styles.privacyPolicyDescription}>
          {instructionText}
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.privacyPolicyButton}
        >
          <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {buttonText}
        </a>
      </div>
    </div>
  );
}

