import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PortfolioGallery.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'The Serene Suite', location: 'Lagos, Nigeria', category: 'Residential', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80' },
  { id: 2, title: 'Golden Hour Living', location: 'Abuja, Nigeria', category: 'Luxury Villa', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80' },
  { id: 3, title: 'Modern Minimalist', location: 'London, UK', category: 'Penthouse', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80' },
  { id: 4, title: 'The Ivory Retreat', location: 'Dubai, UAE', category: 'Hotel Suite', image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80' },
  { id: 5, title: 'Botanical Haven', location: 'Accra, Ghana', category: 'Private Home', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80' },
];

const PortfolioGallery = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const scrollDist = track.scrollWidth - window.innerWidth;

      // Heading fade in
      gsap.fromTo(headingRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      });

      // Horizontal scroll
      gsap.to(track, {
        x: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollDist}`,
          invalidateOnRefresh: true,
        },
      });

      // Parallax on each image
      gsap.utils.toArray<HTMLElement>('.portfolio__img').forEach(img => {
        gsap.fromTo(img, { x: 80 }, { x: -80, ease: 'none',
          scrollTrigger: { trigger: img, containerAnimation: undefined, scrub: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="portfolio" id="portfolio">
      <div ref={headingRef} className="portfolio__header">
        <span className="portfolio__label">Selected Work</span>
        <h2 className="portfolio__heading">Spaces We've <em>Transformed</em></h2>
      </div>
      <div ref={trackRef} className="portfolio__track">
        {projects.map(p => (
          <article key={p.id} className="portfolio__slide" data-cursor="View">
            <div className="portfolio__img-wrap">
              <img className="portfolio__img" src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="portfolio__info">
              <span className="portfolio__cat">{p.category}</span>
              <h3 className="portfolio__name">{p.title}</h3>
              <p className="portfolio__loc">{p.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGallery;
