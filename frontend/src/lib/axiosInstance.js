// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // Request interceptor
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const { data } = await axios.get('/api/auth/refresh-token', {
//           withCredentials: true
//         });
        
//         localStorage.setItem('token', data.token);
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error('Refresh token failed:', refreshError);
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // Optional: Add Authorization header if token exists
// const token = localStorage.getItem('token');
// if (token) {
//   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// export default axiosInstance;


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_Backend_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add the Authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the latest token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
