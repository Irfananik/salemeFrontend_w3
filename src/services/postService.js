import apiClient from './apiClient';
export const deletePost = (postId) => apiClient.delete(`/posts/${postId}`);
export const updatePost = (postId, data) => apiClient.put(`/posts/${postId}`, data);
// Add like/dislike endpoints
export const likePost = (postId, employerName, employerEmail) =>
  apiClient.post(
    `/posts/${postId}/like?employerName=${encodeURIComponent(employerName)}&employerEmail=${encodeURIComponent(employerEmail)}`
  );
export const dislikePost = (postId) => apiClient.post(`/posts/${postId}/dislike`);

export const createPost = (post) => apiClient.post('/posts', post);

export const createPostMultipart = (formData) => apiClient.post('/posts', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getPosts = () => apiClient.get('/posts');

export const searchProfiles = (query) => apiClient.get('/posts/search', {
  params: { q: query },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createPost,
  createPostMultipart,
  getPosts,
  searchProfiles,
  likePost,
  dislikePost,
  deletePost,
  updatePost,
};