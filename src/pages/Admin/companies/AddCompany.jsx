import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { AddCompanyToDB } from "../../../services/adminService";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    establishedOn: "",
    registrationNumber: "",
    website: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryContactMobile: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName)
      newErrors.companyName = "Company name is required";
    if (!formData.registrationNumber)
      newErrors.registrationNumber = "Registration number is required";

    if (!formData.primaryContactEmail) {
      newErrors.primaryContactEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.primaryContactEmail)) {
      newErrors.primaryContactEmail = "Email is invalid";
    }

    if (!formData.primaryContactMobile) {
      newErrors.primaryContactMobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.primaryContactMobile)) {
      newErrors.primaryContactMobile =
        "Mobile number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

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

      await AddCompanyToDB(payload);
      navigate("/admin/companies/view");
    } catch (error) {
      console.error("Error adding company:", error);
      setErrors((prev) => ({
        ...prev,
        apiError: "Failed to add company. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full max-w-7xl bg-[#f1f5f9] p-4  rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-[#1e3a8a] mb-5">
          Enter the details below to register a new company.
        </h1>

        {errors.apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4  rounded mb-5">
            {errors.apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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

          <h2 className="text-xl font-semibold mt-5 mb-2 text-gray-700">
            Address Information
          </h2>
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

          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Primary Contact Information
          </h2>
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
              maxLength={10}
              value={formData.primaryContactMobile}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only digits
                if (/^\d*$/.test(value)) {
                  handleChange(e); // update formData
                }
              }}
              error={errors.primaryContactMobile}
              required
            />
          </div>

          <div className="mt-5 flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies/view")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#1d4ed8] hover:bg-[#2563eb] text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              {loading ? "Saving..." : "Save Company"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
