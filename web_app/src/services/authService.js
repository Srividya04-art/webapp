import axiosInstance from '../api/axiosInstance.js';

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};


export const loginUser = async (userData) => {
  const response = await axiosInstance.post('/auth/login', userData);
  return response.data;
};


export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axiosInstance.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
