export const getAuthToken = () => {
    return localStorage.getItem('token') || '1|6lgZbsMvLnifhl0qbUtySPfYksdsxjxIwfRSW50d0b1ace85';   
};

// const API_URL = "https://phplaravel-1381591-5105067.cloudwaysapps.com";

const API_URL = "http://192.168.1.29:8000";

export default API_URL;
