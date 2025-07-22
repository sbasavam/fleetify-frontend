import api from './api';

// Company
export const AddCompanyToDB = (data) => api.post('/companies', data);
export const getCompanies = () => api.get('/companies');
export const getCompanyById = (id) => api.get(`/companies/${id}`);
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);

// Driver
export const AddDriver = (data) => api.post('/drivers', data);
export const getDrivers = () => api.get('/drivers');
export const getDriverById = (id) => api.get(`/drivers/${id}`);
export const updateDriver = (id, data) => api.put(`/drivers/${id}`, data);
export const deleteDriver = (id) => api.delete(`/drivers/${id}`);

