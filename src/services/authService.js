import apiClient from './apiClient';

const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

const register = (data) => {
  return apiClient.post('/auth/register', data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
};