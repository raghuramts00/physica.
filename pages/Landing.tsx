
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutModal } from '../components/CheckoutModal';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=80", // Cinematic Portrait
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80", // Product
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"  // Architectural
];

const HEADLINES = [
  "If your images need enhancement, reality was broken earlier.",
  "Enhancers don’t fix physics.",
  "Most AI images fail before they are generated."
];

const Landing: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeHeadline, setActiveHeadline] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  // Rotators
  useEffect(() => {
    const imgInterval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    
    const textInterval = setInterval(() => {
       setActiveHeadline((prev) => (prev + 1) % HEADLINES.length);
    }, 4000);

    return () => {
      clearInterval(imgInterval);
      clearInterval(textInterval);
    };
  }, []);

  const handlePrimaryAction = () => {
    navigate('/generate');
  };

  const scrollToProof = () => {
    document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
      {/* 1️⃣ PRE-GENERATOR LANDING HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Overlay */}
          {HERO_IMAGES.map((src, index) => (
            <img 
              key={src}
              src={src}
              alt="Cinematic Reference"
              loading={index === 0 ? "eager" : "lazy"}
              className={`crossfade-img ${index === activeImage ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-white mb-6 leading-tight min-h-[160px] flex items-center justify-center transition-opacity duration-500 animate-fade-in">
             {HEADLINES[activeHeadline]}
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-sans font-light">
            Physica.img compiles reality-first prompts so your images feel photographed — not enhanced.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handlePrimaryAction}
              className="px-8 py-4 bg-physica-blue text-white font-mono text-lg font-bold tracking-wide hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)]"
            >
              COMPILE A PROMPT
            </button>
            <button 
              onClick={scrollToProof}
              className="px-8 py-4 border border-white/20 text-white font-mono text-sm hover:bg-white/10 transition-colors"
            >
              See how realism works
            </button>
          </div>
        </div>
      </section>

      {/* 5️⃣ PROOF SECTION (Why This Works) */}
      <section id="proof" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-physica-blue mb-4">Why This Works</h2>
            <h3 className="text-4xl font-serif italic font-bold mb-6 text-neutral-900 dark:text-white">Physics, not Magic.</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              We define the laws of the scene before the pixels are generated. By locking light sources, material properties, and optical constraints, we force the model to behave like a camera, not a painter.
            </p>
            
            <ul className="space-y-4">
              {[
                'Single light source vectors defined',
                'Materials obey Fresnel reflection laws',
                'Shadows align naturally with geometry',
                'No post-processing required'
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300 border-l border-neutral-300 dark:border-white/10 pl-4">
                  <span className="text-physica-blue font-mono">01</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-4 rounded-lg bg-white/40 dark:bg-black/40 relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-physica-blue to-transparent opacity-20 blur-lg group-hover:opacity-40 transition-opacity"></div>
             <img 
               src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80" 
               alt="Physics Proof" 
               className="relative rounded w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
               loading="lazy"
             />
             <div className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-black/80 backdrop-blur-md p-3 text-xs font-mono text-neutral-600 dark:text-neutral-400 border-l-2 border-physica-blue">
                Subject: Neon Lighting. Material: Wet Asphalt. Lens: 35mm.
             </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ PRICING SECTION */}
      <section id="pricing" className="py-24 bg-neutral-100/50 dark:bg-white/5 border-y border-neutral-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif italic mb-4 text-neutral-900 dark:text-white">Access Reality</h2>
            <p className="font-mono text-sm text-neutral-500 dark:text-neutral-400">Cheaper than hiring a photographer.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-panel p-8 rounded-lg flex flex-col items-start hover:border-black/20 dark:hover:border-white/20 transition-colors">
               <div className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500 mb-2">STARTER</div>
               <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Free</h3>
               <div className="text-4xl font-bold mb-6 text-neutral-900 dark:text-white">$0</div>
               <ul className="space-y-3 mb-8 flex-grow">
                 <li className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"><span>•</span> 300 credits / day</li>
                 <li className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"><span>•</span> Basic reality prompts</li>
                 <li className="flex gap-2 text-sm text-neutral-600 dark:text-neutral-300"><span>•</span> Standard optics</li>
                 <li className="flex gap-2 text-sm text-neutral-500 dark:text-neutral-500"><span>•</span> No history saved</li>
               </ul>
               <button 
                 onClick={handlePrimaryAction} 
                 className="w-full py-3 border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
               >
                 Compile Prompt
               </button>
            </div>

            {/* Pro Tier */}
            <div className="glass-panel p-8 rounded-lg flex flex-col items-start border-physica-blue/50 bg-physica-blue/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-physica-blue text-white text-xs font-bold px-3 py-1">POPULAR</div>
               <div className="text-xs font-mono font-bold text-physica-blue mb-2">PROFESSIONAL</div>
               <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Pro</h3>
               <div className="text-4xl font-bold mb-6 text-neutral-900 dark:text-white">$19<span className="text-lg font-normal text-neutral-500">/mo</span></div>
               <ul className="space-y-3 mb-8 flex-grow">
                 <li className="flex gap-2 text-sm text-neutral-900 dark:text-white"><span>✓</span> Unlimited credits</li>
                 <li className="flex gap-2 text-sm text-neutral-900 dark:text-white"><span>✓</span> Reality Lock™ Advanced Rules</li>
                 <li className="flex gap-2 text-sm text-neutral-900 dark:text-white"><span>✓</span> Brand & Product Modes</li>
                 <li className="flex gap-2 text-sm text-neutral-900 dark:text-white"><span>✓</span> Save Presets</li>
               </ul>
               <button 
                 onClick={() => setShowCheckout(true)}
                 className="w-full py-3 bg-physica-blue text-white font-medium hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors shadow-lg shadow-physica-blue/20"
               >
                 Upgrade Access
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* About / Manifesto */}
      <section id="about" className="py-24 px-4 text-center max-w-3xl mx-auto">
         <div className="w-16 h-1 bg-black/10 dark:bg-white/20 mx-auto mb-8"></div>
         <p className="text-xl md:text-2xl font-serif italic text-neutral-600 dark:text-neutral-300 leading-relaxed">
           "We believe that AI shouldn't be about hallucinations. It should be about calculation. Physica.img is our attempt to bring the rigid beauty of the physical world into the latent space."
         </p>
      </section>

    </div>
  );
};

export default Landing;
