const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Total Companies</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Total Drivers</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Active Trips</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">12</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;