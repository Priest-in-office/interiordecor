import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

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
    <section ref={sectionRef} className="about" id="about">
      <div className="about__container">
        <div className="about__text-col">
          <span className="about__label about__reveal">The Designer</span>
          <h2 className="about__heading about__reveal">Meet <em>Her</em></h2>
          <p className="about__bio about__reveal">
            With an eye for beauty and a heart for intention, she transforms ordinary spaces into extraordinary experiences. Every project begins with a conversation — understanding not just what a space should look like, but how it should feel.
          </p>
          <p className="about__bio about__reveal">
            Trained in classical architecture and contemporary design, she brings a rare fusion of timeless elegance and modern sensibility. Her work has graced homes across Lagos, London, Dubai, and beyond.
          </p>
          <p className="about__bio about__reveal">
            "I believe your space should be a reflection of who you are at your most peaceful. That's the starting point of every design."
          </p>
          <div className="about__signature about__reveal">
            <span className="about__sig-name">Interior by Her</span>
            <span className="about__sig-title">Founder & Creative Director</span>
          </div>
        </div>
        <div ref={imageRef} className="about__image-col">
          <div className="about__image">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" alt="The Designer" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
