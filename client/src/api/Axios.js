import axios from 'axios';
import { useSelector } from 'react-redux';

const baseURL = 'http://3.38.80.77:8080';

const useToken = () => {
  return useSelector((state) => state.user.token);
};

// TODO: "CreateAxiosInstance.post is not a function" Error 해결 예정
const CreateAxiosInstance = () => {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer + ${useToken()}`,
    },
  });
};

export const postUser = () => CreateAxiosInstance.post('/user');
export const getAllCapsules = () => CreateAxiosInstance.get(`/capsule`);
export const getEachCapsule = (id) => CreateAxiosInstance.get(`/capsule/${id}`);
export const postCapsule = (data) =>
  CreateAxiosInstance.post(`/capsule`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
