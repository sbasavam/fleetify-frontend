import { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import Table from '../../../components/common/Table';
import Input from '../../../components/common/Input';
import Pagination from '../../../components/ui/Pagination';
import { Link } from 'react-router-dom';
import { FiEdit2, FiSearch,FiTrash2 } from 'react-icons/fi';
import { getCompanies,deleteCompany } from '../../../services/adminService';


const ViewCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getCompanies(debouncedSearchTerm, currentPage);
        const data = response.data;

        if (data.success) {
          setCompanies(data.data);
          setTotalPages(data.pagination.totalPages || 1);
        } else {
          setCompanies([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError('Failed to fetch companies. Please try again.');
        setCompanies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [debouncedSearchTerm, currentPage]);



const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this company?')) return;

  try {
    setLoading(true);
    await deleteCompany(id);

    // Refresh list after delete
    const response = await getCompanies(debouncedSearchTerm, currentPage);
    const data = response.data;
    if (data.success) {
      setCompanies(data.data);
      setTotalPages(data.pagination.totalPages || 1);
    } else {
      setCompanies([]);
      setTotalPages(1);
    }
  } catch (error) {
    console.error('Delete error:', error);
    setError('Failed to delete company. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const columns = [
    { header: 'Company Name', accessor: 'name' },
    { header: 'Registration Number', accessor: 'registration_number' },
    { header: 'Contact Email', accessor: 'contact_email' },
    { header: 'Contact Phone', accessor: 'contact_phone' },
    { header: 'City', accessor: 'city' },
   {
  header: 'Actions',
  accessor: 'id',
  cell: (id) => (
    <div className="flex space-x-8">
      <Link
        to={`/admin/companies/edit/${id}`}
        className=" text-lg text-indigo-600 hover:text-indigo-900 flex items-center"
      >
        <FiEdit2 className="inline mr-1" />
        
      </Link>
      <button
        onClick={() => handleDelete(id)}
        className="text-lg text-red-600 hover:text-red-800 flex items-center"
        title="Delete"
      >
        <FiTrash2 className="inline" />
      </button>
    </div>
  )
}

  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Companies</h1>
        <Link
          to="/admin/companies/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Add Company
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
          placeholder="Search companies..."
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
          <div className="p-8 text-center">Loading companies...</div>
        ) : companies.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No companies found. {debouncedSearchTerm && 'Try a different search term.'}
          </div>
        ) : (
          <>
            <Table columns={columns} data={companies} />
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

export default ViewCompanies;
