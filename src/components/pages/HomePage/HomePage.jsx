import React, { useEffect } from 'react';
import { Hero } from '../../sections/Hero/Hero';
import { About } from '../../sections/About/About';
import { BusinessAreas } from '../../sections/BusinessAreas/BusinessAreas';
import { WhyChooseUs } from '../../sections/WhyChooseUs/WhyChooseUs';
import { News } from '../../sections/News/News';
import { ProjectShowcase } from '../../sections/ProjectShowcase/ProjectShowcase';
import { ContactCTA } from '../../sections/ContactCTA/ContactCTA';
import { ScrollToTop } from '../../common/ScrollToTop/ScrollToTop';

export function HomePage() {
  useEffect(() => {
    // Check sessionStorage for scroll flag
    const shouldScrollToContact = sessionStorage.getItem('scrollToContact');
    
    if (shouldScrollToContact === 'true') {
      sessionStorage.removeItem('scrollToContact');
      
      // Function to scroll to contact section
      const scrollToContact = () => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          // Scroll to element, then adjust for header
          contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            window.scrollBy(0, -120); // Adjust for fixed header
          }, 300);
          return true;
        }
        return false;
      };
      
      // Wait for DOM to be ready, then attempt scroll with retries
      const attemptScroll = (retries = 0) => {
        if (retries > 50) {
          console.warn('Could not find contact element after retries');
          return;
        }
        
        if (scrollToContact()) {
          console.log('Scrolled to contact section');
        } else {
          setTimeout(() => attemptScroll(retries + 1), 100);
        }
      };
      
      // Start scrolling after a delay to ensure page is rendered
      setTimeout(() => {
        attemptScroll();
      }, 500);
    }

    // Also listen for custom event for immediate scroll when already on page
    const handleScrollEvent = () => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          window.scrollBy(0, -120);
        }, 300);
      }
    };

    window.addEventListener('scrollToContact', handleScrollEvent);

    return () => {
      window.removeEventListener('scrollToContact', handleScrollEvent);
    };
  }, []); // Run only on mount

  return (
    <div>
      <Hero />
      <About />
      <BusinessAreas />
      <WhyChooseUs />
      <News />
      <ProjectShowcase />
      <ContactCTA />
      <ScrollToTop />
    </div>
  );
}

