import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Programa-style text stretch on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=700',
          pin: true,
          scrub: 0.6,
        },
      });

      tl.to('.hero__title-line', {
        scaleX: 2.2,
        opacity: 0,
        filter: 'blur(15px)',
        stagger: 0.05,
        ease: 'power2.in',
      });

      tl.to(subtitleRef.current, { opacity: 0, y: -40 }, '<0.1');
      tl.to(indicatorRef.current, { opacity: 0, y: -20 }, '<');

      // Entrance animations
      gsap.fromTo('.hero__title-line',
        { y: 100, opacity: 0, rotateX: 40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.18, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.7, ease: 'power3.out' }
      );
      gsap.fromTo(indicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.5 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero" id="home">
      <div className="hero__bg">
        <img
          className="hero__bg-image"
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Luxury interior design"
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <h1 ref={titleRef} className="hero__title">
          <span className="hero__title-line">Interior</span>
          <span className="hero__title-line hero__title-italic">by Her</span>
        </h1>
        <p ref={subtitleRef} className="hero__subtitle">
          Where elegance meets intention
        </p>
      </div>
      <div ref={indicatorRef} className="hero__indicator">
        <div className="hero__indicator-line" />
        <span className="hero__indicator-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
