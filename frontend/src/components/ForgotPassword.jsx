import { useContext, useState } from 'react';
import { FaEnvelope, FaUser, FaBook, FaDownload, FaUsers, FaCheckCircle, FaKey } from 'react-icons/fa';
import { IoDocumentText, IoSchool } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

export default function ForgotPassword() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [email, setEmail] = useState("");
    const [otpPage, setOtpPage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const DummyData = [
        { email: "yasir@gmail.com", otp: "1234" },
        { email: "yasir@gmail.com", otp: "4321" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError(false);
        const match = DummyData.find((user) => user.email === email);
        if (match) {
            setSuccessMessage('🎉 Email Validated');
            setTimeout(() => setOtpPage(true), 1500);
        } else {
            setEmailError(true);
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
                        otpPage ? <OTPForm DummyData={DummyData} theme={theme} /> : (
                            <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                                <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${
                                    theme === "dark"
                                        ? "border-white/20 bg-white/5"
                                        : "border-gray-300 bg-gray-50"
                                }`}>
                                    <FaEnvelope className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
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
                                <button type="submit" className="text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg w-full mt-4">
                                    Get Code
                                </button>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    );
}


function OTPForm({ DummyData, theme }) {
    const [otpError, setOTPError] = useState(false);
    const [otp, setOtp] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setOTPError(false);
        const match = DummyData.find(user => user.otp === otp);
        if (match) {
            setSuccessMessage('🎉 OTP Verified');
            setTimeout(() => setShowResetForm(true), 1500);
        } else {
            setOTPError(true);
        }
    };

    return showResetForm ? <ForgotPasswordForm theme={theme} /> : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:border-purple-400 transition ${
                theme === "dark"
                    ? "border-white/20 bg-white/5"
                    : "border-gray-300 bg-gray-50"
            }`}>
                <FaEnvelope className={theme === "dark" ? "text-gray-300 mr-2" : "text-gray-600 mr-2"} />
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className={`text-xs md:text-sm outline-none w-full bg-transparent ${
                        theme === "dark" 
                            ? "text-white placeholder-gray-400" 
                            : "text-gray-900 placeholder-gray-500"
                    }`}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            </div>
            {otpError && <p className='text-red-400 text-sm mt-1'>Invalid OTP</p>}
            {successMessage && <p className='text-green-400 text-sm'>{successMessage}</p>}
            <button type="submit" className="text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg w-full mt-4">
                Verify
            </button>
        </form>
    );
}


function ForgotPasswordForm({ theme }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [matchPasswordError, setMatchPasswordError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError(false);
        setMatchPasswordError(false);

        if (password.length < 6 || !/[!@#$%^&*]/.test(password)) {
            setPasswordError(true);
            return;
        }

        if (password !== confirmPassword) {
            setMatchPasswordError(true);
            return;
        }

        setSuccessMessage('🎉 Password reset successful!');
        setTimeout(() => navigate('/'), 1500);
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

            <button type="submit" className="text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition shadow-lg w-full mt-4">
                Confirm
            </button>
        </form>
    );
}
