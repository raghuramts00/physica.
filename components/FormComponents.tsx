
import React from 'react';

interface SectionProps {
  number: number;
  title: string;
  required?: boolean;
  children: React.ReactNode;
  locked?: boolean;
}

export const FormSection: React.FC<SectionProps> = ({ number, title, required, children, locked }) => (
  <div className={`mb-12 relative ${locked ? 'opacity-80' : ''}`}>
    <div className="flex items-baseline gap-3 mb-6">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${locked ? 'bg-physica-blue text-white' : 'bg-neutral-200 dark:bg-white text-black'}`}>
        {locked ? '🔒' : number}
      </div>
      <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
        {title}
        {required && <span className="ml-2 text-xs text-physica-blue font-mono align-top">*REQ</span>}
        {locked && <span className="ml-2 text-xs text-physica-blue font-mono align-top">REALITY LOCK™ ACTIVE</span>}
      </h3>
    </div>
    <div className={`pl-9 ${locked ? 'pointer-events-none select-none' : ''}`}>
      {children}
    </div>
  </div>
);

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
    {children}
  </label>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, className, ...props }) => (
  <div className="w-full">
    {label && <Label>{label}</Label>}
    <div className="relative">
      <select
        className={`w-full appearance-none glass-input py-3 px-4 pr-8 rounded-sm text-sm font-medium ${className}`}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500 dark:text-neutral-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => (
  <label className="inline-flex items-center cursor-pointer group">
    <div className="relative flex items-center">
        <input 
        type="checkbox" 
        className="peer appearance-none h-4 w-4 border border-neutral-400 dark:border-neutral-600 rounded-sm bg-black/5 dark:bg-black/30 checked:bg-physica-blue checked:border-physica-blue focus:outline-none transition-colors duration-200 mr-2 cursor-pointer" 
        {...props}
        />
        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
    </div>
    <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors select-none">{label}</span>
  </label>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="w-full">
    {label && <Label>{label}</Label>}
    <textarea
      className={`w-full glass-input py-3 px-4 rounded-sm text-sm font-medium resize-y min-h-[100px] ${className}`}
      {...props}
    />
  </div>
);
