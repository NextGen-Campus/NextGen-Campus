import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup logic here");
    if (email === "" || password === "" || fullName === "") {
      alert("Fill up the feilds properly !!! ...");
      return;
    }
    const result = await firebase.signUpUserEmailAndPassword(email, password);
    console.log(result);
    console.log("handleSignup completed");
    navigate('/login')
  };

  const handleGoogleSignup = async(e) => {
    e.preventDefault()
    console.log("Google login logic here");
    const result = await firebase.signInWithGoogle();
    console.log("Google loggedIn", result);
    navigate('/')
  };

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            className="w-full px-4 py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="w-full bg-green-500 text-white py-3 text-sm sm:text-base rounded-lg hover:bg-green-600 transition"
            onClick={(e) => handleSignup(e)}
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-400 text-sm">or</span>
        </div>

        <button
          onClick={handleGoogleSignup}
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

export default SignupPage;
