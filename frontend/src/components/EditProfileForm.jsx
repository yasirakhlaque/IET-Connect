import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ThemeContext } from "../App";
import { FaSave, FaUser, FaEnvelope, FaIdCard, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfileForm({ onClose }) {
    const { theme } = useContext(ThemeContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = () => {
            try {
                const storedUser = localStorage.getItem("user");
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                    setName(userData.name || "");
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess(false);

        try {
            const token = localStorage.getItem("token");
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
            
            const response = await axios.put(
                `${baseUrl}/auth/profile`,
                { name: name.trim() },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update local storage with new user data
            const updatedUser = {
                ...user,
                name: response.data.student.name,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);

            setSuccess(true);
            setTimeout(() => {
                window.location.reload(); // Reload to update profile display
            }, 1500);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`${
                theme === "dark" 
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10" 
                    : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
            } rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden`}>
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-0" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0" />

                {/* Header */}
                <div className={`relative z-10 p-6 border-b ${
                    theme === "dark" ? "border-white/10" : "border-gray-200"
                }`}>
                    <button
                        className={`cursor-pointer absolute top-4 right-4 p-2 rounded-full transition-all ${
                            theme === "dark" 
                                ? "bg-white/5 hover:bg-white/10 text-gray-300" 
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                        onClick={onClose}
                        disabled={saving}
                    >
                        <RxCross2 size={20} />
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${
                            theme === "dark" 
                                ? "bg-gradient-to-br from-teal-500/20 to-blue-500/20" 
                                : "bg-gradient-to-br from-teal-100 to-blue-100"
                        }`}>
                            <FaUser className={`text-2xl ${
                                theme === "dark" ? "text-teal-400" : "text-teal-600"
                            }`} />
                        </div>
                        <div>
                            <h2 className={`text-2xl font-bold ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                                Edit Profile
                            </h2>
                            <p className={`text-sm ${
                                theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                                Update your personal information
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="relative z-10 p-6">
                    {success && (
                        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                            theme === "dark" 
                                ? "bg-green-500/20 border border-green-500/30" 
                                : "bg-green-50 border border-green-200"
                        }`}>
                            <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className={`font-semibold ${
                                    theme === "dark" ? "text-green-400" : "text-green-700"
                                }`}>
                                    Success!
                                </p>
                                <p className={`text-sm ${
                                    theme === "dark" ? "text-green-300" : "text-green-600"
                                }`}>
                                    Profile updated successfully. Refreshing...
                                </p>
                            </div>
                        </div>
                    )}
                    
                    {error && (
                        <div className={`mb-6 p-4 rounded-xl ${
                            theme === "dark" 
                                ? "bg-red-500/20 border border-red-500/30" 
                                : "bg-red-50 border border-red-200"
                        }`}>
                            <p className={`text-sm font-medium ${
                                theme === "dark" ? "text-red-400" : "text-red-700"
                            }`}>
                                {error}
                            </p>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name Field - Editable */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${
                                theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                                Full Name
                            </label>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                                theme === "dark" 
                                    ? "bg-white/5 border-white/10 focus-within:border-teal-500/50" 
                                    : "bg-white border-gray-200 focus-within:border-teal-500"
                            }`}>
                                <FaUser className={`${
                                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`} />
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    placeholder="Enter your full name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`outline-none w-full bg-transparent ${
                                        theme === "dark" ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
                                    }`}
                                    disabled={saving}
                                />
                            </div>
                        </div>

                        {/* Roll Number - Read Only */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${
                                theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                                Roll Number
                            </label>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                                theme === "dark" 
                                    ? "bg-white/[0.02] border-white/5" 
                                    : "bg-gray-50 border-gray-200"
                            }`}>
                                <FaIdCard className={`${
                                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                                }`} />
                                <span className={`font-medium ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}>
                                    {user?.rollno || "N/A"}
                                </span>
                                <span className={`ml-auto text-xs px-2 py-1 rounded ${
                                    theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
                                }`}>
                                    Read Only
                                </span>
                            </div>
                        </div>

                        {/* Email - Read Only */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${
                                theme === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}>
                                Email Address
                            </label>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                                theme === "dark" 
                                    ? "bg-white/[0.02] border-white/5" 
                                    : "bg-gray-50 border-gray-200"
                            }`}>
                                <FaEnvelope className={`${
                                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                                }`} />
                                <span className={`font-medium text-sm ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}>
                                    {user?.email || "N/A"}
                                </span>
                                <span className={`ml-auto text-xs px-2 py-1 rounded ${
                                    theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"
                                }`}>
                                    Read Only
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button 
                                type="button"
                                className={`cursor-pointer flex-1 py-3 rounded-xl font-semibold transition-all ${
                                    theme === "dark" 
                                        ? "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10" 
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                                }`}
                                onClick={onClose}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className={`cursor-pointer flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                                    saving
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02]"
                                } bg-gradient-to-r from-teal-500 to-blue-500 text-white`}
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
