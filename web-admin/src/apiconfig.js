
export const getAuthToken = () => {
    return localStorage.getItem('token') || '5|1hg9pSYI6JQpE8ZzfJsmiNiiqHuE8ewHSJ6CKf4jafc93d11';
};

const API_URL = "http://192.168.100.11:8000";

export default API_URL;
