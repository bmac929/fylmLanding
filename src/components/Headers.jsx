import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, ChevronUp, Sparkles, Lock,
  Film, Users, Wallet, Clock, Calendar
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const SURPRISE_CHANNELS = [
  'https://youtu.be/OrOYvVf6tIM?si=iA1g2OHZEW8w7Ygp'
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoColor, setLogoColor] = useState('text-white');
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewerDropdownOpen, setViewerDropdownOpen] = useState(false);
  const [filmmakersDropdownOpen, setFilmmakersDropdownOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [facebookSubMenuOpen, setFacebookSubMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const location = useLocation();
  const viewerDropdownRef = React.useRef(null);
  const filmmakersDropdownRef = React.useRef(null);
  const homeDropdownRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-menu')) {
        setViewerDropdownOpen(false);
        setFilmmakersDropdownOpen(false);
        setHomeDropdownOpen(false);
        setFacebookSubMenuOpen(false);
      }
    };

    // Check admin status
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPassword('');
      localStorage.setItem('isAdmin', 'true');
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    toast.success('Logged out successfully');
  };

  const handleLogoClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const brandColors = ['text-secondary', 'text-tertiary', 'text-black'];
    const currentIndex = brandColors.indexOf(logoColor);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * brandColors.length);
    } while (newIndex === currentIndex);
    setLogoColor(brandColors[newIndex]);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleSurpriseMe = () => {
    window.open(SURPRISE_CHANNELS[0], '_blank');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
    setViewerDropdownOpen(false);
    setFilmmakersDropdownOpen(false);
    setHomeDropdownOpen(false);
  };

  const ViewerDropdown = () => (
    <div className="relative dropdown-menu" ref={viewerDropdownRef}>
      <button
        onClick={() => {
          setViewerDropdownOpen(!viewerDropdownOpen);
          setFilmmakersDropdownOpen(false);
          setHomeDropdownOpen(false);
        }}
        className="text-white hover:text-secondary transition-colors flex items-center gap-1"
      >
        Viewers
        {viewerDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {viewerDropdownOpen && (
        <div className="absolute top-full left-0 mt-8 w-72 bg-primary border border-white/10 rounded-lg shadow-xl py-2 z-50">
          <button
            onClick={() => scrollToSection('viewers')}
            className="w-full text-left px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
          >
            Viewer Info
          </button>
          <Link
            to="/quiz"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setViewerDropdownOpen(false)}
          >
            Genre Quiz
          </Link>
          
          <a
            href="#viewer-membership"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors border-t border-white/10"
            onClick={() => setViewerDropdownOpen(false)}
          >
            Win a Viewer Membership!
          </a>
        </div>
      )}
    </div>
  );

  const FilmmakersDropdown = () => (
    <div className="relative dropdown-menu" ref={filmmakersDropdownRef}>
      <button
        onClick={() => {
          setFilmmakersDropdownOpen(!filmmakersDropdownOpen);
          setViewerDropdownOpen(false);
          setHomeDropdownOpen(false);
        }}
        className="text-white hover:text-secondary transition-colors flex items-center gap-1"
      >
        Filmmakers
        {filmmakersDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {filmmakersDropdownOpen && (
        <div className="absolute top-full left-0 mt-8 w-72 bg-primary border border-white/10 rounded-lg shadow-xl py-2 z-50">
          <button
            onClick={() => scrollToSection('filmmakers')}
            className="w-full text-left px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
          >
            Filmmaker Info
          </button>
          <Link
            to="/festivals"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setFilmmakersDropdownOpen(false)}
          >
            Film Festival
          </Link>
         
          <a
            href="#filmmaker-membership"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors border-t border-white/10"
            onClick={() => setFilmmakersDropdownOpen(false)}
          >
            Win a Filmmaker Membership!
          </a>
        </div>
      )}
    </div>
  );

  const HomeDropdown = () => (
    <div className="relative dropdown-menu" ref={homeDropdownRef}>
      <button
        onClick={() => {
          setHomeDropdownOpen(!homeDropdownOpen);
          setViewerDropdownOpen(false);
          setFilmmakersDropdownOpen(false);
        }}
        className="text-white hover:text-secondary transition-colors flex items-center gap-1"
      >
        Home
        {homeDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {homeDropdownOpen && (
        <div className="absolute top-full left-0 mt-8 w-72 bg-primary border border-white/10 rounded-lg shadow-xl py-2 z-50">
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
          >
            About Us
          </button>
          <button
            onClick={handleSurpriseMe}
            className="w-full text-left px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors flex items-center gap-2"
          >
            <span>Surprise Me</span>
            <Sparkles size={16} className="inline-block" />
          </button>
          <div className="relative">
            <button
              onClick={() => setFacebookSubMenuOpen(!facebookSubMenuOpen)}
              className="w-full text-left px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors flex items-center justify-between"
            >
              <span>Facebook</span>
              {facebookSubMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {facebookSubMenuOpen && (
              <div className="pl-4">
                <a
                  href="https://www.facebook.com/FylmTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
                  onClick={() => {
                    setHomeDropdownOpen(false);
                    setFacebookSubMenuOpen(false);
                  }}
                >
                  Facebook Page
                </a>
                <a
                  href="https://www.facebook.com/share/g/15ijxcdqgU/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
                  onClick={() => {
                    setHomeDropdownOpen(false);
                    setFacebookSubMenuOpen(false);
                  }}
                >
                  Join our Facebook Group
                </a>
              </div>
            )}
          </div>
          <a
            href="https://www.tiktok.com/@fylmtv?_t=ZP-8tu09KHVghq&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setHomeDropdownOpen(false)}
          >
            TikTok
          </a>
          <a
            href="https://youtube.com/@fylmtv?si=CH4ZDVzcJ5rsctun"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setHomeDropdownOpen(false)}
          >
            YouTube
          </a>
          <a
            href="https://twitter.com/Fylm_TV"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setHomeDropdownOpen(false)}
          >
            Twitter
          </a>
          <a
            href="https://discord.gg/SAaSBPee7S"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setHomeDropdownOpen(false)}
          >
            Discord Community
          </a>
          <a
            href="mailto:Admin@FylmTV.com"
            className="block px-4 py-2 hover:bg-white/5 text-white hover:text-secondary transition-colors"
            onClick={() => setHomeDropdownOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link 
            to="/"
            className={`text-2xl font-bold transition-colors duration-300 ${logoColor} ${
              isAnimating ? 'logo-animation logo-glow' : ''
            } mr-24`}
            onClick={handleLogoClick}
          >
            FylmTV
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-16 ml-8">
            <HomeDropdown />
            <ViewerDropdown />
            <FilmmakersDropdown />
          </nav>

          {/* Admin Login/Logout */}
          <div className="ml-auto flex items-center gap-4">
            {isAdmin ? (
              <button
                onClick={handleAdminLogout}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-semibold 
                         hover:bg-red-500/20 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowAdminModal(true)}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white 
                         hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Lock size={18} />
                Admin
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-primary">
            <div className="flex flex-col space-y-4">
              <div className="px-4">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white hover:text-secondary transition-colors text-left w-full"
                >
                  About Us
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <button
                    onClick={handleSurpriseMe}
                    className="text-white hover:text-secondary transition-colors text-left w-full flex items-center gap-2"
                  >
                    <span>Surprise Me</span>
                    <Sparkles size={16} />
                  </button>
                  <div className="space-y-2">
                    <a
                      href="https://www.facebook.com/FylmTV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white hover:text-secondary transition-colors"
                    >
                      Facebook Page
                    </a>
                    <a
                      href="https://www.facebook.com/share/g/15ijxcdqgU/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white hover:text-secondary transition-colors"
                    >
                      Join our Facebook Group
                    </a>
                  </div>
                  <a
                    href="https://www.tiktok.com/@fylmtv?_t=ZP-8tu09KHVghq&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:text-secondary transition-colors"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://youtube.com/@fylmtv?si=CH4ZDVzcJ5rsctun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:text-secondary transition-colors"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://twitter.com/Fylm_TV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:text-secondary transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://discord.gg/SAaSBPee7S"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white hover:text-secondary transition-colors"
                  >
                    Discord Community
                  </a>
                  <a
                    href="mailto:Admin@FylmTV.com"
                    className="block text-white hover:text-secondary transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              
              {/* Viewers Section */}
              <div className="px-4">
                <button
                  onClick={() => scrollToSection('viewers')}
                  className="text-white hover:text-secondary transition-colors text-left w-full"
                >
                  Viewer Info
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/quiz"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Genre Quiz
                  </Link>
                  <Link
                    to="/submit-idea"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Submit Film Idea
                  </Link>
                  <a
                    href="#indie-quiz"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Do You Know Indie Films?
                  </a>
                  <a
                    href="#find-films"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How to Find Good Films
                  </a>
                  <a
                    href="#viewer-membership"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Win a Viewer Membership!
                  </a>
                </div>
              </div>

              {/* Filmmakers Section */}
              <div className="px-4">
                <button
                  onClick={() => scrollToSection('filmmakers')}
                  className="text-white hover:text-secondary transition-colors text-left w-full"
                >
                  Filmmaker Info
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/festivals"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Film Festival
                  </Link>
                  <Link
                    to="/blogs"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                  <a
                    href="#generator"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Film Idea Generator
                  </a>
                  <a
                    href="#crowdfunding"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Crowdfunding Tips
                  </a>
                  <a
                    href="#filmmaker-membership"
                    className="block text-white hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Win a Filmmaker Membership!
                  </a>
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* Admin Login Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-light mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white focus:outline-none focus:border-secondary"
                    placeholder="Enter admin password"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAdminLogin();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white 
                             hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdminLogin}
                    className="px-4 py-2 rounded-lg bg-secondary text-primary font-semibold 
                             hover:bg-secondary/90 transition-colors"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;