import { useState, useReducer, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SignUpContext, ThemeContext } from '../App';
import SignUp from './SignUp';
import axios from 'axios';
import { FaEnvelope, FaKey, FaUser, FaBook, FaDownload, FaUsers, FaCheckCircle, FaEye } from 'react-icons/fa';
import { IoDocumentText, IoSchool } from 'react-icons/io5';
import { IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { isSignUpActive, setIsSignUpActive } = useContext(SignUpContext);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const initialState = {
    email: '',
    password: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        return { ...state, [action.field]: action.value };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: 'UPDATE',
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setSuccessMessage('');
    setIsLoggingIn(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await axios.post(`${API_URL}/auth/login`, state);

      if (response.data.token) {
        setSuccessMessage('🎉 Congratulations! Logged in successfully.');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.student));
        setTimeout(() => navigate('/profile'), 1500);
      } else {
        setEmailError(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailError(true);
        setPasswordError(true);
      } else {
        console.error(error.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className={`flex h-screen w-screen justify-center items-center ${theme === "dark"
      ? "bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6d]"
      : "bg-gradient-to-br from-white via-blue-50 to-purple-50"
      }`}>
      {/* Left Panel */}
      <div className={`hidden md:flex flex-col justify-center items-center gap-8 w-1/2 h-full relative overflow-hidden px-12 ${theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
        {theme === "dark" && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-transparent" />
        )}

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-md">
          <div className="text-center">
            <h1 className='text-5xl font-bold cursor-pointer hover:scale-105 transition-transform mb-4' onClick={() => navigate("/")}>
              IET Connect
            </h1>
            <p className={`text-xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Your Academic Resource Hub
            </p>
            <p className={`mt-3 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Access thousands of previous year question papers, connect with peers, and ace your exams with confidence
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className={`p-4 rounded-xl border ${theme === "dark"
              ? "bg-white/5 border-white/10 backdrop-blur-sm"
              : "bg-white border-gray-200 shadow-sm"
              }`}>
              <IoDocumentText className={`text-3xl mb-2 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
              <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                250+ Papers
              </h3>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Verified PYQs
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${theme === "dark"
              ? "bg-white/5 border-white/10 backdrop-blur-sm"
              : "bg-white border-gray-200 shadow-sm"
              }`}>
              <FaUsers className={`text-3xl mb-2 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
              <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                500+ Students
              </h3>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Active Community
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${theme === "dark"
              ? "bg-white/5 border-white/10 backdrop-blur-sm"
              : "bg-white border-gray-200 shadow-sm"
              }`}>
              <IoSchool className={`text-3xl mb-2 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
              <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                All Branches
              </h3>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                CSE, ECE, ME & More
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${theme === "dark"
              ? "bg-white/5 border-white/10 backdrop-blur-sm"
              : "bg-white border-gray-200 shadow-sm"
              }`}>
              <FaCheckCircle className={`text-3xl mb-2 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`} />
              <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Free Access
              </h3>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Always Free
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex justify-center items-center md:w-1/2 h-full w-full">
        {
          isSignUpActive
            ? <SignUp setIsSignUpActive={setIsSignUpActive} />
            : (
              <div className={`rounded-[2rem] border p-8 md:w-96 relative shadow-2xl w-[90vw] ${theme === "dark"
                ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                : "bg-white border-gray-200"
                }`}>
                {/* Floating Icon */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg">
                  <FaUser style={{ fontSize: '2.5rem' }} />
                </div>

                <div className="mt-12 text-center">
                  <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Login
                  </h2>
                  <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Good To See You Here Again
                  </p>
                </div>

                <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                  <div>
                    <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${theme === "dark"
                      ? "border-white/20 bg-white/5"
                      : "border-gray-300 bg-gray-50"
                      }`}>
                      <FaEnvelope className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className={`text-xs md:text-sm outline-none w-full bg-transparent ${theme === "dark"
                          ? "text-white placeholder-gray-400"
                          : "text-gray-900 placeholder-gray-500"
                          }`}
                        value={state.email}
                        onChange={handleChange}
                      />
                    </div>
                    {emailError && <p className='text-red-400 text-sm mt-1'>Email not found.</p>}
                  </div>

                  <div>
                    <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${theme === "dark"
                      ? "border-white/20 bg-white/5"
                      : "border-gray-300 bg-gray-50"
                      }`}>
                      <FaKey className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                      <input
                        type={`${showPassword ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        className={`text-xs md:text-sm outline-none w-full bg-transparent ${theme === "dark"
                          ? "text-white placeholder-gray-400"
                          : "text-gray-900 placeholder-gray-500"
                          }`}
                        value={state.password}
                        onChange={handleChange}
                      />
                      {showPassword ? <FaEye onClick={() => setShowPassword(false)} className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} /> : <IoMdEyeOff onClick={() => setShowPassword(true)} className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />}
                    </div>
                    {passwordError && <p className='text-red-400 text-sm mt-1'>Incorrect password.</p>}
                  </div>

                  {successMessage && (
                    <div className="text-green-400 text-sm text-center">{successMessage}</div>
                  )}

                  <div className={`text-right text-sm cursor-pointer transition ${theme === "dark"
                    ? "text-gray-300 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                    }`}>
                    <Link to={"/forgotpassword"}>Forgot Password?</Link>
                  </div>

                  <button type="submit" className={`text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isLoggingIn ? 'Logging In...' : 'Login'}
                  </button>

                  <p className={`text-sm text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    Don't Have an account? <span className={`cursor-pointer font-medium transition ${theme === "dark"
                      ? "text-purple-400 hover:text-purple-300"
                      : "text-purple-600 hover:text-purple-700"
                      }`}
                      onClick={() => setIsSignUpActive(true)}>Create One</span>
                  </p>
                </form>
              </div>
            )
        }
      </div>
    </div>
  );
}
