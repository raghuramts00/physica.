
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  INITIAL_STATE, PromptState 
} from '../types';
import { 
  SHOT_TYPES, CAMERA_ANGLES, SUBJECT_TYPES, SUBJECT_DETAILS, 
  EMOTIONS, LIGHT_SOURCES, LIGHT_DIRECTIONS, LIGHT_QUALITIES, 
  MATERIALS, IMPERFECTIONS, ENVIRONMENTS, ENVIRONMENT_EXTRAS, 
  COLOR_GRADINGS, LENSES, CAMERA_TYPES, STYLES,
  PERSON_SEXES, PERSON_AGES, PERSON_ETHNICITIES, PERSON_SKIN_TONES, 
  PERSON_BODY_TYPES, PERSON_HAIR_LENGTHS, PERSON_HAIR_TEXTURES, 
  PERSON_HAIR_COLORS, PERSON_FABRICS, PERSON_FACIAL_FEATURES, 
  PERSON_ACCESSORIES, PERSON_CLOTHING_COLORS
} from '../constants';
import { FormSection, Select, Label, Checkbox, TextArea } from '../components/FormComponents';
import { CheckoutModal } from '../components/CheckoutModal';

// API Configuration
const API_KEY = "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";
const MODEL = "openai/gpt-oss-120b:free";

// Timeline Steps
const TIMELINE_STEPS = [
  "Analyzing camera & framing",
  "Locking light direction",
  "Applying material behavior",
  "Enforcing physical constraints",
  "Compiling reality-first prompt"
];

