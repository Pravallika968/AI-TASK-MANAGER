import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";
import bgImage from "../assets/AI.jpeg";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    // Validation
    if (!name || !email || !password) {
      toast.warning("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      // API Call
      const res = await register({
        name,
        email,
        password,
      });

      // Backend response
      const token = res.data.token;
      const username = res.data.username;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      // Success toast
      toast.success("Registration successful 🚀");

      // Redirect to login
      navigate("/login");

    } catch (err) {
      console.error(err);

      // Show backend error if available
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Registration failed ❌");
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

      {/* REGISTER CARD */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 border">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        {/* NAME */}
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="border border-gray-300 p-3 w-full mb-5 rounded-lg
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg
                     font-medium transition disabled:opacity-50"
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;