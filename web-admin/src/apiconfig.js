// apiConfig.js

// Function to get the token from localStorage or use a default value
export const getAuthToken = () => {
    return localStorage.getItem('token') || '1|8yBh5gsZIZH1n7ygI4B1V49amLJzS5aZ2R4oDw1Bbbccb479'; // Replace with your default token
};
