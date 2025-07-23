import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotalCount } from '../../services/adminService';
import CompanyImage from '../../assets/images/company.png';
import DriverImage from '../../assets/images/driver.jpg';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ totalCompanies: 0, totalDrivers: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await getTotalCount();
        setCounts(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard counts:', error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="py-4 font-sans rounded-lg"  style={{ backgroundColor: '#f1f5f9' }}>
      <p className="text-center text-gray-700 text-lg max-w-6xl mx-auto">
        Welcome to <span className="font-bold text-indigo-600">Fleetify</span> — your all-in-one fleet management solution.
        Easily add, edit, delete, view, and search drivers and companies, track total counts, and manage your
        transportation logistics with simplicity, speed, and scale.
      </p>
      <h1 className="text-4xl font-extrabold text-indigo-800 mt-6 mb-10 text-center">
        Fleetify Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
        {/* Companies Block */}
        <div
          onClick={() => navigate('/admin/companies/view')}
          className="cursor-pointer text-center transition-transform duration-300 hover:scale-105"
        >
          <img src={CompanyImage} alt="Companies" className="h-52 w-full object-contain mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">Total Companies</h3>
          <p className="text-5xl font-extrabold text-indigo-600 mt-2">{counts.totalCompanies}</p>
        </div>

        {/* Drivers Block */}
        <div
          onClick={() => navigate('/admin/drivers/view')}
          className="cursor-pointer text-center transition-transform duration-300 hover:scale-105"
        >
          <img src={DriverImage} alt="Drivers" className="h-52 w-full object-contain mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mt-4">Total Drivers</h3>
          <p className="text-5xl font-extrabold text-indigo-600 mt-2">{counts.totalDrivers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
