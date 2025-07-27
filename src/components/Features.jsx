import React from 'react';
import { FilmReel, Users, Star } from '@phosphor-icons/react';

const Features = () => {
  return (
    <section id="features" className="section bg-gradient-to-b from-primary to-dark">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-primary/50 p-8 rounded-lg backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <FilmReel 
                  size={48} 
                  weight="duotone"
                  className="transition-all duration-300 hover:scale-110"
                  style={{color:"#fda400"}}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent blur-lg -z-10"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Engage</h3>
            <p className="text-light/90 text-center">
              Talk to your favorite filmmakers & actors, debate the best stories, or just geek out with other film lovers—this is your space.
            </p>
          </div>

          <div className="bg-primary/50 p-8 rounded-lg backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Users 
                  size={48} 
                  weight="duotone"
                  className="transition-all duration-300 hover:scale-110"
                  style={{color:"#fda400"}}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent blur-lg -z-10"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Empower</h3>
            <p className="text-light/90 text-center">
              Skip the studio middlemen. Here, you can support filmmakers directly—buy their merch, fund their next film, or just hype them up.
            </p>
          </div>

          <div className="bg-primary/50 p-8 rounded-lg backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Star 
                  size={48} 
                  weight="duotone"
                  className="transition-all duration-300 hover:scale-110"
                  style={{color:"#fda400"}}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent blur-lg -z-10"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">Experience</h3>
            <p className="text-light/90 text-center">
              A film collection that feels like a hidden gem section, not the same old mainstream lineup. Your next favorite movie is waiting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;