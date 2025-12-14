
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Generator from './pages/Generator';
import Landing from './pages/Landing';
import HowItWorks from './pages/HowItWorks';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Background = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-500 bg-neutral-100 dark:bg-physica-black">
    {/* Dark Mode: Deep Dark Base. Light Mode: Light Gray Base */}
    
    {/* Animated Blue Studio Light (Adaptive) */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full 
                    bg-blue-400 dark:bg-physica-blue 
                    blur-[120px] mix-blend-multiply dark:mix-blend-screen 
                    animate-studio-pulse opacity-20 dark:opacity-30"></div>
    
    {/* Subtle Moving Light Ray */}
    <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
      <div className="absolute top-0 left-[-50%] w-[200%] h-full 
                      bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent 
                      skew-x-12 animate-light-ray"></div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen text-neutral-900 dark:text-white font-sans antialiased selection:bg-physica-blue selection:text-white transition-colors duration-300">
      <Navigation />
      <Header />
      <main className="flex-grow pt-16 w-full relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generate" element={
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <Generator />
            </div>
          } />
          <Route path="/how-it-works" element={
             <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <HowItWorks />
             </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <Background />
          <AppContent />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
