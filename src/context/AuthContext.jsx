import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      parsed.role_id = Number(parsed.role_id); // Ensure numeric role_id
      setUser(parsed);
    }
    setLoading(false);
  }, []);

const login = async (credentials) => {
  try {
    const res = await loginUser(credentials);

    const userData = {
      id: res.user.id,
      email: res.user.email,
      role_id: Number(res.user.role_id),
      token: res.token, // ✅ this is correct now
      name: res.user.name || '',
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData; // ✅ so Login.jsx gets the right object
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Login failed');
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
