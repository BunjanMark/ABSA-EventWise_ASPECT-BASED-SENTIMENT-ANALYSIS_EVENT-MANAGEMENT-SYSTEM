// apiConfig.js

// Function to get the token from localStorage or use a default value
export const getAuthToken = () => {
    return localStorage.getItem('token') || '1|9JlNdbYJV8MfhZr5FaCaELPrVImnblytKEoGrwxn8256f3a8'; // Replace with your default token
};
