import React from 'react';
import { Play, MessageCircle, Globe, Sparkles } from 'lucide-react';

const SURPRISE_CHANNELS = [
'https://youtu.be/OrOYvVf6tIM?si=iA1g2OHZEW8w7Ygp',
'https://youtu.be/1JqR3GVqib4?si=sHqvn5VR5Dg6i3ep',
'https://youtu.be/mpDOscUDQ_0?si=aBGLK8TbSCwaPPP9',
'https://youtu.be/gNQIdEv-Emo?si=G7po12elrq8hqnea',
'https://youtu.be/OlahNrlcgS4?si=VFle-9XyoCAVXarx',
'https://youtu.be/Zlmswo0S0e0?si=-Xm10gFt2Gr8It3v',
'https://youtu.be/SxQj0DumF8Y?si=MJG8mOpMTOmP62sH',
'https://youtu.be/wM1QdD6q8Kg?si=ZWuotlpzb4aabbx8',
'https://youtu.be/btxdcqLOGuc?si=uToVlO6uxUUjj6_P',
'https://youtu.be/t8LD0iUYv80?si=pYoawK3SPLDKezIm',
'https://youtu.be/V-zMylFrojY?si=_mrPE5oD0vznzC90',
'https://youtu.be/vw5vcUPyL90?si=D3A6wzE2S5AOC-mU',
'https://youtu.be/IHQr0HCIN2w?si=QvsRK1KPeWIz0NOn',
'https://youtu.be/gNVqRC4mcSI?si=f7i3lPdotY0-cyn1',
'https://youtu.be/3PejXWtS4xs?si=HO8FlyCFaW3mpAav',
'https://youtu.be/HPQ1zHmLqgE?si=w-JjBsRNPB6L-7D2',
'https://youtu.be/dop4MTlf_zc?si=HYLH6PPHm-ONmlyw',
'https://youtu.be/1Prm8b2uT9w?si=RZSOQJYmQ3DF_2hc',
'https://youtu.be/lKSEaOJSbRE?si=OLNqeau7jCYgIMnB',
'https://youtu.be/dKcOTr7N4lE?si=AOzab9qCodqOZonB',
'https://youtu.be/HwAPLk_sQ3w?si=-zVQeYkvSsiS7rx0',
'https://youtu.be/PQn14PvpkJA?si=i-DqyXAbbSjKPgk9',
'https://youtu.be/IC8KsZniulw?si=GyfunbR7neKcI9jI',
'https://youtu.be/mImFz8mkaHo?si=HMS4WJI1T_bkE7Cp',
];

const ViewerFeature = ({ icon: Icon, title, description }) => (
  <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm h-full flex flex-col items-center text-center">
    <div className="flex justify-center mb-4">
      <Icon className="text" size={32} style={{color:"#fda400"}}/>
    </div>
    <div className="flex flex-col flex-grow items-center">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-light/90">{description}</p>
    </div>
  </div>
);

const Viewers = () => {
  const features = [
    {
      icon: Play,
      title: "Fresh Drops Daily",
      description: "New indie films dropping all the time—be the first to flex your film knowledge."
    },
    {
      icon: MessageCircle,
      title: "Connect with Creators",
      description: "Ever wanted to tell a filmmaker how much you loved (or debated) their film? Now you can—right here on Fylm TV."
    },
    {
      icon: Globe,
      title: "Global Indie Scene",
      description: "From local festival favorites to international gems—get the best of indie cinema in one place."
    }
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('prelaunch-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('setFormRole', { detail: 'viewer' }));
    }
  };

  const handleSurpriseMe = () => {
    const randomChannel = SURPRISE_CHANNELS[Math.floor(Math.random() * SURPRISE_CHANNELS.length)];
    window.open(randomChannel, '_blank');
  };

  return (
    <section id="viewers" className="section" style={{backgroundColor:"#3e1a3e"}}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">For Viewers</h2>
          <p className="text-light/90 text-lg mb-8">
            FylmTV is a streaming platform that keeps you in the loop & updated with new content 
            & future projects of your favorite filmmakers & actors.<br /><br />
            <i>Don't know what indie films are? Click Surprise me!</i>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToForm}
              className="flex items-center justify-center gap-2 transform hover:scale-105"
              style={{
                backgroundColor: "#fda400",
                color: "#3e1a3e",
                padding: "12px 24px",
                borderRadius: "5px",
                fontWeight: "bold",
                width: "auto"
              }}
            >
              <strong>Join Waitlist</strong>
            </button>
            <button
              onClick={handleSurpriseMe}
              className="flex items-center justify-center gap-2 transform hover:scale-105 group"
              style={{
                backgroundColor: "#B5004E",
                color: "white",
                padding: "12px 24px",
                borderRadius: "5px",
                fontWeight: "bold",
                width: "auto"
              }}
            >
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              Surprise Me! 🎉
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ViewerFeature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Viewers;