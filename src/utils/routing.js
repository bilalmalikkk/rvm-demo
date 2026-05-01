// Routing utility functions

// Map page names to route hashes
export const pageToRoute = {
  'Hjem': '/home',
  'Home': '/home',
  'prosjekt': '/project',
  'Prosjekt': '/project',
  'project': '/project',
  'Project': '/project',
  'Velferdsteknologi': '/welfare-technology',
  'Velferds teknologi': '/welfare-technology',
  'welfare technology': '/welfare-technology',
  'Welfare technology': '/welfare-technology',
  'automotive': '/automotive',
  'Automotive': '/automotive',
  'Plast & Mekanikk': '/plastic-mechanics',
  'Plastic & Mechanics': '/plastic-mechanics',
  'Kabel konfeksjon': '/cable-assembly',
  'Cable assembly': '/cable-assembly',
};

// Map route hashes to page names
export const routeToPage = {
  '/home': { no: 'Hjem', en: 'Home' },
  '/project': { no: 'Prosjekt', en: 'Project' },
  '/welfare-technology': { no: 'Velferdsteknologi', en: 'Welfare technology' },
  '/automotive': { no: 'Automotive', en: 'Automotive' },
  '/plastic-mechanics': { no: 'Plast & Mekanikk', en: 'Plastic & Mechanics' },
  '/cable-assembly': { no: 'Kabel konfeksjon', en: 'Cable assembly' },
};

// Get current route from hash
export const getCurrentRoute = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    return hash.slice(2).split('#')[0]; // Remove #/ and any secondary hash
  }
  if (hash.startsWith('#')) {
    return hash.slice(1).split('#')[0]; // Remove # and any secondary hash
  }
  return '/home'; // Default route
};

// Navigate to a route
export const navigateToRoute = (route) => {
  window.location.hash = `#${route}`;
};

// Navigate to a page by name
export const navigateToPage = (pageName, language = 'no') => {
  const route = pageToRoute[pageName] || '/home';
  navigateToRoute(route);
};

// Get page name from route
export const getPageFromRoute = (route, language = 'no') => {
  const pageMap = routeToPage[route];
  if (pageMap) {
    return pageMap[language] || pageMap.no;
  }
  return language === 'no' ? 'Hjem' : 'Home';
};

