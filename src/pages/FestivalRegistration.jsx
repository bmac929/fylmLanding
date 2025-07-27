import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, AlertCircle, Info, ChevronUp, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { addPendingFestival } from '../utils/festivalStorage';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Documentary', 'Horror', 
  'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Independent'
];

const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

const VIEWER_WARNINGS = [
  'Violence', 'Sexual Content', 'Strong Language', 'Drug Use',
  'Disturbing Images', 'Flashing Lights', 'Loud Sounds'
];

const FestivalRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '',
    genres: [],
    submissionDeadline: '',
    festivalDates: '',
    submissionFee: '',
    prize: '',
    benefits: '',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [showDateTooltip, setShowDateTooltip] = useState(false);
  const [showBenefitsInfo, setShowBenefitsInfo] = useState(false);

  useEffect(() => {
    if (formData.submissionDeadline && formData.festivalDates) {
      validateDates();
    }
  }, [formData.submissionDeadline, formData.festivalDates]);

  const validateDates = () => {
    const submissionDate = new Date(formData.submissionDeadline);
    const festivalDate = new Date(formData.festivalDates);
    const today = new Date();
    const newErrors = { ...errors };

    delete newErrors.submissionDeadline;
    delete newErrors.festivalDates;

    if (submissionDate < today) {
      newErrors.submissionDeadline = 'Submission deadline cannot be in the past';
    }

    if (festivalDate <= submissionDate) {
      newErrors.festivalDates = 'Festival date must be after submission deadline';
      newErrors.submissionDeadline = 'Submission deadline must be before festival date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.name) newErrors.name = 'Festival name is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.website) newErrors.website = 'Website is required';
        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
          newErrors.website = 'Please enter a valid URL starting with http:// or https://';
        }
        break;

      case 2:
        if (!formData.submissionDeadline) newErrors.submissionDeadline = 'Submission deadline is required';
        if (!formData.festivalDates) newErrors.festivalDates = 'Festival dates is required';
        if (!formData.submissionFee && formData.submissionFee !== 0) newErrors.submissionFee = 'Submission fee is required';
        if (!formData.prize) newErrors.prize = 'Prize details are required';
        // Removed benefits validation as it's now optional
        
        if (formData.submissionDeadline && formData.festivalDates) {
          const submissionDate = new Date(formData.submissionDeadline);
          const festivalDate = new Date(formData.festivalDates);
          const today = new Date();

          if (submissionDate < today) {
            newErrors.submissionDeadline = 'Submission deadline cannot be in the past';
          }
          if (festivalDate <= submissionDate) {
            newErrors.festivalDates = 'Festival date must be after submission deadline';
            newErrors.submissionDeadline = 'Submission deadline must be before festival date';
          }
        }
        break;

      case 3:
        if (!formData.contactName) newErrors.contactName = 'Contact name is required';
        if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
        if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          newErrors.contactEmail = 'Please enter a valid email address';
        }
        if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone is required';
        if (!formData.termsAccepted) newErrors.terms = 'You must accept the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      const submitter = {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone
      };

      const festivalData = {
        name: formData.name,
        location: formData.location,
        type: formData.type,
        genres: formData.genres,
        submissionDeadline: formData.submissionDeadline,
        festivalDates: formData.festivalDates,
        submissionFee: parseFloat(formData.submissionFee),
        prize: formData.prize,
        benefits: formData.benefits,
        website: formData.website,
        description: formData.description
      };

      addPendingFestival(festivalData, submitter);
      
      toast.success('Registration submitted successfully! Your submission is pending review.');
      navigate('/festivals');
    } else {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast.error('Please fill in all required fields correctly');
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleDateChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Festival Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Festival Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.name ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (errors.location) setErrors({ ...errors, location: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.location ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  required
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => {
                    setFormData({ ...formData, type: e.target.value });
                    if (errors.type) setErrors({ ...errors, type: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.type ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  required
                >
                  <option value="" className="bg-primary">Select Type</option>
                  <option value="In-Person" className="bg-primary">In-Person</option>
                  <option value="Virtual" className="bg-primary">Virtual</option>
                  <option value="Hybrid" className="bg-primary">Hybrid</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Website <span className="text-red-500">*</span>
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => {
                    setFormData({ ...formData, website: e.target.value });
                    if (errors.website) setErrors({ ...errors, website: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.website ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  placeholder="https://"
                  required
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-light mb-2">
                  Genres <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {GENRES.map(genre => (
                    <label key={genre} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.genres.includes(genre)}
                        onChange={(e) => {
                          const newGenres = e.target.checked
                            ? [...formData.genres, genre]
                            : formData.genres.filter(g => g !== genre);
                          setFormData({ ...formData, genres: newGenres });
                          if (errors.genres) setErrors({ ...errors, genres: '' });
                        }}
                        className="rounded border-white/20 bg-white/10 text-secondary focus:ring-secondary"
                      />
                      <span className="text-light/90">{genre}</span>
                    </label>
                  ))}
                </div>
                {errors.genres && (
                  <p className="text-red-500 text-sm mt-1">{errors.genres}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.description ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary h-32`}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg 
                         hover:bg-secondary/90 transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Submission Details</h3>
            
            <div className="bg-blue-500/10 p-4 rounded-lg flex items-start gap-3">
              <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
              <p className="text-sm text-blue-500">
                The submission deadline must be a future date and must be before the festival date. 
                This ensures participants have adequate time to submit their work before the festival begins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Submission Deadline <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="submissionDeadline"
                    type="date"
                    value={formData.submissionDeadline}
                    onChange={(e) => handleDateChange('submissionDeadline', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                      errors.submissionDeadline ? 'border-red-500' : 'border-white/20'
                    } text-white focus:outline-none focus:border-secondary`}
                    required
                  />
                  {errors.submissionDeadline && (
                    <div className="absolute -bottom-6 left-0 text-red-500 text-sm">
                      {errors.submissionDeadline}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Festival Dates <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="festivalDates"
                    type="date"
                    value={formData.festivalDates}
                    onChange={(e) => handleDateChange('festivalDates', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                      errors.festivalDates ? 'border-red-500' : 'border-white/20'
                    } text-white focus:outline-none focus:border-secondary`}
                    required
                  />
                  {errors.festivalDates && (
                    <div className="absolute -bottom-6 left-0 text-red-500 text-sm">
                      {errors.festivalDates}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Submission Fee ($) <span className="text-red-500">*</span>
                </label>
                <input
                  id="submissionFee"
                  type="number"
                  value={formData.submissionFee}
                  onChange={(e) => {
                    setFormData({ ...formData, submissionFee: e.target.value });
                    if (errors.submissionFee) setErrors({ ...errors, submissionFee: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.submissionFee ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  min="0"
                  step="0.01"
                  required
                />
                {errors.submissionFee && (
                  <p className="text-red-500 text-sm mt-1">{errors.submissionFee}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Prize Details <span className="text-red-500">*</span>
                </label>
                <input
                  id="prize"
                  type="text"
                  value={formData.prize}
                  onChange={(e) => {
                    setFormData({ ...formData, prize: e.target.value });
                    if (errors.prize) setErrors({ ...errors, prize: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.prize ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  placeholder="e.g., Best Feature: $10,000"
                  required
                />
                {errors.prize && (
                  <p className="text-red-500 text-sm mt-1">{errors.prize}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-light">
                  Exclusive Member Benefits
                  <span className="text-light/50 text-sm ml-2">(optional)</span>
                </label>
                <button
                  onClick={() => setShowBenefitsInfo(!showBenefitsInfo)}
                  className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1"
                >
                  {showBenefitsInfo ? 'Hide Info' : 'Show Info'}
                  {showBenefitsInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {showBenefitsInfo && (
                <div className="bg-blue-500/10 p-4 rounded-lg mb-4">
                  <div className="flex items-start gap-3">
                    <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-blue-500">
                      <p className="font-medium mb-2">Suggested Member Benefits:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Discounted Submission Fees</li>
                        <li>Priority Screening</li>
                        <li>VIP Passes</li>
                        <li>Revenue Sharing</li>
                        <li>Fylm TV Showcase Block</li>
                        <li>Exclusive Fylm TV Awards</li>
                        <li>Mentorship Sessions</li>
                        <li>Distribution Deals</li>
                      </ul>
                      <p className="mt-3 italic">
                        Offering exclusive benefits to Fylm TV community members can help increase 
                        your festival's visibility and attendance.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => {
                  setFormData({ ...formData, benefits: e.target.value });
                  if (errors.benefits) setErrors({ ...errors, benefits: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border 
                  border-white/20 text-white focus:outline-none focus:border-secondary h-32`}
                placeholder="Describe any exclusive benefits for Fylm TV community members..."
              />
            </div>

            <div className="flex justify-between mt-12">
              <button
                onClick={handlePreviousStep}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg 
                         hover:bg-white/20 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg 
                         hover:bg-secondary/90 transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Contact Information</h3>
            
            <div className="bg-blue-500/10 p-4 rounded-lg flex items-start gap-3 mb-6">
              <Info className="text-blue-500 flex-shrink-0 mt-1" size={20} />
              <p className="text-sm text-blue-500">
                Your contact information will only be visible to the Fylm TV team and will not be shared publicly. 
                We'll use this information to communicate with you about your festival registration and any necessary updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => {
                    setFormData({ ...formData, contactName: e.target.value });
                    if (errors.contactName) setErrors({ ...errors, contactName: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.contactName ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  required
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, contactEmail: e.target.value });
                    if (errors.contactEmail) setErrors({ ...errors, contactEmail: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.contactEmail ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  required
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => {
                    setFormData({ ...formData, contactPhone: e.target.value });
                    if (errors.contactPhone) setErrors({ ...errors, contactPhone: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    errors.contactPhone ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary`}
                  required
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => {
                  setFormData({ ...formData, termsAccepted: e.target.checked });
                  if (errors.terms) setErrors({ ...errors, terms: '' });
                }}
                className={`mt-1 ${errors.terms ? 'border-red-500' : ''}`}
                required
              />
              <label htmlFor="terms" className="text-sm text-light/90">
                I agree to the terms and conditions and confirm that all provided information is accurate. <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms}</p>
            )}

            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg 
                         hover:bg-white/20 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted}
                className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg 
                         hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Registration
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Register Your Film Festival</h1>
          <p className="text-light/90">
            Join our network of film festivals and reach a wider audience of filmmakers and film enthusiasts.
          </p>
        </div>

        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 right-0 h-1 bg-secondary -translate-y-1/2 z-0"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {[
            { label: 'Festival Details', icon: Film },
            { label: 'Submission Details', icon: AlertCircle },
            { label: 'Contact Info', icon: Film }
          ].map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step > i + 1 ? 'bg-secondary' : 
                step === i + 1 ? 'bg-secondary' : 'bg-white/20'
              }`}>
                <s.icon size={20} className="text-primary" />
              </div>
              <span className="text-sm mt-2">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default FestivalRegistration;