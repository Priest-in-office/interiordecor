import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const ConsultationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    propertyType: '',
    serviceType: '',
    rooms: '',
    budget: '',
    timeline: '',
    projectDetails: '',
    referral: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — user will wire up backend later
    alert('Thank you for your inquiry! We\u2019ll be in touch within 24 hours to schedule your consultation.');
    setFormData({ fullName: '', email: '', phone: '', propertyType: '', serviceType: '', rooms: '', budget: '', timeline: '', projectDetails: '', referral: '' });
  };

  const labelClasses = "block text-[0.7rem] font-medium tracking-[0.12em] uppercase text-text-light-muted mb-[8px]";
  const inputClasses = "w-full py-[12px] font-body text-[0.9rem] text-text-light bg-transparent border-0 border-b border-white/15 outline-none transition-colors duration-300 focus:border-accent-gold appearance-none placeholder:text-white/20";
  const selectClasses = `${inputClasses} cursor-pointer`;

  return (
    <div className="min-h-screen bg-bg-deep text-text-light">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-white/8 bg-bg-deep/95 backdrop-blur-[12px]">
        <div className="w-full max-w-[900px] mx-auto px-[24px] md:px-[48px] py-[20px] flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-[8px] text-[0.82rem] font-body text-text-light-muted tracking-[0.04em] transition-colors duration-300 hover:text-accent-gold group"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-[4px]" />
            Back to Home
          </button>
          <div className="flex items-baseline gap-[8px]">
            <span className="font-display text-[1.2rem] font-normal text-text-light tracking-[0.03em]">Curves & Edges</span>
            <span className="font-display text-[0.85rem] font-light italic text-accent-gold tracking-[0.03em]">Interiors</span>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="w-full max-w-[900px] mx-auto px-[24px] md:px-[48px] py-[60px] md:py-[80px]">
        {/* Header */}
        <div className="text-center mb-[56px]">
          <span className="font-body text-[0.65rem] font-medium tracking-[0.2em] uppercase text-accent-gold block mb-[16px]">Book a Consultation</span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light mb-[16px]">Let's Design <em className="italic text-accent-gold">Your Space</em></h1>
          <p className="text-[0.95rem] leading-[1.7] text-text-light-muted max-w-[540px] mx-auto">
            Fill out the details below and we'll get back to you within 24 hours to schedule your complimentary discovery call.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-[32px]" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <p className="text-[0.72rem] font-medium tracking-[0.15em] uppercase text-accent-gold/70 border-b border-white/8 pb-[12px]">Personal Details</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
            <div>
              <label htmlFor="consult-name" className={labelClasses}>Full Name *</label>
              <input id="consult-name" type="text" className={inputClasses} value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} required placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="consult-phone" className={labelClasses}>Phone Number</label>
              <input id="consult-phone" type="tel" className={inputClasses} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+234 800 000 0000" />
            </div>
          </div>

          <div>
            <label htmlFor="consult-email" className={labelClasses}>Email Address *</label>
            <input id="consult-email" type="email" className={inputClasses} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required placeholder="you@example.com" />
          </div>

          {/* Project Details */}
          <p className="text-[0.72rem] font-medium tracking-[0.15em] uppercase text-accent-gold/70 border-b border-white/8 pb-[12px] mt-[8px]">Project Information</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
            <div>
              <label htmlFor="consult-property" className={labelClasses}>Property Type *</label>
              <select id="consult-property" className={selectClasses} value={formData.propertyType} onChange={e => setFormData({ ...formData, propertyType: e.target.value })} required>
                <option value="" className="bg-bg-deep text-text-light">Select type</option>
                <option value="apartment" className="bg-bg-deep text-text-light">Apartment / Flat</option>
                <option value="detached" className="bg-bg-deep text-text-light">Detached House</option>
                <option value="duplex" className="bg-bg-deep text-text-light">Duplex / Terrace</option>
                <option value="penthouse" className="bg-bg-deep text-text-light">Penthouse</option>
                <option value="villa" className="bg-bg-deep text-text-light">Villa / Mansion</option>
                <option value="office" className="bg-bg-deep text-text-light">Office Space</option>
                <option value="commercial" className="bg-bg-deep text-text-light">Restaurant / Hotel / Commercial</option>
              </select>
            </div>
            <div>
              <label htmlFor="consult-service" className={labelClasses}>Service Needed *</label>
              <select id="consult-service" className={selectClasses} value={formData.serviceType} onChange={e => setFormData({ ...formData, serviceType: e.target.value })} required>
                <option value="" className="bg-bg-deep text-text-light">Select service</option>
                <option value="full-redesign" className="bg-bg-deep text-text-light">Full Redesign</option>
                <option value="space-planning" className="bg-bg-deep text-text-light">Space Planning</option>
                <option value="color-consultation" className="bg-bg-deep text-text-light">Color Consultation</option>
                <option value="furniture-curation" className="bg-bg-deep text-text-light">Furniture Curation</option>
                <option value="staging" className="bg-bg-deep text-text-light">Staging & Styling</option>
                <option value="not-sure" className="bg-bg-deep text-text-light">Not Sure Yet</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
            <div>
              <label htmlFor="consult-rooms" className={labelClasses}>Number of Rooms</label>
              <select id="consult-rooms" className={selectClasses} value={formData.rooms} onChange={e => setFormData({ ...formData, rooms: e.target.value })}>
                <option value="" className="bg-bg-deep text-text-light">Select</option>
                <option value="1-2" className="bg-bg-deep text-text-light">1 – 2 rooms</option>
                <option value="3-4" className="bg-bg-deep text-text-light">3 – 4 rooms</option>
                <option value="5-7" className="bg-bg-deep text-text-light">5 – 7 rooms</option>
                <option value="8+" className="bg-bg-deep text-text-light">8+ rooms / Full property</option>
              </select>
            </div>
            <div>
              <label htmlFor="consult-budget" className={labelClasses}>Estimated Budget</label>
              <select id="consult-budget" className={selectClasses} value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })}>
                <option value="" className="bg-bg-deep text-text-light">Select a range</option>
                <option value="10k-25k" className="bg-bg-deep text-text-light">$10,000 – $25,000</option>
                <option value="25k-50k" className="bg-bg-deep text-text-light">$25,000 – $50,000</option>
                <option value="50k-100k" className="bg-bg-deep text-text-light">$50,000 – $100,000</option>
                <option value="100k+" className="bg-bg-deep text-text-light">$100,000+</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="consult-timeline" className={labelClasses}>Desired Timeline</label>
            <select id="consult-timeline" className={selectClasses} value={formData.timeline} onChange={e => setFormData({ ...formData, timeline: e.target.value })}>
              <option value="" className="bg-bg-deep text-text-light">When do you need this?</option>
              <option value="asap" className="bg-bg-deep text-text-light">As soon as possible</option>
              <option value="1-3-months" className="bg-bg-deep text-text-light">Within 1 – 3 months</option>
              <option value="3-6-months" className="bg-bg-deep text-text-light">3 – 6 months</option>
              <option value="flexible" className="bg-bg-deep text-text-light">Flexible / No rush</option>
            </select>
          </div>

          <div>
            <label htmlFor="consult-details" className={labelClasses}>Tell Us About Your Vision</label>
            <textarea id="consult-details" rows={4} className={`${inputClasses} resize-y min-h-[80px]`} value={formData.projectDetails} onChange={e => setFormData({ ...formData, projectDetails: e.target.value })} placeholder="Describe your dream space — style preferences, inspirations, must-haves..." />
          </div>

          <div>
            <label htmlFor="consult-referral" className={labelClasses}>How Did You Hear About Us?</label>
            <select id="consult-referral" className={selectClasses} value={formData.referral} onChange={e => setFormData({ ...formData, referral: e.target.value })}>
              <option value="" className="bg-bg-deep text-text-light">Select</option>
              <option value="instagram" className="bg-bg-deep text-text-light">Instagram</option>
              <option value="pinterest" className="bg-bg-deep text-text-light">Pinterest</option>
              <option value="referral" className="bg-bg-deep text-text-light">Friend / Referral</option>
              <option value="google" className="bg-bg-deep text-text-light">Google Search</option>
              <option value="other" className="bg-bg-deep text-text-light">Other</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-[16px] pb-[40px]">
            <MagneticButton type="submit" className="w-full md:w-auto md:min-w-[320px] mx-auto flex items-center justify-center gap-[8px] px-[48px] py-[18px] text-[0.82rem] font-medium tracking-[0.08em] uppercase text-bg-deep bg-accent-gold rounded-none transition-all duration-300 hover:bg-[var(--accent-gold-hover)] hover:-translate-y-1">
              Request Consultation <ArrowUpRight size={16} />
            </MagneticButton>
            <p className="text-[0.72rem] text-text-light-muted text-center mt-[20px] leading-[1.6]">
              We'll respond within 24 hours to schedule your complimentary consultation.
            </p>
          </div>
        </form>
      </div>

      {/* Mini Footer */}
      <div className="border-t border-white/8">
        <div className="w-full max-w-[900px] mx-auto px-[24px] md:px-[48px] py-[24px] flex flex-col md:flex-row items-center justify-between gap-[12px] text-center md:text-left">
          <p className="text-[0.72rem] text-text-light-muted">© {new Date().getFullYear()} Curves & Edges Interiors. All rights reserved.</p>
          <div className="flex gap-[16px]">
            <a href="#" className="text-[0.72rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold">Privacy</a>
            <a href="#" className="text-[0.72rem] text-text-light-muted transition-colors duration-300 hover:text-accent-gold">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
