import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaLightbulb, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { featureRequestAPI } from "../lib/api";

export default function RequestFeature() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        featureTitle: "",
        description: "",
        category: "UI/UX"
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
            // Redirect to login if not authenticated
            navigate('/login', { state: { from: '/request-feature' } });
            return;
        }

        // Pre-fill user data
        try {
            const userData = JSON.parse(user);
            setFormData(prev => ({
                ...prev,
                name: userData.name || "",
                email: userData.email || ""
            }));
        } catch (err) {
            console.error('Error parsing user data:', err);
        }
    }, [navigate]);

    const categories = [
        "UI/UX",
        "New Feature",
        "Performance",
        "Integration",
        "Content",
        "Other"
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await featureRequestAPI.create(formData);
            
            if (response.data.success) {
                setSubmitted(true);

                // Reset form after 3 seconds and redirect
                setTimeout(() => {
                    setFormData({
                        name: "",
                        email: "",
                        featureTitle: "",
                        description: "",
                        category: "UI/UX"
                    });
                    setSubmitted(false);
                    navigate('/profile'); // Redirect to profile to see their requests
                }, 3000);
            }
        } catch (err) {
            console.error("Error submitting feature request:", err);
            setError(err.response?.data?.message || "Failed to submit feature request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark"
            ? "bg-[#0B1220]"
            : "bg-gradient-to-br from-white via-blue-200 to-teal-100"
            }`}>
            <Navbar />

            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-2xl ${theme === "dark"
                            ? "bg-[#0FB8AD]/20"
                            : "bg-teal-100"
                            }`}>
                            <FaLightbulb className={`text-5xl ${theme === "dark"
                                ? "text-[#0FB8AD]"
                                : "text-teal-600"
                                }`} />
                        </div>
                    </div>
                    <h1 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        Request a Feature
                    </h1>
                    <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                        Have an idea to make IET Connect better? We'd love to hear from you!
                    </p>
                </div>

                {/* Form Card */}
                <div className={`rounded-2xl p-8 border relative overflow-hidden ${theme === "dark"
                    ? "bg-white/[0.03] backdrop-blur-xl border-white/[0.08]"
                    : "bg-white shadow-xl border-gray-200"
                    }`}>
                    {theme === "dark" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0FB8AD]/[0.05] to-transparent pointer-events-none" />
                    )}

                    <div className="relative z-10">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Error Message */}
                                {error && (
                                    <div className={`p-4 rounded-lg ${theme === "dark" 
                                        ? "bg-red-500/20 border border-red-500/30 text-red-300" 
                                        : "bg-red-50 border border-red-200 text-red-600"
                                    }`}>
                                        {error}
                                    </div>
                                )}

                                {/* Name Field */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0FB8AD] focus:border-transparent transition-all ${theme === "dark"
                                            ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-gray-500"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                                            }`}
                                        placeholder="Enter your name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0FB8AD] focus:border-transparent transition-all ${theme === "dark"
                                            ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-gray-500"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                                            }`}
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {/* Category Field */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0FB8AD] focus:border-transparent transition-all ${theme === "dark"
                                            ? "bg-white/[0.05] border-white/[0.1] text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} className={theme === "dark" ? "bg-[#1a2332]" : ""}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Feature Title Field */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        Feature Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="featureTitle"
                                        value={formData.featureTitle}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0FB8AD] focus:border-transparent transition-all ${theme === "dark"
                                            ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-gray-500"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                                            }`}
                                        placeholder="A brief title for your feature request"
                                    />
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                        }`}>
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0FB8AD] focus:border-transparent transition-all resize-none ${theme === "dark"
                                            ? "bg-white/[0.05] border-white/[0.1] text-white placeholder-gray-500"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                                            }`}
                                        placeholder="Describe your feature request in detail. What problem does it solve? How should it work?"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-gradient-to-r from-[#0FB8AD] to-[#0FB8AD]/80 text-white px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${loading
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:shadow-xl hover:shadow-[#0FB8AD]/30"
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            <span>Submit Feature Request</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            // Success Message
                            <div className="text-center py-12">
                                <FaCheckCircle className={`text-6xl mx-auto mb-6 ${theme === "dark" ? "text-green-400" : "text-green-600"
                                    }`} />
                                <h2 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}>
                                    Thank You!
                                </h2>
                                <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}>
                                    Your feature request has been submitted successfully.
                                </p>
                                <p className={`text-sm mt-2 ${theme === "dark" ? "text-gray-500" : "text-gray-500"
                                    }`}>
                                    We'll review it and get back to you soon!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className={`mt-8 p-6 rounded-xl ${theme === "dark"
                    ? "bg-blue-500/10 border border-blue-500/20"
                    : "bg-blue-50 border border-blue-200"
                    }`}>
                    <h3 className={`font-semibold mb-2 ${theme === "dark" ? "text-blue-300" : "text-blue-900"
                        }`}>
                        💡 Tips for a great feature request:
                    </h3>
                    <ul className={`space-y-1 text-sm ${theme === "dark" ? "text-blue-200" : "text-blue-800"
                        }`}>
                        <li>• Be specific about the problem you're trying to solve</li>
                        <li>• Explain how the feature would help you and other students</li>
                        <li>• Include any examples or references if applicable</li>
                        <li>• Keep it concise but detailed enough to understand</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
}
