import axios from 'axios';

// Create a new axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080', // Your backend server address
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use an interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Authentication Calls ---

/**
 * Sends user registration details to the backend to trigger an OTP email.
 * Corresponds to: POST /auth/register
 */
export const registerUser = (name, email, password) => {
  return api.post('/auth/register', { name, email, password });
};

/**
 * Verifies the OTP to complete the registration process.
 * Corresponds to: POST /auth/verify-otp
 */
export const verifyOtp = (email, otp) => {
  return api.post('/auth/verify-otp', { email, otp });
};

/**
 * Logs in a user with their email and password.
 * Corresponds to: POST /auth/login
 */
export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};


// --- Complaint Calls ---

/**
 * Submits a new complaint to the backend.
 * Corresponds to: POST /complaints
 */
export const fileComplaint = (title, description, category) => {
  return api.post('/complaints', { title, description, category });
};

/**
 * Fetches all complaints for the currently logged-in user.
 * Corresponds to: GET /complaints/my
 */
export const getMyComplaints = () => {
  return api.get('/complaints/my');
};

/**
 * Fetches a single complaint by its ID.
 * Corresponds to: GET /complaints/{id}
 */
export const getComplaintById = (id) => {
  return api.get(`/complaints/${id}`);
};

export default api;