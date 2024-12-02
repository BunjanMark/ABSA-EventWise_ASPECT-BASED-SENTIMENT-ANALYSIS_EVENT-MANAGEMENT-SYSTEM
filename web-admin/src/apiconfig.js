
export const getAuthToken = () => {
    return localStorage.getItem('token') || '14|rRSLAHKfTkLinfRiPbgs4zQatOH6Cun2IwORT0w90d20baee';
};

const API_URL = "http://192.168.254.110:8000";

export default API_URL;
