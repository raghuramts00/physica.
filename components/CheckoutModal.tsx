
import React, { useState } from 'react';

interface CheckoutModalProps {
  onClose: () => void;
  plan?: string;
  price?: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, plan = 'Pro Access', price = 19 }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '', 
    expiry: '',
    cvc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call simulation
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Order Error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/90 dark:bg-black/90 backdrop-blur-md animate-fade-in">
        <div className="glass-panel p-8 rounded-lg max-w-md w-full text-center border-green-500/30">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-serif italic font-bold mb-2 text-neutral-900 dark:text-white">Reality Unlocked</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Your order has been simulated.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-100/80 dark:bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto"
        onClick={onClose}
    >
      <div 
        className="glass-panel w-full max-w-2xl p-0 rounded-lg shadow-2xl relative bg-white dark:bg-[#0a0a0a] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-black dark:hover:text-white z-20 p-2 bg-black/5 dark:bg-black/20 rounded-full backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
            {/* Left Summary */}
            <div className="p-8 bg-neutral-50 dark:bg-white/5 border-r border-neutral-200 dark:border-white/10 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-serif italic mb-6 text-neutral-900 dark:text-white">Order Summary</h3>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-200 dark:border-white/10">
                        <div>
                            <div className="font-bold text-lg text-neutral-900 dark:text-white">{plan}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">Monthly Subscription</div>
                        </div>
                        <div className="font-mono text-xl text-neutral-900 dark:text-white">${price}</div>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <li>• Reality Lock™ Enabled</li>
                        <li>• Unlimited Generations</li>
                        <li>• Commercial License</li>
                    </ul>
                </div>
                <div className="mt-8">
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">Secure Encryption</div>
                    <div className="flex gap-2 opacity-50">
                        <div className="h-6 w-10 bg-neutral-200 dark:bg-white/10 rounded"></div>
                        <div className="h-6 w-10 bg-neutral-200 dark:bg-white/10 rounded"></div>
                        <div className="h-6 w-10 bg-neutral-200 dark:bg-white/10 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
                <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-white">Billing Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" placeholder="First Name" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                    <input name="lastName" placeholder="Last Name" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                </div>
                
                <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                
                <input name="address" placeholder="Billing Address" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                
                <div className="grid grid-cols-2 gap-4">
                    <input name="city" placeholder="City" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                    <input name="zip" placeholder="ZIP / Postal" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-white/10 mt-4">
                    <h4 className="text-sm font-bold mb-3 text-neutral-500 dark:text-neutral-400">Payment Method</h4>
                    <input name="cardNumber" placeholder="0000 0000 0000 0000" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full mb-4 font-mono" />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="expiry" placeholder="MM/YY" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                        <input name="cvc" placeholder="CVC" required onChange={handleChange} className="glass-input p-3 rounded-sm text-sm w-full" />
                    </div>
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-physica-blue text-white font-bold py-4 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all shadow-lg shadow-physica-blue/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {loading ? 'Processing...' : `Pay $${price}.00`}
                    </button>
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="w-full mt-3 py-2 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
