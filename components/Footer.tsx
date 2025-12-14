import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-8 glass-panel mt-auto backdrop-blur-sm bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <div className="font-mono text-neutral-400">
          PHYSICA.IMG © {new Date().getFullYear()}
        </div>
        <div className="flex gap-4 text-neutral-400">
          <span>REALITY FIRST</span>
          <span>NO ENHANCERS</span>
          <span>PURE PHYSICS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
