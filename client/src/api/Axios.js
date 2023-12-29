import axios from 'axios';

const baseURL = '';

const instance = axios.create({
  baseURL,
  // headers: {
  //   'Authorization':'',
  //   'Content-Type': 'application/json',
  // },
});

export const postUser = () => instance.post(`/user`);
export const getAllCapsules = () => instance.get(`/capsules`);
export const getEachCapsule = (id) => instance.get(`/capsules/${id}`);
export const postCapsule = (capsule) => instance.post(`/capsules`, capsule);
