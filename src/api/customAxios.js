import axios from 'axios';

const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = 'http://192.168.200.140';
axiosInstance.defaults.baseURL = 'http://3.35.129.119';
// axiosInstance.defaults.baseURL = 'http://192.168.1.249';

axiosInstance.defaults.headers.common['Authorization'] =
  localStorage.getItem('jwt');

axiosInstance.interceptors.request.use(
  (request) => {
    console.log(request);

    return request;
  },
  (error) => {
    console.log('error', error);

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  (error) => {
    console.log('error', error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
