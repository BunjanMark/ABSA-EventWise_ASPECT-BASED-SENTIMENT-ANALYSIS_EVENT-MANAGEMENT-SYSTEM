
export const getAuthToken = () => {
    return localStorage.getItem('token') || '1|tS2i5wkDbhdPV160OosNxSvns8U0uyZtELKh7ZvOad493165';
};

const API_URL = "http://192.168.100.7:8000";

export default API_URL;
