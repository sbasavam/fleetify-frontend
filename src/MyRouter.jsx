import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROLES } from './constants/role';

import Layout from './components/layout/layout';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import DriverDashboard from './pages/Driver/Dashboard';

import AddCompany from './pages/Admin/companies/AddCompany';
import ViewCompanies from './pages/Admin/companies/ViewCompanies';
import EditCompany from './pages/Admin/companies/EditCompany';

import AddDriver from './pages/Admin/drivers/AddDriver';
import ViewDrivers from './pages/Admin/drivers/ViewDrivers';
import EditDriver from './pages/admin/drivers/EditDriver';
import CreateNewUser from './pages/Admin/createNewUser'

import NotFound from './pages/NotFound';

const AppRouter = () => {
  const { user, loading } = useAuth();

  const getRedirectPath = () => {
    if (!user) return '/login';
    switch (Number(user.role_id)) {
      case ROLES.ADMIN:
        return '/admin/dashboard';
      case ROLES.COMPANY:
        return '/company/dashboard';
      case ROLES.DRIVER:
        return '/driver/dashboard';
      default:
        return '/login';
    }
  };

  if (loading) {
    // Optional: show a loader while auth is being restored
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={getRedirectPath()} replace />}
      />

      {/* Protected Routes inside Layout */}
      {user && (
        <Route path="/" element={<Layout />}>
          {/* Admin Routes */}
          {user.role_id === ROLES.ADMIN && (
            <>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/companies/add" element={<AddCompany />} />
              <Route path="admin/companies/view" element={<ViewCompanies />} />
              <Route path="admin/companies/edit/:id" element={<EditCompany />} />
              <Route path="admin/drivers/add" element={<AddDriver />} />
              <Route path="admin/drivers/view" element={<ViewDrivers />} />
              <Route path="admin/drivers/edit/:id" element={<EditDriver />} />
              <Route path="admin/users/create" element={<CreateNewUser />} />
            </>
          )}

          {/* Company Routes */}
          {user.role_id === ROLES.COMPANY && (
            <Route path="company/dashboard" element={<CompanyDashboard />} />
          )}

          {/* Driver Routes */}
          {user.role_id === ROLES.DRIVER && (
            <Route path="driver/dashboard" element={<DriverDashboard />} />
          )}

          {/* Default redirect inside layout */}
          <Route index element={<Navigate to={getRedirectPath()} replace />} />
        </Route>
      )}

      {/* Unauthenticated access to protected routes -> login */}
      {!user && (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
