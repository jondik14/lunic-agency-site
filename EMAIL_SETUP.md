# Email Setup Instructions

Both contact forms are now configured to send emails to **hello.lunicstudio@gmail.com**.

## Quick Setup (5 minutes)

1. **Get a free Web3Forms access key:**
   - Go to https://web3forms.com/
   - Sign up for a free account (no credit card required)
   - Copy your access key from the dashboard

2. **Add the access key to your project:**
   
   **Option A: Environment Variable (Recommended)**
   - Create a `.env` file in the root of your project
   - Add this line:
     ```
     VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
     ```
   - Restart your dev server

   **Option B: Direct Configuration**
   - Open `utils/emailConfig.ts`
   - Replace `'YOUR_WEB3FORMS_ACCESS_KEY'` with your actual access key

3. **Test the forms:**
   - Submit a test message through either form
   - Check hello.lunicstudio@gmail.com for the email

## Forms Configured

- ✅ **SimpleContactForm** (Contact page) - Sends to hello.lunicstudio@gmail.com
- ✅ **IntakeForm** (Website Review form) - Sends to hello.lunicstudio@gmail.com

## Free Tier Limits

Web3Forms free tier includes:
- 250 submissions per month
- No credit card required
- Email delivery to your inbox

## Alternative Options

If you prefer a different email service:
- **Formspree**: https://formspree.io/
- **EmailJS**: https://www.emailjs.com/
- **SendGrid**: https://sendgrid.com/

Just update the `sendEmail` function in `utils/emailConfig.ts` with your preferred service.
