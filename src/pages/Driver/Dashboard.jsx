import { useEffect, useState } from "react";
import { getDrivers } from "../../services/adminService";

const DriverDashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await getDrivers();
        setDrivers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Driver Dashboard</h1>

      {loading ? (
        <div className="text-center text-indigo-600 font-semibold text-lg">Loading drivers...</div>
      ) : (
        <>
          {drivers.length === 0 ? (
            <p className="text-center text-gray-500">No drivers found.</p>
          ) : (
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">DOB</th>
                    <th className="px-4 py-3 text-left">License No</th>
                    <th className="px-4 py-3 text-left">Experience (Yrs)</th>
                    <th className="px-4 py-3 text-left">Address 1</th>
                    <th className="px-4 py-3 text-left">Address 2</th>
                    <th className="px-4 py-3 text-left">City</th>
                    <th className="px-4 py-3 text-left">State</th>
                    <th className="px-4 py-3 text-left">ZIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {drivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{driver.id}</td>
                      <td className="px-4 py-3">{driver.first_name} {driver.last_name}</td>
                      <td className="px-4 py-3">{driver.email}</td>
                      <td className="px-4 py-3">{driver.phone}</td>
                      <td className="px-4 py-3">
                        {driver.date_of_birth ? new Date(driver.date_of_birth).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3">{driver.license_number || "-"}</td>
                      <td className="px-4 py-3">{driver.experience_years || 0}</td>
                      <td className="px-4 py-3">{driver.address1 || "-"}</td>
                      <td className="px-4 py-3">{driver.address2 || "-"}</td>
                      <td className="px-4 py-3">{driver.city || "-"}</td>
                      <td className="px-4 py-3">{driver.state || "-"}</td>
                      <td className="px-4 py-3">{driver.zip_code || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4 italic">
            For updates or to add a new driver, please login as <strong>Admin</strong> or contact your administrator.
          </p>
        </>
      )}
    </div>
  );
};

export default DriverDashboard;
