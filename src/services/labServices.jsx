import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const getLabCollections = () => api.get('/lab');
export const getLabCollection = (id) => api.get(`/lab/${id}`);
export const addLabCollection = (labCollection) => api.post('/lab', labCollection);
export const updateLabCollection = (id, labCollection) => api.put(`/lab/${id}`, labCollection);
export const deleteLabCollection = (id) => api.delete(`/lab/${id}`);