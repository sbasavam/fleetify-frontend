import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { getDriverById, updateDriver } from '../../../services/adminService'; 

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    licenseNumber: '',
    experience: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
  const fetchDriver = async () => {
    try {
      setLoading(true);
      const res = await getDriverById(id);
      const driver = res.data.data;

      setFormData({
        firstName: driver.first_name || '',
        lastName: driver.last_name || '',
        email: driver.email || '',
        mobile: driver.phone || '',
        dateOfBirth: driver.date_of_birth?.split('T')[0] || '',
        licenseNumber: driver.license_number || '',
        experience: driver.experience_years || '',
        address1: driver.address1 || '',
        address2: driver.address2 || '',
        city: driver.city || '',
        state: driver.state || '',
        zipCode: driver.zip_code || ''
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching driver:', error);
      setErrors({ apiError: 'Failed to load driver data' });
      setLoading(false);
    }
  };

  fetchDriver();
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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
      newErrors.email = 'Email is invalid';
    }
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this driver?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    setIsSubmitting(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.mobile,
        date_of_birth: formData.dateOfBirth,
        license_number: formData.licenseNumber,
        experience_years: formData.experience,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode
      };

      await updateDriver(id, payload);

      Swal.fire({
        icon: 'success',
        title: 'Driver Updated',
        text: `${formData.firstName} ${formData.lastName} has been updated successfully!`,
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/admin/drivers/view');
      });

    } catch (error) {
      console.error('Error updating driver:', error);
      setErrors({ apiError: 'Failed to update driver. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading driver data...</div>;
  }

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Driver</h1>
        <button 
          onClick={() => navigate('/admin/drivers/view')}
          className="text-gray-600 hover:text-gray-800"
        >
          &larr; Back to Drivers
        </button>
      </div>

      {errors.apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
          <Input label="Mobile Number" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={errors.mobile} required />
          <Input label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          <Input label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} error={errors.licenseNumber} required />
          <Input label="Experience (years)" name="experience" type="number" min="0" step="0.5" value={formData.experience} onChange={handleChange} error={errors.experience} required />
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
          <Button type="button" onClick={() => navigate('/admin/drivers/view')} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {isSubmitting ? 'Updating...' : 'Update Driver'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditDriver;
