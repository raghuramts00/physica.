
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Simple smooth scroll handler for landing page anchors
  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
        return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-b-black/5 dark:border-b-white/5 backdrop-blur-md bg-white/70 dark:bg-black/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-physica-black flex items-center justify-center font-mono font-bold text-lg rounded-sm group-hover:bg-physica-blue group-hover:text-white transition-colors">
              P
            </div>
            <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white">Physica.img</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 sm:gap-8 items-center">
          {location.pathname === '/' ? (
             <>
                <button onClick={() => handleScroll('pricing')} className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Pricing</button>
                <button onClick={() => handleScroll('about')} className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">About</button>
             </>
          ) : (
             <Link to="/" className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Home</Link>
          )}

          {/* Always show credits (Guest Mode) */}
          {user && (
             <div className="flex items-center gap-4 border-l border-neutral-200 dark:border-white/10 pl-6">
                <div className="flex flex-col items-end">
                   <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">CREDITS</span>
                   <span className={`text-sm font-bold font-mono ${user.credits < 100 ? 'text-red-500' : 'text-physica-blue'}`}>
                      {user.credits}
                   </span>
                </div>
             </div>
          )}
          
          <div className="pl-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Toggle (Visible only on mobile, right aligned, with margin for hamburger) */}
        <div className="md:hidden flex items-center mr-14">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
