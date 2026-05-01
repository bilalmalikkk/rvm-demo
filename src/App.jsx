import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header, Footer } from './components/layout';
import { HomePage, ProjectPage, WelfareTechnologyPage, AutomotivePage, PlasticMechanicsPage, CableAssemblyPage, AboutUsPage } from './components/pages';
import { AdminNewsPage } from './pages/AdminNewsPage/AdminNewsPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy/PrivacyPolicy';
import './styles/variables.css';
import './styles/global.css';

function AppRoutes() {
  return (
    <div className="App">
      <Header />
      <main className="siteMain">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/welfare-technology" element={<WelfareTechnologyPage />} />
          <Route path="/automotive" element={<AutomotivePage />} />
          <Route path="/plastic-mechanics" element={<PlasticMechanicsPage />} />
          <Route path="/cable-assembly" element={<CableAssemblyPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<AdminNewsPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
