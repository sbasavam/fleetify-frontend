import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import Pagination from '../../components/ui/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { getDrivers, deleteDriver } from '../../services/adminService';

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

    const response = await getDrivers({
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearchTerm,
    });

    const { data, pagination } = response.data;

    setDrivers(data);
    setTotalPages(pagination.totalPages);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch drivers. Please try again.');
  } finally {
    setLoading(false);
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
    
  ];

  return (
    <div className="px-2">
    

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
