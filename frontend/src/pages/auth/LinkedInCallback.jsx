import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function LinkedInCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

    if (window.opener) {
      // Send the code and state (or error) back to the opening window (SignupPage)
      window.opener.postMessage(window.location.search, window.location.origin); // Send full query string

      // Close the popup window after sending the message
      window.close();
    } else {
      // Fallback for direct access or if opener is gone
      toast.error('Could not complete LinkedIn authentication directly. Please try again from the signup page.');
      navigate('/signup'); // Redirect to signup or an error page
    }
  }, [navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Processing LinkedIn Login...</h1>
      <p>Please wait, you will be redirected shortly.</p>
    </div>
  );
}

export default LinkedInCallback;