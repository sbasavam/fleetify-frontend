import { useEffect, useState } from 'react';
import { getCompanies } from '../../services/adminService'; // Adjust path based on your file structure

const CompanyDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Added loading state

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getCompanies();
        if (response?.data?.success) {
          setCompanies(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Company Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-blue-600 font-semibold text-lg animate-pulse">Loading companies...</div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Established</th>
                <th className="p-3 text-left">Reg. Number</th>
                <th className="p-3 text-left">Website</th>
                <th className="p-3 text-left">Address </th>
                <th className="p-3 text-left">Contact Email</th>
                <th className="p-3 text-left">Contact Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {companies.map((company) => (
                <tr key={company.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{company.id}</td>
                  <td className="p-3">{company.name}</td>
                  <td className="p-3">
                    {new Date(company.established_date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{company.registration_number}</td>
                  <td className="p-3">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {company.website}
                    </a>
                  </td>
                  <td className="p-3">{company.address1} -{company.state}</td>
                  <td className="p-3">{company.contact_email}</td>
                  <td className="p-3">{company.contact_phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && (
        <p className="mt-6 text-sm text-gray-600 italic">
          For any updates or to add a new company, please log in as an admin or contact the administrator.
        </p>
      )}
    </div>
  );
};

export default CompanyDashboard;
