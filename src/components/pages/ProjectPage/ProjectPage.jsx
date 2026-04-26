import React, { useEffect } from 'react';
import { ProjectHero } from '../../sections/ProjectHero/ProjectHero';
import { ProjectContent } from '../../sections/ProjectContent/ProjectContent';
import { ProcessFlow } from '../../sections/ProcessFlow/ProcessFlow';
import { Technologies } from '../../sections/Technologies/Technologies';
import { TechnologiesDetail } from '../../sections/TechnologiesDetail/TechnologiesDetail';
import { TechnologiesAdditional } from '../../sections/TechnologiesAdditional/TechnologiesAdditional';
import { ProductionLine } from '../../sections/ProductionLine/ProductionLine';
import { ProductReferences } from '../../sections/ProductReferences/ProductReferences';
import { ProjectCTA } from '../../sections/ProjectCTA/ProjectCTA';
import { ScrollToTop } from '../../common/ScrollToTop/ScrollToTop';

export function ProjectPage() {
  useEffect(() => {
    const productId = sessionStorage.getItem('scrollToProductId');
    const scrollToProductReferences = sessionStorage.getItem('scrollToProductReferences');
    
    if (productId) {
      // Clear it immediately so it only runs once
      sessionStorage.removeItem('scrollToProductId');
      
      // Function to scroll to the product
      const scrollToProduct = () => {
        const element = document.getElementById(`product-${productId}`);
        if (element) {
          // Use scrollIntoView for more reliable scrolling
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          // Adjust for header offset after scroll
          setTimeout(() => {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'auto' // Instant adjustment
            });
          }, 100);
          
          return true;
        }
        return false;
      };

      // Use requestAnimationFrame for better timing
      const attemptScroll = () => {
        requestAnimationFrame(() => {
          if (!scrollToProduct()) {
            // Retry after a short delay
            setTimeout(attemptScroll, 100);
          }
        });
      };

      // Start attempting after page has had time to render
      setTimeout(attemptScroll, 300);
    } else if (scrollToProductReferences === 'true') {
      // Clear it immediately so it only runs once
      sessionStorage.removeItem('scrollToProductReferences');
      
      // Function to scroll to the product references section
      const scrollToSection = () => {
        const element = document.getElementById('product-references');
        if (element) {
          // Use scrollIntoView for more reliable scrolling
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          // Adjust for header offset after scroll
          setTimeout(() => {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'auto' // Instant adjustment
            });
          }, 100);
          
          return true;
        }
        return false;
      };

      // Use requestAnimationFrame for better timing
      const attemptScroll = () => {
        requestAnimationFrame(() => {
          if (!scrollToSection()) {
            // Retry after a short delay
            setTimeout(attemptScroll, 100);
          }
        });
      };

      // Start attempting after page has had time to render
      setTimeout(attemptScroll, 300);
    }
  }, []);

  return (
    <div>
      <ProjectHero />
      <ProjectContent />
      <ProcessFlow />
      <Technologies />
      <TechnologiesDetail />
      <TechnologiesAdditional />
      <ProductionLine />
      <ProductReferences />
      <ProjectCTA />
      <ScrollToTop />
    </div>
  );
}

