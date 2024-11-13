// apiConfig.js

// Function to get the token from localStorage or use a default value
export const getAuthToken = () => {
    return localStorage.getItem('token') || '1|XfaIU4MzDQ3T0fWfoTpgmktFpAMZ39CucAqb6vnr70235787'; // Replace with your default token
};
