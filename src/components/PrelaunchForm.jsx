import React from 'react';
import { Mail } from 'lucide-react';
import axios from 'axios';

export default function PrelaunchForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: ''
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Get API URL - use environment variable or fallback
  const getApiUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    
    if (envUrl) {
      return envUrl;
    }
    
    // For Vercel deployment, use the Render API URL
    if (import.meta.env.PROD) {
      return 'https://fylmlanding.onrender.com';
    }
    
    // For development, use localhost
    return 'http://localhost:3002';
  };

  React.useEffect(() => {
    const handleSetRole = (event) => {
      setFormData(prev => ({ ...prev, role: event.detail }));
    };

    window.addEventListener('setFormRole', handleSetRole);
    return () => {
      window.removeEventListener('setFormRole', handleSetRole);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let data = {
      name: formData.name,
      email: formData.email,
      role: formData.role
    };

    try {
      const URL = getApiUrl();
      const response = await axios.post(`${URL}/users`, data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="prelaunch-form" className="section bg-gradient-to-b from-primary to-dark">
      <div className="container max-w-4xl">
        <div className="bg-white/5 p-8 md:p-12 rounded-2xl backdrop-blur-sm">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <Mail className="mx-auto mb-4" size={48} style={{color:"#fda400"}}/>
                <h2 className="text-3xl font-bold mb-4">Want early access?</h2>
                <p className="text-light/90">
                  Sign up now and be the first to watch, submit, and connect with indie film's best.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-light mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white placeholder-white/50 focus:outline-none focus:border-secondary"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-light mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white placeholder-white/50 focus:outline-none focus:border-secondary"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-light mb-2">
                    I am a...
                  </label>
                  <select
                    id="role"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white focus:outline-none focus:border-secondary"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="" className="bg-primary">Select your role</option>
                    <option value="viewer" className="bg-primary">Viewer</option>
                    <option value="filmmaker" className="bg-primary">Filmmaker</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-2 bg-[#fda400] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#fda400]/90 focus:ring-2 focus:ring-[#fda400]/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up – No Spam, Just Indie Gold'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-secondary mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">You're in!</h3>
              <p className="text-light/90">
                Welcome to the indie film revolution. We'll keep you posted on all the good stuff!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

