import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { Film, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { submitFilmIdea, getSubmissionCount, checkBlockedDomain } from '../utils/filmIdeaUtils';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Documentary', 'Horror', 
  'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Independent'
].map(genre => ({ value: genre, label: genre }));

const SubmitFilmIdea = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    submitter_name: '',
    submitter_email: '',
    submitter_phone: '',
    submitter_career: '',
    idea_name: '',
    genres: [],
    description: '',
    contact_agreed: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    // Get submission count for the email
    if (formData.submitter_email) {
      getSubmissionCount(formData.submitter_email)
        .then(count => setSubmissionCount(count))
        .catch(console.error);
    }
  }, [formData.submitter_email]);

  const validateForm = async () => {
    const newErrors = {};

    if (!formData.submitter_name.trim()) {
      newErrors.submitter_name = 'Name is required';
    }

    if (!formData.submitter_email.trim()) {
      newErrors.submitter_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.submitter_email)) {
      newErrors.submitter_email = 'Please enter a valid email address';
    } else {
      const isBlocked = await checkBlockedDomain(formData.submitter_email);
      if (isBlocked) {
        newErrors.submitter_email = 'Please use a non-disposable email address';
      }
    }

    if (!formData.idea_name.trim()) {
      newErrors.idea_name = 'Film idea name is required';
    } else if (formData.idea_name.length > 45) {
      newErrors.idea_name = 'Film idea name must be 45 characters or less';
    }

    if (formData.genres.length === 0) {
      newErrors.genres = 'Please select at least one genre';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 100) {
      newErrors.description = 'Description must be at least 100 characters';
    }

    if (!formData.contact_agreed) {
      newErrors.contact_agreed = 'Please agree to be contacted';
    }

    if (submissionCount >= 2) {
      newErrors.limit = 'You have reached the maximum number of submissions for today';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (submitting) return;
    setSubmitting(true);

    try {
      const isValid = await validateForm();
      if (!isValid) {
        setSubmitting(false);
        return;
      }

      // Verify reCAPTCHA
      let token = null;
      if (executeRecaptcha) {
        try {
          token = await executeRecaptcha('submit_film_idea');
        } catch (error) {
          console.error('reCAPTCHA error:', error);
          // Continue without reCAPTCHA if it fails
        }
      }
      
      // Submit film idea
      const result = await submitFilmIdea({
        ...formData,
        genres: formData.genres.map(g => g.value)
      });

      setReferenceNumber(result.reference_number);
      setSubmitted(true);

    } catch (error) {
      console.error('Error submitting film idea:', error);
      toast.error('Failed to submit film idea. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      submitter_name: '',
      submitter_email: '',
      submitter_phone: '',
      submitter_career: '',
      idea_name: '',
      genres: [],
      description: '',
      contact_agreed: false
    });
    setSubmitted(false);
    setReferenceNumber('');
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm text-center">
            <CheckCircle className="mx-auto text-secondary mb-6" size={48} />
            <h2 className="text-2xl font-bold mb-4">Thank You for Your Submission!</h2>
            <p className="text-light/90 mb-6">
              Your film idea has been successfully submitted. We'll review it and get back to you if it's selected.
            </p>
            <div className="bg-white/10 p-4 rounded-lg mb-8">
              <p className="text-sm text-light/70 mb-2">Your Reference Number</p>
              <p className="text-2xl font-mono text-secondary">{referenceNumber}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Return Home
              </button>
              <button
                onClick={handleReset}
                className="btn-primary"
              >
                Submit Another Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Submit Your Film Idea</h1>
          <p className="text-light/90 max-w-2xl mx-auto">
            Anyone can have a great film idea! Whether you're a teacher, engineer, or full-time filmmaker, 
            your idea deserves to be shared. Submit your concept for a possible series, movie, or short. 
            Feel free to put as much or as little detail as you'd like!
          </p>
        </div>

        {submissionCount > 0 && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 flex items-center gap-3">
            <Info className="text-blue-500 flex-shrink-0" size={24} />
            <div>
              <p className="text-blue-500">
                You have submitted {submissionCount} {submissionCount === 1 ? 'idea' : 'ideas'} today
              </p>
              <p className="text-sm text-blue-500/90">
                You can submit up to 2 ideas per day
              </p>
            </div>
          </div>
        )}

        {errors.limit && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
            <p className="text-red-500">{errors.limit}</p>
          </div>
        )}

        <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.submitter_name}
                  onChange={(e) => {
                    setFormData({ ...formData, submitter_name: e.target.value });
                    if (errors.submitter_name) setErrors({ ...errors, submitter_name: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.submitter_name ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  placeholder="Enter your full name"
                />
                {errors.submitter_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.submitter_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.submitter_email}
                  onChange={(e) => {
                    setFormData({ ...formData, submitter_email: e.target.value });
                    if (errors.submitter_email) setErrors({ ...errors, submitter_email: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.submitter_email ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  placeholder="Enter your email"
                />
                {errors.submitter_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.submitter_email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.submitter_phone}
                  onChange={(e) => setFormData({ ...formData, submitter_phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white focus:outline-none focus:border-secondary"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Current Career (Optional)
                </label>
                <input
                  type="text"
                  value={formData.submitter_career}
                  onChange={(e) => setFormData({ ...formData, submitter_career: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white focus:outline-none focus:border-secondary"
                  placeholder="What do you do?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Film Idea Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.idea_name}
                  onChange={(e) => {
                    setFormData({ ...formData, idea_name: e.target.value });
                    if (errors.idea_name) setErrors({ ...errors, idea_name: '' });
                  }}
                  maxLength={45}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.idea_name ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary pr-16`}
                  placeholder="Give your idea a catchy title"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-light/50">
                  {formData.idea_name.length}/45
                </span>
              </div>
              {errors.idea_name && (
                <p className="text-red-500 text-sm mt-1">{errors.idea_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Genres <span className="text-red-500">*</span>
              </label>
              <Select
                isMulti
                options={GENRES}
                value={formData.genres}
                onChange={(selected) => {
                  setFormData({ ...formData, genres: selected });
                  if (errors.genres) setErrors({ ...errors, genres: '' });
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select genres"
              />
              {errors.genres && (
                <p className="text-red-500 text-sm mt-1">{errors.genres}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.description ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary h-32`}
                  placeholder="Tell us about your film idea..."
                />
                <span className={`absolute right-4 bottom-4 text-sm ${
                  formData.description.length < 100 ? 'text-red-500' :
                  formData.description.length >= 100 ? 'text-green-500' :
                  'text-light/50'
                }`}>
                  {formData.description.length}/100 characters minimum
                </span>
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="contact_agreed"
                checked={formData.contact_agreed}
                onChange={(e) => {
                  setFormData({ ...formData, contact_agreed: e.target.checked });
                  if (errors.contact_agreed) setErrors({ ...errors, contact_agreed: '' });
                }}
                className={`mt-1 ${errors.contact_agreed ? 'border-red-500' : ''}`}
              />
              <label htmlFor="contact_agreed" className="text-sm text-light/90">
                I agree to be contacted if my idea is chosen <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.contact_agreed && (
              <p className="text-red-500 text-sm">{errors.contact_agreed}</p>
            )}

            <button
              type="submit"
              disabled={submitting || submissionCount >= 2}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Film Idea'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitFilmIdea;