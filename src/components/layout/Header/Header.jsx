import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslations } from '../../../constants/translations';
import { pageToRoute } from '../../../utils/routing';
import styles from './Header.module.css';

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const t = getTranslations(language);

  // Helper function to get route from page name/label
  const getRouteFromPage = (pageName) => {
    return pageToRoute[pageName] || '/home';
  };

  const pathname = location.pathname;

  // Helper function to check if current route matches page
  const isActiveRoute = (pageName) => {
    const route = getRouteFromPage(pageName);
    if (route === '/home') {
      return pathname === '/home' || pathname === '/';
    }
    return pathname === route;
  };

  const handleLanguageChange = () => {
    const currentRoute = location.pathname;
    toggleLanguage();
    
    // Stay on the same route when language changes
    // The route stays the same, just the language context changes
    navigate(currentRoute, { replace: true });
  };

  const topMenuItems = t.header.topMenu;
  const bottomMenuItems = t.header.bottomMenu;
  const isProjectSubItem = (item) => (item.subItems || []).some((subItem) => isActiveRoute(subItem.label));

  const handleContactClick = (e) => {
    e.preventDefault();
    
    const isOnHomeRoute = pathname === '/home' || pathname === '/';
    
    if (isOnHomeRoute) {
      // Already on home page - scroll to contact immediately
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Adjust for fixed header
          setTimeout(() => {
            window.scrollBy(0, -120);
          }, 100);
        }
      }, 100);
    } else {
      // Use sessionStorage to trigger scroll after navigation
      sessionStorage.setItem('scrollToContact', 'true');
      navigate('/home');
    }
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    navigate('/privacy');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.secondaryNav}>
        <div className={styles.secondaryNavLinks}>
          {topMenuItems.map((item, index) => {
            // Special handling for contact link
            if (item.href === '#contact') {
              return (
                <a
                  key={index}
                  href={item.href}
                  className={styles.secondaryNavLink}
                  onClick={handleContactClick}
                >
                  {item.label}
                </a>
              );
            }
            // Special handling for privacy link
            if (item.href === '#privacy') {
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`${styles.secondaryNavLink} ${pathname === '/privacy' ? styles.secondaryNavLinkActive : ''}`}
                  onClick={handlePrivacyClick}
                >
                  {item.label}
                </a>
              );
            }
            // Special handling for about link - navigate to About Us page
            if (item.href === '#about') {
              return (
                <Link
                  key={index}
                  to="/about"
                  className={`${styles.secondaryNavLink} ${pathname === '/about' ? styles.secondaryNavLinkActive : ''}`}
                >
                  {item.label}
                </Link>
              );
            }
            // Other anchor links (like #products, etc.)
            return (
              <a
                key={index}
                href={item.href}
                className={styles.secondaryNavLink}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={handleLanguageChange}
            className={styles.languageSelector}
          >
            {t.header.languageToggle}
          </button>
        </div>
      </nav>
      <nav className={styles.primaryNav}>
        <div className={styles.primaryNavContainer}>
          <Link
            to="/home"
            className={styles.logoContainer}
            aria-label="Home"
          >
            <img 
              src="/NordicRVM_Logo_R2.png" 
              alt="Nordic RVM Logo" 
              className={styles.logo}
            />
          </Link>
          <div className={styles.primaryNavLinks}>
            {bottomMenuItems.map((item, index) => {
              if (item.externalUrl) {
                return (
                  <a
                    key={index}
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                );
              }
              const route = getRouteFromPage(item.label);
              const isActive = isActiveRoute(item.label) || isProjectSubItem(item);
              if (item.subItems?.length) {
                const isOpen = openDesktopDropdown === item.label;
                return (
                  <div
                    key={index}
                    className={styles.primaryNavDropdown}
                    onMouseEnter={() => setOpenDesktopDropdown(item.label)}
                    onMouseLeave={() => setOpenDesktopDropdown(null)}
                  >
                    <Link
                      to={route}
                      className={`${styles.dropdownToggle} ${isActive ? styles.active : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`${styles.dropdownArrow} ${isOpen ? styles.dropdownArrowOpen : ''}`}
                        aria-hidden="true"
                      />
                    </Link>
                    <div className={`${styles.primaryNavDropdownMenu} ${isOpen ? styles.primaryNavDropdownMenuOpen : ''}`}>
                      {item.subItems.map((subItem, subIndex) => {
                        const subRoute = getRouteFromPage(subItem.label);
                        const isSubActive = isActiveRoute(subItem.label);
                        return (
                          <Link
                            key={`sub-${subIndex}`}
                            to={subRoute}
                            className={isSubActive ? styles.active : ''}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  to={route}
                  className={isActive ? styles.active : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className={styles.mobileMenuDropdown}>
            {bottomMenuItems.map((item, index) => {
              if (item.externalUrl) {
                return (
                  <a
                    key={`bottom-${index}`}
                    href={item.externalUrl}
                    className={styles.mobileMenuItem}
                    onClick={() => setMobileMenuOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                );
              }
              const route = getRouteFromPage(item.label);
              const isActive = isActiveRoute(item.label) || isProjectSubItem(item);
              if (item.subItems?.length) {
                const isOpen = openMobileDropdown === item.label;
                return (
                  <div key={`bottom-${index}`}>
                    <button
                      className={`${styles.mobileMenuItem} ${styles.mobileDropdownToggle} ${isActive ? styles.active : ''}`}
                      onClick={() => setOpenMobileDropdown(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`${styles.dropdownArrow} ${isOpen ? styles.dropdownArrowOpen : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className={styles.mobileNestedMenu}>
                        {item.subItems.map((subItem, subIndex) => {
                          const subRoute = getRouteFromPage(subItem.label);
                          const isSubActive = isActiveRoute(subItem.label);
                          return (
                            <Link
                              key={`mobile-sub-${subIndex}`}
                              to={subRoute}
                              className={`${styles.mobileNestedMenuItem} ${isSubActive ? styles.active : ''}`}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setOpenMobileDropdown(null);
                              }}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={`bottom-${index}`}
                  to={route}
                  className={`${styles.mobileMenuItem} ${isActive ? styles.active : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className={styles.mobileMenuDivider}></div>
            <div className={styles.mobileSubmenu}>
              {topMenuItems.map((item, index) => {
                // Special handling for contact link
                if (item.href === '#contact') {
                  return (
                    <a
                      key={`top-${index}`}
                      href={item.href}
                      className={styles.mobileSubmenuItem}
                      onClick={(e) => {
                        handleContactClick(e);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  );
                }
                // Special handling for privacy link
                if (item.href === '#privacy') {
                  return (
                    <a
                      key={`top-${index}`}
                      href={item.href}
                      className={`${styles.mobileSubmenuItem} ${pathname === '/privacy' ? styles.secondaryNavLinkActive : ''}`}
                      onClick={(e) => {
                        handlePrivacyClick(e);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  );
                }
                // Special handling for about link - navigate to About Us page
                if (item.href === '#about') {
                  return (
                    <Link
                      key={`top-${index}`}
                      to="/about"
                      className={`${styles.mobileSubmenuItem} ${pathname === '/about' ? styles.secondaryNavLinkActive : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                // Other anchor links
                return (
                  <a
                    key={`top-${index}`}
                    href={item.href}
                    className={styles.mobileSubmenuItem}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
              <button
                onClick={() => {
                  handleLanguageChange();
                  setMobileMenuOpen(false);
                }}
                className={styles.mobileSubmenuItem}
              >
                {t.header.languageToggle}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
