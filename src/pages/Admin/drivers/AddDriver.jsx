import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { AddDriver } from '../../../services/adminService';
import Swal from 'sweetalert2';

const AddDriverForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    licenseNumber: '',
    experienceYears: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!formData.experienceYears) newErrors.experienceYears = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        license_number: formData.licenseNumber,
        experience_years: formData.experienceYears,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode
      };

      await AddDriver(payload);

      Swal.fire({
        icon: 'success',
        title: 'Driver added successfully',
        showConfirmButton: false,
        timer: 1800
      });

      navigate('/admin/drivers/view');
    } catch (error) {
      console.error('Add driver error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add driver',
        text: error?.response?.data?.error || 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Driver</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} required />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} required />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
          <Input label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          <Input label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} error={errors.licenseNumber} required />
          <Input label="Experience (Years)" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} error={errors.experienceYears} required />
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Address Line 1" name="address1" value={formData.address1} onChange={handleChange} />
          <Input label="Address Line 2" name="address2" value={formData.address2} onChange={handleChange} />
          <Input label="City" name="city" value={formData.city} onChange={handleChange} />
          <Input label="State" name="state" value={formData.state} onChange={handleChange} />
          <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => navigate('/admin/drivers/view')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isSubmitting ? 'Saving...' : 'Add Driver'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDriverForm;
