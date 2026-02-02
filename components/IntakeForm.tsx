import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { trackClarityEvent, upgradeClaritySession } from '../utils/clarity';
import { sendEmail } from '../utils/emailConfig';

const HAVE_WEBSITE_OPTIONS = ['Yes', 'No', 'Outdated / not really'] as const;
const LOOKING_FOR_OPTIONS = ['A new website', 'Improve an existing site', 'Get more or better enquiries', 'Clarify messaging or positioning', 'Not sure yet'] as const;

export interface IntakeFormData {
  name: string;
  email: string;
  businessName: string;
  haveWebsite: string;
  websiteUrl: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;
  lookingFor: string;
  context: string;
}

const initial: IntakeFormData = {
  name: '',
  email: '',
  businessName: '',
  haveWebsite: '',
  websiteUrl: '',
  socialInstagram: '',
  socialFacebook: '',
  socialLinkedIn: '',
  lookingFor: '',
  context: '',
};

interface IntakeFormProps {
  /** Optional class for the form element. */
  className?: string;
  /** Optional id for the form (e.g. for scroll target). */
  id?: string;
  /** Override submit button label. */
  submitLabel?: string;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ className = '', id, submitLabel = 'Book a quick chat' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IntakeFormData>(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    // Minimum loading state duration to avoid flicker (300-500ms)
    const minLoadingTime = 300;
    const startTime = Date.now();
    
    try {
      // Format the message with all form data
      const message = `New Quick Consult Request

Name: ${formData.name}
Email: ${formData.email}
Business Name: ${formData.businessName}

Do you have a website? ${formData.haveWebsite}
${formData.haveWebsite === 'Yes' ? `Website URL: ${formData.websiteUrl || 'Not provided'}\n\n` : ''}

Social Profiles:
${formData.socialInstagram ? `Instagram: ${formData.socialInstagram}` : ''}
${formData.socialFacebook ? `Facebook: ${formData.socialFacebook}` : ''}
${formData.socialLinkedIn ? `LinkedIn: ${formData.socialLinkedIn}` : ''}

Looking For: ${formData.lookingFor}

Additional Context:
${formData.context || 'None provided'}`;

      // Send email
      await sendEmail({
        subject: 'New quick consult request',
        fromName: formData.name,
        email: formData.email,
        message: message,
      });

      // Ensure minimum loading time
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsed));
      }
      
      // Track form submission in Clarity
      trackClarityEvent('quick-consult-form-submitted');
      upgradeClaritySession('quick-consult-form-submission');
      
      navigate('/thanks');
    } catch (error) {
      // On error, show feedback and re-enable form
      setIsSubmitting(false);
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again or email hello.lunicstudio@gmail.com directly.');
    }
  };

  const inputClass =
    'w-full bg-studio-bg border border-studio-ink/10 rounded-xl px-4 py-3 text-studio-ink placeholder:text-studio-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 focus-visible:border-transparent transition-shadow';
  const inputStyle = { fontSize: 'clamp(16px, 2.5vw, 0.875rem)', minHeight: '44px' };
  const labelClass = 'block text-sm font-medium text-studio-ink mb-1.5';
  const optionalLabelClass = 'block text-sm font-medium text-studio-ink/70 mb-1.5';
  const optionalInputClass = 'w-full bg-studio-bg/50 border border-studio-ink/5 rounded-xl px-4 py-3 text-studio-ink/80 placeholder:text-studio-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 focus-visible:border-transparent transition-shadow';

  return (
    <form 
      id={id} 
      onSubmit={handleSubmit} 
      className={`space-y-5 ${className}`}
      onKeyDown={(e) => {
        // Enter submits if it's the last control or only control
        if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
          const form = e.currentTarget;
          const inputs = Array.from(form.querySelectorAll<HTMLElement>('input, select, textarea'));
          const lastInput = inputs[inputs.length - 1];
          const activeElement = document.activeElement;
          
          // If focused on last input or only one input, submit
          if (inputs.length === 1 || activeElement === lastInput) {
            e.preventDefault();
            handleSubmit(e as any);
          }
        }
      }}
    >
      <div>
        <label htmlFor="intake-name" className={labelClass}>Name <span className="text-studio-accent">*</span></label>
        <input
          type="text"
          id="intake-name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          className={inputClass}
          style={inputStyle}
          placeholder="Your name…"
          spellCheck="true"
        />
      </div>

      <div>
        <label htmlFor="intake-email" className={labelClass}>Email <span className="text-studio-accent">*</span></label>
        <input
          type="email"
          id="intake-email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className={inputClass}
          style={inputStyle}
          placeholder="you@example.com"
          spellCheck="false"
        />
      </div>

      <div>
        <label htmlFor="intake-business" className={labelClass}>Business name <span className="text-studio-accent">*</span></label>
        <input
          type="text"
          id="intake-business"
          name="businessName"
          required
          value={formData.businessName}
          onChange={handleChange}
          autoComplete="organization"
          className={inputClass}
          style={inputStyle}
          placeholder="Your business or trading name…"
          spellCheck="true"
        />
      </div>

      <div>
        <label htmlFor="intake-have-website" className={labelClass}>Do you currently have a website? <span className="text-studio-accent">*</span></label>
        <select
          id="intake-have-website"
          name="haveWebsite"
          required
          value={formData.haveWebsite}
          onChange={handleChange}
          className={`${inputClass} bg-white`}
          style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#1A1A1A' }}
        >
          <option value="">-</option>
          {HAVE_WEBSITE_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {formData.haveWebsite === 'Yes' && (
        <div>
          <label htmlFor="intake-website-url" className={labelClass}>Website URL <span className="text-studio-accent">*</span></label>
          <input
            type="url"
            id="intake-website-url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            autoComplete="url"
            className={inputClass}
            style={inputStyle}
            placeholder="https://…"
            spellCheck="false"
          />
        </div>
      )}

      <div>
        <label className={optionalLabelClass}>Social profiles <span className="text-studio-muted/70 text-xs font-normal">(optional)</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1.5">
          <div>
            <label htmlFor="intake-social-ig" className="sr-only">Instagram</label>
            <input
              type="url"
              id="intake-social-ig"
              name="socialInstagram"
              value={formData.socialInstagram}
              onChange={handleChange}
              className={optionalInputClass}
              style={inputStyle}
              placeholder="Instagram URL"
              spellCheck="false"
            />
          </div>
          <div>
            <label htmlFor="intake-social-fb" className="sr-only">Facebook</label>
            <input
              type="url"
              id="intake-social-fb"
              name="socialFacebook"
              value={formData.socialFacebook}
              onChange={handleChange}
              className={optionalInputClass}
              style={inputStyle}
              placeholder="Facebook URL"
              spellCheck="false"
            />
          </div>
          <div>
            <label htmlFor="intake-social-li" className="sr-only">LinkedIn</label>
            <input
              type="url"
              id="intake-social-li"
              name="socialLinkedIn"
              value={formData.socialLinkedIn}
              onChange={handleChange}
              className={optionalInputClass}
              style={inputStyle}
              placeholder="LinkedIn URL"
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="intake-looking-for" className={labelClass}>What are you looking for? <span className="text-studio-accent">*</span></label>
        <select
          id="intake-looking-for"
          name="lookingFor"
          required
          value={formData.lookingFor}
          onChange={handleChange}
          className={`${inputClass} bg-white`}
          style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#1A1A1A' }}
        >
          <option value="">-</option>
          {LOOKING_FOR_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="intake-context" className={optionalLabelClass}>Anything else that would help? <span className="text-studio-muted/70 text-xs font-normal">(optional)</span></label>
        <textarea
          id="intake-context"
          name="context"
          rows={4}
          value={formData.context}
          onChange={handleChange}
          className={`${optionalInputClass} resize-none`}
          placeholder="Business context, goals, or what you’d like to achieve…"
        />
      </div>

      <div className="pt-1">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isSubmitting} 
          className="w-full sm:w-auto px-8 py-3 min-h-[44px]"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="inline-block animate-spin mr-2" aria-hidden="true">⟳</span>
              <span>Sending…</span>
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
};

export default IntakeForm;
