import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BeforeAfter.css';

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
    <section ref={sectionRef} className="ba" id="showcase">
      <div className="ba__container">
        <div className="ba__header">
          <span className="ba__tag">Transformations</span>
          <h2 className="ba__heading">The Power of <em>Design</em></h2>
        </div>
        <div className="ba__viewer">
          <div className="ba__before">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80" alt="Before redesign" />
          </div>
          <div className="ba__after">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80" alt="After redesign" />
          </div>
          <span className="ba__label ba__label--before">Before</span>
          <span className="ba__label ba__label--after">After</span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
