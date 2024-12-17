export const getAuthToken = () => {
    return localStorage.getItem('token') || '1|6lgZbsMvLnifhl0qbUtySPfYksdsxjxIwfRSW50d0b1ace85';
};

const API_URL = "http://192.168.100.22:8000";

export default API_URL;
