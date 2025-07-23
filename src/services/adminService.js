import api from './api';

// Company
export const getTotalCount=()=>api.get('/counts')
export const AddCompanyToDB = (data) => api.post('/companies', data);
// export const getCompanies = () => api.get('/companies');

export const getCompanies = (searchTerm, page = 1, limit = 10) => {
  return api.get('/companies', {
    params: {
      page,
      limit,
      ...(searchTerm && { search: searchTerm }) // add only if not empty
    }
  });
};

export const getCompanyById = (id) => api.get(`/companies/${id}`);
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);

// Driver
export const AddDriver = (data) => api.post('/drivers', data);
export const getDrivers = (params) => api.get('/drivers', { params });
export const getDriverById = (id) => api.get(`/drivers/${id}`);
export const updateDriver = (id, data) => api.put(`/drivers/${id}`, data);
export const deleteDriver = (id) => api.delete(`/drivers/${id}`);

