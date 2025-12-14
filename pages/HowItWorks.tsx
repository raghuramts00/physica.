import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      
      {/* Hero Section */}
      <section className="mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-white mb-6 tracking-tight drop-shadow-xl">
          Stop enhancing. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-physica-blue to-indigo-300">Start obeying physics.</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Most AI images look fake because they prioritize "beauty" over "reality". 
          Physica.img is a pre-generation compiler that forces models to respect the laws of optics.
        </p>
      </section>

      {/* The Problem */}
      <section className="grid md:grid-cols-2 gap-12 mb-24 items-center">
        <div>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 mb-4">The Problem</h2>
          <h3 className="text-3xl font-bold mb-4 text-white">The "Plastic" Effect</h3>
          <p className="text-neutral-400 mb-6 leading-relaxed">
            Standard prompts like "beautiful portrait, 4k, trending on artstation" confuse the model. It tries to make everything "pretty", resulting in:
          </p>
          <ul className="space-y-3">
            {[
              'Impossible skin smoothness (subsurface scattering failure)',
              'Inconsistent shadow angles (multi-source lighting errors)',
              'Textures that look like "renders" not photos',
              'Vague depth of field that defies optical physics'
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                <span className="text-red-500 font-mono mt-1">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-8 rounded-lg aspect-square flex flex-col justify-center items-center text-center bg-white/5 border-white/5">
          <div className="text-6xl mb-4 grayscale opacity-70">💅</div>
          <p className="font-mono text-sm text-neutral-500">"Enhancor" approach:</p>
          <p className="font-bold text-neutral-200 mt-2">Post-processing filters that <br/>just add noise and sharpening.</p>
        </div>
      </section>

      {/* The Solution */}
      <section className="grid md:grid-cols-2 gap-12 mb-24 items-center">
        <div className="order-2 md:order-1 glass-panel p-8 rounded-lg aspect-square flex flex-col justify-center items-center text-center text-white bg-physica-blue/10 border-physica-blue/20 box-shadow-[0_0_50px_rgba(41,39,228,0.2)]">
          <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">📐</div>
          <p className="font-mono text-sm text-neutral-400">Physica.img approach:</p>
          <p className="font-bold text-white mt-2">Pre-generation definitions of<br/>light, mass, and optics.</p>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-physica-blue mb-4">The Solution</h2>
          <h3 className="text-3xl font-bold mb-4 text-white">Reality Lock™</h3>
          <p className="text-neutral-400 mb-6 leading-relaxed">
            We don't ask the AI to "make it look real". We give it the mathematical ingredients of reality. Our compiler injects:
          </p>
          <ul className="space-y-3">
            {[
              'Single-source light vectors to force shadow consistency',
              'Micro-imperfection instructions (dust, weave, pores)',
              'Camera sensor constraints (ISO noise, focal length compression)',
              'Material physics (matte vs glossy, refraction)'
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                <span className="text-green-500 font-mono mt-1">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison Textual */}
      <section className="glass-panel p-8 md:p-12 rounded-lg mb-24 bg-white/5">
        <h3 className="text-center font-serif italic text-2xl mb-12 text-white">The Difference is in the Prompt</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-xs font-bold text-red-500 mb-2 uppercase tracking-wider">Standard Prompt</div>
            <div className="font-mono text-sm text-neutral-400 bg-black/40 p-4 border border-white/5 rounded-sm mb-4">
              "Cyberpunk girl in neon city, beautiful face, 8k, realistic, detailed, vibrant colors, cinematic lighting, masterpiece"
            </div>
            <p className="text-xs text-neutral-500">
              Result: Generic, plastic skin, conflicting shadows, looks like a video game.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold text-green-500 mb-2 uppercase tracking-wider">Physica Prompt</div>
            <div className="font-mono text-sm text-neutral-200 bg-black/40 p-4 border border-white/5 border-l-4 border-l-physica-blue rounded-sm mb-4">
              "Medium shot, eye-level camera. Person (casual stance). Lighting: Single Neon signage from Side-lighting, Hard falloff. Materials: Skin with pores, Micro scratches. Shot on High-end DSLR, 85mm lens..."
            </div>
            <p className="text-xs text-neutral-500">
              Result: Tangible texture, believable depth, consistent light direction, looks like a photograph.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link 
          to="/" 
          className="inline-block glass-panel text-white font-mono font-medium px-8 py-4 text-lg hover:bg-physica-blue/20 hover:border-physica-blue transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(41,39,228,0.4)]"
        >
          START COMPILING NOW
        </Link>
      </div>

    </div>
  );
};

export default HowItWorks;
