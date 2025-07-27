import React from 'react';
import { Info } from 'lucide-react';

const CompensationCard = ({ title, items }) => (
  <div className="bg-dark/30 p-6 rounded-lg backdrop-blur-sm hover:bg-dark/40 transition-all duration-300">
    <h3 className="text-xl font-semibold mb-6 text text-center pb-4 border-b border-white/10" style={{color:"#fda400"}}>{title}</h3>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-3 text-light/90">
          <span className="text text-lg" style={{color:"#fda400"}}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Compensation = () => {
  const compensationTypes = [
    {
      title: "Contract Terms",
      items: [
        "Upfront cash, no ad revenue",
        "Revenue on merch sales",
        "Limited screentime",
        "60-day termination notice",
        "Perfect if you want a clean deal"
      ]
    },
    {
      title: "Ad-Revenue Split",
      items: [
        "No upfront cash",
        "Negotiable ad revenue share",
        "Revenue on merch sales",
        "Unlimited screentime",
        "30-day termination notice"
      ]
    },
    {
      title: "Commission-Based",
      items: [
        "No upfront cash or ad revenue",
        "High revenue on merch sales",
        "Unlimited screentime",
        "Immediate termination",
        "Full creative control"
      ]
    },
    {
      title: "Monthly Competition",
      items: [
        "Cash prize opportunity",
        "No merch sale opportunity",
        "Monthly screentime",
        "Competition-based",
        "Exposure benefits"
      ]
    }
  ];

  return (
    <section id="compensation" className="section" style={{backgroundColor:"#3e1a3e"}}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Filmmaker Compensation Methods</h2>
          <p className="text-light/90 text-lg">
            Pick how you want to get paid—flexible options that fit your film's journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {compensationTypes.map((type, index) => (
            <CompensationCard key={index} {...type} />
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-secondary/10 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="text flex-shrink-0 mt-0.5" size={20} style={{color:"#fda400"}}/>
            <p className="text-sm text-light/90">
              Stream Connect (i) feature is available for Contract Terms and Ad-Revenue Split models, 
              providing enhanced analytics and audience engagement tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compensation;