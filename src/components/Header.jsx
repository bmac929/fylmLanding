import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
            <button 
              onClick={() => handleNavigation('viewers')}
              className="text-white hover:text-secondary transition-colors"
            >
              Viewers
            </button>
            <button 
              onClick={() => handleNavigation('filmmakers')}
              className="text-white hover:text-secondary transition-colors"
            >
              Filmmakers
            </button>
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
              <button
                onClick={() => handleNavigation('viewers')}
                className="text-white hover:text-secondary transition-colors text-left"
              >
                Viewers
              </button>
              <button
                onClick={() => handleNavigation('filmmakers')}
                className="text-white hover:text-secondary transition-colors text-left"
              >
                Filmmakers
              </button>
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