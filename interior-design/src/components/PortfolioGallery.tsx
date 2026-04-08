import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      // Heading fade in
      gsap.fromTo(headingRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      });

      const getScrollDist = () => track.scrollWidth - window.innerWidth;

      // Horizontal scroll — save to a variable so we can use it for the parallax
      const scrollTween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: () => {
            return (containerRef.current?.offsetHeight || 0) > window.innerHeight 
              ? "bottom bottom" 
              : "top top";
          },
          end: () => `+=${getScrollDist()}`,
          invalidateOnRefresh: true,
        },
      });

      // Parallax on each image
      gsap.utils.toArray<HTMLElement>('.portfolio__img').forEach(img => {
        gsap.fromTo(img, 
          { xPercent: 0 }, 
          { xPercent: -10, ease: 'none',
          scrollTrigger: { 
            trigger: img.parentElement, 
            containerAnimation: scrollTween, 
            start: 'left right',
            end: 'right left',
            scrub: true 
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-[var(--spacing-section)] pb-[80px]" id="portfolio">
      <div ref={headingRef} className="text-center px-[var(--spacing-container)] pb-[60px]">
        <span className="font-body text-[0.72rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[16px]">Selected Work</span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-text-primary">Spaces We've <em className="italic text-accent-gold">Transformed</em></h2>
      </div>
      <div ref={trackRef} className="portfolio__track flex gap-[24px] md:gap-[40px] px-[20px] md:px-[60px] will-change-transform">
        {projects.map(p => (
          <article key={p.id} className="flex-shrink-0 w-[85vw] md:w-[70vw] max-w-[900px] flex flex-col gap-[20px] group" data-cursor="View">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] md:aspect-[16/10]">
              <img className="portfolio__img w-[110%] h-full object-cover transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="px-[8px]">
              <span className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-accent-gold">{p.category}</span>
              <h3 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-normal mt-[6px] text-text-primary">{p.title}</h3>
              <p className="text-[0.85rem] text-text-secondary mt-[4px]">{p.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGallery;
