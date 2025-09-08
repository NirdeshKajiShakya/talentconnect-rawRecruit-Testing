import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: 'your_verified_sender@example.com', // Must be verified in SendGrid
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
