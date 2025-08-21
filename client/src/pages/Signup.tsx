import axios from "axios";
import {
  Chrome,
  EyeOff,
  Github,
  Loader,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UserTypes {
  full_name: string;
  email: string;
  phone_number: number | undefined;
  password: string;
}

export default function SignUpPage() {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [confirmMessage, setConfimMessage] = useState<string>("");
  const [newUser, setNewUser] = useState<UserTypes>({
    full_name: "",
    email: "",
    phone_number: undefined,
    password: "",
  });

  //update the newUser object
  const handleUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  //confirm password
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
    if (confirmPass !== newUser.password) {
      setConfimMessage("Passwords not same");
    } else if (confirmPass === newUser.password) {
      setConfimMessage("");
    }
  };

  //create new user, send details to server
  const createNewUser = () => {
    setLoading(true);
    if (!newUser.email || !newUser.full_name || !newUser.password) {
      toast.error("Fill all the fields", { id: "toast" });
      return;
    }

    axios.post("http://localhost:4000/api/auth", newUser).then((res) => {
      if (res.status === 200) {
        toast.success("Account created successfully");
      }
    });
    navigate("/login");
    setNewUser({
      full_name: "",
      email: "",
      phone_number: undefined,
      password: "",
    });
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-teal-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-slate-600">
            Join us today and get started for free
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="space-y-6">
            {/* Full Name Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="text"
                  name="full_name"
                  onChange={(e) => handleUserDetails(e)}
                  value={newUser.full_name}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all placeholder-slate-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) => handleUserDetails(e)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all placeholder-slate-400"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="tel"
                  name="phone_number"
                  value={newUser.phone_number}
                  onChange={(e) => handleUserDetails(e)}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all placeholder-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={(e) => handleUserDetails(e)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all placeholder-slate-400"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <EyeOff className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="group">
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <p className="text-sm font-medium text-red-600/80 ">
                  {confirmMessage}
                </p>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPassword(e)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all placeholder-slate-400"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <EyeOff className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm font-medium text-slate-700 mb-2">
                Password must contain:
              </p>
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  <span>One uppercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  <span>One number or special character</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                onChange={(e) => console.log(e.target.value)}
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2 mt-1"
              />
              <p className="text-sm text-slate-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={createNewUser}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {loading ? "Creating Account" : "Create Account"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group">
              <Github className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
              <span className="font-medium text-slate-700">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 group">
              <Chrome className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
              <span className="font-medium text-slate-700">Google</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-6 border-t border-slate-100">
            <p className="text-slate-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
