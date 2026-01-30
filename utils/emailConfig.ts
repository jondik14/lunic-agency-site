/**
 * Email Configuration
 * 
 * To set up email sending:
 * 1. Go to https://web3forms.com/
 * 2. Sign up for a free account
 * 3. Get your access key from the dashboard
 * 4. Replace 'YOUR_WEB3FORMS_ACCESS_KEY' below with your actual access key
 * 
 * Alternatively, you can use environment variables:
 * Set VITE_WEB3FORMS_ACCESS_KEY in your .env file
 */

export const EMAIL_CONFIG = {
  recipientEmail: 'hello.lunicstudio@gmail.com',
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY',
};

export const sendEmail = async (data: {
  subject: string;
  fromName: string;
  email: string;
  message: string;
}) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      access_key: EMAIL_CONFIG.accessKey,
      subject: data.subject,
      from_name: data.fromName,
      email: data.email,
      message: data.message,
      to_email: EMAIL_CONFIG.recipientEmail,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to send email');
  }

  return result;
};
