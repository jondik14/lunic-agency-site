import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2 } from 'lucide-react';
import Button from './Button';
import { trackClarityEvent } from '../utils/clarity';
import { sendEmail } from '../utils/emailConfig';

const SimpleContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const inputStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 2.5vw, 1rem)',
    minHeight: '44px',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Basic validation
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Minimum loading state duration to avoid flicker
    const minLoadingTime = Promise.resolve().then(() => 
      new Promise(resolve => setTimeout(resolve, 300))
    );

    try {
      // Send email
      await sendEmail({
        subject: 'New Contact Form Submission',
        fromName: formData.name || 'Website Visitor',
        email: formData.email,
        message: `Name: ${formData.name || 'Not provided'}\nEmail: ${formData.email}\n\nMessage:\n${formData.message || 'No message provided'}`,
      });

      await minLoadingTime;

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Track form submission in Clarity
      trackClarityEvent('contact-form-submitted');
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again or email hello.lunicstudio@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      const form = formRef.current;
      if (!form) return;
      
      const inputs = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea'));
      const lastInput = inputs[inputs.length - 1];
      const focusedInput = inputs.find(input => input === document.activeElement);
      
      if (focusedInput === lastInput || inputs.length === 1) {
        e.preventDefault();
        submitButtonRef.current?.click();
      }
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-studio-accent/10 flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-studio-accent" aria-hidden="true" />
        </div>
        <h3 className="font-serif text-xl text-studio-ink mb-2">Message sent</h3>
        <p className="text-studio-muted text-sm">
          I'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className="space-y-6"
      noValidate
    >
      <div>
        <label htmlFor="simple-contact-name" className="sr-only">
          Name
        </label>
        <input
          id="simple-contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name…"
          className="w-full px-4 py-3 rounded-xl border border-studio-ink/10 bg-white text-studio-ink placeholder:text-studio-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 transition-all"
          style={inputStyle}
          autoComplete="name"
          spellCheck={true}
        />
      </div>

      <div>
        <label htmlFor="simple-contact-email" className="sr-only">
          Email
        </label>
        <input
          id="simple-contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email…"
          className="w-full px-4 py-3 rounded-xl border border-studio-ink/10 bg-white text-studio-ink placeholder:text-studio-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 transition-all"
          style={inputStyle}
          autoComplete="email"
          spellCheck={false}
          required
        />
      </div>

      <div>
        <label htmlFor="simple-contact-message" className="sr-only">
          Message (optional)
        </label>
        <textarea
          id="simple-contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Your message (optional)…"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-studio-ink/10 bg-white text-studio-ink placeholder:text-studio-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 transition-all resize-none"
          style={inputStyle}
          autoComplete="off"
          spellCheck={true}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      <button
        ref={submitButtonRef}
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-studio-accent text-white rounded-xl font-medium transition-all hover:bg-studio-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" aria-hidden="true" />
            <span>Send message</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SimpleContactForm;
