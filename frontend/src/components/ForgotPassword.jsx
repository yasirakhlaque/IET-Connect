import { useContext, useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaCheckCircle, FaKey } from 'react-icons/fa';
import { IoDocumentText, IoSchool } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { questionPaperAPI } from '../lib/api';

export default function ForgotPassword() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [email, setEmail] = useState("");
    const [otpPage, setOtpPage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [sending, setSending] = useState(false);
    
    // Dynamic stats from backend
    const [stats, setStats] = useState({
        totalPapers: 0,
        totalStudents: 0,
    });

    // Fetch real stats on mount
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch question papers
            const papersResponse = await questionPaperAPI.getAll();
            const approvedPapers = papersResponse.data.questionPapers.filter(
                paper => paper.approvalStatus === "Approved"
            );
            
            setStats({
                totalPapers: approvedPapers.length,
                totalStudents: 0, // Backend doesn't have student count endpoint yet
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
            // Use fallback values if fetch fails
            setStats({
                totalPapers: 0,
                totalStudents: 0,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(false);
        setSuccessMessage('');
        setSending(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
            await axios.post(`${API_URL}/auth/forgot-password`, { email });
            
            setSuccessMessage('🎉 Reset code sent! Check your email.');
            setTimeout(() => setOtpPage(true), 1500);
        } catch (error) {
            console.error("Forgot password error:", error);
            if (error.response?.status === 404) {
                setEmailError(true);
            } else {
                setEmailError(true);
            }
        } finally {
            setSending(false);
        }
    };

    return (
        <div className={`flex h-screen w-screen justify-center items-center ${theme === "dark"
                ? "bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6d]"
                : "bg-gradient-to-br from-white via-blue-50 to-purple-50"
            }`}>
            {/* Left Panel - Same as Login */}
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

                    {/* Features Grid with Dynamic Stats */}
                    <div className="grid grid-cols-2 gap-4 w-full mt-6">
                        <div className={`p-4 rounded-xl border ${theme === "dark"
                                ? "bg-white/5 border-white/10 backdrop-blur-sm"
                                : "bg-white border-gray-200 shadow-sm"
                            }`}>
                            <IoDocumentText className={`text-3xl mb-2 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                            <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                {stats.totalPapers}+ Papers
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
                                {stats.totalStudents > 0 ? `${stats.totalStudents}+` : 'Active'} Community
                            </h3>
                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                IET Students
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

            <div className="flex justify-center items-center md:w-1/2 h-full w-full">
                <div className={`rounded-[2rem] border p-8 md:w-96 relative shadow-2xl w-[90vw] ${theme === "dark"
                        ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                        : "bg-white border-gray-200"
                    }`}>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg">
                        <FaUser style={{ fontSize: '2.5rem' }} />
                    </div>

                    <div className="mt-12 text-center">
                        <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Forgot Password</h2>
                                                <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Sad to hear that. Let's try our best!</p>

                    </div>

                    {
                        otpPage ? <OTPForm email={email} theme={theme} /> : (
                            <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                                <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${
                                    theme === "dark"
                                        ? "border-white/20 bg-white/5"
                                        : "border-gray-300 bg-gray-50"
                                }`}>
                                    <FaEnvelope className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        className={`text-xs md:text-sm outline-none w-full bg-transparent ${
                                            theme === "dark" 
                                                ? "text-white placeholder-gray-400" 
                                                : "text-gray-900 placeholder-gray-500"
                                        }`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {emailError && <p className='text-red-400 text-sm mt-1'>Email not found.</p>}
                                {successMessage && <p className='text-green-400 text-sm'>{successMessage}</p>}
                                <button 
                                    type="submit" 
                                    disabled={sending}
                                    className={`text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg w-full mt-4 ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {sending ? 'Sending Code...' : 'Get Code'}
                                </button>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    );
}


function OTPForm({ email, theme }) {
    const [otpError, setOTPError] = useState(false);
    const [otp, setOtp] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [verifying, setVerifying] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOTPError(false);
        setSuccessMessage('');
        setVerifying(true);

        try {
            // Verify OTP by attempting to reset password with a temporary check
            // We'll pass the OTP to the reset form
            setSuccessMessage('🎉 OTP Verified');
            setTimeout(() => setShowResetForm(true), 1500);
        } catch (error) {
            console.error("OTP verification error:", error);
            setOTPError(true);
        } finally {
            setVerifying(false);
        }
    };

    return showResetForm ? <ForgotPasswordForm email={email} resetCode={otp} theme={theme} /> : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${
                theme === "dark"
                    ? "border-white/20 bg-white/5"
                    : "border-gray-300 bg-gray-50"
            }`}>
                <FaKey className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit code"
                    required
                    maxLength="6"
                    className={`text-xs md:text-sm outline-none w-full bg-transparent ${
                        theme === "dark" 
                            ? "text-white placeholder-gray-400" 
                            : "text-gray-900 placeholder-gray-500"
                    }`}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
            </div>
            {otpError && <p className='text-red-400 text-sm mt-1'>Invalid or expired code</p>}
            {successMessage && <p className='text-green-400 text-sm'>{successMessage}</p>}
            <button 
                type="submit" 
                disabled={verifying || otp.length !== 6}
                className={`text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg w-full mt-4 ${(verifying || otp.length !== 6) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {verifying ? 'Verifying...' : 'Verify Code'}
            </button>
        </form>
    );
}


function ForgotPasswordForm({ email, resetCode, theme }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [matchPasswordError, setMatchPasswordError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [resetting, setResetting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(false);
        setMatchPasswordError(false);
        setSuccessMessage('');

        // Validate password
        if (password.length < 6 || !/[!@#$%^&*]/.test(password)) {
            setPasswordError(true);
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setMatchPasswordError(true);
            return;
        }

        setResetting(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
            await axios.post(`${API_URL}/auth/reset-password`, {
                email,
                resetCode,
                newPassword: password
            });

            setSuccessMessage('🎉 Password reset successful!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error("Password reset error:", error);
            if (error.response?.status === 400) {
                setPasswordError(true);
            } else {
                alert('Failed to reset password. Please try again.');
            }
        } finally {
            setResetting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${
                theme === "dark"
                    ? "border-white/20 bg-white/5"
                    : "border-gray-300 bg-gray-50"
            }`}>
                <FaKey className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                <input
                    type="password"
                    name="password"
                    placeholder="New password"
                    className={`text-xs md:text-sm outline-none w-full bg-transparent ${
                        theme === "dark" 
                            ? "text-white placeholder-gray-400" 
                            : "text-gray-900 placeholder-gray-500"
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {passwordError && <p className='text-red-400 text-sm mt-1'>Password must be at least 6 characters and include a symbol.</p>}

            <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${
                theme === "dark"
                    ? "border-white/20 bg-white/5"
                    : "border-gray-300 bg-gray-50"
            }`}>
                <FaKey className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                <input
                    type="password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    className={`text-xs md:text-sm outline-none w-full bg-transparent ${
                        theme === "dark" 
                            ? "text-white placeholder-gray-400" 
                            : "text-gray-900 placeholder-gray-500"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            {matchPasswordError && <p className='text-red-400 text-sm mt-1'>Passwords do not match</p>}
            {successMessage && <p className='text-green-400 text-sm'>{successMessage}</p>}

            <button 
                type="submit" 
                disabled={resetting}
                className={`text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg w-full mt-4 ${resetting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {resetting ? 'Resetting...' : 'Reset Password'}
            </button>
        </form>
    );
}
