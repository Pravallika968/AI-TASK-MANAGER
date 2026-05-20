import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../assets/AI.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    // Validation
    if (!email || !password) {
      toast.warning("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      // API Call
      const res = await login({
        email,
        password,
      });

      // Save auth data
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "username",
        res.data.username
      );

      toast.success(
        `Welcome ${res.data.username} 👋`
      );

      // Redirect
      navigate("/home");

    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        toast.error(
          err.response.data.message
        );
      } else {
        toast.error(
          "Invalid credentials ❌"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-center bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 border">

        <h2 className="text-3xl mb-6 font-bold text-center text-gray-800">
          Login
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border border-gray-300 p-3 mb-5 w-full rounded-lg
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3
                     w-full rounded-lg font-medium transition
                     disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;