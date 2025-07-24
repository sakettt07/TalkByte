import {
  User2Icon,
  BotMessageSquare,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Loader,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { register } from "../store/slices/auth.slice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { isSigningUp } = useSelector((state) => state.auth);
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white ">
        {/* Left side */}
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* logo& heading */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="bg-black p-3 rounded-md">
                <BotMessageSquare className="text-white  w-6 h-6" />
              </div>
              <h1 className="text-2xl">Create your account</h1>
              <p className="text-gray-500 text-sm mt-2">
                Get started with your free account
              </p>
            </div>

            {/* login form */}
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Fullname
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-600">
                    <User2Icon className="w-5 h-5 text-gray-500" />
                  </span>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none"
                    type="text"
                    placeholder="Enter you name"
                    onChange={(e) => {
                      setFormData({ ...formData, fullname: e.target.value });
                    }}
                    value={formData.fullname}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-600">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </span>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none"
                    type="email"
                    placeholder="yourmail@example.com"
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    value={formData.email}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-600">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </span>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                    value={formData.password}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-800 transition duration-100 flex justify-center items-center"
              >
                {isSigningUp ? (
                  <>
                    <Loader className="animate-spin size-5" /> Loading...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <div className="mt-6 text-center text-gray-500">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <AuthImagePattern
          title="Join our Community !"
          subtitle="Connect with your friends and the world around you."
        />
      </div>
    </>
  );
};

export default Register;
