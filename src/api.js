import axios from 'axios';
const api = axios.create({
  baseURL: 'https://book-library-backend-0vas.onrender.com/api',
  withCredentials: true
});
export default api;