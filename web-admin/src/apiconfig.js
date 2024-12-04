export const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    "13|YBTTboW6CcEroa3A3WUoDuDGWNBMyeEMSDLplst5a5e1c165"
  );
};

const API_URL = "http://192.168.1.45:8000";

export default API_URL;
