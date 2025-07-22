const DriverDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Driver Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Assigned Trips</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Completed Trips</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Vehicle Status</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;