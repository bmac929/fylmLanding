import React from 'react';
import { Instagram, Mail, Youtube, Facebook, Link as LinkIcon } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { FaDiscord, FaTiktok, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FylmTV</h3>
            <p className="text-light/70 text-sm">
              Empowering independent filmmakers and bringing fresh content to viewers worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-light/90 mb-2">For Filmmakers</h5>
                <ul className="space-y-2">
                  <li>
                    <RouterLink to="/submit-idea" className="text-light/70 hover:text-secondary transition-colors">
                      Submit Film Idea
                    </RouterLink>
                  </li>
                  
                  <li>
                    <a href="#filmmaker-membership" className="text-light/70 hover:text-secondary transition-colors font-medium">
                      Win a Filmmaker Membership <span className="text-light/50 text-sm">(at launch)!</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-light/90 mb-2">For Viewers</h5>
                <ul className="space-y-2">
                  <li>
                    <a href="#viewer-membership" className="text-light/70 hover:text-secondary transition-colors font-medium">
                      Win a Viewer Membership <span className="text-light/50 text-sm">(at launch)!</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-4">
              {/* First row of social icons */}
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/fylm.tv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@fylmtv?_t=ZP-8tu09KHVghq&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok size={22} />
                </a>
                <a
                  href="https://youtube.com/@fylmtv?si=CH4ZDVzcJ5rsctun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://twitter.com/Fylm_TV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={22} />
                </a>
              </div>

              {/* Second row of social icons */}
              <div className="flex gap-4">
                <a
                  href="https://discord.gg/SAaSBPee7S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="Discord"
                >
                  <FaDiscord size={24} />
                </a>
                <a
                  href="https://www.facebook.com/FylmTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="mailto:Admin@FylmTV.com"
                  className="text-light/70 hover:text-secondary transition-colors"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="https://www.facebook.com/share/g/15ijxcdqgU/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-light/70 hover:text-secondary transition-colors text-sm"
              >
                <LinkIcon size={16} />
                Join our Facebook Group
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-light/50 text-sm">
          <p>&copy; {new Date().getFullYear()} FylmTV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;