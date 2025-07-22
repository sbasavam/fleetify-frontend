import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { updateCompany,getCompanyById } from '../../../services/adminService';


const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    establishedOn: '',
    registrationNumber: '',
    website: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    primaryContactFirstName: '',
    primaryContactLastName: '',
    primaryContactEmail: '',
    primaryContactMobile: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


useEffect(() => {
  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await getCompanyById(id); // API call to fetch company by ID

      const data = response.data.data;

      const transformed = {
        companyName: data.name || '',
        establishedOn: data.established_date || '',
        registrationNumber: data.registration_number || '',
        website: data.website || '',
        address1: data.address1 || '',
        address2: data.address2 || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zip_code || '',
        primaryContactFirstName: data.contact_first_name || '',
        primaryContactLastName: data.contact_last_name || '',
        primaryContactEmail: data.contact_email || '',
        primaryContactMobile: data.contact_phone || '',
      };

      setFormData(transformed);
    } catch (error) {
      console.error('Error fetching company:', error);
      setErrors({ apiError: 'Failed to load company data' });
    } finally {
      setLoading(false);
    }
  };

  fetchCompany();
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.primaryContactEmail) {
      newErrors.primaryContactEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.primaryContactEmail)) {
      newErrors.primaryContactEmail = 'Email is invalid';
    }
    if (!formData.primaryContactMobile) newErrors.primaryContactMobile = 'Mobile number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);

  try {
    const payload = {
      name: formData.companyName,
      established_date: formData.establishedOn,
      registration_number: formData.registrationNumber,
      website: formData.website,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      contact_first_name: formData.primaryContactFirstName,
      contact_last_name: formData.primaryContactLastName,
      contact_email: formData.primaryContactEmail,
      contact_phone: formData.primaryContactMobile,
    };

    await updateCompany(id, payload);

    navigate('/admin/companies/view');
  } catch (error) {
    console.error('Error updating company:', error);
    setErrors(prev => ({
      ...prev,
      apiError: 'Failed to update company. Please try again.',
    }));
  } finally {
    setIsSubmitting(false);
  }
};


  if (loading) {
    return <div className="text-center py-8">Loading company data...</div>;
  }

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Company</h1>
        <button 
          onClick={() => navigate('/admin/companies/view')}
          className="text-gray-600 hover:text-gray-800"
        >
          &larr; Back to Companies
        </button>
      </div>
      
      {errors.apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
            required
          />
          
          <Input
            label="Established On"
            name="establishedOn"
            type="date"
            value={formData.establishedOn}
            onChange={handleChange}
          />
          
          <Input
            label="Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            error={errors.registrationNumber}
            required
          />
          
          <Input
            label="Website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Address Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Address Line 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
          />
          
          <Input
            label="Address Line 2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
          
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          
          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          
          <Input
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        
        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Primary Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            name="primaryContactFirstName"
            value={formData.primaryContactFirstName}
            onChange={handleChange}
          />
          
          <Input
            label="Last Name"
            name="primaryContactLastName"
            value={formData.primaryContactLastName}
            onChange={handleChange}
          />
          
          <Input
            label="Email"
            name="primaryContactEmail"
            type="email"
            value={formData.primaryContactEmail}
            onChange={handleChange}
            error={errors.primaryContactEmail}
            required
          />
          
          <Input
            label="Mobile"
            name="primaryContactMobile"
            type="tel"
            value={formData.primaryContactMobile}
            onChange={handleChange}
            error={errors.primaryContactMobile}
            required
          />
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => navigate('/admin/companies/view')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isSubmitting ? 'Updating...' : 'Update Company'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCompany;