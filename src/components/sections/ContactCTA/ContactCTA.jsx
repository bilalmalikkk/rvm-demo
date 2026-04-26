import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import styles from './ContactCTA.module.css';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export function ContactCTA() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Helper function to ensure all values are clean strings and safe for EmailJS
      const cleanValue = (value) => {
        if (value === null || value === undefined) return '';
        // Remove any potential problematic characters and ensure it's a safe string
        return String(value)
          .trim()
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n');
      };

      // Debug: Log raw form values
      console.log('Form values received:', values);
      console.log('Name value:', values.name);
      console.log('Email value:', values.email);

      // Prepare template parameters - ensure all required variables are strings
      // EmailJS requires all template variables to be defined, even if empty
      const templateParams = {
        from_name: cleanValue(values.name),
        from_email: cleanValue(values.email),
        phone: cleanValue(values.phone || ''),
        message: cleanValue(values.message),
        to_email: 'kontakt@nordicrvm.no',
        time: new Date().toLocaleString('no-NO', {
          timeZone: 'Europe/Oslo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Log for debugging - this is what will be sent to EmailJS
      console.log('=== EmailJS Configuration ===');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:', publicKey ? `${publicKey.substring(0, 10)}...` : 'NOT SET');
      console.log('=== Template Parameters Being Sent ===');
      console.log(JSON.stringify(templateParams, null, 2));
      console.log('from_name:', templateParams.from_name);
      console.log('from_email:', templateParams.from_email);

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EmailJS result:', result);

      if (result.status === 200) {
        setSubmitMessage(t.contactCTA.submitSuccess || 'Thank you for your inquiry! We will be in touch soon.');
        reset();
      } else {
        console.error('EmailJS returned non-200 status:', result.status, result.text);
        setSubmitMessage(language === 'no' 
          ? 'Det oppstod en feil. Prøv igjen senere.' 
          : 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      console.error('Error details:', {
        message: error?.message,
        text: error?.text,
        status: error?.status,
      });
      setSubmitMessage(language === 'no'
        ? 'Det oppstod en feil. Prøv igjen senere.'
        : 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" ref={ref} className={`${styles.contactSection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.contactHeader}>
        <h2 className={styles.contactMainTitle}>{t.contactCTA.title}</h2>
        <p className={styles.contactSubtitle}>
          {t.contactCTA.subtitle}
        </p>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactFormCard}>
          <h3 className={styles.formTitle}>{t.contactCTA.formTitle}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
            <div>
              <input
                type="text"
                placeholder={t.contactCTA.namePlaceholder}
                {...register('name')}
                className={`${styles.formInput} ${errors.name ? styles.formInputError : ''}`}
              />
              {errors.name && (
                <p className={styles.formError}>{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder={t.contactCTA.emailPlaceholder}
                {...register('email')}
                className={`${styles.formInput} ${errors.email ? styles.formInputError : ''}`}
              />
              {errors.email && (
                <p className={styles.formError}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="tel"
                placeholder={t.contactCTA.phonePlaceholder}
                {...register('phone')}
                className={styles.formInput}
              />
            </div>
            <div>
              <textarea
                placeholder={t.contactCTA.messagePlaceholder}
                rows={5}
                {...register('message')}
                className={`${styles.formTextarea} ${errors.message ? styles.formInputError : ''}`}
              />
              {errors.message && (
                <p className={styles.formError}>{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.btnSend} ${isSubmitting ? styles.btnSendDisabled : ''}`}
            >
              <Send size={18} className={styles.btnIcon} />
              {isSubmitting
                ? language === 'no'
                  ? 'Sender...'
                  : 'Sending...'
                : t.contactCTA.sendButton}
            </button>

            {/* Success/Error Message */}
            {submitMessage && (
              <div
                className={`${styles.submitMessage} ${
                  submitMessage.includes('Takk') || submitMessage.includes('Thank you')
                    ? styles.submitMessageSuccess
                    : styles.submitMessageError
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.contactInfoHeader}>
            <h3 className={styles.contactInfoTitle}>{t.contactCTA.contactInfo}</h3>
          </div>
          <div className={styles.contactDetails}>
            <div className={styles.contactDetailItem}>
              <MapPin size={24} className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <p style={{ whiteSpace: 'pre-line' }}>{t.contactCTA.addressText}</p>
              </div>
            </div>
            <div className={styles.contactDetailItem}>
              <Mail size={24} className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <p>{t.contactCTA.emailText}</p>
              </div>
            </div>
            <div className={styles.contactDetailItem}>
              <Phone size={24} className={styles.detailIcon} />
              <div className={styles.detailContent}>
                <p>{t.contactCTA.phoneText}</p>
              </div>
            </div>
          </div>
          <p className={styles.contactNote}>
            {t.contactCTA.note}
          </p>
        </div>
      </div>
    </section>
  );
}

