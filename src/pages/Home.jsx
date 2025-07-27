import React from 'react';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import About from '../components/About.jsx';
import Viewers from '../components/Viewers.jsx';
import Filmmakers from '../components/Filmmakers.jsx';
import Compensation from '../components/Compensation.jsx';
import PrelaunchForm from '../components/PrelaunchForm.jsx';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Viewers />
      <Filmmakers />
      <Compensation />
      <PrelaunchForm />
    </>
  );
}

export default Home;