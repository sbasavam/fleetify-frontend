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
      console.log("User after login:", user);

      console.log("User Role ID:", user.role_id);
      console.log("Admin Role Constant:", ROLES.ADMIN);
      console.log("Is admin?", user.role_id === ROLES.ADMIN);

      if (user.role_id === ROLES.ADMIN) {
        console.log("Navigating to:", "/admin/dashboard");
        navigate("/admin/dashboard");
      } else if (user.role_id === ROLES.COMPANY) {
        console.log("Navigating to:", "/company/dashboard");
        navigate("/company/dashboard");
      } else if (user.role_id === ROLES.DRIVER) {
        console.log("Navigating to:", "/driver/dashboard");
        navigate("/driver/dashboard");
      } else {
        console.warn("Unknown role, redirecting to login...");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full space-y-8 bg-slate-800/80 backdrop-blur p-8 rounded-2xl shadow-2xl border border-white/10 transition-transform duration-300 hover:scale-[1.02]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Welcome to <span className="text-yellow-400">Fleetify</span>
          </h1>
          <p className="mt-2 text-gray-300 text-sm">
            Please sign in to continue
          </p>
        </div>

        {error && (
          <div
            className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-pulse"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {suggestion && (
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative animate-fade-in-up"
            role="alert"
          >
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
              labelClassName="text-white"
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
                labelClassName="text-white"
              />
              <span
                className="absolute inset-y-0 right-3 top-6 flex items-center text-white cursor-pointer"
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
              className="w-1/2 py-2 px-4 rounded-md text-white bg-yellow-400 hover:bg-yellow-500 font-semibold text-md shadow-md transition duration-300"
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
