import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      gsap.fromTo('.hero__title-entrance',
        { y: 100, opacity: 0, rotateX: 40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.18, ease: 'power3.out', delay: 4.8 }
      );
      gsap.fromTo('.hero__subtitle-entrance',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 5.4, ease: 'power3.out' }
      );
      gsap.fromTo('.hero__indicator-entrance',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 6.0 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden" id="home">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover animate-[kenBurns_25s_ease-in-out_infinite_alternate]"
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Luxury interior design"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(13,13,13,0.55)_0%,rgba(13,13,13,0.4)_50%,rgba(13,13,13,0.65)_100%)]" />
      </div>
      <div className="relative z-[2] text-center flex flex-col items-center gap-[24px]">
        <h1 ref={titleRef} className="flex flex-col items-center gap-0 [perspective:600px]">
          <span className="hero__title-line block origin-center will-change-[transform,opacity,filter]">
            <span className="hero__title-entrance block font-display text-[clamp(4rem,12vw,10rem)] font-light text-text-light tracking-[-0.02em] leading-none">Curves & Edges</span>
          </span>
          <span className="hero__title-line block origin-center will-change-[transform,opacity,filter] mt-[8px]">
            <span className="hero__title-entrance block font-display text-[clamp(2.5rem,7vw,6rem)] font-light italic text-accent-gold tracking-[0.02em] leading-none">Interiors</span>
          </span>
        </h1>
        <div ref={subtitleRef} className="mt-[16px]">
          <p className="hero__subtitle-entrance font-body text-[clamp(0.85rem,1.3vw,1.1rem)] font-light text-text-light-muted tracking-[0.2em] uppercase">
            Where elegance meets intention
          </p>
        </div>
      </div>
      <div ref={indicatorRef} className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-[2]">
        <div className="hero__indicator-entrance flex flex-col items-center gap-[12px]">
          <div className="w-[1px] h-[50px] bg-accent-gold animate-[scrollPulse_2s_ease-in-out_infinite]" />
          <span className="text-[0.65rem] font-normal tracking-[0.2em] uppercase text-text-light-muted">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
