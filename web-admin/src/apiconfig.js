
export const getAuthToken = () => {
    return localStorage.getItem('token') || '3|35QyvM9Ro0j5OrcQyJqfAdRjYTDngV8ABg2IKQgg1cf9412d'; // Replace with your default token
};

const API_URL = "http://192.168.254.126:8000";

export default API_URL;
