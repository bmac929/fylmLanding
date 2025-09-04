import React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first
      navigate('/');
      // Then scroll to section after a short delay to ensure page is loaded
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleViewerFormClick = () => {
    // Replace with your actual Google Form URL
    window.open('https://forms.gle/wcZCtXfAfXe3PZD57', '_blank');
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleFilmmakerFormClick = () => {
    window.open('https://forms.gle/YT3BfB1EgLzfUsHN6', '_blank');
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        background: isScrolled ? '#3e1a3e' : 'none'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            FylmTV
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavigation('about')}
              className="text-white hover:text-secondary transition-colors"
            >
              About
            </button>
            
            {/* Viewers Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleDropdownToggle('viewers')}
                className="text-white hover:text-secondary transition-colors flex items-center"
              >
                Viewers
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === 'viewers' && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg py-2 z-50" style={{backgroundColor: '#3f1b3f'}}>
                  <button
                    onClick={handleViewerFormClick}
                    className="w-full text-left px-4 py-2 hover:bg-black/20 transition-colors"
                    style={{color: '#fda400'}}
                  >
                      <strong>Win a Viewer Membership!</strong> (at launch)
                  </button>
                </div>
              )}
            </div>

            {/* Filmmakers Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleDropdownToggle('filmmakers')}
                className="text-white hover:text-secondary transition-colors flex items-center"
              >
                Filmmakers
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === 'filmmakers' && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-lg py-2 z-50" style={{backgroundColor: '#3f1b3f'}}>
                  <button
                    onClick={handleFilmmakerFormClick}
                    className="w-full text-left px-4 py-2 hover:bg-black/20 transition-colors"
                    style={{color: '#fda400'}}
                  >
                      <strong>Win a Filmmaker Membership! </strong>(at launch)
                    </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavigation('compensation')}
              className="text-white hover:text-secondary transition-colors"
            >
              Compensation
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-primary">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation('about')}
                className="text-white hover:text-secondary transition-colors text-left"
              >
                About
              </button>
              
              {/* Mobile Viewers Dropdown */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('mobile-viewers')}
                  className="text-white hover:text-secondary transition-colors text-left flex items-center"
                >
                  Viewers
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {activeDropdown === 'mobile-viewers' && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={handleViewerFormClick}
                      className="text-white hover:text-secondary transition-colors text-left"
                    >
                      Win a Filmmaker Membership (at launch)!
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Filmmakers Dropdown */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('mobile-filmmakers')}
                  className="text-white hover:text-secondary transition-colors text-left flex items-center"
                >
                  Filmmakers
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {activeDropdown === 'mobile-filmmakers' && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={handleFilmmakerFormClick}
                      className="text-white hover:text-secondary transition-colors text-left"
                    >
                      Win a Filmmaker Membership (at launch)!
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigation('compensation')}
                className="text-white hover:text-secondary transition-colors text-left"
              >
                Compensation
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;