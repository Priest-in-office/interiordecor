import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BeforeAfter = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven clip reveal
      gsap.fromTo('.ba__after',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: 1,
          },
        }
      );

      // Label animations
      gsap.fromTo('.ba__label--before', { opacity: 1 }, {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=600', scrub: true },
      });
      gsap.fromTo('.ba__label--after', { opacity: 0 }, {
        opacity: 1,
        scrollTrigger: { trigger: sectionRef.current, start: '+=600', end: '+=1200', scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] flex flex-col justify-center bg-bg-dark overflow-hidden py-[80px]" id="showcase">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--spacing-container)] flex flex-col items-center gap-[40px]">
        <div className="text-center">
          <span className="font-body text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[12px]">Transformations</span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-text-light">The Power of <em className="italic text-accent-gold">Design</em></h2>
        </div>
        <div className="relative w-full max-w-[1000px] rounded-[24px] overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: 'calc(100vh - 280px)' }}>
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80" alt="Before redesign" className="w-full h-full object-cover" />
          </div>
          <div className="ba__after absolute inset-0 z-[2] [clip-path:inset(0_100%_0_0)]">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80" alt="After redesign" className="w-full h-full object-cover" />
          </div>
          <span className="ba__label--before absolute bottom-[24px] left-[24px] z-[3] font-body text-[0.72rem] font-medium tracking-[0.15em] uppercase px-[20px] py-[8px] rounded-[8px] backdrop-blur-[10px] bg-black/50 text-text-light">Before</span>
          <span className="ba__label--after absolute bottom-[24px] right-[24px] z-[3] font-body text-[0.72rem] font-medium tracking-[0.15em] uppercase px-[20px] py-[8px] rounded-[8px] backdrop-blur-[10px] bg-[rgba(197,164,103,0.9)] text-bg-deep opacity-0">After</span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
