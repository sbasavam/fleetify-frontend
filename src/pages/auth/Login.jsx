import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/LoginInput";
import Button from "../../components/common/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ROLES } from "../../constants/role";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuggestion("");
    setLoading(true);

    if (!emailRegex.test(email)) {
      setSuggestion("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setSuggestion(
        "Password must be 8–16 characters long with one capital letter and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      const user = await login({ email, password });

      if (user.role_id === ROLES.ADMIN) {
        navigate("/admin/dashboard");
      } else if (user.role_id === ROLES.COMPANY) {
        navigate("/company/dashboard");
      } else if (user.role_id === ROLES.DRIVER) {
        navigate("/driver/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-pink-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur p-8 rounded-2xl shadow-2xl border border-gray-200 transition-transform duration-300 hover:scale-[1.02]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 tracking-wide">
            Welcome to <span className="text-pink-500">Fleetify</span>
          </h1>
          <p className="mt-2 text-gray-600 text-sm">Please sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {suggestion && (
          <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative">
            <span className="block sm:inline">{suggestion}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 relative">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailRegex.test(e.target.value)) setSuggestion("");
              }}
              label="Email address"
              labelClassName="text-gray-700"
            />
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordRegex.test(e.target.value)) setSuggestion("");
                }}
                label="Password"
                labelClassName="text-gray-700"
              />
              <span
                className="absolute inset-y-0 right-3 top-6 flex items-center text-gray-600 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2 px-4 rounded-md text-white bg-pink-500 hover:bg-pink-600 font-semibold text-md shadow-md transition duration-300"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
