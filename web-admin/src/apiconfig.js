
export const getAuthToken = () => {
    return localStorage.getItem('token') || '20|UTruiBaSG0GwbQHL8zBwYcnDY4z6s6uXqEAu1q27b48fb727';
};

const API_URL = "http://192.168.100.7:8000";

export default API_URL;
