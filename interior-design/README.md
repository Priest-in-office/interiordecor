# Curves & Edges Interiors

Curves & Edges Interiors is a premium, single-page interior design showcase built with React, TypeScript, Vite, Tailwind CSS, GSAP, and Lenis. It presents the brand as a cinematic, editorial-style experience: a pinned hero, smooth scroll interactions, a horizontally scrolling portfolio, a before/after transformation section, testimonials, a designer profile, and a consultation flow.

The site is intentionally presentation-first. It is designed to feel more like a polished studio portfolio than a generic brochure site, while still keeping the codebase small, modern, and easy to extend.

## What This Project Includes

- A full-screen hero section with animated title treatment and scroll-pinned transitions.
- A horizontally scrolling portfolio gallery with parallax image motion.
- A services section with pinned imagery and animated service cards.
- A before/after transformation showcase driven by scroll-based clipping.
- A testimonial section with animated statistics and client quotes.
- A founder/about section with staggered reveal animations.
- A contact section with a strong call to action and business details.
- A dedicated consultation route with a structured inquiry form.
- A custom cursor, magnetic buttons, and a preloader for a more premium feel.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger for motion and scroll choreography
- Lenis for smooth scrolling
- React Router for client-side routing
- Lucide React for icons

## Routes

- `/` - Main landing page with all brand sections.
- `/consultation` - Consultation request form for project inquiries.

## Project Structure

```text
src/
	App.tsx                 # App shell, routing, global scroll setup
	main.tsx                # React entry point
	index.css               # Global styles, Tailwind theme tokens, animations
	components/
		About.tsx
		BeforeAfter.tsx
		Contact.tsx
		CustomCursor.tsx
		Hero.tsx
		MagneticButton.tsx
		Navbar.tsx
		PortfolioGallery.tsx
		Preloader.tsx
		Services.tsx
		Testimonials.tsx
	pages/
		ConsultationPage.tsx
```

## Getting Started

### Prerequisites

- Node.js 18 or newer is recommended.
- npm, pnpm, or yarn can be used, although the scripts below use npm.

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Then open the local URL shown by Vite.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Lint the Project

```bash
npm run lint
```

## How It Works

### Motion and Scroll Behaviour

The experience is driven by GSAP and ScrollTrigger. Several sections pin to the viewport and animate as the user scrolls. Lenis is used to smooth wheel scrolling and keep the motion feeling deliberate rather than jumpy.

Key animation patterns used in the app include:

- pinned hero text that stretches and fades as the user scrolls,
- a horizontally scrolling portfolio track,
- image parallax in the about and portfolio sections,
- a clip-path based before/after reveal,
- stat counters and staggered card reveals in testimonials,
- a custom cursor with hover-state text feedback,
- magnetic buttons that subtly follow the pointer.

### Styling Approach

The project uses Tailwind CSS v4 with custom theme tokens defined in [src/index.css](src/index.css). Those tokens centralise brand colours, typography, and spacing so the visual language stays consistent across sections.

The design direction is warm, editorial, and luxurious:

- cream and charcoal backgrounds,
- gold as the primary accent colour,
- serif display typography for headings,
- restrained body text,
- generous whitespace and large imagery.

### Consultation Form

The consultation page is currently a front-end form experience only. On submit, it shows a confirmation alert and resets the form. There is no backend integration yet, so if you want lead capture you will need to connect it to an API, form service, or email workflow.

## Implementation Notes

- The app uses browser routing instead of a separate server-rendered page structure.
- External imagery is loaded from Unsplash URLs, so the site expects network access for those assets.
- The custom cursor only activates on fine pointer devices; touch devices fall back to the normal cursor.
- Several anchors currently point to section IDs, so the single-page navigation works through in-page scrolling.
- Some social and policy links are placeholders and should be replaced before production use.

## Scripts

The available npm scripts are defined in [package.json](package.json):

- `npm run dev` - Start the Vite development server.
- `npm run build` - Type-check and build the production bundle.
- `npm run lint` - Run ESLint across the project.
- `npm run preview` - Preview the production build locally.

## Development Notes

If you add new sections, keep the existing motion language in mind. The current codebase relies on a very specific rhythm: slow reveals, soft easing, large imagery, and a premium feel. New content should follow that pattern rather than introducing generic UI blocks.

If you wire up real form submission later, the consultation page is the main place to start. The current form state is already structured in a way that makes it straightforward to send to an API endpoint or server action.

## Status

This project is ready as a polished marketing and portfolio front end. The main missing production pieces are backend form handling, real contact destinations, and any analytics or CRM integration you may want to add.

## License

No licence has been specified yet.
