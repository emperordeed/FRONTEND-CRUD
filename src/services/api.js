import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API Endpoints
export const siswaAPI = {
  // Get all siswa
  getAll: () => apiClient.get('/siswa'),

  // Get single siswa by kode
  getByKode: (kode) => apiClient.get(`/siswa/${kode}`),

  // Create new siswa
  create: (data) => apiClient.post('/siswa', data),

  // Update siswa
  update: (kode, data) => apiClient.put(`/siswa/${kode}`, data),

  // Delete siswa
  delete: (kode) => apiClient.delete(`/siswa/${kode}`)
};

export default apiClient;
