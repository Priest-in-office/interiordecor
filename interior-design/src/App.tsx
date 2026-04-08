import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGallery from './components/PortfolioGallery';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import ConsultationPage from './pages/ConsultationPage';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioGallery />
        <Services />
        <BeforeAfter />
        <Testimonials />
        <About />
        <Contact />
      </main>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.075,
      duration: 1.4,
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    // Refresh ScrollTrigger after preloader removal
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, []);

  return (
    <BrowserRouter>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
