import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    console.log("Email login logic here");
    if (email === "" || password === "") {
      alert("Please enter email and password !!! ...");
      return;
    }
    e.preventDefault();
    const result = await firebase.signInUserEmailAndPassword(email, password);
    console.log(result);
    
  };

  const handleGoogleLogin = async(e) => {
    e.preventDefault()
    console.log("Google login logic here");
    const result = await firebase.signInWithGoogle();
    console.log("Google loggedIn", result);
  };

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const isLoggedIn = firebase.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            onClick={(e) => handleEmailLogin(e)}
            className="w-full bg-blue-500 text-white py-3 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full bg-blue-500 text-white py-3 text-sm sm:text-base rounded-lg hover:bg-blue-600 transition"
          >
            SignUp
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-400 text-sm">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border py-3 text-sm sm:text-base rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
