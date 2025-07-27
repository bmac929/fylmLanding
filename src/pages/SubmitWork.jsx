import React, { useState, useEffect } from 'react';
import { Film, Upload, Users, Wallet, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Documentary', 'Horror', 
  'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Independent'
];

const ROLES = [
  'Director', 'Producer', 'Screenwriter', 'Cinematographer', 'Editor',
  'Composer', 'Sound Designer', 'Lead Actor', 'Supporting Actor',
  'Production Assistant', 'Visual Effects', 'Stunt Coordinator',
  'Costume Designer', 'Art Director', 'Casting Director', 'Film Distributor'
];

const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

const VIEWER_WARNINGS = [
  'Violence', 'Sexual Content', 'Strong Language', 'Drug Use',
  'Disturbing Images', 'Flashing Lights', 'Loud Sounds'
];

function GuidelineSection({ title, items, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
      >
        <span className="font-semibold">{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white/5">
          <ul className="list-disc list-inside space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-light/90">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SubmitWork() {
  const [step, setStep] = useState(1);
  const [openGuidelines, setOpenGuidelines] = useState({});
  const [formData, setFormData] = useState({
    guidelinesAccepted: {
      technical: false,
      content: false,
      legal: false,
      distribution: false
    },
    authorizers: [{ name: '', email: '', role: '' }],
    title: '',
    yearOfProduction: new Date().getFullYear(),
    duration: '',
    description: '',
    genres: [],
    rating: '',
    viewerWarnings: [],
    videoLink: '',
    videoPassword: '',
    trailerLink: '',
    trailerPassword: '',
    subtitlesLink: '',
    coverArtLink: '',
    needsTranscription: false,
    needsCoverArt: false,
    castAndCrew: [{ name: '', email: '', role: '' }],
    awards: [{ title: '', year: '', festival: '' }],
    imdbLink: '',
    otherLinks: [''],
    primaryPaymentModel: '',
    secondaryPaymentModel: '',
    competitionEntry: false,
    competitionPeriod: ''
  });

  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    const timer = setTimeout(() => {
      localStorage.setItem('filmSubmission', JSON.stringify(formData));
      setLastSaved(new Date());
    }, 30000);

    setAutoSaveTimer(timer);

    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [formData]);

  useEffect(() => {
    const savedData = localStorage.getItem('filmSubmission');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const guidelines = {
    technical: [
      'Supported formats: MP4, AVI, MOV, MKV',
      'Minimum resolution: 1080p (1920x1080)',
      'Aspect ratios: 16:9 or 9:16',
      'Frame rates: 24, 25, or 30 FPS',
      'Cover art: 1920x1080 (horizontal) or 1080x1920 (vertical)'
    ],
    content: [
      'Original content only',
      'No plagiarism',
      'Must meet FylmTV genre guidelines',
      'Appropriate content rating required'
    ],
    legal: [
      'Must own or have permission to distribute',
      'Grants FylmTV promotional usage rights',
      'Compliant with copyright laws'
    ],
    distribution: [
      'No exclusive contracts preventing distribution',
      'FylmTV may distribute and promote the film',
      'Revenue sharing based on selected model'
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(6);
    localStorage.removeItem('filmSubmission');
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Submission Guidelines</h3>
            <p className="text-light/90 mb-6">
              Please review and accept each section of our submission guidelines before proceeding.
            </p>
            
            <div className="space-y-4">
              {Object.entries(guidelines).map(([key, items]) => (
                <GuidelineSection
                  key={key}
                  title={key.charAt(0).toUpperCase() + key.slice(1) + ' Requirements'}
                  items={items}
                  isOpen={openGuidelines[key]}
                  onToggle={() => setOpenGuidelines(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))}
                />
              ))}
            </div>

            <div className="space-y-4 mt-8">
              {Object.keys(guidelines).map(key => (
                <div key={key} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={`accept-${key}`}
                    className="mt-1"
                    checked={formData.guidelinesAccepted[key]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      guidelinesAccepted: {
                        ...prev.guidelinesAccepted,
                        [key]: e.target.checked
                      }
                    }))}
                  />
                  <label htmlFor={`accept-${key}`} className="text-sm text-light/90">
                    I have read and accept the {key} requirements
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full btn-primary"
              disabled={!Object.values(formData.guidelinesAccepted).every(Boolean)}
            >
              Next Step
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Basic Information</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-light">Authorizers</label>
              {formData.authorizers.map((auth, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={auth.name}
                      onChange={(e) => {
                        const newAuthorizers = [...formData.authorizers];
                        newAuthorizers[index].name = e.target.value;
                        setFormData({ ...formData, authorizers: newAuthorizers });
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={auth.email}
                      onChange={(e) => {
                        const newAuthorizers = [...formData.authorizers];
                        newAuthorizers[index].email = e.target.value;
                        setFormData({ ...formData, authorizers: newAuthorizers });
                      }}
                    />
                    <select
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={auth.role}
                      onChange={(e) => {
                        const newAuthorizers = [...formData.authorizers];
                        newAuthorizers[index].role = e.target.value;
                        setFormData({ ...formData, authorizers: newAuthorizers });
                      }}
                    >
                      <option value="" className="bg-primary">Select Role</option>
                      {ROLES.map(role => (
                        <option key={role} value={role} className="bg-primary">{role}</option>
                      ))}
                    </select>
                    {formData.authorizers.length > 1 && (
                      <button
                        onClick={() => {
                          const newAuthorizers = formData.authorizers.filter((_, i) => i !== index);
                          setFormData({ ...formData, authorizers: newAuthorizers });
                        }}
                        className="px-3 py-2 text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {formData.authorizers.length < 5 && (
                <button
                  onClick={() => setFormData({
                    ...formData,
                    authorizers: [...formData.authorizers, { name: '', email: '', role: '' }]
                  })}
                  className="text-secondary hover:text-secondary/80 text-sm"
                >
                  + Add another authorizer
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light mb-2">Film Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light mb-2">Year of Production</label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={formData.yearOfProduction}
                    onChange={(e) => setFormData({ ...formData, yearOfProduction: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-light mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary h-32"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Genres (select multiple)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                        }}
                      />
                      <span className="text-sm text-light/90">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light mb-2">Content Rating</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  >
                    <option value="" className="bg-primary">Select Rating</option>
                    {RATINGS.map(rating => (
                      <option key={rating} value={rating} className="bg-primary">{rating}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-light mb-2">Viewer Warnings</label>
                  <select
                    multiple
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={formData.viewerWarnings}
                    onChange={(e) => {
                      const warnings = Array.from(e.target.selectedOptions, option => option.value);
                      setFormData({ ...formData, viewerWarnings: warnings });
                    }}
                  >
                    {VIEWER_WARNINGS.map(warning => (
                      <option key={warning} value={warning} className="bg-primary">{warning}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(1)}
                className="w-full btn-secondary"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-full btn-primary"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Media Links</h3>
            <p className="text-light/90">
              Please provide links to your media files. We support links from Vimeo, YouTube, Google Drive, 
              Dropbox, and other hosting services.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light mb-2">Video Link</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      placeholder="https://"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={formData.videoLink}
                      onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Password (if any)"
                    className="w-48 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={formData.videoPassword}
                    onChange={(e) => setFormData({ ...formData, videoPassword: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Trailer Link (optional)</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      placeholder="https://"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={formData.trailerLink}
                      onChange={(e) => setFormData({ ...formData, trailerLink: e.target.value })}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Password (if any)"
                    className="w-48 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={formData.trailerPassword}
                    onChange={(e) => setFormData({ ...formData, trailerPassword: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Subtitles Link (optional)</label>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                  value={formData.subtitlesLink}
                  onChange={(e) => setFormData({ ...formData, subtitlesLink: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Cover Art Link</label>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                  value={formData.coverArtLink}
                  onChange={(e) => setFormData({ ...formData, coverArtLink: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="needsTranscription"
                    className="mt-1"
                    checked={formData.needsTranscription}
                    onChange={(e) => setFormData({ ...formData, needsTranscription: e.target.checked })}
                  />
                  <label htmlFor="needsTranscription" className="text-sm text-light/90">
                    I would like to request transcription services
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="needsCoverArt"
                    className="mt-1"
                    checked={formData.needsCoverArt}
                    onChange={(e) => setFormData({ ...formData, needsCoverArt: e.target.checked })}
                  />
                  <label htmlFor="needsCoverArt" className="text-sm text-light/90">
                    I would like to commission cover art
                  </label>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(2)}
                className="w-full btn-secondary"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-full btn-primary"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Production Details</h3>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-light">Cast & Crew</label>
              {formData.castAndCrew.map((member, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={member.name}
                      onChange={(e) => {
                        const newCastAndCrew = [...formData.castAndCrew];
                        newCastAndCrew[index].name = e.target.value;
                        setFormData({ ...formData, castAndCrew: newCastAndCrew });
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={member.email}
                      onChange={(e) => {
                        const newCastAndCrew = [...formData.castAndCrew];
                        newCastAndCrew[index].email = e.target.value;
                        setFormData({ ...formData, castAndCrew: newCastAndCrew });
                      }}
                    />
                    <select
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={member.role}
                      onChange={(e) => {
                        const newCastAndCrew = [...formData.castAndCrew];
                        newCastAndCrew[index].role = e.target.value;
                        setFormData({ ...formData, castAndCrew: newCastAndCrew });
                      }}
                    >
                      <option value="" className="bg-primary">Select Role</option>
                      {ROLES.map(role => (
                        <option key={role} value={role} className="bg-primary">{role}</option>
                      ))}
                      <option value="custom" className="bg-primary">Custom Role...</option>
                    </select>
                    {formData.castAndCrew.length > 1 && (
                      <button
                        onClick={() => {
                          const newCastAndCrew = formData.castAndCrew.filter((_, i) => i !== index);
                          setFormData({ ...formData, castAndCrew: newCastAndCrew });
                        }}
                        className="px-3 py-2 text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => setFormData({
                  ...formData,
                  castAndCrew: [...formData.castAndCrew, { name: '', email: '', role: '' }]
                })}
                className="text-secondary hover:text-secondary/80 text-sm"
              >
                + Add cast/crew member
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-light">Festival Awards (if any)</label>
              {formData.awards.map((award, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Award Title"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={award.title}
                    onChange={(e) => {
                      const newAwards = [...formData.awards];
                      newAwards[index].title = e.target.value;
                      setFormData({ ...formData, awards: newAwards });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    className="w-24 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={award.year}
                    onChange={(e) => {
                      const newAwards = [...formData.awards];
                      newAwards[index].year = e.target.value;
                      setFormData({ ...formData, awards: newAwards });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Festival Name"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                    value={award.festival}
                    onChange={(e) => {
                      const newAwards = [...formData.awards];
                      newAwards[index].festival = e.target.value;
                      setFormData({ ...formData, awards: newAwards });
                    }}
                  />
                  {formData.awards.length > 1 && (
                    <button
                      onClick={() => {
                        const newAwards = formData.awards.filter((_, i) => i !== index);
                        setFormData({ ...formData, awards: newAwards });
                      }}
                      className="px-3 py-2 text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setFormData({
                  ...formData,
                  awards: [...formData.awards, { title: '', year: '', festival: '' }]
                })}
                className="text-secondary hover:text-secondary/80 text-sm"
              >
                + Add award
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light mb-2">IMDB Link (optional)</label>
                <input
                  type="url"
                  placeholder="https://www.imdb.com/title/..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                  value={formData.imdbLink}
                  onChange={(e) => setFormData({ ...formData, imdbLink: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Other Links (optional)</label>
                {formData.otherLinks.map((link, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="url"
                      placeholder="https://"
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...formData.otherLinks];
                        newLinks[index] = e.target.value;
                        setFormData({ ...formData, otherLinks: newLinks });
                      }}
                    />
                    {formData.otherLinks.length > 1 && (
                      <button
                        onClick={() => {
                          const newLinks = formData.otherLinks.filter((_, i) => i !== index);
                          setFormData({ ...formData, otherLinks: newLinks });
                        }}
                        className="px-3 py-2 text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setFormData({
                    ...formData,
                    otherLinks: [...formData.otherLinks, '']
                  })}
                  className="text-secondary hover:text-secondary/80 text-sm"
                >
                  + Add another link
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(3)}
                className="w-full btn-secondary"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(5)}
                className="w-full btn-primary"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary">Payment Options</h3>
            <p className="text-light/90">
              Select up to two payment models, ranked by priority. Your primary choice will be considered first.
            </p>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-light mb-2">Primary Payment Model</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                value={formData.primaryPaymentModel}
                onChange={(e) => setFormData({ ...formData, primaryPaymentModel: e.target.value })}
              >
                <option value="" className="bg-primary">Select Primary Model</option>
                <option value="adRevenue" className="bg-primary">Ad Revenue Split</option>
                <option value="upfront" className="bg-primary">Paid Upfront</option>
                <option value="nonPaid" className="bg-primary">Non-Paid Option</option>
               ```jsx
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-light mb-2">Secondary Payment Model (Optional)</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary"
                value={formData.secondaryPaymentModel}
                onChange={(e) => setFormData({ ...formData, secondaryPaymentModel: e.target.value })}
              >
                <option value="" className="bg-primary">Select Secondary Model</option>
                <option value="adRevenue" className="bg-primary">Ad Revenue Split</option>
                <option value="upfront" className="bg-primary">Paid Upfront</option>
                <option value="nonPaid" className="bg-primary">Non-Paid Option</option>
              </select>
            </div>

            <div className="space-y-4 bg-white/5 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="competitionEntry"
                  className="mt-1"
                  checked={formData.competitionEntry}
                  onChange={(e) => setFormData({ ...formData, competitionEntry: e.target.checked })}
                />
                <div>
                  <label htmlFor="competitionEntry" className="text-sm font-medium text-light">
                    Enter Film Competition
                  </label>
                  <p className="text-sm text-light/70 mt-1">
                    Your film will be considered for our monthly competition with cash prizes.
                  </p>
                </div>
              </div>

              {formData.competitionEntry && (
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-secondary mt-4"
                  value={formData.competitionPeriod}
                  onChange={(e) => setFormData({ ...formData, competitionPeriod: e.target.value })}
                >
                  <option value="" className="bg-primary">Select Competition Period</option>
                  <option value="nextMonth" className="bg-primary">Next Month</option>
                  <option value="nextQuarter" className="bg-primary">Next Quarter</option>
                </select>
              )}
            </div>

            {lastSaved && (
              <div className="text-sm text-light/70 flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Last saved: {new Date(lastSaved).toLocaleTimeString()}</span>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={() => setStep(4)}
                className="w-full btn-secondary"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                className="w-full btn-primary"
              >
                Submit Film
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="text-secondary text-6xl mb-4">
              <CheckCircle className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold">Submission Successful!</h3>
            <p className="text-light/90">
              Thank you for submitting your work to FylmTV. Our team will review your submission 
              and get back to you within 5-7 business days.
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <Link to="/" className="btn-secondary">
                Return Home
              </Link>
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    guidelinesAccepted: {
                      technical: false,
                      content: false,
                      legal: false,
                      distribution: false
                    },
                    authorizers: [{ name: '', email: '', role: '' }],
                    title: '',
                    yearOfProduction: new Date().getFullYear(),
                    duration: '',
                    description: '',
                    genres: [],
                    rating: '',
                    viewerWarnings: [],
                    videoLink: '',
                    videoPassword: '',
                    trailerLink: '',
                    trailerPassword: '',
                    subtitlesLink: '',
                    coverArtLink: '',
                    needsTranscription: false,
                    needsCoverArt: false,
                    castAndCrew: [{ name: '', email: '', role: '' }],
                    awards: [{ title: '', year: '', festival: '' }],
                    imdbLink: '',
                    otherLinks: [''],
                    primaryPaymentModel: '',
                    secondaryPaymentModel: '',
                    competitionEntry: false,
                    competitionPeriod: ''
                  });
                }}
                className="btn-primary"
              >
                Submit Another Film
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Submit Your Work</h1>
          <p className="text-light/90">
            Share your creative vision with our community. We're excited to see what you've created!
          </p>
        </div>

        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-secondary -translate-y-1/2 z-0"
               style={{ width: `${((step - 1) / 5) * 100}%` }} />
          
          {[
            { icon: Film, label: 'Guidelines' },
            { icon: Upload, label: 'Basic Info' },
            { icon: LinkIcon, label: 'Media' },
            { icon: Users, label: 'Production' },
            { icon: Wallet, label: 'Payment' }
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
}

export default SubmitWork;