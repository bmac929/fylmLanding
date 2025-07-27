import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const benefits = [
    "Indie movies, films, shorts, and shows you won't find on your average streaming service",
    "Connect with filmmakers, actors, and creatives who actually reply to DMs",
    "Support your favorite filmmakers, fund in their next big idea, or grab some limited-edition merch"
  ];

  return (
    <section id="about" className="section  relative overflow-hidden" style={{backgroundColor:"#160016"}}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-transparent"></div>
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">
            Made by Filmmakers, Loved by Movie Nerds
          </h2>
          <p className="text-light/90 text-lg mb-8">
            Fylm TV is what happens when film lovers take control. A streaming platform built for unique film lovers. 
            Whether you're here to watch, create, or connect—you've found your people.
          </p>
        </div>

        <div className="grid gap-4 max-w-xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 bg-primary/30 p-4 rounded-lg backdrop-blur-sm"
            >
              <CheckCircle className="text flex-shrink-0" size={24} style={{color:"#fda400"}}/>
              <span className="text-light">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;