import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Save } from 'lucide-react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import { FESTIVAL_STATUS } from '../utils/festivalStorage';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Documentary', 'Horror', 
  'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Independent'
].map(genre => ({ value: genre, label: genre }));

const FestivalEditModal = ({ festival, onSave, onClose }) => {
  const [formData, setFormData] = useState(festival || {
    name: '',
    location: '',
    type: '',
    genres: [],
    submissionDeadline: null,
    festivalDates: null,
    submissionFee: '',
    prize: '',
    benefits: '',
    website: '',
    status: FESTIVAL_STATUS.AWAITING_REVIEW,
    adminNotes: '',
    validationIssues: []
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Festival name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.genres.length) newErrors.genres = 'At least one genre is required';
    if (!formData.submissionDeadline) newErrors.submissionDeadline = 'Submission deadline is required';
    if (!formData.festivalDates) newErrors.festivalDates = 'Festival dates are required';
    if (formData.submissionFee === '') {
      newErrors.submissionFee = 'Submission fee is required';
    } else if (parseFloat(formData.submissionFee) < 0) {
      newErrors.submissionFee = 'Submission fee must be 0 or more';
    }
    if (!formData.website) newErrors.website = 'Website is required';
    
    // Additional validations
    if (formData.submissionDeadline && formData.festivalDates) {
      if (new Date(formData.submissionDeadline) > new Date(formData.festivalDates)) {
        newErrors.submissionDeadline = 'Submission deadline must be before festival dates';
      }
    }
    
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL starting with http:// or https://';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
    } else {
      setErrors(newErrors);
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {festival ? 'Edit Festival' : 'Add New Festival'}
          </h3>
          <button
            onClick={onClose}
            className="text-light/50 hover:text-light transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Festival Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.name ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setErrors({ ...errors, location: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.location ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value });
                  setErrors({ ...errors, type: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.type ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
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
                Genres
              </label>
              <Select
                isMulti
                options={GENRES}
                value={formData.genres.map(genre => ({ value: genre, label: genre }))}
                onChange={(selected) => {
                  setFormData({ 
                    ...formData, 
                    genres: selected.map(option => option.value)
                  });
                  setErrors({ ...errors, genres: '' });
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: errors.genres ? '#ef4444' : 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      borderColor: '#FDA400'
                    }
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: '#3E1B3E',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(253, 164, 0, 0.2)'
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#FDA400'
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: '#FDA400',
                    '&:hover': {
                      backgroundColor: 'rgba(253, 164, 0, 0.4)',
                      color: '#FDA400'
                    }
                  })
                }}
              />
              {errors.genres && (
                <p className="text-red-500 text-sm mt-1">{errors.genres}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Submission Deadline
              </label>
              <DatePicker
                selected={formData.submissionDeadline ? new Date(formData.submissionDeadline) : null}
                onChange={(date) => {
                  setFormData({ ...formData, submissionDeadline: date?.toISOString() });
                  setErrors({ ...errors, submissionDeadline: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.submissionDeadline ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select deadline"
              />
              {errors.submissionDeadline && (
                <p className="text-red-500 text-sm mt-1">{errors.submissionDeadline}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Festival Dates
              </label>
              <DatePicker
                selected={formData.festivalDates ? new Date(formData.festivalDates) : null}
                onChange={(date) => {
                  setFormData({ ...formData, festivalDates: date?.toISOString() });
                  setErrors({ ...errors, festivalDates: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.festivalDates ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select dates"
              />
              {errors.festivalDates && (
                <p className="text-red-500 text-sm mt-1">{errors.festivalDates}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Submission Fee ($)
              </label>
              <input
                type="number"
                value={formData.submissionFee}
                onChange={(e) => {
                  setFormData({ ...formData, submissionFee: e.target.value });
                  setErrors({ ...errors, submissionFee: '' });
                }}
                min="0"
                step="0.01"
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.submissionFee ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
              />
              {errors.submissionFee && (
                <p className="text-red-500 text-sm mt-1">{errors.submissionFee}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => {
                  setFormData({ ...formData, website: e.target.value });
                  setErrors({ ...errors, website: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                  errors.website ? 'border-red-500' : 'border-white/20'
                } text-white focus:outline-none focus:border-secondary`}
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Prize Details
            </label>
            <input
              type="text"
              value={formData.prize}
              onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white focus:outline-none focus:border-secondary"
              placeholder="e.g., Best Feature: $10,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light mb-2">
              Partnership Benefits
            </label>
            <textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white focus:outline-none focus:border-secondary h-32"
              placeholder="Describe the benefits partners receive..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg 
                       hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg 
                       hover:bg-secondary/90 transition-colors"
            >
              {festival ? 'Save Changes' : 'Add Festival'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FestivalEditModal;