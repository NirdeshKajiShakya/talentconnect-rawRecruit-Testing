import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import axiosInstance from '../../lib/axiosInstance';
// import { useGoogleLogin } from '@react-oauth/google'; // 

function SignupPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const selectedRole = localStorage.getItem('selectedRole');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);

  useEffect(() => {
    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  // Handle LinkedIn callback from backend redirect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const linkedinError = queryParams.get('error');
    const linkedinToken = queryParams.get('token');
    const isNewUser = queryParams.get('isNewUser') === 'true'; // Convert string to boolean
    const userEmail = queryParams.get('email');
    const userName = queryParams.get('name');
    const userTypeFromLinkedIn = queryParams.get('userType');
    const userProfileImage = queryParams.get('profileImage');


    if (linkedinError) {
      toast.error(decodeURIComponent(linkedinError));
      navigate('/signup', { replace: true }); // Clear query params from URL
    } else if (linkedinToken) {
      toast.success('LinkedIn authentication successful!');

      // Reconstruct the user object from query parameters
      const user = {
        _id: 'linkedin_user', // Placeholder, you might want to fetch actual ID or handle it differently
        email: userEmail,
        name: userName,
        userType: userTypeFromLinkedIn || selectedRole, // Prioritize from LinkedIn, fallback to selectedRole
        profileImage: userProfileImage,
      };

      setAuthUser({ user });
      localStorage.setItem('ChatAppUser', JSON.stringify(user));
      localStorage.setItem('token', linkedinToken); // Store the token
      localStorage.setItem('selectedRole', user.userType); // Update selected role based on LinkedIn user type

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${linkedinToken}`;

      const onboardingRoutes = {
        candidate: '/student-form',
        fresher: '/student-form',
        professional: '/student-form',
        company: '/company-form',
        college: '/college-onboarding',
        employer: '/onboardingflowForm'
      };

      const dashboardRoutes = {
        student: '/home',
        fresher: '/fresherhome',
        professional: '/Profhome',
        company: '/home',
        college: '/home',
        employer: '/home'
      };

      if (isNewUser) {
        navigate(onboardingRoutes[user.userType] || '/onboarding', { replace: true });
      } else {
        navigate(dashboardRoutes[user.userType] || '/home', { replace: true });
      }
    }
  }, [location.search, navigate, setAuthUser, selectedRole]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 8 characters long');
      toast.error('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/auth/signup`,
        {
          email: formData.email,
          password: formData.password,
          userType: selectedRole,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Signup successful!');
        const userData = response.data;
       // console.log("userData: ", userData);
        // setAuthUser({
        //   user: {
        //     _id: userData._id,
        //     email: userData.email,
        //     name: userData.name || userData.email,
        //     userType: userData.userType || selectedRole,
        //     profileImage: userData.profileImage || null 
        //   }
        // });

        const authUserData = {
        user: {
          _id: userData._id,
          email: userData.email,
          name: userData.name || userData.email,
          userType: userData.userType || selectedRole,
          profileImage: userData.profileImage || null
        }
      };

          setAuthUser(authUserData);
      localStorage.setItem('ChatAppUser', JSON.stringify(authUserData));
      localStorage.setItem('token', userData.token);

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        const onboardingRoutes = {
          candidate: '/student-form',
          student: '/student-form',
          company: '/company-form',
          college: '/college-onboarding',
          employer: '/OnboardingflowForm',
          // Add other user types as needed
        };

        navigate(onboardingRoutes[selectedRole] || '/home');
      }
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred during signup.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (code) => {
    setGoogleLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/auth/google`,
        { code, userType: selectedRole },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Google authentication successful!');

        // response.data contains { success, isNewUser, user: { _id, email, userType, name, profileImage }, token }
        const { user, isNewUser, token } = response.data;

        // FIX: Ensure authUser structure matches what SocketContext expects (i.e., { user: { _id, ... } })
        setAuthUser({
          user: { // Wrap the user object inside a 'user' property
            _id: user._id,
            email: user.email,
            userType: user.userType,
            name: user.name,
            profileImage: user.profileImage
          }
        });

        // Store the full user object (from response.data.user) in local storage
        localStorage.setItem('ChatAppUser', JSON.stringify(user));
        // localStorage.setItem('token', token); // Store the token
        localStorage.setItem('selectedRole', user.userType);



        const onboardingRoutes = {
          candidate: '/student-form',

          company: '/company-form',
          college: '/college-onboarding',
          employer: '/onboardingflowForm'
        };

        const dashboardRoutes = {
          student: '/home',
          fresher: '/fresherhome',
          professional: '/Profhome',
          company: '/home',
          college: '/home',
          employer: '/home'
        };

        // Redirect based on whether user is new
        if (isNewUser) {
          navigate(onboardingRoutes[user.userType] || '/onboarding');
        } else {
          navigate(dashboardRoutes[user.userType] || '/home');
        }
      }
    } catch (error) {
      console.error('Google Auth Error:', error);
      toast.error(error.response?.data?.message || 'Google authentication failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleClick = () => {
    if (window.google) {
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: (response) => {
          handleGoogleSignIn(response.code);
        },
        error_callback: (error) => {
          console.error('Google OAuth error:', error);
          toast.error('Google login failed. Please try again.');
          setGoogleLoading(false);
        }
      });
      client.requestCode();
    }
  };

  // NEW: handleLinkedInClick function
  const handleLinkedInClick = () => {
    if (!selectedRole) {
      toast.error('Please select a role before signing up with LinkedIn.');
      return;
    }
    setLinkedinLoading(true);
    // Redirect to your backend's LinkedIn authentication route
    window.location.href = `${import.meta.env.VITE_Backend_URL}/api/auth/linkedin?userType=${selectedRole}`;
  };



  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col p-8">
        <div className="mb-10">
          <h1 className="text-xl font-italic font-bold">Logo</h1>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">Sign Up - {selectedRole}</h1>
          <p className="text-gray-600 mb-8">Sign up to get started as a {selectedRole}.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Password"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Confirm Password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="my-6 relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleClick}
            className="w-full border border-gray-300 py-3 flex items-center justify-center mb-3 hover:bg-gray-50 disabled:opacity-50"
            disabled={googleLoading}
          >
            {googleLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-gray-800 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up with Google...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
                Sign up with Google
              </>
            )}
          </button>

          {/* NEW: LinkedIn Button with onClick handler */}
          <button
            onClick={handleLinkedInClick} // Add this onClick handler
            className="w-full border border-gray-300 py-3 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
            disabled={linkedinLoading}
          >
            {linkedinLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-gray-800 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up with LinkedIn...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                Sign up with LinkedIn
              </>
            )}
          </button>
          <p className="text-center mt-6">
            Already have an account? <Link to="/login" className="text-black hover:underline">Log In</Link>
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-gray-500">© 2025 TalentConnects</p>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-gray-200 items-center justify-center">
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;


