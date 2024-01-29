import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.38.80.77:8080',
  // withCredentials: true,
});

export { instance };
