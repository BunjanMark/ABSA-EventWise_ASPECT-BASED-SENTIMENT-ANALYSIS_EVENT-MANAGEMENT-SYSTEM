// apiConfig.js

// Function to get the token from localStorage or use a default value
export const getAuthToken = () => {
    return localStorage.getItem('token') || '3|35QyvM9Ro0j5OrcQyJqfAdRjYTDngV8ABg2IKQgg1cf9412d'; // Replace with your default token
};
