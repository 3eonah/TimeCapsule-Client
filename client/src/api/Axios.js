import axios from 'axios';

const baseURL = 'http://3.38.80.77:8080';

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: 'Bearer Token',
    //   'Content-Type': 'multipart/form-data,
  },
});

export const postUser = () => instance.post(`/user`);
export const getAllCapsules = () => instance.get(`/capsules`);
export const getEachCapsule = (id) => instance.get(`/capsules/${id}`);
export const postCapsule = (data) =>
  instance.post(`/capsules`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
