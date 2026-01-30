import React from 'react';
import Section from '../components/Section';

const Privacy: React.FC = () => {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto prose prose-stone font-sans prose-headings:font-serif">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Overview</h2>
        <p>
          I respect your privacy. This website collects minimal data to function and improve our services.
        </p>

        <h2>2. Data Collection</h2>
        <p>
          <strong>Contact Forms:</strong> When you submit a form, we collect your name, email, phone number, and message to respond to your inquiry.
        </p>
        <p>
          <strong>Analytics:</strong> We use tools like Google Analytics 4 and Hotjar to understand how visitors use the site. This data is anonymized where possible.
        </p>

        <h2>3. Data Usage</h2>
        <p>
          I do not sell your data. Information provided is used solely for business communication regarding your web design project.
        </p>

        <h2>4. Contact</h2>
        <p>
          If you have questions about your data, please email hello@lukeniccol.com.
        </p>
      </div>
    </Section>
  );
};

export default Privacy;