import apiClient from './apiClient';

/**
 * User Service
 * Handles user profile operations
 */

export const getUserProfile = () => apiClient.get('/users/profile');

export const updateUserProfile = (data) => apiClient.put('/users/profile', data);

export const getUserById = (userId) => apiClient.get(`/users/${userId}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserProfile,
  updateUserProfile,
  getUserById,
};
