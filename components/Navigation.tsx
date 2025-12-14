
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

type MenuView = 'main' | 'about' | 'pricing' | 'contact';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<MenuView>('main');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Handle transitions between "rooms"
  const changeView = (newView: MenuView) => {
    if (view === newView) return;
    setIsAnimating(true);
    setTimeout(() => {
      setView(newView);
      setIsAnimating(false);
    }, 200); // Wait for fade out
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setView('main'), 300); // Reset to main after close
  };

  const handleGeneratorClick = () => {
    navigate('/generate');
    closeMenu();
  };

  // --- SUB-COMPONENTS FOR QUIET ROOMS ---

  const MenuMain = () => (
    <nav className="flex flex-col items-center gap-8 text-2xl md:text-4xl font-serif italic text-neutral-900 dark:text-white">
      <button onClick={handleGeneratorClick} className="hover:text-physica-blue transition-colors duration-300">
        Generator
      </button>
      <button onClick={() => changeView('pricing')} className="hover:text-physica-blue transition-colors duration-300">
        Pricing
      </button>
      <button onClick={() => changeView('about')} className="hover:text-physica-blue transition-colors duration-300">
        About Physica
      </button>
      <button onClick={() => changeView('contact')} className="hover:text-physica-blue transition-colors duration-300">
        Contact
      </button>
    </nav>
  );

  const MenuAbout = () => (
    <div className="max-w-2xl text-center flex flex-col items-center animate-fade-in text-neutral-900 dark:text-white">
      <blockquote className="text-3xl md:text-5xl font-serif italic font-bold leading-tight mb-12">
        “Most images don’t fail aesthetically. <br/>
        <span className="text-physica-blue">They fail physically.</span>”
      </blockquote>
      
      <div className="space-y-6 text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-sans leading-relaxed max-w-lg">
        <p>
          Physica.img was built on a simple principle: realism is not a style — it’s a consequence.
        </p>
        <p>
          Instead of enhancing images after generation, Physica defines light, material, and optics before the image exists.
        </p>
        <p>
          This is how photographs work. <br/>
          This is how believable AI visuals should work.
        </p>
      </div>

      <div className="mt-16 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-600">
        Realism starts before generation.
      </div>
    </div>
  );

  const MenuPricing = () => (
    <div className="max-w-3xl text-center flex flex-col items-center animate-fade-in text-neutral-900 dark:text-white">
      <blockquote className="text-3xl md:text-4xl font-serif italic font-bold mb-12">
        “Photographers don’t fix reality in post.”
      </blockquote>

      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-12 max-w-md">
        Physica.img replaces trial-and-error prompting with structured, reality-first compilation.
        Only access changes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        <div className="glass-panel p-8 rounded-sm bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors text-left">
          <h3 className="text-xl font-bold mb-2">Free</h3>
          <p className="text-neutral-500 text-sm">Quiet introduction to reality-first prompting.</p>
        </div>
        <div className="glass-panel p-8 rounded-sm bg-physica-blue/10 border-physica-blue/30 text-left">
          <h3 className="text-xl font-bold mb-2 text-physica-blue dark:text-white">Pro</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">Unrestricted access for serious work.</p>
        </div>
      </div>

      <div className="text-xs font-mono text-neutral-500">
        Cheaper than hiring a photographer. More reliable than enhancement.
      </div>
    </div>
  );

  const MenuContact = () => (
    <div className="max-w-2xl text-center flex flex-col items-center animate-fade-in text-neutral-900 dark:text-white">
      <blockquote className="text-3xl md:text-4xl font-serif italic font-bold mb-12">
        “Good tools invite conversation.”
      </blockquote>

      <div className="space-y-6 text-neutral-600 dark:text-neutral-400 text-sm md:text-base mb-12 max-w-lg">
        <p>
          Physica.img is actively evolving. Questions, feedback, and serious use-cases are welcome.
        </p>
        <p>
          If your message is about realism, brand imagery, or system-level improvements — it will be read.
        </p>
      </div>

      <a 
        href="mailto:busywithram@gmail.com"
        className="glass-panel px-8 py-4 text-neutral-900 dark:text-white font-mono uppercase tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
      >
        Start a conversation
      </a>

      <div className="mt-12 text-[10px] font-mono text-neutral-500 dark:text-neutral-600">
        Responses are thoughtful, not automated.
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Hamburger Trigger (Fixed Top RIGHT) */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed top-5 right-5 z-[60] w-12 h-12 flex flex-col justify-center items-center gap-1.5 group mix-blend-difference transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open Menu"
      >
        <div className="w-6 h-[2px] bg-white transition-all group-hover:w-8"></div>
        <div className="w-6 h-[2px] bg-white transition-all"></div>
        <div className="w-6 h-[2px] bg-white transition-all group-hover:w-4"></div>
      </button>

      {/* 2. Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 z-[55] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'opacity-100 visible backdrop-blur-xl bg-neutral-100/90 dark:bg-black/80' : 'opacity-0 invisible backdrop-blur-none bg-transparent'
        }`}
        onClick={closeMenu} // Close when clicking background
      >
        {/* Toggle on Mobile Menu (Top Left) */}
        <div className="absolute top-6 left-6 z-[60]">
             <ThemeToggle />
        </div>

        {/* Content Container */}
        <div 
          className="w-full h-full flex flex-col items-center justify-center p-4 relative z-0"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
        >
          {/* View Switcher Transition Wrapper */}
          <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
            {view === 'main' && <MenuMain />}
            {view === 'about' && <MenuAbout />}
            {view === 'pricing' && <MenuPricing />}
            {view === 'contact' && <MenuContact />}
          </div>

          {/* Back to Menu (if not main) */}
          {view !== 'main' && (
            <button 
              onClick={() => changeView('main')}
              className="absolute bottom-12 text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white uppercase tracking-widest transition-colors"
            >
              ← Back to Menu
            </button>
          )}
        </div>

        {/* Close Button - Placed AFTER content container and given higher z-index to ensure clickability */}
        <button 
          onClick={(e) => { e.stopPropagation(); closeMenu(); }}
          className="absolute top-5 right-5 z-50 w-12 h-12 flex items-center justify-center text-neutral-500 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </>
  );
};
