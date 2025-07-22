import { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import Table from '../../../components/common/Table';
import Input from '../../../components/common/Input';
import Pagination from '../../../components/ui/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { getDrivers, deleteDriver } from '../../../services/adminService';

const ViewDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDrivers();
  }, [debouncedSearchTerm, currentPage]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await getDrivers();
      const allDrivers = response.data;

      // Filter by search
      let filtered = allDrivers;
      if (debouncedSearchTerm) {
        filtered = allDrivers.filter((d) =>
          (`${d.first_name} ${d.last_name}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          d.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          d.license_number.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        );
      }

      const totalItems = filtered.length;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

      setDrivers(paginated);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch drivers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (driver) => {
    const fullName = `${driver.first_name} ${driver.last_name}`;

    const result = await Swal.fire({
      title: `Delete ${fullName}?`,
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await deleteDriver(driver.id);

        await Swal.fire({
          icon: 'success',
          title: `${fullName} is deleted`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Refresh drivers
        fetchDrivers();
        // Optional: navigate to /admin/drivers to force URL reload if needed
        navigate('/admin/drivers/view');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete driver. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    { header: 'First Name', accessor: 'first_name' },
    { header: 'Last Name', accessor: 'last_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'License Number', accessor: 'license_number' },
    { header: 'Experience (yrs)', accessor: 'experience_years' },
    { header: 'City', accessor: 'city' },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (_, row) => (
        <div className="flex space-x-4">
          <Link
            to={`/admin/drivers/edit/${row.id}`}
            className="text-lg text-indigo-600 hover:text-indigo-900 flex items-center"
          >
            <FiEdit2 className="inline mr-1" />
          </Link>
          <button
            onClick={() => handleDelete(row)}
            className="text-lg text-red-600 hover:text-red-800 flex items-center"
            title="Delete"
          >
            <FiTrash2 className="inline" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Drivers</h1>
        <Link
          to="/admin/drivers/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Add Driver
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search drivers..."
          className="pl-10 w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading drivers...</div>
        ) : drivers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No drivers found. {debouncedSearchTerm && 'Try a different search term.'}
          </div>
        ) : (
          <>
            <Table columns={columns} data={drivers} />
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewDrivers;
