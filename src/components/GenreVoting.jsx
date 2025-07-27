import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import axios from 'axios';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Documentary', 'Horror', 
  'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Independent'
];

const SURPRISE_CHANNELS = [
  'https://youtu.be/OrOYvVf6tIM?si=iA1g2OHZEW8w7Ygp'
];

const GenreVoting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    genre: '',
    email: '',
    friendEmail: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastChannel, setLastChannel] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin status is stored in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.genre) newErrors.genre = 'Please select a genre';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.friendEmail && !/\S+@\S+\.\S+/.test(formData.friendEmail)) {
      newErrors.friendEmail = 'Please enter a valid email';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Please accept the terms';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }

    let data={
      friendEmail: formData.friendEmail,
      email: formData.email,
      genre: formData.genre
    };

    try {
      const response = axios.post(`${import.meta.env.VITE_API_BASE_URL}/genre`, data);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSurpriseMe = () => {
    let randomChannel;
    
    if (SURPRISE_CHANNELS.length === 1) {
      if (lastChannel) {
        window.close(lastChannel);
      }
      randomChannel = SURPRISE_CHANNELS[0];
    } else {
      let newChannel;
      do {
        newChannel = SURPRISE_CHANNELS[Math.floor(Math.random() * SURPRISE_CHANNELS.length)];
      } while (newChannel === lastChannel && SURPRISE_CHANNELS.length > 1);
      randomChannel = newChannel;
    }

    const newWindow = window.open(randomChannel, '_blank');
    setLastChannel(newWindow);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setFormData({
      genre: '',
      email: '',
      friendEmail: '',
      acceptTerms: false
    });
    setErrors({});
  };

  // If user is admin, don't show the voting button
  if (isAdmin) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 transition-all duration-300
                 md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[40px]
                 md:py-4 md:px-2 md:rounded-l-lg
                 md:hover:-translate-x-1 md:shadow-lg md:hover:shadow-xl
                 bottom-0 py-3 px-4 w-full
                 bg-tertiary text-tertiary font-semibold text-sm"
        aria-label="Open genre voting"
        style={{backgroundColor:"#fda400", color:"#2a0829"}}
        
      >
        <div className="hidden md:block writing-mode-vertical h-[200px] text-center">
          Vote for your favorite genre!
        </div>
        <div className="md:hidden writing-mode-horizontal">
          Vote for your favorite genre!
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div
            className="bg-primary/95 rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300
                     animate-[fadeIn_0.3s_ease-out]"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-light/50 hover:text-light transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold mb-2" style={{color:"#fda400"}}>Vote for Your Favorite Genre</h2>
                <p className="text-light/80 text-sm mb-6">Your vote will help us determine which films to bring to the platform first.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-light mb-2">
                      Select Genre
                    </label>
                    <select
                      id="genre"
                      name="genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                        errors.genre ? 'border-red-500' : 'border-white/20'
                      } text-white focus:outline-none focus:border-secondary`}
                    >
                      <option value="">Select a genre</option>
                      {GENRES.map(genre => (
                        <option key={genre} value={genre} className="bg-primary">
                          {genre}
                        </option>
                      ))}
                    </select>
                    {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
                    
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-light mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                        errors.email ? 'border-red-500' : 'border-white/20'
                      } text-white focus:outline-none focus:border-secondary`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    
                  </div>

                  <div>
                    <label htmlFor="friendEmail" className="block text-sm font-medium text-light mb-2">
                      Recommend to a Friend (Optional)
                    </label>
                    <input
                      type="email"
                      id="friendEmail"
                      name="friendEmail"
                      value={formData.friendEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                        errors.friendEmail ? 'border-red-500' : 'border-white/20'
                      } text-white focus:outline-none focus:border-secondary`}
                      placeholder="friend@email.com"
                    />
                    {errors.friendEmail && <p className="text-red-500 text-sm mt-1">{errors.friendEmail}</p>}
                    
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-light/90">
                      By submitting this form, you agree to receive marketing and promotional emails from FylmTV regarding upcoming films, events, and offers.
                    </label>
                  </div>
                  {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
                  

                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg text-white font-semibold"
                    style={{
                      backgroundColor: "#fda400",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Submit Vote
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-secondary text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2">Thanks for voting!</h3>
                <p className="text-light/90 mb-8">
                  We appreciate your input in shaping the future of FylmTV.
                </p>
                <button
                  onClick={handleSurpriseMe}
                  className="btn-secondary flex items-center justify-center gap-2 mx-auto group hover:scale-105 transition-transform duration-300"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  Surprise Me!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GenreVoting;