import React from 'react';
import { Camera, Film, Play } from 'lucide-react';
import TypeWriter from './TypeWriter';

const Hero = () => {
  const scrollToForm = (role) => {
    const formElement = document.getElementById('prelaunch-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('setFormRole', { detail: role }));
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary to-tertiary">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="relative w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Camera size={200} className="text-secondary/50" />
          </div>
          <Film
            size={100}
            className="absolute top-1/4 left-1/4 text-tertiary/50 animate-pulse"
          />
          <Play
            size={80}
            className="absolute bottom-1/4 right-1/4 text-secondary/50 animate-pulse"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 lg:min-h-screen lg:flex lg:items-center">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" >
            <span className="whitespace-nowrap">Discover great <TypeWriter /> <br />you won't find anywhere else</span>
          </h1>
          <p className="text-light text-lg md:text-xl mb-8">
            No overpriced tickets, no endless scrolling—just the best underground cinema, right at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="btn"
              onClick={() => scrollToForm('viewer')}
              color="tertiary"
              style={{backgroundColor:"#fda400", color:"#3e1a3e", borderRadius:"10px"}}
            >
              Pre-sign up for Viewers
            </button>
            <button 
              className="btn hover:text-white"
              onClick={() => scrollToForm('filmmaker')}
              style={{backgroundColor:"#b0014d", borderRadius:"10px"}}
            >
              Pre-sign up for Filmmakers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;