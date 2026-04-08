import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the image
      gsap.to('.about__image img', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Line-by-line text reveal
      gsap.utils.toArray<HTMLElement>('.about__reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[var(--spacing-section)]" id="about">
      <div className="w-full max-w-[1400px] mx-auto px-[var(--spacing-container)] grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-center">
        <div className="about__text-col">
          <span className="about__reveal text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[16px]">The Designer</span>
          <h2 className="about__reveal font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light mb-[32px]">Meet <em className="italic text-accent-gold">Her</em></h2>
          <p className="about__reveal text-[1rem] leading-[1.8] text-text-secondary mb-[20px]">
            With an eye for beauty and a heart for intention, she transforms ordinary spaces into extraordinary experiences. Every project begins with a conversation — understanding not just what a space should look like, but how it should feel.
          </p>
          <p className="about__reveal text-[1rem] leading-[1.8] text-text-secondary mb-[20px]">
            Trained in classical architecture and contemporary design, she brings a rare fusion of timeless elegance and modern sensibility. Her work has graced homes across Lagos, London, Dubai, and beyond.
          </p>
          <p className="about__reveal font-display text-[1.15rem] italic text-text-primary mb-[20px]">
            "I believe your space should be a reflection of who you are at your most peaceful. That's the starting point of every design."
          </p>
          <div className="about__reveal mt-[32px] pt-[24px] border-t border-black/8">
            <span className="font-display text-[1.3rem] font-medium block">Curves & Edges Interiors</span>
            <span className="text-[0.82rem] text-text-secondary block mt-[4px]">Founder & Creative Director</span>
          </div>
        </div>
        <div ref={imageRef} className="order-[-1] lg:order-none">
          <div className="rounded-[24px] overflow-hidden aspect-[4/3] lg:aspect-[3/4]">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" alt="The Designer" loading="lazy" className="w-full h-[120%] object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
