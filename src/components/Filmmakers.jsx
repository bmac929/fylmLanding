import React from 'react';
import { Upload, Users2, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const FilmmakerFeature = ({ icon: Icon, title, description }) => (
  <div className="bg-dark/30 p-8 rounded-lg backdrop-blur-sm flex flex-col items-center text-center">
    <div className="flex justify-center mb-4">
      <Icon className="text" size={32} style={{color:"#fda400"}}/>
    </div>
    <div className="flex flex-col flex-grow items-center">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-light/90">{description}</p>
    </div>
  </div>
);

const Filmmakers = () => {
  const features = [
    {
      icon: Upload,
      title: "Fylm TV",
      description: "Get your film seen, track your audience, and make money—all in one place. Plus, connect your merch and crowdfunding for extra support."
    },
    {
      icon: Users2,
      title: "Fylm Connect",
      description: "Network with indie filmmakers, actors, and industry pros—collab, hire, or just chat."
    },
    {
      icon: Wallet,
      title: "Fylm Support",
      description: "Your fans want to support you—let them. Sell merch, crowdfund, and turn your passion into profit."
    }
  ];

  const scrollToCompensation = () => {
    const compensationSection = document.getElementById('compensation');
    if (compensationSection) {
      compensationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="filmmakers" className="section bg-gradient-to-br from-tertiary to-primary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">For Filmmakers</h2>
          <p className="text-light/90 text-lg mb-8">
            You made your film? Now let's get people to watch it. Submit today to avoid avoid admin fee and start building your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" >
            <Link to="/submit/submission" className="btn" style={{backgroundColor:"#fda400", color:"#3e1a3e", paddingTop:"10px", paddingBottom:"10px", borderRadius:"5px", textTransform: "none", fontWeight: "bold"}}>Submit Your Film</Link>
            <button 
              onClick={scrollToCompensation} 
              className="btn hover:text-white"
              style={{backgroundColor:"#b2004c", paddingTop:"10px", paddingBottom:"10px", borderRadius:"5px", textTransform: "none"}}
            >
              Compensation Plans
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FilmmakerFeature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Filmmakers;