const Generator: React.FC = () => {
  const [state, setState] = useState<PromptState>(INITIAL_STATE);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [justCopied, setJustCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [compilationStep, setCompilationStep] = useState(0); // 0 = idle, 1-5 = steps
  const [showPhysicsWhy, setShowPhysicsWhy] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const { user, deductCredits } = useAuth();
  const hasCredits = (user?.credits || 0) >= 100;

  // Credit Blocking Modal (Internal Component)
  const CreditModal: React.FC = () => (
    <div className="absolute inset-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
      <div className="text-center max-w-sm p-6 glass-panel rounded-lg border-red-900/50">
        <div className="text-4xl mb-4">⏸️</div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Your reality access is paused.</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">Enhancers won’t fix broken physics. Upgrade to continue generating physically correct prompts.</p>
        <button 
          onClick={() => setShowCheckout(true)}
          className="w-full py-3 bg-physica-blue text-white font-medium hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
        >
          Upgrade Access
        </button>
      </div>
    </div>
  );

  // Reset subject detail when subject type changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      subjectDetail: SUBJECT_DETAILS[prev.subjectType].options[0]
    }));
  }, [state.subjectType]);

  const updateState = <K extends keyof PromptState>(key: K, value: PromptState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'materials' | 'environmentOptions' | 'styles' | 'personFacialFeatures' | 'personAccessories', item: string) => {
    setState(prev => {
      const current = prev[key];
      const exists = current.includes(item);
      return {
        ...prev,
        [key]: exists ? current.filter(i => i !== item) : [...current, item]
      };
    });
  };

  const constructLocalPrompt = () => {
    // Basic prefix
    const cameraSegment = `${state.shotType}, ${state.cameraAngle} camera`;
    
    // Subject Segment Logic
    let subjectSegment = '';
    
    if (state.subjectType === 'Person') {
        // [age group] [sex if selected] [ethnicity if selected] person
        const age = state.personAge.split(' (')[0].toLowerCase();
        const sex = state.personSex === 'Non-specified' ? '' : state.personSex.toLowerCase();
        const ethnicity = state.personEthnicity === 'Not specified' ? '' : state.personEthnicity;
        
        // Hair description
        const hairDesc = `${state.personHairColor.toLowerCase()} ${state.personHairTexture.toLowerCase()} ${state.personHairLength === 'Tied' ? 'tied back loosely' : state.personHairLength.toLowerCase() + ' hair'}`;
        
        // Clothing description
        const secondary = state.personClothingSecondary ? ` over a ${state.personClothingSecondary}` : '';
        const clothingDesc = `wearing a ${state.personClothingFabric.toLowerCase()} ${state.personClothingPrimary}${secondary} in ${state.personClothingColor.toLowerCase()} tones`;
        
        // Features
        const features = state.personFacialFeatures.length > 0 ? `, ${state.personFacialFeatures.join(', ')}` : '';
        const accessories = state.personAccessories.length > 0 && !state.personAccessories.includes('None') ? `, wearing ${state.personAccessories.join(', ')}` : '';
        
        subjectSegment = `${age} ${sex} ${ethnicity} person, with ${hairDesc}, ${state.personBodyType.toLowerCase()} build, ${clothingDesc}, ${state.personSkinTone.toLowerCase()} skin tone${features}${accessories}`.replace(/\s+/g, ' ').trim();
        
        // Add emotion prefix if selected
        if (state.emotion !== 'Neutral') {
            subjectSegment = `${state.emotion} expression, ${subjectSegment}`;
        }

    } else {
        // Fallback for non-Person
        subjectSegment = `${state.subjectType === 'Fashion Model' ? state.emotion : ''} ${state.subjectType} (${state.subjectDetail})`.trim();
    }

    const segments = [
      cameraSegment,
      subjectSegment,
      `Lighting: Single ${state.lightSource} from ${state.lightDirection}, ${state.lightQuality} falloff`,
      state.materials.length > 0 ? `Materials: ${state.materials.join(', ')}` : '',
      "physically accurate shadows, ray-traced reflections, conservation of energy lighting, no synthetic smoothing, authentic surface scattering",
      `Environment: ${state.environment}${state.environmentOptions.length > 0 ? ', ' + state.environmentOptions.join(', ') : ''}`,
      `Color Grade: ${state.colorGrading}`,
      `Shot on ${state.cameraType}, ${state.lens} lens`,
      state.styles.length > 0 ? `Style: ${state.styles.join(', ')}` : '',
      state.extraDetails ? `Details: ${state.extraDetails}` : ''
    ];
    return segments.filter(s => s.trim().length > 0).join('. ') + ".";
  };

  const handleGenerate = async () => {
    if (!deductCredits(100)) return;

    setIsGenerating(true);
    setGeneratedPrompt('');
    setCompilationStep(1);

    // 1. Start Animation Sequence
    const stepDuration = 500; // ms per step
    const animationPromise = new Promise<void>(resolve => {
        let currentStep = 1;
        const interval = setInterval(() => {
            currentStep++;
            setCompilationStep(currentStep);
            if (currentStep >= TIMELINE_STEPS.length) {
                clearInterval(interval);
                resolve();
            }
        }, stepDuration);
    });

    // 2. Start API Call Parallel
    const apiPromise = (async () => {
        try {
            const systemPrompt = `
You are the Physica.img Physics Engine. Your goal is to compile a raw, highly technical image generation prompt.
You DO NOT write poetry. You DO NOT write conversational text.
You only output comma-separated, weighted technical descriptions.

RULES:
1. STRICT PHYSICS: Enforce the user's lighting choice. If they chose "Hard Light", describe sharp shadow terminators.
2. OPTICS: Describe the lens characteristics (e.g. 85mm compression, bokeh, barrel distortion).
3. MATERIALS: Describe micro-textures (pores, scratches, dust) to prevent "smooth AI look".
4. NO FLUFF: Ban words like "masterpiece", "best quality", "breathtaking".
5. FORMAT: [Camera/Lens] -> [Subject/Action] -> [Lighting Physics] -> [Material/Texture] -> [Environment] -> [Color/Mood].
`;
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.href,
                    "X-Title": "Physica.img",
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: `Compile parameters into physics prompt:\n${JSON.stringify(state)}` }
                    ],
                    temperature: 0.7,
                })
            });

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim();
            }
            return constructLocalPrompt();
        } catch (error) {
            console.error("Generation error:", error);
            return constructLocalPrompt();
        }
    })();

    const [_, finalPrompt] = await Promise.all([animationPromise, apiPromise]);
    setGeneratedPrompt(finalPrompt);
    setIsGenerating(false);
    setCompilationStep(0);
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };
  
  // --- SHARE ARTIFACT GENERATOR ---
  const generateShareCard = async (): Promise<Blob | null> => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // 4:5 Aspect Ratio
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Background
    const gradient = ctx.createLinearGradient(0, 0, 0, 1350);
    gradient.addColorStop(0, '#050505');
    gradient.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Header
    ctx.font = 'bold 48px "Playfair Display", serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("Physica.img", 80, 120);
    
    ctx.font = '24px "Instrument Sans", sans-serif';
    ctx.fillStyle = '#4F46E5'; // Physica Blue
    ctx.fillText("REALITY LOCK™ ACTIVE", 80, 170);

    // 3. Grid Lines (Decoration)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 220);
    ctx.lineTo(1000, 220);
    ctx.stroke();

    // 4. Prompt Text (Wrapped)
    ctx.font = '36px "JetBrains Mono", monospace';
    ctx.fillStyle = '#e5e5e5';
    const words = generatedPrompt.split(' ');
    let line = '';
    let y = 300;
    const maxWidth = 920;
    const lineHeight = 55;

    // Simulate "..." if too long
    const maxLines = 12;
    let lineCount = 0;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, 80, y);
            line = words[i] + ' ';
            y += lineHeight;
            lineCount++;
            if (lineCount >= maxLines) {
               line = "... [Prompt continues]";
               break;
            }
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, 80, y);

    // 5. Physics Stats (Footer Area)
    const statsY = 1100;
    
    // Draw Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(80, statsY, 920, 180);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(80, statsY, 920, 180);

    // Column 1: Light
    ctx.font = 'bold 24px "Instrument Sans", sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText("LIGHT SOURCE", 120, statsY + 60);
    ctx.font = '32px "Instrument Sans", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(state.lightSource, 120, statsY + 110);

    // Column 2: Material
    ctx.font = 'bold 24px "Instrument Sans", sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText("MATERIAL PHYSICS", 500, statsY + 60);
    ctx.font = '32px "Instrument Sans", sans-serif';
    ctx.fillStyle = '#fff';
    // Just grab first material or generic
    const matText = state.materials.length > 0 ? state.materials[0] : "Standard";
    ctx.fillText(matText, 500, statsY + 110);

    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  };

  const handleShare = async () => {
      if (!generatedPrompt) return;
      setIsSharing(true);

      try {
        const blob = await generateShareCard();
        if (!blob) throw new Error("Canvas failed");

        const file = new File([blob], "physica-prompt-card.png", { type: "image/png" });
        const caption = `Compiled with Physica.img. Realism starts before generation.\n\n${generatedPrompt.substring(0, 100)}...`;

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
             await navigator.share({
                 title: 'Physica.img Reality Prompt',
                 text: caption,
                 files: [file]
             });
        } else {
             // Fallback: Download
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = 'physica-prompt-card.png';
             a.click();
             URL.revokeObjectURL(url);
             
             // Copy Caption
             navigator.clipboard.writeText(caption);
             alert("Image downloaded! Caption copied to clipboard.");
        }
      } catch (e) {
        console.error("Share failed", e);
        copyToClipboard();
        alert("Could not generate card. Prompt copied to clipboard instead.");
      } finally {
        setIsSharing(false);
      }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
      
      {!hasCredits && <CreditModal />}
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}

      {/* Left Column - The Form */}
      <div className={`lg:col-span-7 space-y-2 ${!hasCredits ? 'opacity-20 pointer-events-none' : ''}`}>
        <div className="mb-8 glass-panel p-8 rounded-lg border-white/5 bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent">
          <h1 className="text-4xl font-serif font-bold italic text-neutral-900 dark:text-white mb-2">Generate Reality</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Configure physical parameters. The AI Physics Engine will compile a photon-accurate prompt.</p>
        </div>

        {/* 1️⃣ CAMERA & SHOT */}
        <FormSection number={1} title="Camera & Perspective" required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="Shot Type" 
              value={state.shotType}
              onChange={(e) => updateState('shotType', e.target.value as any)}
            >
              {SHOT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select 
              label="Camera Angle"
              value={state.cameraAngle}
              onChange={(e) => updateState('cameraAngle', e.target.value as any)}
            >
              {CAMERA_ANGLES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>
        </FormSection>

        {/* 2️⃣ SUBJECT */}
        <FormSection number={2} title="Subject Configuration" required>
          <div className="mb-6">
            <Select 
              label="Subject Type"
              value={state.subjectType}
              onChange={(e) => updateState('subjectType', e.target.value as any)}
            >
              {SUBJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>

          {state.subjectType === 'Person' ? (
            <div className="glass-panel p-6 rounded bg-white/30 dark:bg-white/5 border-l-2 border-physica-blue animate-fade-in">
                <div className="mb-4 text-xs font-mono text-physica-blue uppercase tracking-widest">
                    Reality Matrix: Person
                </div>
                
                {/* Demographics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Select label="Age Group" value={state.personAge} onChange={(e) => updateState('personAge', e.target.value as any)}>
                        {PERSON_AGES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Select label="Biological Sex" value={state.personSex} onChange={(e) => updateState('personSex', e.target.value as any)}>
                        {PERSON_SEXES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Select label="Ethnicity / Heritage" value={state.personEthnicity} onChange={(e) => updateState('personEthnicity', e.target.value as any)}>
                        {PERSON_ETHNICITIES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                </div>

                {/* Body & Skin */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <Select label="Body Type" value={state.personBodyType} onChange={(e) => updateState('personBodyType', e.target.value as any)}>
                        {PERSON_BODY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Select label="Skin Tone" value={state.personSkinTone} onChange={(e) => updateState('personSkinTone', e.target.value as any)}>
                        {PERSON_SKIN_TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                </div>

                {/* Hair */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-black/10 dark:border-white/10">
                     <Select label="Hair Length" value={state.personHairLength} onChange={(e) => updateState('personHairLength', e.target.value as any)}>
                        {PERSON_HAIR_LENGTHS.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                     <Select label="Hair Texture" value={state.personHairTexture} onChange={(e) => updateState('personHairTexture', e.target.value as any)}>
                        {PERSON_HAIR_TEXTURES.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                    <Select label="Hair Color" value={state.personHairColor} onChange={(e) => updateState('personHairColor', e.target.value as any)}>
                        {PERSON_HAIR_COLORS.map(t => <option key={t} value={t}>{t}</option>)}
                    </Select>
                </div>

                {/* Clothing */}
                <div className="mb-4">
                    <Label>Clothing Layers</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <input 
                            placeholder="Primary (e.g. Jacket, Dress)" 
                            className="glass-input p-3 rounded-sm text-sm"
                            value={state.personClothingPrimary}
                            onChange={(e) => updateState('personClothingPrimary', e.target.value)}
                        />
                        <input 
                            placeholder="Secondary (e.g. T-shirt)" 
                            className="glass-input p-3 rounded-sm text-sm"
                            value={state.personClothingSecondary}
                            onChange={(e) => updateState('personClothingSecondary', e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                         <Select label="Material / Fabric" value={state.personClothingFabric} onChange={(e) => updateState('personClothingFabric', e.target.value as any)}>
                            {PERSON_FABRICS.map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                        <Select label="Tone Palette" value={state.personClothingColor} onChange={(e) => updateState('personClothingColor', e.target.value as any)}>
                            {PERSON_CLOTHING_COLORS.map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                    </div>
                </div>

                {/* Imperfections & Accessories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/10 dark:border-white/10">
                    <div>
                        <Label>Facial Realism</Label>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                            {PERSON_FACIAL_FEATURES.map(m => (
                                <Checkbox 
                                    key={m} 
                                    label={m} 
                                    checked={state.personFacialFeatures.includes(m)}
                                    onChange={() => toggleArrayItem('personFacialFeatures', m)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>Accessories</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {PERSON_ACCESSORIES.map(m => (
                                <Checkbox 
                                    key={m} 
                                    label={m} 
                                    checked={state.personAccessories.includes(m)}
                                    onChange={() => toggleArrayItem('personAccessories', m)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
          ) : (
             <Select 
              label={SUBJECT_DETAILS[state.subjectType].label}
              value={state.subjectDetail}
              onChange={(e) => updateState('subjectDetail', e.target.value)}
            >
              {SUBJECT_DETAILS[state.subjectType].options.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          )}
        </FormSection>

        {/* 3️⃣ EMOTION */}
        <FormSection number={3} title="Emotional Context">
           <Select 
              label="Primary Emotion"
              value={state.emotion}
              onChange={(e) => updateState('emotion', e.target.value as any)}
            >
              {EMOTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
        </FormSection>

        {/* 4️⃣ LIGHTING */}
        <FormSection number={4} title="Lighting Physics" required>
          <div className="glass-panel border-l-4 border-l-physica-blue p-4 rounded mb-4 text-xs text-blue-600 dark:text-blue-200 font-medium">
            ⚠️ PHYSICS ENFORCED: Only ONE primary light source allowed to ensure consistent shadow casting.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select 
              label="Source"
              value={state.lightSource}
              onChange={(e) => updateState('lightSource', e.target.value as any)}
            >
              {LIGHT_SOURCES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select 
              label="Direction"
              value={state.lightDirection}
              onChange={(e) => updateState('lightDirection', e.target.value as any)}
            >
              {LIGHT_DIRECTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select 
              label="Quality"
              value={state.lightQuality}
              onChange={(e) => updateState('lightQuality', e.target.value as any)}
            >
              {LIGHT_QUALITIES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>
        </FormSection>

        {/* 5️⃣ MATERIALS & TEXTURE */}
        <FormSection number={5} title="Surface & Imperfections">
          <div className="space-y-4">
            <div>
              <Label>Base Materials</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {MATERIALS.map(m => (
                  <Checkbox 
                    key={m} 
                    label={m} 
                    checked={state.materials.includes(m)}
                    onChange={() => toggleArrayItem('materials', m)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label>Physical Imperfections</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {IMPERFECTIONS.map(m => (
                  <Checkbox 
                    key={m} 
                    label={m} 
                    checked={state.materials.includes(m)}
                    onChange={() => toggleArrayItem('materials', m)}
                  />
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* 6️⃣ PHYSICS LOCK */}
        <FormSection number={6} title="Reality Lock™" locked>
          <div className="glass-panel rounded p-4 space-y-2 bg-black/5 dark:bg-black/20">
             <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <span className="text-green-500">✓</span> Single Light Source
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <span className="text-green-500">✓</span> Conservation of Energy
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <span className="text-green-500">✓</span> Fresnel Reflections
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <span className="text-green-500">✓</span> Subsurface Scattering
             </div>
             <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <span className="text-red-500">✕</span> Synthetic Smoothing Blocked
             </div>
          </div>
        </FormSection>

        {/* 7️⃣ ENVIRONMENT */}
        <FormSection number={7} title="Environment">
          <div className="space-y-4">
             <Select 
              label="Setting"
              value={state.environment}
              onChange={(e) => updateState('environment', e.target.value as any)}
            >
              {ENVIRONMENTS.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            <div className="grid grid-cols-2 gap-2">
               {ENVIRONMENT_EXTRAS.map(m => (
                  <Checkbox 
                    key={m} 
                    label={m} 
                    checked={state.environmentOptions.includes(m)}
                    onChange={() => toggleArrayItem('environmentOptions', m)}
                  />
                ))}
            </div>
          </div>
        </FormSection>

        {/* 8️⃣ COLOR GRADING */}
        <FormSection number={8} title="Color Science">
           <Select 
              label="Look Up Table (LUT)"
              value={state.colorGrading}
              onChange={(e) => updateState('colorGrading', e.target.value as any)}
            >
              {COLOR_GRADINGS.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
        </FormSection>

        {/* 9️⃣ LENS & CAMERA */}
        <FormSection number={9} title="Optical Equipment">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="Focal Length" 
              value={state.lens}
              onChange={(e) => updateState('lens', e.target.value as any)}
            >
              {LENSES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select 
              label="Sensor / Medium"
              value={state.cameraType}
              onChange={(e) => updateState('cameraType', e.target.value as any)}
            >
              {CAMERA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </Select>
          </div>
        </FormSection>

        {/* 🔟 STYLE */}
        <FormSection number={10} title="Aesthetic Layer">
           <div className="grid grid-cols-2 gap-2 mt-2">
                {STYLES.map(m => (
                  <Checkbox 
                    key={m} 
                    label={m} 
                    checked={state.styles.includes(m)}
                    onChange={() => toggleArrayItem('styles', m)}
                  />
                ))}
            </div>
        </FormSection>

        {/* 1️⃣1️⃣ EXTRA DETAILS */}
        <FormSection number={11} title="Additional Physics">
            <TextArea 
              label="Specific details (props, clothing, era, weather specifics)"
              placeholder="e.g. wearing a 1980s wool trench coat, rain droplets on the lens, condensation on the window..."
              value={state.extraDetails}
              onChange={(e) => updateState('extraDetails', e.target.value)}
            />
        </FormSection>

        <div className="pt-8 pb-20">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !hasCredits}
            className="w-full glass-panel border border-physica-blue/50 text-physica-blue dark:text-white font-mono font-medium py-4 text-lg hover:bg-physica-blue hover:text-white hover:border-physica-blue transition-all duration-300 shadow-[0_0_20px_rgba(41,39,228,0.3)] hover:shadow-[0_0_40px_rgba(41,39,228,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 backdrop-blur-xl"
          >
            {isGenerating ? (
              <>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
                COMPILING...
              </>
            ) : (
              'COMPILE PROMPT (-100 CREDITS)'
            )}
          </button>
        </div>

      </div>

      {/* Right Column - Sticky Output */}
      <div className="lg:col-span-5 relative">
        <div className="sticky top-24 space-y-6">
          
          <div className="glass-panel p-6 shadow-2xl rounded-lg border-t border-t-white/10 relative overflow-hidden bg-white/50 dark:bg-black/50">
            
            {/* Timeline Overlay */}
            {compilationStep > 0 && (
                <div className="absolute inset-0 bg-[#f0f0f0] dark:bg-[#050505] z-20 flex flex-col justify-center items-start p-10 animate-fade-in">
                    {TIMELINE_STEPS.map((step, index) => (
                        <div 
                            key={index} 
                            className={`flex items-center gap-4 mb-4 font-mono text-sm transition-all duration-500 ${index + 1 === compilationStep ? 'text-neutral-900 dark:text-white opacity-100 scale-105' : index + 1 < compilationStep ? 'text-physica-blue opacity-50' : 'text-neutral-400 dark:text-neutral-700 opacity-30'}`}
                        >
                            <div className={`w-2 h-2 rounded-full ${index + 1 <= compilationStep ? 'bg-physica-blue' : 'bg-neutral-300 dark:bg-neutral-800'}`}></div>
                            {step}...
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">Compiler Output</h2>
              <div className={`h-2 w-2 rounded-full ${isGenerating ? 'bg-yellow-400 animate-bounce' : 'bg-green-500 animate-pulse'}`}></div>
            </div>
            
            <div className="min-h-[200px] bg-white/50 dark:bg-black/40 border border-neutral-200 dark:border-white/5 p-4 mb-4 font-mono text-sm leading-relaxed text-neutral-800 dark:text-neutral-300 break-words whitespace-pre-wrap relative rounded shadow-inner">
              {generatedPrompt || <span className="text-neutral-400 dark:text-neutral-600 opacity-50">...awaiting parameters...</span>}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={copyToClipboard}
                disabled={!generatedPrompt || isGenerating}
                className={`flex-1 py-3 font-medium text-sm border rounded transition-all ${
                  justCopied 
                  ? 'bg-green-600/20 border-green-600 text-green-600 dark:text-green-500' 
                  : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {justCopied ? 'COPIED' : 'COPY'}
              </button>
              <button
                onClick={handleShare}
                disabled={!generatedPrompt || isGenerating || isSharing}
                className="flex-1 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white font-medium text-sm rounded hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                 {isSharing ? 'GENERATING...' : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        SHARE CARD
                    </>
                 )}
              </button>
            </div>
            {generatedPrompt && (
                <div className="mt-4 text-center">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-600 tracking-widest">Physica.img Protected</span>
                </div>
            )}
          </div>

          <div className="glass-panel rounded-lg overflow-hidden">
             <button 
                onClick={() => setShowPhysicsWhy(!showPhysicsWhy)}
                className="w-full flex items-center justify-between p-4 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
             >
                <span className="text-sm font-bold text-neutral-900 dark:text-white">Why This Works</span>
                <span className="text-xl text-neutral-500 dark:text-neutral-400">{showPhysicsWhy ? '−' : '+'}</span>
             </button>
             
             {showPhysicsWhy && (
                <div className="p-6 bg-white/30 dark:bg-black/40 animate-fade-in">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    This prompt bypasses the AI's "aesthetic engine" and forces its "physics engine". By defining light falloff, material reflectivity, and camera optics first, we prevent the plastic, over-smoothed "AI look".
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono rounded text-neutral-500 dark:text-neutral-300">OPTICS</span>
                        <span className="px-2 py-1 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono rounded text-neutral-500 dark:text-neutral-300">PHYSICS</span>
                        <span className="px-2 py-1 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono rounded text-neutral-500 dark:text-neutral-300">LIGHT</span>
                        <span className="px-2 py-1 bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono rounded text-neutral-500 dark:text-neutral-300">LENS</span>
                    </div>
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Generator;
