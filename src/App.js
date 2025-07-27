import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Features from './components/Features.js';
import About from './components/About.js';
import Viewers from './components/Viewers.js';
import Filmmakers from './components/Filmmakers.js';
import Compensation from './components/Compensation.js';
import PrelaunchForm from './components/PrelaunchForm.js';
function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white">
      {isLoading && <div className="loading-bar" />}
      <Header />
      <Hero />
      <Features />
      <About />
      <Viewers />
      <Filmmakers />
      <Compensation />
      <PrelaunchForm />
      <Footer />
    </div>
  );
}

export default App;