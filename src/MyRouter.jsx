import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROLES } from './constants/role';

import Layout from './components/layout/layout';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import DriverDashboard from './pages/driver/Dashboard';

import AddCompany from './pages/admin/companies/AddCompany';
import ViewCompanies from './pages/admin/companies/ViewCompanies';
import EditCompany from './pages/admin/companies/EditCompany';

import AddDriver from './pages/admin/drivers/AddDriver';
import ViewDrivers from './pages/admin/drivers/ViewDrivers';
import EditDriver from './pages/admin/drivers/EditDriver';

import NotFound from './pages/NotFound';

const AppRouter = () => {
  const { user } = useAuth();

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
